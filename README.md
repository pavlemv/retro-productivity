# Retro Productivity App 🎮

The Retro Productivity App is a modern productivity application with a 90s retro aesthetic. It combines a Pomodoro timer, todo list, and ambient media to help you stay focused and productive.

## 🌟 Main Features

### ⏲️ Pomodoro Timer
- Customizable times for:
  - Work (default 25 minutes)
  - Break (default 5 minutes)
  - Long break (default 15 minutes)
- Session counter with automatic long breaks
- Visual progress display
- Desktop notifications
- Sound alerts

### 📝 Todo List
- Add, complete, and delete tasks
- Priority levels (high, medium, low)
- Due dates
- Task categories
- Search and filtering
- Task statistics
- Export/Import tasks

### 🎵 Media Player
- Live webcam views from different cities:
  - New York
  - Dublin
  - St. Petersburg
  - Tokyo
  - Paris
- Radio stations:
  - Radio New York Live
  - Dublin City FM
  - Smooth Jazz
  - Classical Radio
- Lofi radio stations:
  - Lofi Girl
  - Chillhop
  - Box Lofi
  - The Jazz Hop Café
- Volume control
- Play/Pause controls

### 🎨 General Features
- Dark/Light theme
- Responsive design
- Offline support
- Local data storage
- Keyboard shortcuts

## ⌨️ Keyboard Shortcuts
- `Ctrl/Cmd + P`: Open/close Pomodoro sidebar
- `Ctrl/Cmd + T`: Open/close Todo sidebar

## 🚀 How to Use

### Pomodoro Timer
1. Click the ⏲️ icon to open the Pomodoro timer
2. Set desired work and break times
3. Click "Start" to begin the timer
4. Use "Pause" to temporarily stop the timer
5. Use "Reset" to start over

### Todo List
1. Click the 📝 icon to open the todo list
2. Enter a task in the input field
3. Set priority, due date, and category (optional)
4. Press Enter to add the task
5. Check the checkbox to complete a task
6. Use filters to organize the view
7. Export/Import tasks using buttons at the bottom

### Media Player
1. Select a webcam from the dropdown to change city view
2. Choose a radio station or lofi station for playback
3. Use the play/pause button to control playback
4. Adjust volume using the slider

## 🛠️ Technical Details

### Project Structure
```
retro-productivity/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── todo.js
│   ├── pomodoro.js
│   └── media.js
├── sounds/
│   ├── work.mp3
│   ├── break.mp3
│   └── long-break.mp3
├── images/
│   └── pomodoro-icon.png
├── index.html
└── sw.js
```

### Technologies Used
- HTML5
- CSS3 (with CSS variables and modern properties)
- Vanilla JavaScript (ES6+)
- Service Workers for offline support
- Local Storage for data persistence
- Web Audio API
- Notifications API

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/retro-productivity.git
cd retro-productivity
```

2. Start a local server (e.g., with Python):
```bash
# For Python 3
python -m http.server 8000

# For Python 2
python -m SimpleHTTPServer 8000
```

3. Open your browser and go to `http://localhost:8000`

## 🌐 Supported Browsers
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

## 📱 Responsiveness
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute:
1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Lofi Girl for lofi music
- Earthcam for webcam streams
- Radio Garden for radio streams
