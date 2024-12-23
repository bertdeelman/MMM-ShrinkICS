# MMM-ShrinkICS

MMM-ShrinkICS is a MagicMirror module that dynamically filters a `.ics` calendar file to include only specific events (e.g., today's events) and serves the processed `.ics` file to the default `calendar` module in MagicMirror.

## Features
- Fetches and processes a remote `.ics` file.
- Filters the calendar to include only today's events.
- Serves the filtered `.ics` file at a custom endpoint.
- Fully compatible with the default `calendar` module in MagicMirror.

## Installation

1. **Clone the Repository**:
   ```bash
   cd ~/MagicMirror/modules
   git clone https://github.com/your-username/MMM-ShrinkICS.git
   ```

2. **Navigate to the Module Folder**:
   ```bash
   cd MMM-ShrinkICS
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Configuration

To use MMM-ShrinkICS, add it to your `config.js` file:

```javascript
{
    module: "MMM-ShrinkICS",
    config: {
        calendarUrl: "https://calendar.google.com/calendar/ical/your-email/private-ics-key/basic.ics", // Your original calendar URL
        endpoint: "/modules/shrinked.ics" // Endpoint to serve the processed calendar file
    }
},
{
    module: "calendar",
    position: "top_left", // Adjust position as needed
    config: {
        calendars: [
            {
                url: "http://localhost:8080/modules/shrinked.ics", // Use the filtered ICS file
                name: "Today's Events"
            }
        ]
    }
}
```

### Options for MMM-ShrinkICS
| Option        | Description                                                        | Default Value        |
|---------------|--------------------------------------------------------------------|----------------------|
| `calendarUrl` | The URL of the original `.ics` calendar file.                     | `""`                |
| `endpoint`    | The endpoint to serve the filtered `.ics` file.                   | `"/modules/shrinked.ics"` |

## Usage

- **Serve Filtered `.ics` File**: The module fetches and filters the `.ics` file and makes it available at the configured endpoint.
- **Default Calendar Module**: Use the default `calendar` module to display the events from the filtered `.ics` file.

## Development

### Running Locally
1. Clone the repository to your development environment.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the helper locally:
   ```bash
   node index.js
   ```
4. Access the filtered `.ics` file at:
   ```
   http://localhost:8080/modules/shrinked.ics
   ```

### Workflow
1. Make changes locally.
2. Commit and push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Pull updates on your MagicMirror device:
   ```bash
   cd ~/MagicMirror/modules/MMM-ShrinkICS
   git pull
   pm2 restart mm
   ```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Support
If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/your-username/MMM-ShrinkICS).

