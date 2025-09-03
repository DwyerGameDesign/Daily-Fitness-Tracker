// UI rendering and event handling functions

let currentWeekOffset = 0;
let currentMonthOffset = 0;

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Render daily recommendations
function renderDailyRecommendations() {
    const recommendations = getDailyRecommendations();
    const todayHistory = getTodayHistory();
    const completedIds = todayHistory.map(entry => entry.exerciseId);
    
    // Update focus and inspiration message
    document.getElementById('daily-focus-text').textContent = recommendations.focus;
    document.getElementById('inspiration-message').textContent = recommendations.message;
    
    // Render recommended exercises
    const container = document.getElementById('recommended-exercises');
    container.innerHTML = '';
    
    recommendations.exercises.forEach(exercise => {
        const isCompleted = completedIds.includes(exercise.id);
        const exerciseCard = createRecommendedExerciseCard(exercise, isCompleted);
        container.appendChild(exerciseCard);
    });
}

// Create recommended exercise card
function createRecommendedExerciseCard(exercise, isCompleted) {
    const card = document.createElement('div');
    card.className = `recommended-exercise ${isCompleted ? 'completed' : ''}`;
    
    const icon = isCompleted ? '✅' : '⭐';
    
    card.innerHTML = `
        <div class="recommended-icon">${icon}</div>
        <div class="recommended-exercise-info">
            <div class="recommended-exercise-name">${exercise.name}</div>
            <div class="recommended-exercise-details">${exercise.description}</div>
        </div>
        <input type="checkbox" class="recommended-exercise-checkbox" 
               data-exercise-id="${exercise.id}" 
               data-exercise-name="${exercise.name}"
               ${isCompleted ? 'checked' : ''}>
    `;
    
    const checkbox = card.querySelector('.recommended-exercise-checkbox');
    checkbox.addEventListener('change', (event) => {
        handleRecommendedExerciseToggle(event, card);
    });
    
    return card;
}

// Handle recommended exercise completion toggle
function handleRecommendedExerciseToggle(event, card) {
    const checkbox = event.target;
    const exerciseId = checkbox.dataset.exerciseId;
    const exerciseName = checkbox.dataset.exerciseName;
    const icon = card.querySelector('.recommended-icon');
    
    if (checkbox.checked) {
        if (addExerciseToHistory(exerciseId, exerciseName)) {
            card.classList.add('completed');
            icon.textContent = '✅';
            showToast(`${exerciseName} completed! 💪`);
            updateUserInfo();
            // Also update the main exercises list to reflect completion
            renderExercises();
        }
    } else {
        if (removeExerciseFromHistory(exerciseId)) {
            card.classList.remove('completed');
            icon.textContent = '⭐';
            showToast(`${exerciseName} unchecked`);
            updateUserInfo();
            // Also update the main exercises list to reflect change
            renderExercises();
        }
    }
}

// Update user info display
function updateUserInfo() {
    // Update date display
    const today = new Date();
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', dateOptions);
    
    // Update streak
    const streak = calculateStreak();
    document.getElementById('streak-count').textContent = streak;
    
    // Update today's completion count
    const todayHistory = getTodayHistory();
    document.getElementById('completed-today').textContent = todayHistory.length;
    
    // Update goal indicator color
    const goalElement = document.querySelector('.goal-info');
    if (todayHistory.length >= 3) {
        goalElement.style.background = 'linear-gradient(135deg, var(--success-color), #20c997)';
        goalElement.style.borderColor = 'var(--success-color)';
    } else {
        goalElement.style.background = 'linear-gradient(135deg, var(--primary-color), #5aa3f0)';
        goalElement.style.borderColor = 'var(--primary-color)';
    }
}

// Render all exercises grouped by category
function renderExercises() {
    const container = document.getElementById('exercises-container');
    const todayHistory = getTodayHistory();
    const completedIds = todayHistory.map(entry => entry.exerciseId);
    
    // Group exercises by category
    const categories = {};
    window.exerciseLibrary.forEach(exercise => {
        if (!categories[exercise.category]) {
            categories[exercise.category] = [];
        }
        categories[exercise.category].push(exercise);
    });
    
    container.innerHTML = '';
    
    // Render each category
    Object.keys(categories).forEach(categoryName => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = categoryName;
        
        const exercisesGrid = document.createElement('div');
        exercisesGrid.className = 'exercises-grid';
        
        categories[categoryName].forEach(exercise => {
            const isCompleted = completedIds.includes(exercise.id);
            const exerciseCard = createExerciseCard(exercise, isCompleted);
            exercisesGrid.appendChild(exerciseCard);
        });
        
        categorySection.appendChild(categoryTitle);
        categorySection.appendChild(exercisesGrid);
        container.appendChild(categorySection);
    });
}

// Create individual exercise card
function createExerciseCard(exercise, isCompleted) {
    const card = document.createElement('div');
    card.className = `exercise-card ${isCompleted ? 'completed' : ''}`;
    
    card.innerHTML = `
        <div class="exercise-info">
            <div class="exercise-name">${exercise.name}</div>
            <div class="exercise-details">${exercise.description}</div>
        </div>
        <input type="checkbox" class="exercise-checkbox" 
               data-exercise-id="${exercise.id}" 
               data-exercise-name="${exercise.name}"
               ${isCompleted ? 'checked' : ''}>
    `;
    
    const checkbox = card.querySelector('.exercise-checkbox');
    checkbox.addEventListener('change', handleExerciseToggle);
    
    return card;
}

// Handle exercise completion toggle
function handleExerciseToggle(event) {
    const checkbox = event.target;
    const exerciseId = checkbox.dataset.exerciseId;
    const exerciseName = checkbox.dataset.exerciseName;
    const card = checkbox.closest('.exercise-card');
    
    if (checkbox.checked) {
        if (addExerciseToHistory(exerciseId, exerciseName)) {
            card.classList.add('completed');
            showToast(`${exerciseName} completed! 💪`);
            updateUserInfo();
            // Also update the recommended exercises if this exercise is in today's recommendations
            renderDailyRecommendations();
        }
    } else {
        if (removeExerciseFromHistory(exerciseId)) {
            card.classList.remove('completed');
            showToast(`${exerciseName} unchecked`);
            updateUserInfo();
            // Also update the recommended exercises if this exercise is in today's recommendations
            renderDailyRecommendations();
        }
    }
}

// History rendering functions
function renderHistory() {
    const container = document.getElementById('history-grid');
    const weekData = getWeekActivityByDay(currentWeekOffset);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    container.innerHTML = '';
    
    days.forEach(day => {
        const dayData = weekData[day];
        const dayCard = createHistoryDayCard(day, dayData);
        container.appendChild(dayCard);
    });
    
    updateWeekLabel();
}

function createHistoryDayCard(day, dayData) {
    const card = document.createElement('div');
    card.className = 'day-card';
    
    const dayDate = new Date(dayData.date);
    const today = new Date();
    const isToday = dayData.date === today.toISOString().split('T')[0];
    const isFuture = dayDate > today;
    
    card.innerHTML = `
        <div class="day-header">
            ${day} ${isToday ? '(Today)' : ''}
        </div>
        <div class="day-exercises">
            ${isFuture ? '<div class="future-day">Future</div>' : ''}
            ${!isFuture && dayData.count === 0 ? 
                '<div class="no-activity">No exercises</div>' : ''
            }
            ${dayData.exercises.map(exercise => `
                <div class="day-exercise">✅ ${exercise.exerciseName}</div>
            `).join('')}
        </div>
        <div class="day-summary">
            ${dayData.count} exercise${dayData.count !== 1 ? 's' : ''} completed
        </div>
    `;
    
    return card;
}

function updateWeekLabel() {
    const label = document.getElementById('current-week-label');
    const nextWeekBtn = document.getElementById('next-week');
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset * 7));
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const options = { month: 'short', day: 'numeric' };
    const dateRange = `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}`;
    
    let weekDescription = '';
    if (currentWeekOffset === 0) {
        weekDescription = 'This Week';
    } else if (currentWeekOffset === -1) {
        weekDescription = 'Last Week';
    } else if (currentWeekOffset < -1) {
        weekDescription = `${Math.abs(currentWeekOffset)} weeks ago`;
    }
    
    if (weekDescription) {
        label.innerHTML = `<div class="week-description">${weekDescription}</div><div class="week-dates">${dateRange}</div>`;
    } else {
        label.textContent = dateRange;
    }
    
    // Disable next week button if we're at current week
    if (currentWeekOffset >= 0) {
        nextWeekBtn.disabled = true;
        nextWeekBtn.style.opacity = '0.5';
        nextWeekBtn.style.cursor = 'not-allowed';
    } else {
        nextWeekBtn.disabled = false;
        nextWeekBtn.style.opacity = '1';
        nextWeekBtn.style.cursor = 'pointer';
    }
}

// Account statistics rendering
function renderAccountStats() {
    // Update overview stats
    document.getElementById('total-exercises').textContent = getTotalExercises();
    document.getElementById('total-days').textContent = getTotalDays();
    document.getElementById('current-streak-display').textContent = calculateStreak();
    document.getElementById('longest-streak').textContent = getLongestStreak();
    
    // Render top exercises
    renderTopExercises();
    
    // Render category breakdown
    renderCategoryBreakdown();
}

function renderTopExercises() {
    const container = document.getElementById('top-exercises');
    const topExercises = getTopExercises(10);
    
    container.innerHTML = '';
    
    if (topExercises.length === 0) {
        container.innerHTML = '<div class="no-activity">No exercises completed yet</div>';
        return;
    }
    
    topExercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.className = 'top-exercise-item';
        
        exerciseItem.innerHTML = `
            <div class="exercise-rank">#${index + 1}</div>
            <div class="exercise-info">
                <div class="exercise-name">${exercise.name}</div>
            </div>
            <div class="exercise-count">${exercise.count}×</div>
        `;
        
        container.appendChild(exerciseItem);
    });
}

function renderCategoryBreakdown() {
    const container = document.getElementById('category-breakdown');
    const categoryData = getCategoryBreakdown();
    
    container.innerHTML = '';
    
    if (Object.keys(categoryData).length === 0) {
        container.innerHTML = '<div class="no-activity">No exercises completed yet</div>';
        return;
    }
    
    Object.entries(categoryData).forEach(([category, count]) => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-stat';
        
        categoryItem.innerHTML = `
            <div class="category-name">${category}</div>
            <div class="category-count">${count}</div>
        `;
        
        container.appendChild(categoryItem);
    });
}

// Monthly chart rendering
function renderMonthlyChart() {
    const container = document.getElementById('monthly-chart');
    const monthData = getMonthlyData(currentMonthOffset);
    
    container.innerHTML = '';
    
    // Create header with day names
    const chartHeader = document.createElement('div');
    chartHeader.className = 'chart-header';
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = dayName;
        chartHeader.appendChild(dayHeader);
    });
    
    // Create calendar grid
    const chartGrid = document.createElement('div');
    chartGrid.className = 'chart-grid';
    
    monthData.days.forEach(dayData => {
        const dayElement = document.createElement('div');
        dayElement.className = `chart-day ${dayData.status}`;
        
        if (dayData.isToday) {
            dayElement.classList.add('today');
        }
        
        if (!dayData.isCurrentMonth) {
            dayElement.classList.add('other-month');
        }
        
        dayElement.textContent = dayData.day;
        dayElement.title = `${dayData.date}: ${dayData.exerciseCount} exercise${dayData.exerciseCount !== 1 ? 's' : ''}`;
        
        chartGrid.appendChild(dayElement);
    });
    
    container.appendChild(chartHeader);
    container.appendChild(chartGrid);
    
    updateMonthLabel();
}

function updateMonthLabel() {
    const label = document.getElementById('current-month-label');
    const nextMonthBtn = document.getElementById('next-month');
    const monthData = getMonthlyData(currentMonthOffset);
    
    let monthDescription = '';
    if (currentMonthOffset === 0) {
        monthDescription = 'This Month';
    } else if (currentMonthOffset === -1) {
        monthDescription = 'Last Month';
    } else if (currentMonthOffset < -1) {
        monthDescription = `${Math.abs(currentMonthOffset)} months ago`;
    } else if (currentMonthOffset > 0) {
        monthDescription = `${currentMonthOffset} month${currentMonthOffset > 1 ? 's' : ''} ahead`;
    }
    
    if (monthDescription) {
        label.innerHTML = `<div class="month-description">${monthDescription}</div><div class="month-dates">${monthData.monthName}</div>`;
    } else {
        label.textContent = monthData.monthName;
    }
    
    // Disable next month button if we're at current month or in the future
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const targetMonth = new Date(currentYear, currentMonth + currentMonthOffset + 1, 1);
    
    if (targetMonth.getMonth() > currentMonth || targetMonth.getFullYear() > currentYear) {
        nextMonthBtn.disabled = true;
        nextMonthBtn.style.opacity = '0.5';
        nextMonthBtn.style.cursor = 'not-allowed';
    } else {
        nextMonthBtn.disabled = false;
        nextMonthBtn.style.opacity = '1';
        nextMonthBtn.style.cursor = 'pointer';
    }
}

// Month navigation
function setupMonthNavigation() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    prevMonthBtn.addEventListener('click', () => {
        currentMonthOffset--;
        renderMonthlyChart();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        if (!nextMonthBtn.disabled) {
            currentMonthOffset++;
            renderMonthlyChart();
        }
    });
}

// Week navigation
function setupWeekNavigation() {
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    
    prevWeekBtn.addEventListener('click', () => {
        currentWeekOffset--;
        renderHistory();
    });
    
    nextWeekBtn.addEventListener('click', () => {
        if (currentWeekOffset < 0 && !nextWeekBtn.disabled) {
            currentWeekOffset++;
            renderHistory();
        }
    });
}

// Tab navigation
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
    
    if (tabName === 'weekly') {
        renderHistory();
    } else if (tabName === 'monthly') {
        renderMonthlyChart();
    } else if (tabName === 'account') {
        renderAccountStats();
    }
}

// Theme management
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = getTheme();
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (savedTheme === 'light' ? false : systemDark);
    
    setTheme(isDark ? 'dark' : 'light');
    updateThemeToggleButton(isDark);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        updateThemeToggleButton(newTheme === 'dark');
    });
}

function updateThemeToggleButton(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// Initialize UI
function initializeUI() {
    updateUserInfo();
    renderDailyRecommendations();
    renderExercises();
    setupTabs();
    setupWeekNavigation();
    setupMonthNavigation();
    setupTheme();
    
    console.log('UI initialized successfully');
}

// Make functions available globally
window.showToast = showToast;
window.updateUserInfo = updateUserInfo;
window.renderDailyRecommendations = renderDailyRecommendations;
window.renderExercises = renderExercises;
window.renderHistory = renderHistory;
window.renderAccountStats = renderAccountStats;
window.renderMonthlyChart = renderMonthlyChart;
window.initializeUI = initializeUI;
