class MediaPlayer {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.populateSelects();
    this.initializePlayer();
  }

  initializeElements() {
    this.citySelect = document.getElementById('citySelect');
    this.radioSelect = document.getElementById('radioSelect');
    this.lofiRadioSelect = document.getElementById('lofiRadioSelect');
    this.videoFrame = document.getElementById('videoFrame');
    this.audioPlayer = document.getElementById('audioPlayer');
    this.audioSource = document.getElementById('audioSource');
    this.audioLabel = document.getElementById('audioLabel');
    this.volumeControl = document.getElementById('volumeControl');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.isPlaying = false;
  }

  setupEventListeners() {
    this.citySelect.addEventListener('change', () => this.handleWebcamChange());
    this.radioSelect.addEventListener('change', () => this.handleRadioChange());
    this.lofiRadioSelect.addEventListener('change', () => this.handleLofiChange());
    this.volumeControl.addEventListener('input', () => this.handleVolumeChange());
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());

    // Handle audio errors
    this.audioPlayer.addEventListener('error', () => {
      console.error('Audio playback error');
      this.audioLabel.textContent = 'Error playing audio stream';
    });

    // Update play/pause button when audio state changes
    this.audioPlayer.addEventListener('play', () => {
      this.playPauseBtn.textContent = '⏸';
      this.isPlaying = true;
    });

    this.audioPlayer.addEventListener('pause', () => {
      this.playPauseBtn.textContent = '▶';
      this.isPlaying = false;
    });
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play().catch(error => console.log('Error playing audio:', error));
    }
  }

  populateSelects() {
    // Populate webcam locations
    locations.forEach((loc, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = loc.city;
      this.citySelect.appendChild(option);
    });

    // Populate radio stations
    radioStations.forEach((station, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = station.name;
      this.radioSelect.appendChild(option);
    });

    // Populate lofi stations
    lofiStations.forEach((station, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = station.name;
      this.lofiRadioSelect.appendChild(option);
    });
  }

  initializePlayer() {
    // Set initial volume
    this.audioPlayer.volume = this.volumeControl.value / 100;

    // Start with first webcam
    this.handleWebcamChange();

    // Start with first lofi station
    this.lofiRadioSelect.value = 0;
    this.handleLofiChange();
  }

  handleWebcamChange() {
    const location = locations[this.citySelect.value];
    if (location) {
      this.videoFrame.src = location.video;
    }
  }

  handleRadioChange() {
    const station = radioStations[this.radioSelect.value];
    if (station) {
      this.audioSource.src = station.url;
      this.audioLabel.textContent = `Playing: ${station.name}`;
      this.audioPlayer.load();
      this.audioPlayer.play().catch(error => console.log('Error playing audio:', error));
      this.lofiRadioSelect.value = '';
    }
  }

  handleLofiChange() {
    const station = lofiStations[this.lofiRadioSelect.value];
    if (station) {
      this.audioSource.src = station.url;
      this.audioLabel.textContent = `Playing: ${station.name}`;
      this.audioPlayer.load();
      this.audioPlayer.play().catch(error => console.log('Error playing audio:', error));
      this.radioSelect.value = '';
    }
  }

  handleVolumeChange() {
    this.audioPlayer.volume = this.volumeControl.value / 100;
  }
}

// Initialize MediaPlayer
const mediaPlayer = new MediaPlayer(); 