// Statistics calculation and canvas chart rendering

// Calculate current streak
function calculateStreak() {
    const history = getHistory();
    if (history.length === 0) return 0;
    
    // Group history by date and check completion
    const dailyActivity = {};
    history.forEach(entry => {
        const date = entry.date;
        if (!dailyActivity[date]) {
            dailyActivity[date] = { missions: 0, totalMinutes: 0 };
        }
        
        if (entry.type === 'mission') {
            dailyActivity[date].missions++;
        }
        dailyActivity[date].totalMinutes += entry.minutes || 0;
    });
    
    // Calculate streak from today backwards
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) { // Max 365 day streak
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        const dayData = dailyActivity[dateStr];
        const isDayComplete = dayData && (dayData.missions > 0 || dayData.totalMinutes >= 15);
        
        if (isDayComplete) {
            streak++;
        } else {
            break; // Streak broken
        }
    }
    
    return streak;
}

// Calculate weekly minutes for last 4 weeks
function getWeeklyMinutes() {
    const history = getHistory();
    const weeklyData = [];
    const today = new Date();
    
    for (let week = 0; week < 4; week++) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - (week * 7) - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        const weekMinutes = history
            .filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= weekStart && entryDate <= weekEnd;
            })
            .reduce((sum, entry) => sum + (entry.minutes || 0), 0);
        
        weeklyData.unshift({
            week: `Week ${4 - week}`,
            minutes: weekMinutes,
            startDate: weekStart.toISOString().split('T')[0]
        });
    }
    
    return weeklyData;
}

// Get monthly heatmap data
function getMonthlyHeatmap() {
    const history = getHistory();
    const today = new Date();
    const heatmapData = [];
    
    // Get current month data (35 days to fill 5x7 grid)
    for (let i = 34; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayEntries = history.filter(entry => entry.date === dateStr);
        const missions = dayEntries.filter(entry => entry.type === 'mission').length;
        const totalMinutes = dayEntries.reduce((sum, entry) => sum + (entry.minutes || 0), 0);
        
        let status = 'inactive';
        if (missions > 0 || totalMinutes >= 15) {
            status = missions >= 2 ? 'active' : 'partial';
        }
        
        heatmapData.push({
            date: dateStr,
            day: date.getDay(),
            status: status,
            missions: missions,
            minutes: totalMinutes
        });
    }
    
    return heatmapData;
}

// Update all statistics and charts
function updateStats() {
    const history = getHistory();
    const thisWeekMinutes = getCurrentWeekMinutes();
    const missionsCompleted = history.filter(entry => entry.type === 'mission').length;
    
    // Update stat displays
    document.getElementById('week-total-minutes').textContent = thisWeekMinutes;
    document.getElementById('missions-completed').textContent = missionsCompleted;
    
    // Update charts
    renderWeeklyChart();
    renderStreakChart();
    renderHeatmap();
    renderBadges();
    renderAchievements();
    
    // Check for new badges and achievements
    checkBadgeProgress();
}

function getCurrentWeekMinutes() {
    const history = getHistory();
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of current week
    weekStart.setHours(0, 0, 0, 0);
    
    return history
        .filter(entry => new Date(entry.date) >= weekStart)
        .reduce((sum, entry) => sum + (entry.minutes || 0), 0);
}

// Render weekly minutes bar chart
function renderWeeklyChart() {
    const canvas = document.getElementById('weekly-chart');
    const ctx = canvas.getContext('2d');
    const weeklyData = getWeeklyMinutes();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Find max value for scaling
    const maxMinutes = Math.max(...weeklyData.map(w => w.minutes), 100);
    const barWidth = chartWidth / weeklyData.length * 0.8;
    const barSpacing = chartWidth / weeklyData.length * 0.2;
    
    // Set style
    ctx.fillStyle = '#4a90e2';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    
    // Draw bars and labels
    weeklyData.forEach((week, index) => {
        const barHeight = (week.minutes / maxMinutes) * chartHeight;
        const x = padding + (index * (barWidth + barSpacing));
        const y = canvas.height - padding - barHeight;
        
        // Draw bar
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#666';
        ctx.fillText(week.week, x + barWidth/2, canvas.height - 10);
        ctx.fillText(`${week.minutes}m`, x + barWidth/2, y - 5);
        ctx.fillStyle = '#4a90e2';
    });
    
    // Draw axes
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
}

// Render 4-week streak line chart
function renderStreakChart() {
    const canvas = document.getElementById('streak-chart');
    const ctx = canvas.getContext('2d');
    
    // Calculate daily streak data for last 28 days
    const streakData = [];
    const today = new Date();
    
    for (let i = 27; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Calculate streak as of this date
        let dayStreak = 0;
        for (let j = 0; j <= i; j++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - j);
            const checkDateStr = checkDate.toISOString().split('T')[0];
            
            const history = getHistory();
            const dayEntries = history.filter(entry => entry.date === checkDateStr);
            const missions = dayEntries.filter(entry => entry.type === 'mission').length;
            const totalMinutes = dayEntries.reduce((sum, entry) => sum + (entry.minutes || 0), 0);
            
            if (missions > 0 || totalMinutes >= 15) {
                dayStreak++;
            } else {
                break;
            }
        }
        
        streakData.push({
            date: dateStr,
            streak: dayStreak,
            day: 27 - i
        });
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - (padding * 2);
    
    // Find max streak for scaling
    const maxStreak = Math.max(...streakData.map(d => d.streak), 5);
    
    // Draw line
    ctx.strokeStyle = '#7b68ee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    streakData.forEach((point, index) => {
        const x = padding + (index / (streakData.length - 1)) * chartWidth;
        const y = canvas.height - padding - (point.streak / maxStreak) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#7b68ee';
    streakData.forEach((point, index) => {
        const x = padding + (index / (streakData.length - 1)) * chartWidth;
        const y = canvas.height - padding - (point.streak / maxStreak) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw axes
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Add labels
    ctx.fillStyle = '#666';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Streak Length', 5, 20);
    ctx.textAlign = 'right';
    ctx.fillText('Last 4 Weeks', canvas.width - 5, canvas.height - 5);
}

// Render activity heatmap
function renderHeatmap() {
    const container = document.getElementById('activity-heatmap');
    const heatmapData = getMonthlyHeatmap();
    
    container.innerHTML = '';
    
    heatmapData.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = `heatmap-day ${day.status}`;
        dayElement.title = `${day.date}: ${day.missions} missions, ${day.minutes} minutes`;
        container.appendChild(dayElement);
    });
}

// Render earned badges only
function renderBadges() {
    const container = document.getElementById('badges-container');
    const earnedBadges = getBadges();
    
    // Update badge stats if elements exist (only on badges tab)
    const earnedCountEl = document.getElementById('badges-earned-count');
    const totalCountEl = document.getElementById('badges-total-count');
    const completionEl = document.getElementById('badges-completion');
    
    if (earnedCountEl && totalCountEl && completionEl) {
        const earnedBadgeCount = earnedBadges.length;
        const totalBadgeCount = badgeDefinitions.length;
        const completion = totalBadgeCount > 0 ? Math.round((earnedBadgeCount / totalBadgeCount) * 100) : 0;
        
        earnedCountEl.textContent = earnedBadgeCount;
        totalCountEl.textContent = totalBadgeCount;
        completionEl.textContent = `${completion}%`;
    }
    
    container.innerHTML = '';
    
    // Render badges
    badgeDefinitions.forEach(badge => {
        const isEarned = earnedBadges.some(earned => earned.id === badge.id);
        
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge ${isEarned ? 'earned' : ''}`;
        
        badgeElement.innerHTML = `
            <div class="badge-icon">${isEarned ? badge.icon : '🔒'}</div>
            <div class="badge-name">${badge.name}</div>
            <div class="badge-description">${badge.description}</div>
        `;
        
        container.appendChild(badgeElement);
    });
}

// Render achievements with progress tracking
function renderAchievements() {
    const container = document.getElementById('achievements-container');
    const earnedAchievements = getAchievements();
    

    
    container.innerHTML = '';
    
    // Render achievements with enhanced progress display
    achievementDefinitions.forEach(achievement => {
        const currentLevel = getAchievementLevel(achievement.id);
        const maxLevel = achievement.levels.length;
        const isCompleted = currentLevel >= maxLevel;
        
        const achievementElement = document.createElement('div');
        let cardClasses = 'achievement-card';
        
        // Add level-based styling
        if (currentLevel === 0) {
            cardClasses += ' level-beginner';
        } else if (currentLevel >= 1 && currentLevel <= 3) {
            cardClasses += ' level-beginner';
        } else if (currentLevel >= 4 && currentLevel <= 6) {
            cardClasses += ' level-intermediate';
        } else if (currentLevel >= 7 && currentLevel <= 8) {
            cardClasses += ' level-advanced';
        } else if (currentLevel === 9) {
            cardClasses += ' level-elite';
        } else if (currentLevel >= 10) {
            cardClasses += ' level-legendary';
        }
        
        if (currentLevel > 0) cardClasses += ' earned';
        if (isCompleted) cardClasses += ' mastered';
        achievementElement.className = cardClasses;
        
        let levelInfo = '';
        let requirementText = '';
        let progressPercent = 0;
        let progressBarClass = '';
        let tierBadge = '';
        let currentProgress = 0;
        let requiredAmount = 0;
        
        // Determine tier name
        if (currentLevel === 0) {
            tierBadge = 'LOCKED';
        } else if (currentLevel >= 1 && currentLevel <= 3) {
            tierBadge = 'BEGINNER';
        } else if (currentLevel >= 4 && currentLevel <= 6) {
            tierBadge = 'INTERMEDIATE';
        } else if (currentLevel >= 7 && currentLevel <= 8) {
            tierBadge = 'ADVANCED';
        } else if (currentLevel === 9) {
            tierBadge = 'ELITE';
        } else if (currentLevel >= 10) {
            tierBadge = 'LEGENDARY';
        }
        
        if (isCompleted) {
            levelInfo = `<span class="achievement-current-level">MASTERED</span>`;
            requirementText = '<div class="achievement-mastered">🌟 All levels complete! 🌟</div>';
            progressPercent = 100;
            progressBarClass = 'mastered';
            currentProgress = '∞';
            requiredAmount = '∞';
        } else {
            // Get the next level requirement
            const targetLevel = currentLevel < maxLevel ? currentLevel : maxLevel - 1;
            const nextLevelData = achievement.levels[targetLevel];
            const requirement = nextLevelData.requirement;
            
            // Get current progress toward this requirement
            currentProgress = getCurrentProgress(requirement.type, requirement);
            requiredAmount = requirement.value;
            
            // Calculate progress percentage toward next level (not overall completion)
            progressPercent = Math.min((currentProgress / requiredAmount) * 100, 100);
            
            levelInfo = ``; // Remove level info from main content
            requirementText = `<div class="achievement-requirement">${formatRequirementText(requirement)}</div>`;
            
            if (progressPercent >= 100) {
                progressBarClass = 'ready-to-level';
            }
        }
        
        achievementElement.innerHTML = `
            <div class="achievement-tier-badge">${tierBadge}</div>
            <div class="achievement-level-badge">${currentLevel > 0 ? currentLevel : '?'}</div>
            <div class="achievement-header">
                <div class="achievement-icon">${currentLevel > 0 ? achievement.icon : '🔒'}</div>
                <div class="achievement-name">${achievement.name}</div>
            </div>
            
            <div class="achievement-progress-section">
                ${requirementText}
                
                <div class="achievement-progress-bar">
                    <div class="achievement-progress-fill ${progressBarClass}" style="width: ${progressPercent}%"></div>
                </div>
                <div class="achievement-progress-text">${currentProgress}/${requiredAmount}</div>
            </div>
        `;
        
        container.appendChild(achievementElement);
    });
}

// Helper function to get current progress toward achievement requirement
function getCurrentProgress(requirementType, requirementData) {
    const history = getHistory();
    const currentStreak = calculateStreak();
    
    switch (requirementType) {
        case 'streak':
            return currentStreak;
            
        case 'missions-total':
            return history.filter(entry => entry.type === 'mission').length;
            
        case 'stretches-total':
            return history.filter(entry => entry.type === 'stretch').length;
            
        case 'category':
            return history.filter(entry => 
                entry.category === requirementData.category
            ).length;
            
        case 'level':
            const user = JSON.parse(localStorage.getItem('ft_user') || '{}');
            return user.level || 1;
            
        case 'total-xp':
            const userXP = JSON.parse(localStorage.getItem('ft_user') || '{}');
            return userXP.xp || 0;
            
        default:
            return 0;
    }
}

// Helper function to format requirement text
function formatRequirementText(requirement) {
    switch (requirement.type) {
        case 'streak':
            return `Maintain ${requirement.value} day streak`;
            
        case 'missions-total':
            return `Complete ${requirement.value} missions`;
            
        case 'stretches-total':
            return `Complete ${requirement.value} stretching sessions`;
            
        case 'category':
            const categoryName = requirement.category.replace('&', 'and');
            return `Complete ${requirement.value} ${categoryName.toLowerCase()} workouts`;
            
        case 'level':
            return `Reach level ${requirement.value}`;
            
        case 'total-xp':
            return `Earn ${requirement.value.toLocaleString()} XP`;
            
        case 'advanced-mission':
            return `Complete specific mission on advanced difficulty`;
            
        default:
            return 'Complete requirement';
    }
}

// Check badge progress and award new badges and achievements
function checkBadgeProgress() {
    const history = getHistory();
    const currentStreak = calculateStreak();
    const earnedBadges = getBadges();
    
    // Check one-time badges
    badgeDefinitions.forEach(badge => {
        // Skip already earned badges
        if (earnedBadges.some(earned => earned.id === badge.id)) {
            return;
        }
        
        let shouldEarnBadge = false;
        
        switch (badge.requirement.type) {
            case 'streak':
                shouldEarnBadge = currentStreak >= badge.requirement.value;
                break;
                
            case 'missions-total':
                const missionCount = history.filter(entry => entry.type === 'mission').length;
                shouldEarnBadge = missionCount >= badge.requirement.value;
                break;
                
            case 'category':
                const categoryCount = history.filter(entry => 
                    entry.category === badge.requirement.category
                ).length;
                shouldEarnBadge = categoryCount >= badge.requirement.value;
                break;
                
            case 'level':
                const user = JSON.parse(localStorage.getItem('ft_user') || '{}');
                shouldEarnBadge = (user.level || 1) >= badge.requirement.value;
                break;
                
            case 'total-xp':
                const userXP = JSON.parse(localStorage.getItem('ft_user') || '{}');
                shouldEarnBadge = (userXP.xp || 0) >= badge.requirement.value;
                break;
                
            case 'weekend':
                // Count weekend activities (simplified)
                const weekendCount = history.filter(entry => {
                    const entryDate = new Date(entry.date);
                    return entryDate.getDay() === 0 || entryDate.getDay() === 6;
                }).length;
                shouldEarnBadge = weekendCount >= badge.requirement.value;
                break;
                
            case 'weekly-consistency':
                // This badge type is not currently used
                shouldEarnBadge = false;
                break;
                
            case 'variety':
                // Check if user has tried all 4 exercise categories
                const categoriesTried = new Set(history.map(entry => entry.category));
                shouldEarnBadge = categoriesTried.size >= badge.requirement.value;
                break;
                
            case 'multi-category-day':
                // Check if user did multiple categories in one day
                shouldEarnBadge = checkMultiCategoryDay(history, badge.requirement.value);
                break;
                
            case 'multi-category-total':
                // Total workouts across all categories
                shouldEarnBadge = history.length >= badge.requirement.value;
                break;
                
            case 'time-based':
                shouldEarnBadge = checkTimeBasedRequirement(history, badge.requirement.condition, badge.requirement.value);
                break;
                
            case 'weekly-day-streak':
                shouldEarnBadge = checkWeeklyDayStreak(history, badge.requirement.day, badge.requirement.value);
                break;
                
            case 'quick-sessions':
                const quickSessions = history.filter(entry => entry.minutes < 10).length;
                shouldEarnBadge = quickSessions >= badge.requirement.value;
                break;
                
            case 'long-sessions':
                const longSessions = history.filter(entry => entry.minutes > 45).length;
                shouldEarnBadge = longSessions >= badge.requirement.value;
                break;
                
            case 'perfect-week':
                shouldEarnBadge = checkPerfectWeek(history);
                break;
                
            case 'comeback':
                shouldEarnBadge = checkComeback(history, badge.requirement.value);
                break;
                
            case 'advanced-mission':
                // Check if user has completed this specific mission on advanced difficulty
                const advancedMissionCount = history.filter(entry => 
                    entry.missionId === badge.requirement.missionId && 
                    entry.difficulty === 'advanced'
                ).length;
                shouldEarnBadge = advancedMissionCount >= badge.requirement.value;
                break;
        }
        
        if (shouldEarnBadge) {
            if (addBadge(badge.id)) {
                // Show badge earned notification
                const toast = document.getElementById('toast');
                toast.innerHTML = `🏆 Badge Earned: ${badge.name}!`;
                toast.className = 'toast show';
                setTimeout(() => toast.classList.remove('show'), 4000);
            }
        }
    });
    
    // Check multi-level achievements
    achievementDefinitions.forEach(achievement => {
        const currentLevel = getAchievementLevel(achievement.id);
        
        // Check each level to see if we can advance
        for (let levelIndex = currentLevel; levelIndex < achievement.levels.length; levelIndex++) {
            const levelData = achievement.levels[levelIndex];
            const targetLevel = levelIndex + 1;
            
            let shouldEarnLevel = false;
            
            switch (levelData.requirement.type) {
                case 'streak':
                    shouldEarnLevel = currentStreak >= levelData.requirement.value;
                    break;
                    
                case 'missions-total':
                    const missionCount = history.filter(entry => entry.type === 'mission').length;
                    shouldEarnLevel = missionCount >= levelData.requirement.value;
                    break;
                    
                case 'stretches-total':
                    const stretchCount = history.filter(entry => entry.type === 'stretch').length;
                    shouldEarnLevel = stretchCount >= levelData.requirement.value;
                    break;
                    
                case 'category':
                    const categoryCount = history.filter(entry => 
                        entry.category === levelData.requirement.category
                    ).length;
                    shouldEarnLevel = categoryCount >= levelData.requirement.value;
                    break;
                    
                case 'level':
                    const user = JSON.parse(localStorage.getItem('ft_user') || '{}');
                    shouldEarnLevel = (user.level || 1) >= levelData.requirement.value;
                    break;
                    
                case 'total-xp':
                    const userXP = JSON.parse(localStorage.getItem('ft_user') || '{}');
                    shouldEarnLevel = (userXP.xp || 0) >= levelData.requirement.value;
                    break;
            }
            
            if (shouldEarnLevel && updateAchievementLevel(achievement.id, targetLevel)) {
                // Show achievement level earned notification
                const toast = document.getElementById('toast');
                toast.innerHTML = `⭐ Level ${targetLevel} Achieved: ${achievement.name} - ${levelData.title}!`;
                toast.className = 'toast show';
                setTimeout(() => toast.classList.remove('show'), 4000);
                break; // Only advance one level at a time
            } else {
                break; // Stop checking higher levels if this one isn't met
            }
        }
    });
}

// Helper functions for badge checking






function checkMultiCategoryDay(history, categoriesRequired) {
    // Group activities by date
    const dailyActivities = {};
    
    history.forEach(entry => {
        const dateKey = entry.date;
        if (!dailyActivities[dateKey]) {
            dailyActivities[dateKey] = new Set();
        }
        dailyActivities[dateKey].add(entry.category);
    });
    
    // Check if any day has the required number of different categories
    return Object.values(dailyActivities).some(categories => categories.size >= categoriesRequired);
}

function checkTimeBasedRequirement(history, condition, valueRequired) {
    let count = 0;
    
    history.forEach(entry => {
        if (entry.timestamp) {
            const hour = new Date(entry.timestamp).getHours();
            let conditionMet = false;
            
            switch (condition) {
                case 'before-9am':
                    conditionMet = hour < 9;
                    break;
                case 'midday':
                    conditionMet = hour >= 12 && hour <= 14;
                    break;
                case 'after-9pm':
                    conditionMet = hour >= 21;
                    break;
            }
            
            if (conditionMet) {
                count++;
            }
        }
    });
    
    return count >= valueRequired;
}

function checkWeeklyDayStreak(history, targetDay, streakRequired) {
    // Get activities for specific day of week
    const dayNumber = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(targetDay);
    
    const targetDayActivities = history.filter(entry => {
        const date = new Date(entry.date);
        return date.getDay() === dayNumber;
    }).map(entry => entry.date).sort();
    
    // Check for consecutive weeks
    if (targetDayActivities.length === 0) return false;
    
    let consecutiveWeeks = 1;
    let maxConsecutiveWeeks = 1;
    
    for (let i = 1; i < targetDayActivities.length; i++) {
        const prevDate = new Date(targetDayActivities[i - 1]);
        const currDate = new Date(targetDayActivities[i]);
        const daysDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
        
        if (daysDiff === 7) {
            consecutiveWeeks++;
            maxConsecutiveWeeks = Math.max(maxConsecutiveWeeks, consecutiveWeeks);
        } else {
            consecutiveWeeks = 1;
        }
    }
    
    return maxConsecutiveWeeks >= streakRequired;
}

function checkPerfectWeek(history) {
    // This is a simplified version - just check if user had activity 7 days in a row
    return calculateStreak() >= 7;
}

function checkComeback(history, daysGap) {
    // Check if user returned after a gap of specified days
    if (history.length < 2) return false;
    
    const sortedDates = history.map(entry => new Date(entry.date)).sort((a, b) => a - b);
    
    for (let i = 1; i < sortedDates.length; i++) {
        const daysDiff = (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
        if (daysDiff >= daysGap) {
            return true;
        }
    }
    
    return false;
}

// All functions are now globally available