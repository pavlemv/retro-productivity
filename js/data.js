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
  {
    city: "Tokyo, Japan",
    video: "https://www.youtube.com/embed/QOjmvL3e7Lc?autoplay=1&mute=1",
  },
  {
    city: "Paris, France",
    video: "https://www.youtube.com/embed/hxydFLj0HRE?autoplay=1&mute=1",
  }
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

// Notification sounds
window.notificationSounds = {
  work: new Audio('sounds/work.mp3'),
  break: new Audio('sounds/break.mp3'),
  longBreak: new Audio('sounds/long-break.mp3')
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