# Retro Productivity App 🎮

Retro Productivity App je moderna aplikacija za produktivnost sa retro estetikom iz 90-ih. Kombinuje Pomodoro timer, todo listu i ambijentalne medije da vam pomogne da ostanete fokusirani i produktivni.

## 🌟 Glavne Funkcije

### ⏲️ Pomodoro Timer
- Prilagodljiva vremena za:
  - Rad (podrazumevano 25 minuta)
  - Pauzu (podrazumevano 5 minuta)
  - Dugu pauzu (podrazumevano 15 minuta)
- Brojač sesija sa automatskim dugim pauzama
- Vizuelni prikaz progresa
- Desktop notifikacije
- Zvučna obaveštenja

### 📝 Todo Lista
- Dodavanje, završavanje i brisanje zadataka
- Nivoi prioriteta (visok, srednji, nizak)
- Rokovi za završetak
- Kategorije zadataka
- Pretraga i filtriranje
- Statistika zadataka
- Izvoz/Uvoz zadataka

### 🎵 Medija Player
- Live webcam prikazi iz različitih gradova:
  - New York
  - Dublin
  - St. Petersburg
  - Tokyo
  - Paris
- Radio stanice:
  - Radio New York Live
  - Dublin City FM
  - Smooth Jazz
  - Classical Radio
- Lofi radio stanice:
  - Lofi Girl
  - Chillhop
  - Box Lofi
  - The Jazz Hop Café
- Kontrola jačine zvuka
- Play/Pause kontrole

### 🎨 Opšte Funkcije
- Tamna/Svetla tema
- Responzivan dizajn
- Offline podrška
- Lokalno čuvanje podataka
- Prečice na tastaturi

## ⌨️ Prečice na Tastaturi
- `Ctrl/Cmd + P`: Otvori/zatvori Pomodoro sidebar
- `Ctrl/Cmd + T`: Otvori/zatvori Todo sidebar

## 🚀 Kako Koristiti

### Pomodoro Timer
1. Kliknite na ⏲️ ikonicu da otvorite Pomodoro timer
2. Podesite željena vremena za rad i pauze
3. Kliknite "Start" da pokrenete timer
4. Koristite "Pause" da privremeno zaustavite timer
5. Koristite "Reset" da počnete iznova

### Todo Lista
1. Kliknite na 📝 ikonicu da otvorite todo listu
2. Unesite zadatak u polje za unos
3. Postavite prioritet, rok i kategoriju (opciono)
4. Pritisnite Enter da dodate zadatak
5. Označite checkbox da završite zadatak
6. Koristite filtere za organizaciju prikaza
7. Izvezite/Uvezite zadatke pomoću dugmadi na dnu

### Medija Player
1. Izaberite webcam iz padajućeg menija da promenite prikaz grada
2. Izaberite radio stanicu ili lofi stanicu za reprodukciju
3. Koristite play/pause dugme za kontrolu reprodukcije
4. Podesite jačinu zvuka pomoću klizača

## 🛠️ Tehnički Detalji

### Struktura Projekta
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

### Korišćene Tehnologije
- HTML5
- CSS3 (sa CSS varijablama i modernim svojstvima)
- Vanilla JavaScript (ES6+)
- Service Workers za offline podršku
- Local Storage za čuvanje podataka
- Web Audio API
- Notifications API

## 🔧 Instalacija

1. Klonirajte repozitorijum:
```bash
git clone https://github.com/yourusername/retro-productivity.git
cd retro-productivity
```

2. Pokrenite lokalni server (npr. sa Python-om):
```bash
# Za Python 3
python -m http.server 8000

# Za Python 2
python -m SimpleHTTPServer 8000
```

3. Otvorite pretraživač i idite na `http://localhost:8000`

## 🌐 Podržani Pretraživači
- Google Chrome (preporučeno)
- Mozilla Firefox
- Microsoft Edge
- Safari

## 📱 Responzivnost
Aplikacija je u potpunosti responzivna i radi na:
- Desktop računarima
- Tabletima
- Mobilnim telefonima

## 🤝 Doprinos
Doprinosi su dobrodošli! Ako želite da doprinesete:
1. Fork-ujte projekat
2. Napravite novu granu (`git checkout -b feature/amazing-feature`)
3. Commit-ujte promene (`git commit -m 'Add amazing feature'`)
4. Push-ujte na granu (`git push origin feature/amazing-feature`)
5. Otvorite Pull Request

## 📄 Licenca
Ovaj projekat je licenciran pod MIT licencom - pogledajte [LICENSE](LICENSE) fajl za detalje.

## 🙏 Zahvalnice
- Lofi Girl za lofi muziku
- Earthcam za webcam strimove
- Radio Garden za radio strimove
