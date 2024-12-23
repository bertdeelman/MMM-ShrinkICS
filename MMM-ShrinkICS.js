Module.register("MMM-ShrinkICS", {
    defaults: {
        calendarUrl: "",
        endpoint: "/shrinked.ics" // Endpoint for serving the filtered ICS
    },

    start: function () {
        this.sendSocketNotification("SET_CONFIG", this.config);
    }
});
