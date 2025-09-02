# 💪 Simple Fitness Tracker

A clean, self-guided fitness tracking web application inspired by Wii Fit. Track your daily exercises, monitor your progress, and maintain streaks without gamification clutter.

## 🚀 Features

### 📅 **4-Tab Interface**
- **Today** - Select and complete exercises from a comprehensive library
- **Weekly** - View week-by-week activity history 
- **Monthly** - Visual calendar showing daily goal progress with colored dots
- **Account** - Personal statistics and exercise insights

### 🎯 **Goal System**
- **Daily Goal**: Complete 3+ exercises per day
- **Visual Progress**: Color-coded calendar dots show completion status
- **Streak Tracking**: Maintain consecutive days of activity

### 🏃‍♂️ **Exercise Library**
**33+ exercises across 4 categories:**
- **Core & Cardio** (10 exercises) - Planks, mountain climbers, burpees, etc.
- **Arms & Chest** (8 exercises) - Push-ups, band exercises, dips, etc.
- **Legs & Glutes** (9 exercises) - Squats, lunges, bridges, etc.
- **Balance/Recovery** (7 exercises) - Single leg stands, yoga poses, walks, etc.

### 📊 **Progress Tracking**
- **Streak Counter** - Current and longest streaks
- **Total Statistics** - Exercises completed, days active
- **Top Exercises** - Your most frequently completed workouts
- **Category Breakdown** - Activity distribution across exercise types
- **Monthly Calendar** - Visual progress with goal achievement indicators

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for client-side data persistence
- **Styling**: CSS Custom Properties with dark/light theme support
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox

## 📁 File Structure

```
fitness-tracker/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── js/
│   ├── data.js         # Exercise library definitions
│   ├── storage.js      # LocalStorage management functions
│   ├── ui.js           # UI rendering and event handling
│   └── app.js          # Main application initialization
└── README.md           # This file
```

## 🚀 Quick Start

1. **Download/Clone** all files maintaining the folder structure
2. **Open** `index.html` in a web browser
3. **Start exercising** - check off completed exercises on the Today tab
4. **Track progress** - view your streaks and statistics

No server setup required! Everything runs locally in your browser.

## 💾 Data Management

- **Automatic Saving**: All progress saved to browser's LocalStorage
- **Data Persistence**: Your data stays even after closing the browser
- **Export/Import**: *(Future feature - currently data is browser-specific)*

## 🎨 Themes

- **Light Mode**: Clean, bright interface (default)
- **Dark Mode**: Easy on the eyes for evening workouts
- **Auto-Detection**: Respects system theme preference

## 📱 Responsive Design

- **Desktop**: Full-featured experience with optimal layouts
- **Tablet**: Adapted layouts for touch interaction
- **Mobile**: Optimized for phones with touch-friendly controls

## 📊 Progress Visualization

### Monthly Calendar Legend:
- 🟢 **Green Dot**: 3+ exercises completed (goal achieved!)
- 🟡 **Yellow Dot**: 1-2 exercises completed (partial progress)
- ⚪ **Gray Dot**: No exercises completed
- 🔘 **Dashed**: Future days (can't be completed yet)
- 💙 **Blue Ring**: Today's date

## 🎯 Usage Tips

1. **Set a Routine**: Aim for 3+ exercises daily to see green dots
2. **Mix Categories**: Try exercises from different muscle groups
3. **Check Weekly**: Review your weekly patterns for consistency
4. **Monitor Streaks**: Build momentum with consecutive active days
5. **Review Stats**: Use Account tab to see your exercise preferences

## 🔧 Customization

The app is built with clean, modular code that's easy to customize:

- **Add Exercises**: Edit `js/data.js` to add new exercises
- **Modify Goals**: Adjust the "3+ exercises" requirement in the code
- **Styling**: Update CSS custom properties for colors/themes
- **Categories**: Add or modify exercise categories

## 🌟 Design Philosophy

- **Self-Guided**: Like Wii Fit - you choose what exercises to do
- **Clean Interface**: No XP, badges, or gamification distractions
- **Progress Focus**: Clear visual feedback on consistency and goals
- **Flexibility**: No rigid workout plans, just track what you do

## 🔍 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (2020+)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Requirements**: JavaScript enabled, LocalStorage support

## 📝 License

This project is open source and available under the MIT License.

---

**Happy exercising! 💪** Keep those streaks going and enjoy your fitness journey!
