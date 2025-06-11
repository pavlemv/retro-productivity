// Theme handling
class ThemeManager {
  constructor() {
    this.themeSwitch = document.getElementById('themeSwitch');
    this.loadTheme();
    this.setupEventListeners();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode
    if (savedTheme === 'light') {
      document.body.classList.remove('dark-mode');
      this.themeSwitch.textContent = '🌙 Dark Mode';
    } else {
      // Dark mode is default
      document.body.classList.add('dark-mode');
      this.themeSwitch.textContent = '☀️ Light Mode';
    }
  }

  setupEventListeners() {
    this.themeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      this.themeSwitch.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
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
      const isOpen = this.pomodoroSidebar.classList.contains('open');
      this.pomodoroSidebar.classList.toggle('open');
      this.todoSidebar.classList.remove('open');
      
      // Update ARIA attributes
      this.pomodoroIcon.setAttribute('aria-expanded', !isOpen);
      this.todoIcon.setAttribute('aria-expanded', 'false');
    });

    this.todoIcon.addEventListener('click', () => {
      const isOpen = this.todoSidebar.classList.contains('open');
      this.todoSidebar.classList.toggle('open');
      this.pomodoroSidebar.classList.remove('open');
      
      // Update ARIA attributes
      this.todoIcon.setAttribute('aria-expanded', !isOpen);
      this.pomodoroIcon.setAttribute('aria-expanded', 'false');
    });

    // Close sidebars when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.pomodoroSidebar.contains(e.target) && 
          !this.pomodoroIcon.contains(e.target) && 
          !this.todoSidebar.contains(e.target) && 
          !this.todoIcon.contains(e.target)) {
        this.pomodoroSidebar.classList.remove('open');
        this.todoSidebar.classList.remove('open');
        
        // Update ARIA attributes
        this.pomodoroIcon.setAttribute('aria-expanded', 'false');
        this.todoIcon.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'p':
            e.preventDefault();
            const pomodoroOpen = this.pomodoroSidebar.classList.contains('open');
            this.pomodoroSidebar.classList.toggle('open');
            this.todoSidebar.classList.remove('open');
            this.pomodoroIcon.setAttribute('aria-expanded', !pomodoroOpen);
            this.todoIcon.setAttribute('aria-expanded', 'false');
            break;
          case 't':
            e.preventDefault();
            const todoOpen = this.todoSidebar.classList.contains('open');
            this.todoSidebar.classList.toggle('open');
            this.pomodoroSidebar.classList.remove('open');
            this.todoIcon.setAttribute('aria-expanded', !todoOpen);
            this.pomodoroIcon.setAttribute('aria-expanded', 'false');
            break;
        }
      }
    });
  }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
        // Gracefully continue without service worker
      });
  });
}

// Initialize managers
const themeManager = new ThemeManager();
const sidebarManager = new SidebarManager();
const errorNotificationManager = new ErrorNotificationManager();

// Make error manager globally available
window.errorNotificationManager = errorNotificationManager;

// Enhanced error handling for media elements
const handleMediaError = (error) => {
  console.error('Media error:', error);
  let message = 'Media playback error occurred';
  
  if (error.target) {
    if (error.target.tagName === 'AUDIO') {
      message = 'Unable to play audio. The stream may be unavailable.';
    } else if (error.target.tagName === 'VIDEO') {
      message = 'Unable to load video. Please try selecting another webcam.';
    }
  }
  
  errorNotificationManager.showError(message, 'warning', 8000);
};

window.addEventListener('error', (e) => {
  if (e.target.tagName === 'AUDIO' || e.target.tagName === 'VIDEO') {
    handleMediaError(e);
  }
});

// Global error handler for JavaScript errors
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  errorNotificationManager.showError('An unexpected error occurred. Please refresh the page if issues persist.', 'error');
});

// Error notification system
class ErrorNotificationManager {
  constructor() {
    this.createNotificationContainer();
  }

  createNotificationContainer() {
    if (!document.getElementById('error-notifications')) {
      const container = document.createElement('div');
      container.id = 'error-notifications';
      container.className = 'error-notifications';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    }
  }

  showError(message, type = 'error', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

    const container = document.getElementById('error-notifications');
    container.appendChild(notification);

    // Auto remove after duration
    const timer = setTimeout(() => {
      this.removeNotification(notification);
    }, duration);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      clearTimeout(timer);
      this.removeNotification(notification);
    });

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });
  }

  removeNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
} 