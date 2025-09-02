// Main app initialization and coordination

class FitnessTracker {
    constructor() {
        this.init();
    }

    async init() {
        try {
            console.log('Initializing Fitness Tracker...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.startApp();
                });
            } else {
                this.startApp();
            }
            
        } catch (error) {
            console.error('Failed to initialize Fitness Tracker:', error);
            this.showError('Failed to initialize app. Please refresh the page.');
        }
    }

    startApp() {
        try {
            // Initialize UI components
            initializeUI();
            
            // Set up page visibility change handler to refresh data
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    updateUserInfo();
                }
            });
            
            // Handle URL parameters for direct tab access
            this.handleInitialTab();
            
            console.log('Fitness Tracker started successfully');
            
        } catch (error) {
            console.error('Failed to start app:', error);
            this.showError('App startup failed. Please refresh the page.');
        }
    }

    handleInitialTab() {
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        
        if (tabParam && ['today', 'weekly', 'monthly', 'account'].includes(tabParam)) {
            // Find the tab button and click it
            const tabBtn = document.querySelector(`[data-tab="${tabParam}"]`);
            if (tabBtn) {
                tabBtn.click();
            }
        }
    }

    showError(message) {
        // Create error message if toast system isn't available
        if (typeof showToast === 'function') {
            showToast(message, 'error');
        } else {
            alert(message);
        }
    }
}

// Initialize the app when the script loads
const fitnessTracker = new FitnessTracker();

// Handle page unload to save any pending data
window.addEventListener('beforeunload', () => {
    // Any cleanup tasks can go here
    console.log('App shutting down...');
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});