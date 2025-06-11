# Winductivity 🚀

**Winductivity** is a modern desktop productivity hub designed for secondary monitors. It combines a Pomodoro timer, todo list, and ambient media in a sleek grid layout optimized for desktop productivity workflows.

## ✨ Features

### 🖥️ **Desktop-First Design**
- **CSS Grid Layout** - Optimized for wide screens and secondary monitors
- **Always-visible panels** - Pomodoro, Todo, and Video in perfect harmony
- **Minimal UI** - Clean, distraction-free interface
- **Dark mode default** - Easy on the eyes during long work sessions

### ⏲️ **Pomodoro Timer**
- Customizable work/break intervals (default: 25/5/15 minutes)
- Visual progress bar with session counter
- Audio notifications for session transitions
- Settings persistence via localStorage
- One-click start/pause/reset controls

### 📝 **Smart Todo List**
- Quick task addition (Enter to add)
- Check/uncheck completion states
- Delete tasks with confirmation
- Auto-save to localStorage
- Empty state handling

### 🎬 **Ambient Media Center**
- **YouTube video integration** - Live webcam feeds (default: NYC)
- **Radio stations** - Various genres and stations
- **Lofi music** - Perfect background for productivity
- **Audio controls** - Play/pause and volume control
- **Seamless switching** between audio sources

### 🎨 **Theme System**
- **Dark mode** (default) - Black background, perfect for video content
- **Light mode** - Clean, bright interface
- **Instant switching** - Smooth transitions between themes
- **Persistent preferences** - Remembers your choice

## 🎯 **Perfect For**
- **Secondary monitor** productivity setups
- **Background ambience** while working/studying
- **Pomodoro technique** practitioners
- **Minimal distraction** environments
- **Long coding/study sessions**

## 📱 **Responsive Design**
- **Desktop (>900px)**: Full grid layout with all panels visible
- **Tablet/Mobile (≤900px)**: Collapsible panels with toggle controls
- **Touch-friendly** controls on mobile devices

## ⌨️ **Keyboard Shortcuts**
- `Ctrl/Cmd + P`: Toggle Pomodoro panel (mobile only)
- `Ctrl/Cmd + T`: Toggle Todo panel (mobile only)
- `Enter`: Add new todo task
- `Space`: Play/pause audio (when focused)

## 🚀 **Quick Start**

### **Method 1: Direct Usage**
1. Clone or download the repository
2. Open `index.html` in your browser
3. Start being productive!

### **Method 2: Local Server**
```bash
# Clone the repository
git clone https://github.com/yourusername/winductivity.git
cd winductivity

# Start local server (Python 3)
python -m http.server 8000

# Open browser
open http://localhost:8000
```

## 🛠️ **Project Structure**
```
winductivity/
├── css/
│   └── styles.css          # Complete styling system
├── js/
│   ├── app.js             # Main app & theme management
│   ├── data.js            # Media data (stations, webcams)
│   ├── todo.js            # Todo list functionality
│   ├── pomodoro.js        # Timer logic & notifications
│   └── media.js           # Audio/video controls
├── sounds/                # Notification sounds
├── images/               # App icons & assets
├── index.html           # Main application
├── manifest.json        # PWA manifest
└── sw.js               # Service worker
```

## 💻 **Technology Stack**
- **HTML5** - Semantic structure with ARIA accessibility
- **CSS3** - Modern grid layout, custom properties, responsive design
- **Vanilla JavaScript** - ES6+ classes, localStorage, modern APIs
- **Progressive Web App** - Service worker, offline support, installable
- **Accessibility** - Screen reader support, keyboard navigation

## 🎨 **Design Philosophy**
- **Function over form** - Every element serves productivity
- **Secondary monitor optimized** - Designed for multi-monitor setups
- **Ambient, not distracting** - Background companion, not main focus
- **Instantly usable** - No configuration required, works out of the box

## 🌟 **Usage Scenarios**

### **👨‍💻 Developer Setup**
- Main monitor: IDE/code
- Secondary monitor: Winductivity with NYC webcam + lofi music

### **📚 Study Session**
- Focus timer: 25-minute Pomodoro sessions
- Background: Calming webcam view + ambient sounds
- Task tracking: Study topics in todo list

### **🏢 Work Environment**
- Productivity timer for meetings/deep work
- Todo list for daily tasks
- Background ambience during calls

## 📖 **Browser Support**
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🔧 **Advanced Features**
- **LocalStorage persistence** - All settings and data saved
- **Error handling** - Graceful fallbacks for media failures
- **Cross-browser compatibility** - Works everywhere
- **Notification system** - Desktop notifications for timer events
- **Mobile responsive** - Collapsible panels for smaller screens

## 🤝 **Contributing**
We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📝 **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**
- YouTube for video embedding capabilities
- Radio stations for streaming content
- Lofi music creators for ambient soundscapes
- Open source community for inspiration

---

**Winductivity** - Where productivity meets ambience. Perfect for your secondary monitor. 🖥️✨
