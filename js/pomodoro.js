class PomodoroTimer {
  constructor() {
    this.initializeElements();
    this.loadSettings();
    this.setupEventListeners();
    this.reset();
  }

  initializeElements() {
    this.timerDisplay = document.getElementById('timerDisplay');
    this.startButton = document.getElementById('startTimer');
    this.pauseButton = document.getElementById('pauseTimer');
    this.resetButton = document.getElementById('resetTimer');
    this.workTimeInput = document.getElementById('workTime');
    this.breakTimeInput = document.getElementById('breakTime');
    this.longBreakTimeInput = document.getElementById('longBreakTime');
    this.sessionsInput = document.getElementById('sessionsBeforeLongBreak');
    this.sessionCountDisplay = document.getElementById('sessionCount');
    this.progressBar = document.getElementById('timerProgress');
  }

  loadSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings')) || defaultSettings;
    this.workTimeInput.value = savedSettings.workTime;
    this.breakTimeInput.value = savedSettings.breakTime;
    this.longBreakTimeInput.value = savedSettings.longBreakTime;
    this.sessionsInput.value = savedSettings.sessionsBeforeLongBreak;
  }

  setupEventListeners() {
    this.startButton.addEventListener('click', () => this.start());
    this.pauseButton.addEventListener('click', () => this.pause());
    this.resetButton.addEventListener('click', () => this.reset());

    // Save settings when changed
    [this.workTimeInput, this.breakTimeInput, this.longBreakTimeInput, this.sessionsInput].forEach(input => {
      input.addEventListener('change', () => {
        this.saveSettings();
        this.reset();
      });
    });
  }

  saveSettings() {
    const settings = {
      workTime: parseInt(this.workTimeInput.value),
      breakTime: parseInt(this.breakTimeInput.value),
      longBreakTime: parseInt(this.longBreakTimeInput.value),
      sessionsBeforeLongBreak: parseInt(this.sessionsInput.value)
    };
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }

  start() {
    if (this.interval) return;

    this.startButton.textContent = 'Running...';
    this.startButton.disabled = true;
    this.pauseButton.disabled = false;

    this.interval = setInterval(() => {
      if (this.remainingSeconds <= 0) {
        this.completeSession();
      } else {
        this.remainingSeconds--;
        this.updateDisplay();
      }
    }, 1000);
  }

  pause() {
    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = null;
    this.startButton.textContent = 'Resume';
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.isWork = true;
    this.sessionCount = 0;
    this.startButton.textContent = 'Start';
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
    this.updateSessionCount();
    this.setTimer();
  }

  completeSession() {
    clearInterval(this.interval);
    this.interval = null;

    if (this.isWork) {
      this.sessionCount++;
      this.updateSessionCount();
      
      // Check if it's time for a long break
      const isLongBreak = this.sessionCount % parseInt(this.sessionsInput.value) === 0;
      this.playNotification(isLongBreak ? 'longBreak' : 'break');
      
      // Show notification
      this.showNotification(isLongBreak ? 'Time for a long break!' : 'Time for a break!');
    } else {
      this.playNotification('work');
      this.showNotification('Back to work!');
    }

    this.isWork = !this.isWork;
    this.setTimer();
    this.start();
  }

  setTimer() {
    if (this.isWork) {
      this.remainingSeconds = parseInt(this.workTimeInput.value) * 60;
    } else {
      // Check if it's time for a long break
      const isLongBreak = this.sessionCount % parseInt(this.sessionsInput.value) === 0;
      this.remainingSeconds = parseInt(isLongBreak ? this.longBreakTimeInput.value : this.breakTimeInput.value) * 60;
    }
    this.totalSeconds = this.remainingSeconds;
    this.updateDisplay();
  }

  updateDisplay() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    this.timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update progress bar
    const progress = ((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * 100;
    this.progressBar.style.width = `${progress}%`;
  }

  updateSessionCount() {
    this.sessionCountDisplay.textContent = this.sessionCount;
  }

  playNotification(type) {
    const sound = notificationSounds[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => console.log('Error playing notification:', error));
    }
  }

  showNotification(message) {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Pomodoro Timer', {
            body: message,
            icon: '/images/pomodoro-icon.png'
          });
        }
      });
    }
  }
}

// Initialize PomodoroTimer
const pomodoroTimer = new PomodoroTimer(); 