// LocalStorage management for fitness tracker data

// Storage functions
function getHistory() {
    try {
        return JSON.parse(localStorage.getItem('fitness_history') || '[]');
    } catch (error) {
        console.error('Failed to get history:', error);
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem('fitness_history', JSON.stringify(history));
        return true;
    } catch (error) {
        console.error('Failed to save history:', error);
        return false;
    }
}

function getTodayHistory() {
    const today = new Date().toISOString().split('T')[0];
    const history = getHistory();
    return history.filter(entry => entry.date === today);
}

function addExerciseToHistory(exerciseId, exerciseName) {
    const history = getHistory();
    const newEntry = {
        id: Date.now().toString(),
        exerciseId: exerciseId,
        exerciseName: exerciseName,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString()
    };
    
    history.push(newEntry);
    return saveHistory(history);
}

function removeExerciseFromHistory(exerciseId) {
    const today = new Date().toISOString().split('T')[0];
    const history = getHistory();
    const updatedHistory = history.filter(entry => 
        !(entry.date === today && entry.exerciseId === exerciseId)
    );
    return saveHistory(updatedHistory);
}

// Streak calculation
function calculateStreak() {
    const history = getHistory();
    if (history.length === 0) return 0;
    
    // Group by date and check for activity
    const dailyActivity = {};
    history.forEach(entry => {
        dailyActivity[entry.date] = true;
    });
    
    // Calculate streak from today backwards
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (dailyActivity[dateStr]) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// Week-based history functions
function getWeekHistory(weekOffset = 0) {
    const history = getHistory();
    const today = new Date();
    
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return history.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate <= weekEnd;
    });
}

function getWeekActivityByDay(weekOffset = 0) {
    const weekHistory = getWeekHistory(weekOffset);
    const today = new Date();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekData = {};
    
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7));
    
    days.forEach((day, index) => {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + index);
        const dateStr = dayDate.toISOString().split('T')[0];
        
        const dayEntries = weekHistory.filter(entry => entry.date === dateStr);
        
        weekData[day] = {
            date: dateStr,
            exercises: dayEntries,
            count: dayEntries.length
        };
    });
    
    return weekData;
}

// Theme management
function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
}

// Account statistics functions
function getTotalExercises() {
    const history = getHistory();
    return history.length;
}

function getTotalDays() {
    const history = getHistory();
    const uniqueDates = new Set(history.map(entry => entry.date));
    return uniqueDates.size;
}

function getLongestStreak() {
    const history = getHistory();
    if (history.length === 0) return 0;
    
    // Group by date and get sorted unique dates
    const uniqueDates = [...new Set(history.map(entry => entry.date))].sort();
    
    let longestStreak = 1;
    let currentStreak = 1;
    
    for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = new Date(uniqueDates[i - 1]);
        const currDate = new Date(uniqueDates[i]);
        
        // Check if dates are consecutive
        const timeDiff = currDate.getTime() - prevDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        
        if (dayDiff === 1) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            currentStreak = 1;
        }
    }
    
    return longestStreak;
}

function getTopExercises(limit = 10) {
    const history = getHistory();
    const exerciseCounts = {};
    
    // Count occurrences of each exercise
    history.forEach(entry => {
        const key = entry.exerciseName || entry.exerciseId;
        exerciseCounts[key] = (exerciseCounts[key] || 0) + 1;
    });
    
    // Convert to array and sort by count
    const sortedExercises = Object.entries(exerciseCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
    
    return sortedExercises;
}

function getCategoryBreakdown() {
    const history = getHistory();
    const categoryCounts = {};
    
    // Count exercises by category
    history.forEach(entry => {
        // Find the exercise in the library to get its category
        const exercise = window.exerciseLibrary.find(ex => ex.id === entry.exerciseId);
        if (exercise) {
            const category = exercise.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
    });
    
    return categoryCounts;
}

// Monthly chart data functions
function getMonthlyData(monthOffset = 0) {
    const history = getHistory();
    const today = new Date();
    
    // Calculate target month
    const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get first day of calendar (might be from previous month)
    const calendarStart = new Date(firstDay);
    calendarStart.setDate(firstDay.getDate() - firstDay.getDay());
    
    // Get last day of calendar (might be from next month)
    const calendarEnd = new Date(lastDay);
    calendarEnd.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    // Group history by date
    const dailyHistory = {};
    history.forEach(entry => {
        if (!dailyHistory[entry.date]) {
            dailyHistory[entry.date] = [];
        }
        dailyHistory[entry.date].push(entry);
    });
    
    // Generate calendar data
    const calendarData = [];
    const currentDate = new Date(calendarStart);
    
    while (currentDate <= calendarEnd) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayHistory = dailyHistory[dateStr] || [];
        const exerciseCount = dayHistory.length;
        
        let status = 'empty';
        if (exerciseCount >= 3) {
            status = 'completed';
        } else if (exerciseCount > 0) {
            status = 'partial';
        }
        
        const isToday = dateStr === today.toISOString().split('T')[0];
        const isCurrentMonth = currentDate.getMonth() === month;
        const isFuture = currentDate > today;
        
        calendarData.push({
            date: dateStr,
            day: currentDate.getDate(),
            dayOfWeek: currentDate.getDay(),
            status: isFuture ? 'future' : status,
            exerciseCount: exerciseCount,
            isToday: isToday,
            isCurrentMonth: isCurrentMonth,
            isFuture: isFuture
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
        year: year,
        month: month,
        monthName: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        days: calendarData
    };
}

// Monthly chart data functions
function getMonthlyData(monthOffset = 0) {
    const history = getHistory();
    const today = new Date();
    
    // Calculate target month
    const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get first day of calendar (might be from previous month)
    const calendarStart = new Date(firstDay);
    calendarStart.setDate(firstDay.getDate() - firstDay.getDay());
    
    // Get last day of calendar (might be from next month)
    const calendarEnd = new Date(lastDay);
    calendarEnd.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    
    // Group history by date
    const dailyHistory = {};
    history.forEach(entry => {
        if (!dailyHistory[entry.date]) {
            dailyHistory[entry.date] = [];
        }
        dailyHistory[entry.date].push(entry);
    });
    
    // Generate calendar data
    const calendarData = [];
    const currentDate = new Date(calendarStart);
    
    while (currentDate <= calendarEnd) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayHistory = dailyHistory[dateStr] || [];
        const exerciseCount = dayHistory.length;
        
        let status = 'empty';
        if (exerciseCount >= 3) {
            status = 'completed';
        } else if (exerciseCount > 0) {
            status = 'partial';
        }
        
        const isToday = dateStr === today.toISOString().split('T')[0];
        const isCurrentMonth = currentDate.getMonth() === month;
        const isFuture = currentDate > today;
        
        calendarData.push({
            date: dateStr,
            day: currentDate.getDate(),
            dayOfWeek: currentDate.getDay(),
            status: isFuture ? 'future' : status,
            exerciseCount: exerciseCount,
            isToday: isToday,
            isCurrentMonth: isCurrentMonth,
            isFuture: isFuture
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
        year: year,
        month: month,
        monthName: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        days: calendarData
    };
}

// Make functions available globally
window.getHistory = getHistory;
window.saveHistory = saveHistory;
window.getTodayHistory = getTodayHistory;
window.addExerciseToHistory = addExerciseToHistory;
window.removeExerciseFromHistory = removeExerciseFromHistory;
window.calculateStreak = calculateStreak;
window.getWeekHistory = getWeekHistory;
window.getWeekActivityByDay = getWeekActivityByDay;
window.getTheme = getTheme;
window.setTheme = setTheme;
window.getTotalExercises = getTotalExercises;
window.getTotalDays = getTotalDays;
window.getLongestStreak = getLongestStreak;
window.getTopExercises = getTopExercises;
window.getCategoryBreakdown = getCategoryBreakdown;
window.getMonthlyData = getMonthlyData;