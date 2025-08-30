// Main app bootstrap

class FitnessTracker {
    constructor() {
        this.currentTab = 'today';
        this.init();
    }

    async init() {
        try {
            // Initialize all modules
            await initializeStorage();
            initializeSound();
            initializeUI();
            
            // Set up tab navigation
            this.setupTabs();
            
            // Set up theme toggle
            this.setupTheme();
            
            // Set up sound toggle
            this.setupSoundToggle();
            
            // Initial render
            this.render();
            
            console.log('FitnessTracker initialized successfully');
        } catch (error) {
            console.error('Failed to initialize FitnessTracker:', error);
        }
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });
        
        this.currentTab = tabName;
        
        // Re-render when switching to certain tabs
        if (tabName === 'progress') {
            updateStats();
        } else if (tabName === 'badges') {
            renderBadges();
        } else if (tabName === 'achievements') {
            renderAchievements();
        } else if (tabName === 'planner') {
            renderWeeklyPlan();
        }
        
        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('tab', tabName);
        window.history.replaceState({}, '', url);
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const settings = JSON.parse(localStorage.getItem('ft_settings') || '{}');
        
        // Apply saved theme or system preference
        const savedTheme = settings.darkMode;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme !== undefined ? savedTheme : systemDark;
        
        this.setTheme(isDark);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme === 'dark');
        });
    }

    setTheme(isDark) {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        
        // Save preference
        const settings = JSON.parse(localStorage.getItem('ft_settings') || '{}');
        settings.darkMode = isDark;
        localStorage.setItem('ft_settings', JSON.stringify(settings));
    }

    setupSoundToggle() {
        const soundToggle = document.getElementById('sound-toggle');
        const settings = JSON.parse(localStorage.getItem('ft_settings') || '{}');
        
        // Default to muted
        const isMuted = settings.soundEnabled !== true;
        this.setSoundState(!isMuted);
        
        soundToggle.addEventListener('click', () => {
            const currentlyMuted = soundToggle.textContent === '🔇';
            this.setSoundState(currentlyMuted);
        });
    }

    setSoundState(enabled) {
        const soundToggle = document.getElementById('sound-toggle');
        soundToggle.textContent = enabled ? '🔊' : '🔇';
        
        // Save preference
        const settings = JSON.parse(localStorage.getItem('ft_settings') || '{}');
        settings.soundEnabled = enabled;
        localStorage.setItem('ft_settings', JSON.stringify(settings));
        
        // Update sound module
        window.soundEnabled = enabled;
    }

    render() {
        // Initial render of UI components
        const event = new CustomEvent('app:render');
        document.dispatchEvent(event);
        
        // Display random inspiring quote
        this.displayRandomQuote();
        
        // Check URL for tab parameter
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        if (tabParam && ['today', 'planner', 'progress', 'badges', 'achievements', 'settings'].includes(tabParam)) {
            this.switchTab(tabParam);
        }
    }

    displayRandomQuote() {
        const quoteElement = document.getElementById('inspiring-quote');
        if (quoteElement && window.inspiringQuotes && window.inspiringQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * window.inspiringQuotes.length);
            const randomQuote = window.inspiringQuotes[randomIndex];
            quoteElement.textContent = `"${randomQuote}"`;
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FitnessTracker();
});

// Handle page visibility changes to update streaks
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        const event = new CustomEvent('app:render');
        document.dispatchEvent(event);
    }
});
