# SNCF - Never Miss Your Train 🚆

![Extension Preview](example.png)

**Never Miss Your Train** is a browser extension for Google Chrome and Microsoft Edge that helps you stay informed about your SNCF train departures. View real-time station boards and receive instant notifications if your tracked train is delayed or cancelled.

## ✨ Features

### Current Features
- **🚉 Live Station Boards**: View real-time departure schedules for any SNCF train station
- **🔍 Station Search**: Easily search and select your departure station from all SNCF stations
- **📊 Comprehensive Information**: See destination, scheduled time, platform, delays, and train status
- **👁️ Train Tracking**: Select a specific train to track its status
- **🔔 Smart Notifications**: Receive browser notifications when:
  - Your tracked train is cancelled (total or partial suppression)
  - Your tracked train is delayed
  - Tracking starts successfully
- **🎨 Visual Status Indicators**: 
  - 🟢 Green badge: Train is on time
  - 🟡 Yellow badge with delay time: Train is delayed
  - 🔴 Red badge: Train is cancelled
- **🔄 Auto-refresh**: Automatically checks train status every 5 minutes when tracking is active
- **🌍 Multi-language Support**: Available in English and French

## 📦 Installation

### From Source (Developer Mode)

1. **Download the extension**
   ```bash
   git clone https://github.com/Happy4Game/sncf-never-miss-train-extension.git
   ```
   Or download and extract the ZIP file from the repository.

2. **Open your browser's extension page**
   - Chrome: Navigate to `chrome://extensions`
   - Edge: Navigate to `edge://extensions`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch (usually in the top-right corner)

4. **Load the extension**
   - Click "Load unpacked"
   - Select the folder containing the extension files

5. **Done!** The extension icon should now appear in your browser toolbar.

## 🛠️ How to Use

1. **Open the extension** by clicking on the extension icon in your browser toolbar

2. **Search for your station**
   - Type your departure station name in the search field
   - Select your station from the dropdown list

3. **View departures**
   - Click the "Refresh station list" button
   - A table will display all upcoming departures with:
     - Destination
     - Scheduled departure time
     - Current status (On time, Delayed, Cancelled)
     - Platform number
     - Delay duration (if applicable)

4. **Track a specific train**
   - Click the 🚆 icon next to the train you want to track
   - The extension will now monitor this train in the background
   - You'll receive notifications about status changes
   - The extension badge will show the train's status

5. **Stop tracking**
   - Click the "Stop tracking" button to stop monitoring the train
   - The badge will be cleared

## 🏗️ Technical Details

- **Manifest Version**: 3
- **Permissions Required**:
  - `notifications`: To send you alerts about your train
  - `scripting`: To run the background monitoring
- **APIs Used**:
  - SNCF Voyageurs Location API
  - Gares & Connexions Schedule API

## ⚠️ Legal Disclaimer & Data Usage

**Please read this section carefully.**

### 1. Independent Project
This is a 100% independent, solo project developed by an individual developer. It is **not an official product** of the SNCF (Société nationale des chemins de fer français), nor is it endorsed by, affiliated with, or sponsored by the SNCF or any of its subsidiaries.

### 2. Data Source
This extension retrieves public transport data (schedules, real-time status) from SNCF's public APIs:
- Data is used strictly to provide functionality to end-users
- The developer makes no claim of ownership over the data
- The accuracy of information depends entirely on the data provided by SNCF APIs

### 3. Contact for Rights Holders
If you are a representative of the SNCF or a related entity and believe this project:
- Infringes on any rights
- Violates API usage terms
- Should be taken down or modified

**Please contact me directly** before taking formal action. As a solo developer, I am willing to comply immediately with any valid request.

📧 **Contact**: dufeutrel.thibaut@gmail.com

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:
- Open an issue to discuss your ideas
- Submit a pull request with your improvements
- Please keep the code simple and maintainable

## 📝 License

This project is provided as-is for personal use. Please respect SNCF's data usage policies.

---

**Made with ❤️ by a passionate developer who doesn't want to miss their train!**
