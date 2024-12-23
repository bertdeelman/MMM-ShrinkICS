const NodeHelper = require("node_helper");
const ical = require("ical");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
    start: function () {
        console.log("MMM-ShrinkICS node_helper started...");
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "SET_CONFIG") {
            this.config = payload;
        }
    },

    expressRoutes: function () {
        this.expressApp.get(this.config.endpoint || "/modules/shrinked.ics", async (req, res) => {
            const calendarUrl = this.config.calendarUrl;

            try {
                // Fetch the ICS file
                const response = await axios.get(calendarUrl);
                const data = ical.parseICS(response.data);

                // Filter today's events
                const now = new Date();
                const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const todayEnd = new Date(todayStart);
                todayEnd.setDate(todayStart.getDate() + 1);

                const filteredEvents = Object.values(data)
                    .filter(event => event.type === "VEVENT")
                    .filter(event => {
                        const eventStart = new Date(event.start);
                        return eventStart >= todayStart && eventStart < todayEnd;
                    })
                    .map(event => ({
                        ...event,
                        start: event.start.toISOString(),
                        end: event.end.toISOString()
                    }));

                // Create the new ICS content
                const newCalendar = this.createICS(filteredEvents);

                // Save the filtered ICS file in the `modules` directory
                const filePath = path.join(__dirname, "../shrinked.ics");
                fs.writeFileSync(filePath, newCalendar);

                res.set("Content-Type", "text/calendar");
                res.send(newCalendar);

            } catch (error) {
                console.error("Error fetching or processing the ICS file:", error);
                res.status(500).send("Failed to process calendar.");
            }
        });
    },

    createICS: function (events) {
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MMM-ShrinkICS//EN\n";

        events.forEach(event => {
            icsContent += `
BEGIN:VEVENT
SUMMARY:${event.summary}
DTSTART:${event.start.replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${event.end.replace(/[-:]/g, "").split(".")[0]}Z
END:VEVENT
`;
        });

        icsContent += "END:VCALENDAR";
        return icsContent;
    }
});
