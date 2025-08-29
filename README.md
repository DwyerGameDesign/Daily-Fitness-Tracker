# 🎮 FitnessTracker

A gamified daily fitness tracker that makes working out fun and engaging!

## 🚨 Running the Application

This app uses ES6 modules and needs to be served from a local server to avoid CORS issues. **You cannot simply open `index.html` directly in your browser.**

### Option 1: Python Server (Recommended)
If you have Python installed:

**Windows:**
```bash
# Double-click start_server.bat
# OR run in Command Prompt/PowerShell:
python server.py
```

**Mac/Linux:**
```bash
python3 server.py
```

### Option 2: Node.js Server
If you have Node.js installed:

```bash
npm start
# OR
npx serve . -p 8000
```

### Option 3: Other HTTP Servers
Any local HTTP server will work:

```bash
# PHP (if installed)
php -S localhost:8000

# Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

## 🎯 Features

- **Gamified Progress**: Earn XP, level up, and maintain streaks
- **Daily Missions**: Random fitness challenges
- **Timer System**: Built-in workout timers
- **Progress Tracking**: Charts and statistics
- **Weekly Planner**: Plan your fitness week
- **Dark Mode**: Easy on the eyes
- **Data Export/Import**: Backup your progress

## 🔧 Development

The app is built with vanilla JavaScript using ES6 modules:

- `js/app.js` - Main application bootstrap
- `js/ui.js` - User interface management
- `js/storage.js` - Local storage handling
- `js/timers.js` - Timer functionality
- `js/sound.js` - Sound effects
- `js/stats.js` - Statistics and progress tracking
- `js/data.js` - Exercise data and mission generation

## 📱 Browser Support

Works in all modern browsers that support ES6 modules (Chrome, Firefox, Safari, Edge).

## 🎮 How to Use

1. Start the server using one of the methods above
2. Open your browser to `http://localhost:8000`
3. Begin tracking your daily fitness activities!
4. Earn XP, complete missions, and build healthy habits

Enjoy your fitness journey! 💪
