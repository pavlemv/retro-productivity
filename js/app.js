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
      this.themeSwitch.textContent = '🌙';
      this.themeSwitch.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      // Dark mode is default
      document.body.classList.add('dark-mode');
      this.themeSwitch.textContent = '☀️';
      this.themeSwitch.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  setupEventListeners() {
    this.themeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      this.themeSwitch.textContent = isDark ? '☀️' : '🌙';
      this.themeSwitch.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

// Panel handling for the new grid layout
class PanelManager {
  constructor() {
    this.pomodoroIcon = document.getElementById('pomodoroIcon');
    this.todoIcon = document.getElementById('todoIcon');
    this.pomodoroPanel = document.getElementById('pomodoroPanel');
    this.todoPanel = document.getElementById('todoPanel');
    this.mainGrid = document.querySelector('.main-grid');
    this.setupEventListeners();
    this.checkScreenSize();
    
    // Listen for screen size changes
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 900;
    
    if (isMobile) {
      // On mobile, panels can be toggled
      this.enableMobileMode();
    } else {
      // On desktop, panels are always visible
      this.enableDesktopMode();
    }
  }

  enableDesktopMode() {
    // Remove any mobile-specific classes
    this.pomodoroPanel.classList.remove('hidden');
    this.todoPanel.classList.remove('hidden');
    
    // Update control icons to be just visual indicators on desktop
    this.pomodoroIcon.setAttribute('aria-expanded', 'true');
    this.todoIcon.setAttribute('aria-expanded', 'true');
  }

  enableMobileMode() {
    // On mobile, panels can be hidden by default
    if (!this.pomodoroPanel.classList.contains('active') && !this.pomodoroPanel.classList.contains('hidden')) {
      this.pomodoroPanel.classList.add('hidden');
      this.pomodoroIcon.setAttribute('aria-expanded', 'false');
    }
    
    if (!this.todoPanel.classList.contains('active') && !this.todoPanel.classList.contains('hidden')) {
      this.todoPanel.classList.add('hidden');
      this.todoIcon.setAttribute('aria-expanded', 'false');
    }
  }

  setupEventListeners() {
    this.pomodoroIcon.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        this.toggleMobilePanel(this.pomodoroPanel, this.pomodoroIcon, this.todoPanel, this.todoIcon);
      }
    });

    this.todoIcon.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        this.toggleMobilePanel(this.todoPanel, this.todoIcon, this.pomodoroPanel, this.pomodoroIcon);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'p':
            e.preventDefault();
            if (window.innerWidth <= 900) {
              this.toggleMobilePanel(this.pomodoroPanel, this.pomodoroIcon, this.todoPanel, this.todoIcon);
            }
            break;
          case 't':
            e.preventDefault();
            if (window.innerWidth <= 900) {
              this.toggleMobilePanel(this.todoPanel, this.todoIcon, this.pomodoroPanel, this.pomodoroIcon);
            }
            break;
        }
      }
    });
  }

  toggleMobilePanel(activePanel, activeIcon, inactivePanel, inactiveIcon) {
    const isHidden = activePanel.classList.contains('hidden');
    
    // Toggle the active panel
    activePanel.classList.toggle('hidden');
    activePanel.classList.toggle('active');
    
    // Hide the inactive panel
    inactivePanel.classList.add('hidden');
    inactivePanel.classList.remove('active');
    
    // Update ARIA attributes
    activeIcon.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    inactiveIcon.setAttribute('aria-expanded', 'false');
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
const panelManager = new PanelManager();
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