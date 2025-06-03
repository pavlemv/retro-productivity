// Theme handling
class ThemeManager {
  constructor() {
    this.themeSwitch = document.getElementById('themeSwitch');
    this.loadTheme();
    this.setupEventListeners();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      this.themeSwitch.textContent = '☀️ Day Mode';
    }
  }

  setupEventListeners() {
    this.themeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      this.themeSwitch.textContent = isDark ? '☀️ Day Mode' : '🌙 Night Mode';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

// Sidebar handling
class SidebarManager {
  constructor() {
    this.pomodoroIcon = document.getElementById('pomodoroIcon');
    this.todoIcon = document.getElementById('todoIcon');
    this.pomodoroSidebar = document.getElementById('pomodoroSidebar');
    this.todoSidebar = document.getElementById('todoSidebar');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.pomodoroIcon.addEventListener('click', () => {
      this.pomodoroSidebar.classList.toggle('open');
      this.todoSidebar.classList.remove('open');
    });

    this.todoIcon.addEventListener('click', () => {
      this.todoSidebar.classList.toggle('open');
      this.pomodoroSidebar.classList.remove('open');
    });

    // Close sidebars when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.pomodoroSidebar.contains(e.target) && 
          !this.pomodoroIcon.contains(e.target) && 
          !this.todoSidebar.contains(e.target) && 
          !this.todoIcon.contains(e.target)) {
        this.pomodoroSidebar.classList.remove('open');
        this.todoSidebar.classList.remove('open');
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'p':
            e.preventDefault();
            this.pomodoroSidebar.classList.toggle('open');
            this.todoSidebar.classList.remove('open');
            break;
          case 't':
            e.preventDefault();
            this.todoSidebar.classList.toggle('open');
            this.pomodoroSidebar.classList.remove('open');
            break;
        }
      }
    });
  }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// Initialize managers
const themeManager = new ThemeManager();
const sidebarManager = new SidebarManager();

// Error handling for media elements
const handleMediaError = (error) => {
  console.error('Media error:', error);
  // You could implement a more sophisticated error handling system here
};

window.addEventListener('error', (e) => {
  if (e.target.tagName === 'AUDIO' || e.target.tagName === 'VIDEO') {
    handleMediaError(e);
  }
}); 