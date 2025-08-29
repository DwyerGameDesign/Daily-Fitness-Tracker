// DOM building, rendering, and event handling

let currentDailyMissions = [];
let currentDailyStretches = [];
let currentWeekOffset = 0; // 0 = current week, -1 = last week, etc.

function initializeUI() {
    setupEventListeners();
    renderUserInfo();
    renderDailyMissions();
    renderDailyStretches();
    renderWeeklyPlan();
    renderSettings();
    
    // Listen for app render events
    document.addEventListener('app:render', () => {
        renderUserInfo();
        renderDailyMissions();
        renderDailyStretches();
        renderWeeklyPlan();
        updateStats();
    });
    
    console.log('UI initialized');
}

function setupEventListeners() {
    // Settings form
    setupSettingsListeners();
    
    // Data management
    setupDataManagementListeners();
    
    // Weekly planner
    setupWeeklyPlannerListeners();
}



function renderUserInfo() {
    const user = getUserProfile();
    const streak = calculateStreak();
    
    // Update date display
    const today = new Date();
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', dateOptions);
    
    // Update level and XP display
    document.getElementById('user-level').textContent = user.level || 1;
    document.getElementById('user-xp').textContent = user.xp || 0;
    document.getElementById('current-level').textContent = user.level || 1;
    
    // Update streak display
    document.getElementById('streak-count').textContent = streak;
}

function renderDailyMissions() {
    const container = document.getElementById('daily-missions');
    const todayHistory = getTodayHistory();
    
    // Get missions from storage or generate new ones for today
    let todayMissions = getTodayMissions();
    if (!todayMissions) {
        // Generate new missions for today
        todayMissions = selectDailyMissions();
        setTodayMissions(todayMissions);
    }
    currentDailyMissions = todayMissions;
    
    container.innerHTML = '';
    
    currentDailyMissions.forEach(mission => {
        const completedEntry = todayHistory.find(entry => 
            entry.type === 'mission' && entry.missionId === mission.id
        );
        const isCompleted = !!completedEntry;
        const completedDifficulty = completedEntry ? completedEntry.difficulty : null;
        
        const missionCard = createMissionCard(mission, isCompleted, completedDifficulty);
        container.appendChild(missionCard);
    });
}

// Generate difficulty-specific descriptions
function getDifficultyDescription(mission, difficulty) {
    // Debug logging
    console.log('=== getDifficultyDescription DEBUG ===');
    console.log('Mission ID:', mission.id);
    console.log('Mission name:', mission.name);
    console.log('Difficulty requested:', difficulty);
    console.log('Mission object:', mission);
    
    if (!mission.difficulties) {
        console.log('❌ ERROR: mission.difficulties is undefined/null');
        return `Complete ${mission.name}`;
    }
    
    console.log('✅ mission.difficulties exists:', mission.difficulties);
    
    if (!mission.difficulties[difficulty]) {
        console.log(`❌ ERROR: mission.difficulties['${difficulty}'] is undefined`);
        console.log('Available difficulties:', Object.keys(mission.difficulties));
        return `Complete ${mission.name}`;
    }
    
    const diff = mission.difficulties[difficulty];
    console.log(`✅ Found difficulty '${difficulty}':`, diff);
    
    if (!diff.description) {
        console.log('❌ ERROR: diff.description is undefined/empty');
        return `Complete ${mission.name}`;
    }
    
    console.log('✅ SUCCESS: Using description:', diff.description);
    console.log('=== END DEBUG ===');
    
    // Use the simplified description format
    return diff.description;
}

function renderDailyStretches() {
    const container = document.getElementById('daily-stretches');
    const todayHistory = getTodayHistory();
    
    // Get stretches from storage or generate new ones for today
    let todayStretches = getTodayStretches();
    if (!todayStretches) {
        // Generate new stretches for today
        todayStretches = selectDailyStretches();
        setTodayStretches(todayStretches);
    }
    currentDailyStretches = todayStretches;
    
    container.innerHTML = '';
    
    currentDailyStretches.forEach(stretch => {
        const isCompleted = todayHistory.some(entry => 
            entry.type === 'stretch' && entry.stretchId === stretch.id
        );
        
        const stretchCard = createStretchCard(stretch, isCompleted);
        container.appendChild(stretchCard);
    });
}

function createMissionCard(mission, isCompleted = false, completedDifficulty = null) {
    const card = document.createElement('div');
    card.className = `mission-card ${isCompleted ? 'completed' : ''}`;
    
    card.innerHTML = `
        <div class="mission-title">${mission.name}</div>
        <div class="mission-meta">
            <span>🎯 ${mission.category}</span>
        </div>
        <div class="mission-instructions">${mission.instructions || 'Complete the exercise as instructed.'}</div>
        
        ${mission.difficulties ? `
        <div class="difficulty-checkboxes">
            <label class="difficulty-option">
                <input type="checkbox" name="difficulty-${mission.id}" value="easy" 
                       data-mission-id="${mission.id}" data-difficulty="easy"
                       ${isCompleted && completedDifficulty === 'easy' ? 'checked' : ''}
                       ${isCompleted && completedDifficulty !== 'easy' ? 'disabled' : ''}>
                <span class="difficulty-label">${getDifficultyDescription(mission, 'easy')} <span class="xp-badge easy">⭐ ${mission.difficulties.easy.xp} XP</span></span>
            </label>
            <label class="difficulty-option">
                <input type="checkbox" name="difficulty-${mission.id}" value="moderate" 
                       data-mission-id="${mission.id}" data-difficulty="moderate"
                       ${isCompleted && completedDifficulty === 'moderate' ? 'checked' : ''}
                       ${isCompleted && completedDifficulty !== 'moderate' ? 'disabled' : ''}>
                <span class="difficulty-label">${getDifficultyDescription(mission, 'moderate')} <span class="xp-badge moderate">🔥 ${mission.difficulties.moderate.xp} XP</span></span>
            </label>
            <label class="difficulty-option">
                <input type="checkbox" name="difficulty-${mission.id}" value="advanced" 
                       data-mission-id="${mission.id}" data-difficulty="advanced"
                       ${isCompleted && completedDifficulty === 'advanced' ? 'checked' : ''}
                       ${isCompleted && completedDifficulty !== 'advanced' ? 'disabled' : ''}>
                <span class="difficulty-label">${getDifficultyDescription(mission, 'advanced')} <span class="xp-badge advanced">💥 ${mission.difficulties.advanced.xp} XP</span></span>
            </label>
        </div>` : `
        <div class="single-difficulty">
            <label class="difficulty-option">
                <input type="checkbox" data-mission-id="${mission.id}" data-difficulty="moderate"
                       ${isCompleted ? 'checked disabled' : ''}>
                <span class="difficulty-label">Complete <span class="xp-badge single">🎯 ${mission.xp || 10} XP</span></span>
            </label>
        </div>`}
        
        <div class="mission-actions">
            <span class="equipment-tags">
                ${mission.equipment.length > 0 ? 
                    mission.equipment.map(eq => `<span class="equipment-tag">${eq}</span>`).join(' ') : 
                    '<span class="equipment-tag">No equipment</span>'
                }
            </span>
        </div>
    `;
    
    // Add checkbox event listeners
    const checkboxes = card.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked && !card.classList.contains('completed')) {
                // Uncheck other checkboxes for this mission (only one difficulty at a time)
                checkboxes.forEach(cb => {
                    if (cb !== e.target) cb.checked = false;
                });
                
                const difficulty = e.target.dataset.difficulty;
                handleMissionComplete(mission, true, difficulty);
                
                // Disable unchecked checkboxes, keep the checked one enabled for visual appeal
                checkboxes.forEach(cb => {
                    if (cb !== e.target) {
                        cb.disabled = true;
                    }
                });
                card.classList.add('completed');
            } else if (card.classList.contains('completed')) {
                // Prevent unchecking completed missions
                e.target.checked = true;
            }
        });
    });
    
    return card;
}

function createStretchCard(stretch, isCompleted = false) {
    const card = document.createElement('div');
    card.className = `stretch-card ${isCompleted ? 'completed' : ''}`;
    
    card.innerHTML = `
        <div class="stretch-header">
            <div class="mission-title">${stretch.name}</div>
            <input type="checkbox" class="complete-checkbox" ${isCompleted ? 'checked' : ''} 
                   data-stretch-id="${stretch.id}">
        </div>
        <div class="mission-meta">
            <span>🧘 ${stretch.category}</span>
        </div>
        <div class="stretch-instructions">${stretch.instructions}</div>
        <div class="stretch-actions">
            <span class="xp-badge stretch">🧘 ${stretch.xp} XP</span>
        </div>
    `;
    
    // Add checkbox event listener
    const checkbox = card.querySelector('.complete-checkbox');
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked && !card.classList.contains('completed')) {
            handleStretchComplete(stretch, true);
            // Don't disable the checkbox, let it stay visually checked
            card.classList.add('completed');
        } else if (card.classList.contains('completed') || isCompleted) {
            // Prevent unchecking completed stretches
            e.target.checked = true;
        }
    });
    
    return card;
}

function handleMissionComplete(mission, isCompleted, difficulty = 'moderate') {
    if (isCompleted) {
        // Get mission data based on difficulty level
        const missionData = mission.difficulties ? mission.difficulties[difficulty] : { xp: mission.xp || 10, intensity: mission.intensity || 2 };
        
        // Add to history
        const entry = {
            type: 'mission',
            missionId: mission.id,
            name: mission.name,
            minutes: mission.minutes,
            intensity: missionData.intensity,
            xp: missionData.xp,
            category: mission.category,
            difficulty: difficulty
        };
        
        if (addHistoryEntry(entry)) {
            // Update user XP
            const user = getUserProfile();
            const newXP = user.xp + missionData.xp;
            const newLevel = Math.floor(newXP / 100) + 1;
            
            updateUserProfile({ 
                xp: newXP,
                level: newLevel
            });
            
            const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
            showToast(`${mission.name} completed (${difficultyText})! +${missionData.xp} XP`);
            playChime();
            
            // Check for level up
            if (newLevel > user.level) {
                showToast(`🎉 Level up! You're now level ${newLevel}!`);
            }
            
            // Update user info display
            renderUserInfo();
            
            // Update stats and check for new badges
            updateStats();
        }
    } else {
        // Remove from history (allow unchecking)
        // This is a simplified approach - in a real app you might want more sophisticated undo
        showToast('Mission unchecked', 'error');
    }
}

function handleStretchComplete(stretch, isCompleted) {
    if (isCompleted) {
        // Add to history
        const entry = {
            type: 'stretch',
            stretchId: stretch.id,
            name: stretch.name,
            minutes: stretch.minutes,
            intensity: stretch.intensity,
            xp: stretch.xp,
            category: stretch.category
        };
        
        if (addHistoryEntry(entry)) {
            // Update user XP
            const user = getUserProfile();
            const newXP = user.xp + stretch.xp;
            const newLevel = Math.floor(newXP / 100) + 1;
            
            updateUserProfile({ 
                xp: newXP,
                level: newLevel
            });
            
            showToast(`Stretch completed! +${stretch.xp} XP 🧘`);
            playChime();
            
            // Check for level up
            if (newLevel > user.level) {
                showToast(`🎉 Level up! You're now level ${newLevel}!`);
            }
            
            // Re-render stretch card as completed
            const stretchCard = document.querySelector(`[data-stretch-id="${stretch.id}"]`).closest('.stretch-card');
            stretchCard.classList.add('completed');
            
            // Update user info display
            renderUserInfo();
            
            // Update stats and check for new badges
            updateStats();
        }
    } else {
        // Remove from history (allow unchecking)
        // This is a simplified approach - in a real app you might want more sophisticated undo
        showToast('Stretch unchecked', 'error');
    }
}

function renderWeeklyPlan() {
    const container = document.getElementById('weekly-plan');
    const weekData = getWeekActivityByDay(currentWeekOffset);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    container.innerHTML = '';
    
    let totalWeekMinutes = 0;
    
    days.forEach(day => {
        const dayData = weekData[day];
        const dayCard = createHistoryDayCard(day, dayData);
        container.appendChild(dayCard);
        
        totalWeekMinutes += dayData.totalMinutes;
    });
    
    // Update week label
    updateWeekLabel();
}

function createHistoryDayCard(day, dayData) {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.dataset.day = day;
    
    // Format the date for display
    const dayDate = new Date(dayData.date);
    const today = new Date();
    const isToday = dayData.date === today.toISOString().split('T')[0];
    const isFuture = dayDate > today;
    
    card.innerHTML = `
        <div class="day-header">
            <div>${day} ${isToday ? '(Today)' : ''}</div>
            <div class="day-total">${dayData.totalMinutes} min</div>
        </div>
        <div class="day-activities">
            ${isFuture ? '<div class="future-day">Future</div>' : ''}
            ${!isFuture && dayData.totalMissions === 0 && dayData.totalStretches === 0 ? 
                '<div class="no-activity">No activities</div>' : ''
            }
            ${dayData.missions.map(mission => `
                <div class="day-activity completed-mission">
                    ✅ ${mission.name}
                    ${mission.difficulty ? ` (${mission.difficulty})` : ''}
                    <span class="xp-earned">+${mission.xp} XP</span>
                </div>
            `).join('')}
            ${dayData.totalStretches > 0 ? `
                <div class="day-activity completed-stretches">
                    🧘 ${dayData.totalStretches} stretch${dayData.totalStretches > 1 ? 'es' : ''} completed
                    <span class="xp-earned">+${dayData.stretches.reduce((sum, s) => sum + (s.xp || 0), 0)} XP</span>
                </div>
            ` : ''}
        </div>
        <div class="day-summary">
            <small>${dayData.totalMissions} mission${dayData.totalMissions !== 1 ? 's' : ''} • ${dayData.totalStretches} stretch${dayData.totalStretches !== 1 ? 'es' : ''} • ${dayData.totalXP} XP</small>
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
    
    // Format date range
    const options = { month: 'short', day: 'numeric' };
    const dateRange = `${weekStart.toLocaleDateString('en-US', options)} - ${weekEnd.toLocaleDateString('en-US', options)}`;
    
    // Add descriptive text for current and recent weeks
    let weekDescription = '';
    if (currentWeekOffset === 0) {
        weekDescription = 'This Week';
    } else if (currentWeekOffset === -1) {
        weekDescription = 'Last Week';
    } else if (currentWeekOffset < -1) {
        weekDescription = `${Math.abs(currentWeekOffset)} weeks ago`;
    }
    
    // Combine description and date range
    if (weekDescription) {
        label.innerHTML = `<div class="week-description">${weekDescription}</div><div class="week-dates">${dateRange}</div>`;
    } else {
        label.textContent = dateRange;
    }
    
    // Disable next week button if we're at current week (can't go to future)
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



function setupWeeklyPlannerListeners() {
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    
    prevWeekBtn.addEventListener('click', () => {
        currentWeekOffset--;
        renderWeeklyPlan();
    });
    
    nextWeekBtn.addEventListener('click', () => {
        // Don't allow viewing future weeks beyond current week
        if (currentWeekOffset < 0 && !nextWeekBtn.disabled) {
            currentWeekOffset++;
            renderWeeklyPlan();
        }
    });
}

function renderSettings() {
    const user = getUserProfile();
    const settings = getSettings();
    
    // Populate form fields
    document.getElementById('user-age').value = user.age || '';
    document.getElementById('user-height').value = user.height || '';
    document.getElementById('user-weight').value = user.weight || '';
    document.getElementById('user-equipment').value = (user.equipment || []).join(', ');
    
    // Settings checkboxes
    document.getElementById('sound-enabled').checked = settings.soundEnabled || false;
    document.getElementById('dark-mode').checked = settings.darkMode || false;
}

function setupSettingsListeners() {
    // Profile updates
    const profileFields = ['user-age', 'user-height', 'user-weight', 'user-equipment'];
    profileFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('change', handleProfileUpdate);
    });
    
    // Settings checkboxes
    document.getElementById('sound-enabled').addEventListener('change', (e) => {
        const settings = getSettings();
        settings.soundEnabled = e.target.checked;
        setSettings(settings);
        window.soundEnabled = e.target.checked;
        
        // Update header toggle
        document.getElementById('sound-toggle').textContent = e.target.checked ? '🔊' : '🔇';
    });
    
    document.getElementById('dark-mode').addEventListener('change', (e) => {
        const settings = getSettings();
        settings.darkMode = e.target.checked;
        setSettings(settings);
        
        // Apply theme
        document.documentElement.dataset.theme = e.target.checked ? 'dark' : 'light';
        document.getElementById('theme-toggle').textContent = e.target.checked ? '☀️' : '🌙';
    });
}

function handleProfileUpdate(event) {
    const field = event.target;
    const user = getUserProfile();
    
    switch (field.id) {
        case 'user-age':
            user.age = parseInt(field.value) || user.age;
            break;
        case 'user-height':
            user.height = parseInt(field.value) || user.height;
            break;
        case 'user-weight':
            user.weight = parseInt(field.value) || user.weight;
            break;
        case 'user-equipment':
            user.equipment = field.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            break;
    }
    
    updateUserProfile(user);
    showToast('Profile updated');
}

function setupDataManagementListeners() {
    // Export data
    document.getElementById('export-data').addEventListener('click', () => {
        const data = exportAllData();
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `fitness-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Data exported successfully!');
        } else {
            showToast('Failed to export data', 'error');
        }
    });
    
    // Import data
    document.getElementById('import-data').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });
    
    document.getElementById('import-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (importAllData(event.target.result)) {
                    showToast('Data imported successfully!');
                    // Re-render everything
                    renderUserInfo();
                    renderDailyMissions();
                    renderWeeklyPlan();
                    renderSettings();
                    updateStats();
                } else {
                    showToast('Failed to import data. Please check the file format.', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    // Reset app
    document.getElementById('reset-app').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
            if (resetAllData()) {
                showToast('App reset successfully!');
                // Re-render everything
                renderUserInfo();
                renderDailyMissions();
                renderWeeklyPlan();
                renderSettings();
                updateStats();
            } else {
                showToast('Failed to reset app', 'error');
            }
        }
    });
}



// Utility functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}



// All functions are now globally available