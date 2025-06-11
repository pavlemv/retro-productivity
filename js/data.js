// Webcam locations
window.locations = [
  {
    city: "New York, USA",
    video: "https://www.youtube.com/embed/rnXIjl_Rzy4?autoplay=1&mute=1",
  },
  {
    city: "Dublin, Ireland",
    video: "https://www.youtube.com/embed/u4UZ4UvZXrg?autoplay=1&mute=1",
  },
  {
    city: "St. Petersburg, Russia",
    video: "https://www.youtube.com/embed/h1wly909BYw?autoplay=1&mute=1",
  },
];

// Radio stations
window.radioStations = [
  {
    name: "Radio New York Live",
    url: "https://streaming.radiostreamlive.com/radionylive_devices"
  },
  {
    name: "Dublin City FM",
    url: "https://listen-dublincity.sharp-stream.com/dublin_city.mp3"
  },
  {
    name: "Smooth Jazz",
    url: "https://streaming.live365.com/b05055_128mp3"
  },
  {
    name: "Classical Radio",
    url: "https://live.musopen.org:8085/streamvbr0"
  }
];

// Lofi stations
window.lofiStations = [
  {
    name: "Lofi Girl",
    url: "https://play.streamafrica.net/lofiradio"
  },
  {
    name: "Chillhop",
    url: "http://stream.zeno.fm/fyn8eh3h5f8uv"
  },
  {
    name: "Box Lofi",
    url: "http://stream.zeno.fm/f3wvbbqmdg8uv"
  },
  {
    name: "The Jazz Hop Café",
    url: "http://stream.zeno.fm/0r0xa792kwzuv"
  }
];

// Notification sounds with fallback
window.notificationSounds = {};

// Function to create audio with fallback
function createAudioWithFallback(src, fallbackTone) {
  const audio = new Audio();
  audio.preload = 'auto';
  
  // Try to load the custom sound
  audio.src = src;
  
  // Fallback to Web Audio API beep if file doesn't exist
  audio.addEventListener('error', () => {
    console.warn(`Audio file ${src} not found, using fallback tone`);
    audio.fallbackTone = fallbackTone;
  });
  
  // Custom play function that handles fallback
  audio.playWithFallback = function() {
    if (this.fallbackTone) {
      playBeepTone(this.fallbackTone);
    } else {
      this.play().catch(error => {
        console.warn('Audio play failed:', error);
        playBeepTone(this.fallbackTone || 800);
      });
    }
  };
  
  return audio;
}

// Function to generate beep tones using Web Audio API
function playBeepTone(frequency = 800, duration = 200) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (error) {
    console.warn('Web Audio API not supported:', error);
  }
}

// Initialize notification sounds with fallbacks
window.notificationSounds = {
  work: createAudioWithFallback('sounds/work.mp3', 880),      // Higher pitch for work
  break: createAudioWithFallback('sounds/break.mp3', 660),   // Medium pitch for break
  longBreak: createAudioWithFallback('sounds/long-break.mp3', 440) // Lower pitch for long break
};

// Default settings
window.defaultSettings = {
  workTime: 25,
  breakTime: 5,
  longBreakTime: 15,
  sessionsBeforeLongBreak: 4,
  volume: 0.5,
  theme: 'light'
}; 