// LocalStorage management and data persistence

// Storage keys
const STORAGE_KEYS = {
    USER: 'ft_user',
    PLAN: 'ft_plan', 
    HISTORY: 'ft_history',
    SETTINGS: 'ft_settings',
    BADGES: 'ft_badges',
    ACHIEVEMENTS: 'ft_achievements',
    DAILY_MISSIONS: 'ft_daily_missions',
    DAILY_STRETCHES: 'ft_daily_stretches'
};

// Initialize storage with default data
function initializeStorage() {
    try {
        // Initialize user profile
        if (!localStorage.getItem(STORAGE_KEYS.USER)) {
            setUserProfile(defaultUser);
        }
        
        // Initialize settings
        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            setSettings(defaultSettings);
        }
        
        // Initialize weekly plan
        if (!localStorage.getItem(STORAGE_KEYS.PLAN)) {
            const defaultPlan = generateDefaultWeeklyPlan();
            setWeeklyPlan(defaultPlan);
        }
        
        // Initialize empty history
        if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
            setHistory([]);
        }
        
        // Initialize empty badges
        if (!localStorage.getItem(STORAGE_KEYS.BADGES)) {
            setBadges([]);
        }
        
        // Initialize empty achievements
        if (!localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
            setAchievements([]);
        }
        
        console.log('Storage initialized successfully');
    } catch (error) {
        console.error('Failed to initialize storage:', error);
        throw error;
    }
}

// User Profile Management
function getUserProfile() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || defaultUser;
    } catch (error) {
        console.error('Failed to get user profile:', error);
        return defaultUser;
    }
}

function setUserProfile(profile) {
    try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile));
        return true;
    } catch (error) {
        console.error('Failed to save user profile:', error);
        return false;
    }
}

function updateUserProfile(updates) {
    const profile = getUserProfile();
    const updatedProfile = { ...profile, ...updates };
    return setUserProfile(updatedProfile);
}

// Settings Management
function getSettings() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || defaultSettings;
    } catch (error) {
        console.error('Failed to get settings:', error);
        return defaultSettings;
    }
}

function setSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error('Failed to save settings:', error);
        return false;
    }
}

// Weekly Plan Management
function getWeeklyPlan() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAN)) || generateDefaultWeeklyPlan();
    } catch (error) {
        console.error('Failed to get weekly plan:', error);
        return generateDefaultWeeklyPlan();
    }
}

function setWeeklyPlan(plan) {
    try {
        localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
        return true;
    } catch (error) {
        console.error('Failed to save weekly plan:', error);
        return false;
    }
}

// History Management
function getHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [];
    } catch (error) {
        console.error('Failed to get history:', error);
        return [];
    }
}

function setHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Failed to save history:', error);
        return false;
    }
}

function addHistoryEntry(entry) {
    const history = getHistory();
    const newEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        ...entry
    };
    
    history.push(newEntry);
    return setHistory(history);
}

// Get today's history entries
function getTodayHistory() {
    const today = new Date().toISOString().split('T')[0];
    const history = getHistory();
    return history.filter(entry => entry.date === today);
}

// Get history entries for a specific week
function getWeekHistory(weekOffset = 0) {
    const history = getHistory();
    const today = new Date();
    
    // Calculate week start (Monday) for the given week offset
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7)); // Monday of the week
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday of the week
    weekEnd.setHours(23, 59, 59, 999);
    
    return history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate <= weekEnd;
    });
}

// Get activities grouped by day for a specific week
function getWeekActivityByDay(weekOffset = 0) {
    const weekHistory = getWeekHistory(weekOffset);
    const today = new Date();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekData = {};
    
    // Calculate week start (Monday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7));
    
    days.forEach((day, index) => {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + index);
        const dateStr = dayDate.toISOString().split('T')[0];
        
        const dayEntries = weekHistory.filter(entry => entry.date === dateStr);
        const missions = dayEntries.filter(entry => entry.type === 'mission');
        const stretches = dayEntries.filter(entry => entry.type === 'stretch');
        
        weekData[day] = {
            date: dateStr,
            missions: missions,
            stretches: stretches,
            totalMissions: missions.length,
            totalStretches: stretches.length,
            totalMinutes: dayEntries.reduce((sum, entry) => sum + (entry.minutes || 0), 0),
            totalXP: dayEntries.reduce((sum, entry) => sum + (entry.xp || 0), 0)
        };
    });
    
    return weekData;
}

// Check if today is complete (at least 1 mission or 15+ active minutes)
function isTodayComplete() {
    const todayEntries = getTodayHistory();
    
    // Check for completed missions
    const completedMissions = todayEntries.filter(entry => entry.type === 'mission');
    if (completedMissions.length > 0) return true;
    
    // Check for 15+ minutes of activity
    const totalMinutes = todayEntries.reduce((sum, entry) => sum + (entry.minutes || 0), 0);
    return totalMinutes >= 15;
}

// Badges Management
function getBadges() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.BADGES)) || [];
    } catch (error) {
        console.error('Failed to get badges:', error);
        return [];
    }
}

function setBadges(badges) {
    try {
        localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
        return true;
    } catch (error) {
        console.error('Failed to save badges:', error);
        return false;
    }
}

function addBadge(badgeId) {
    const badges = getBadges();
    if (!badges.find(b => b.id === badgeId)) {
        const newBadge = {
            id: badgeId,
            earnedDate: new Date().toISOString(),
            timestamp: Date.now()
        };
        badges.push(newBadge);
        setBadges(badges);
        return true;
    }
    return false;
}

// Achievements Management
function getAchievements() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) || [];
    } catch (error) {
        console.error('Failed to get achievements:', error);
        return [];
    }
}

function setAchievements(achievements) {
    try {
        localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
        return true;
    } catch (error) {
        console.error('Failed to save achievements:', error);
        return false;
    }
}

function updateAchievementLevel(achievementId, level) {
    const achievements = getAchievements();
    const existing = achievements.find(a => a.id === achievementId);
    
    if (existing) {
        // Only update if new level is higher
        if (level > existing.level) {
            existing.level = level;
            existing.lastUpdate = new Date().toISOString();
            existing.timestamp = Date.now();
            setAchievements(achievements);
            return true;
        }
    } else {
        // Add new achievement
        const newAchievement = {
            id: achievementId,
            level: level,
            earnedDate: new Date().toISOString(),
            lastUpdate: new Date().toISOString(),
            timestamp: Date.now()
        };
        achievements.push(newAchievement);
        setAchievements(achievements);
        return true;
    }
    return false;
}

function getAchievementLevel(achievementId) {
    const achievements = getAchievements();
    const achievement = achievements.find(a => a.id === achievementId);
    return achievement ? achievement.level : 0;
}

// Daily Missions Management
function getTodayMissions() {
    const today = new Date().toISOString().split('T')[0];
    try {
        const dailyMissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_MISSIONS)) || {};
        return dailyMissions[today] || null;
    } catch (error) {
        console.error('Failed to get daily missions:', error);
        return null;
    }
}

function setTodayMissions(missions) {
    const today = new Date().toISOString().split('T')[0];
    try {
        const dailyMissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_MISSIONS)) || {};
        dailyMissions[today] = missions;
        localStorage.setItem(STORAGE_KEYS.DAILY_MISSIONS, JSON.stringify(dailyMissions));
        return true;
    } catch (error) {
        console.error('Failed to save daily missions:', error);
        return false;
    }
}

// Daily Stretches Management
function getTodayStretches() {
    const today = new Date().toISOString().split('T')[0];
    try {
        const dailyStretches = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_STRETCHES)) || {};
        return dailyStretches[today] || null;
    } catch (error) {
        console.error('Failed to get daily stretches:', error);
        return null;
    }
}

function setTodayStretches(stretches) {
    const today = new Date().toISOString().split('T')[0];
    try {
        const dailyStretches = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_STRETCHES)) || {};
        dailyStretches[today] = stretches;
        localStorage.setItem(STORAGE_KEYS.DAILY_STRETCHES, JSON.stringify(dailyStretches));
        return true;
    } catch (error) {
        console.error('Failed to save daily stretches:', error);
        return false;
    }
}





// Data Export/Import
function exportAllData() {
    try {
        const data = {
            user: getUserProfile(),
            settings: getSettings(),
            plan: getWeeklyPlan(),
            history: getHistory(),
            badges: getBadges(),
            achievements: getAchievements(),
            notes: JSON.parse(localStorage.getItem('ft_daily_notes')) || {},
            dailyMissions: JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_MISSIONS)) || {},
            dailyStretches: JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_STRETCHES)) || {},
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        return JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Failed to export data:', error);
        return null;
    }
}

function importAllData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        
        // Validate required structure
        if (!data.version || !data.user) {
            throw new Error('Invalid data format');
        }
        
        // Import each section
        if (data.user) setUserProfile(data.user);
        if (data.settings) setSettings(data.settings);
        if (data.plan) setWeeklyPlan(data.plan);
        if (data.history) setHistory(data.history);
        if (data.badges) setBadges(data.badges);
        if (data.achievements) setAchievements(data.achievements);
        if (data.notes) localStorage.setItem('ft_daily_notes', JSON.stringify(data.notes));
        if (data.dailyMissions) localStorage.setItem(STORAGE_KEYS.DAILY_MISSIONS, JSON.stringify(data.dailyMissions));
        if (data.dailyStretches) localStorage.setItem(STORAGE_KEYS.DAILY_STRETCHES, JSON.stringify(data.dailyStretches));
        
        return true;
    } catch (error) {
        console.error('Failed to import data:', error);
        return false;
    }
}

// Reset all data
function resetAllData() {
    try {
        // Clear all fitness tracker data
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        localStorage.removeItem('ft_daily_notes');
        
        // Reinitialize with defaults
        initializeStorage();
        
        return true;
    } catch (error) {
        console.error('Failed to reset data:', error);
        return false;
    }
}





// All functions are now globally available