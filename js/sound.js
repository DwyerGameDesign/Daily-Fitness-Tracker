// Web Audio API sound effects
let audioContext = null;
let isInitialized = false;

// Global sound state (default muted)
window.soundEnabled = false;

function initializeSound() {
    try {
        // Create audio context on first user interaction
        document.addEventListener('click', initAudioContext, { once: true });
        document.addEventListener('keydown', initAudioContext, { once: true });
        console.log('Sound system ready (will initialize on first interaction)');
    } catch (error) {
        console.warn('Sound initialization failed:', error);
    }
}

function initAudioContext() {
    if (isInitialized) return;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isInitialized = true;
        console.log('Audio context initialized');
    } catch (error) {
        console.warn('Failed to create audio context:', error);
    }
}

// Play a gentle chime sound for positive feedback
function playChime() {
    if (!window.soundEnabled || !audioContext || !isInitialized) {
        return;
    }
    
    try {
        // Resume audio context if suspended (browser requirement)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // Create a pleasant chime using two sine waves
        const duration = 0.6; // seconds
        const currentTime = audioContext.currentTime;
        
        // First tone (higher)
        const oscillator1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();
        
        oscillator1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);
        
        oscillator1.frequency.value = 800; // C5
        oscillator1.type = 'sine';
        
        // Gentle fade in and out
        gainNode1.gain.setValueAtTime(0, currentTime);
        gainNode1.gain.linearRampToValueAtTime(0.1, currentTime + 0.05);
        gainNode1.gain.linearRampToValueAtTime(0.05, currentTime + duration * 0.7);
        gainNode1.gain.linearRampToValueAtTime(0, currentTime + duration);
        
        oscillator1.start(currentTime);
        oscillator1.stop(currentTime + duration);
        
        // Second tone (lower) - starts slightly after first
        setTimeout(() => {
            if (!window.soundEnabled) return;
            
            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();
            
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);
            
            oscillator2.frequency.value = 600; // G4
            oscillator2.type = 'sine';
            
            const startTime = audioContext.currentTime;
            gainNode2.gain.setValueAtTime(0, startTime);
            gainNode2.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
            gainNode2.gain.linearRampToValueAtTime(0.04, startTime + duration * 0.7);
            gainNode2.gain.linearRampToValueAtTime(0, startTime + duration);
            
            oscillator2.start(startTime);
            oscillator2.stop(startTime + duration);
        }, 100);
        
    } catch (error) {
        console.warn('Failed to play chime:', error);
    }
}











// All functions are now globally available