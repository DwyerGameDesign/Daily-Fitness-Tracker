// Default user profile and missions library

const defaultUser = {
    age: 43,
    height: 72, // inches (6'0")
    weight: 175, // lbs
    equipment: ['resistance bands', 'treadmill'],
    timeBudget: { min: 15, max: 30 }, // minutes
    priorities: ['belly fat loss', 'core strength'],
    level: 1,
    xp: 0,
    joinDate: new Date().toISOString().split('T')[0]
};

const defaultSettings = {
    darkMode: false,
    soundEnabled: false,
    notifications: true
};

// Stretching library - flexibility and recovery focused
const stretchesLibrary = [
    {
        id: 'neck-shoulder-stretch',
        name: 'Neck & Shoulder Release',
        category: 'Upper Body',
        minutes: 3,
        equipment: [],
        instructions: 'Gently roll neck in circles, then hold shoulder shrugs for 15 seconds each side.',
        xp: 5,
        intensity: 1
    },
    {
        id: 'chest-doorway-stretch',
        name: 'Doorway Chest Stretch',
        category: 'Upper Body',
        minutes: 4,
        equipment: [],
        instructions: 'Place forearms on doorway, step forward to stretch chest. Hold 30s x 2 sets.',
        xp: 6,
        intensity: 1
    },
    {
        id: 'cat-cow-spine',
        name: 'Cat-Cow Spine Stretch',
        category: 'Core & Back',
        minutes: 5,
        equipment: [],
        instructions: 'On hands and knees, alternate arching and rounding spine. 10 slow reps.',
        xp: 8,
        intensity: 1
    },
    {
        id: 'child-pose-stretch',
        name: 'Child\'s Pose',
        category: 'Core & Back',
        minutes: 6,
        equipment: [],
        instructions: 'Kneel and sit back on heels, reach arms forward. Hold for 1-2 minutes.',
        xp: 9,
        intensity: 1
    },
    {
        id: 'hip-flexor-couch-stretch',
        name: 'Couch Hip Flexor Stretch',
        category: 'Lower Body',
        minutes: 8,
        equipment: [],
        instructions: 'Back foot on couch, lunge forward. Hold 45s each side x 2 sets. Great for desk workers!',
        xp: 12,
        intensity: 2
    },
    {
        id: 'pigeon-pose-hip',
        name: 'Pigeon Pose Hip Stretch',
        category: 'Lower Body',
        minutes: 10,
        equipment: [],
        instructions: 'One leg forward bent, other leg back straight. Hold 1 min each side.',
        xp: 15,
        intensity: 2
    },
    {
        id: 'hamstring-seated-stretch',
        name: 'Seated Hamstring Stretch',
        category: 'Lower Body',
        minutes: 6,
        equipment: [],
        instructions: 'Sit with one leg extended, reach toward toes. Hold 45s each leg x 2 sets.',
        xp: 9,
        intensity: 1
    },
    {
        id: 'calf-wall-stretch',
        name: 'Wall Calf Stretch',
        category: 'Lower Body',
        minutes: 4,
        equipment: [],
        instructions: 'Hands on wall, step back and press heel down. Hold 30s each leg x 2 sets.',
        xp: 6,
        intensity: 1
    },
    {
        id: 'spinal-twist-seated',
        name: 'Seated Spinal Twist',
        category: 'Core & Back',
        minutes: 5,
        equipment: [],
        instructions: 'Sit cross-legged, twist to each side placing hand behind. Hold 30s each side.',
        xp: 8,
        intensity: 1
    },
    {
        id: 'forward-fold-standing',
        name: 'Standing Forward Fold',
        category: 'Full Body',
        minutes: 4,
        equipment: [],
        instructions: 'Stand and fold forward, let arms hang. Sway gently. Hold 1-2 minutes.',
        xp: 6,
        intensity: 1
    },
    {
        id: 'butterfly-hip-stretch',
        name: 'Butterfly Hip Stretch',
        category: 'Lower Body',
        minutes: 5,
        equipment: [],
        instructions: 'Sit with soles of feet together, gently press knees down. Hold 1 minute.',
        xp: 8,
        intensity: 1
    },
    {
        id: 'quad-standing-stretch',
        name: 'Standing Quad Stretch',
        category: 'Lower Body',
        minutes: 4,
        equipment: [],
        instructions: 'Hold ankle behind you, pull heel to glutes. Hold 30s each leg. Use wall for balance.',
        xp: 6,
        intensity: 1
    },
    {
        id: 'shoulder-blade-squeeze',
        name: 'Shoulder Blade Squeezes',
        category: 'Upper Body',
        minutes: 3,
        equipment: [],
        instructions: 'Squeeze shoulder blades together, hold 5s. Release. Repeat 10-15 times.',
        xp: 5,
        intensity: 1
    },
    {
        id: 'wrist-forearm-stretch',
        name: 'Wrist & Forearm Stretch',
        category: 'Upper Body',
        minutes: 3,
        equipment: [],
        instructions: 'Extend arm, pull fingers back with other hand. Hold 20s each direction, both arms.',
        xp: 5,
        intensity: 1
    },
    {
        id: 'figure-four-hip-stretch',
        name: 'Figure-4 Hip Stretch',
        category: 'Lower Body',
        minutes: 8,
        equipment: [],
        instructions: 'Lie on back, ankle on opposite knee, pull thigh toward chest. 45s each side.',
        xp: 12,
        intensity: 2
    },
    {
        id: 'side-body-reach',
        name: 'Side Body Reach',
        category: 'Core & Back',
        minutes: 4,
        equipment: [],
        instructions: 'Stand with feet hip-width apart, reach one arm overhead and lean. 30s each side.',
        xp: 6,
        intensity: 1
    },
    {
        id: 'ankle-circles',
        name: 'Ankle Circles & Flexes',
        category: 'Lower Body',
        minutes: 3,
        equipment: [],
        instructions: 'Sit or lie down, rotate ankles both directions. Flex and point feet. 1 minute each foot.',
        xp: 5,
        intensity: 1
    },
    {
        id: 'thoracic-spine-twist',
        name: 'Thoracic Spine Twist',
        category: 'Core & Back',
        minutes: 6,
        equipment: [],
        instructions: 'On hands and knees, reach one arm under body and across. Hold 30s each side.',
        xp: 9,
        intensity: 1
    },
    {
        id: 'legs-up-wall',
        name: 'Legs Up the Wall',
        category: 'Full Body',
        minutes: 10,
        equipment: [],
        instructions: 'Lie on back with legs up against wall. Relax and breathe deeply for recovery.',
        xp: 15,
        intensity: 1
    },
    {
        id: 'gentle-morning-flow',
        name: 'Gentle Morning Flow',
        category: 'Full Body',
        minutes: 12,
        equipment: [],
        instructions: 'Combine cat-cow, child\'s pose, downward dog, and gentle twists. 2 minutes each.',
        xp: 18,
        intensity: 2
    }
];

// Updated missions library with simplified format
const missionsLibrary = [
    {
        id: 'core-plank-basic',
        name: 'Basic Plank Hold',
        category: 'Core & Cardio',
        minutes: 5,
        equipment: [],
        instructions: 'Hold plank position for sets. Focus on keeping core tight and body straight.',
        difficulties: {
            easy: { xp: 8, description: '15s x 2 sets' },
            moderate: { xp: 12, description: '30s x 3 sets' },
            advanced: { xp: 18, description: '45s x 4 sets' }
        }
    },
    {
        id: 'core-mountain-climbers',
        name: 'Mountain Climbers',
        category: 'Core & Cardio',
        minutes: 8,
        equipment: [],
        instructions: 'Mountain climbers in intervals. Great for core and cardio!',
        difficulties: {
            easy: { xp: 10, description: '15-20 x 2 sets' },
            moderate: { xp: 15, description: '25-30 x 3 sets' },
            advanced: { xp: 22, description: '40-45 x 4 sets' }
        }
    },
    {
        id: 'cardio-treadmill-intervals',
        name: 'Treadmill Intervals',
        category: 'Core & Cardio',
        minutes: 20,
        equipment: ['treadmill'],
        instructions: 'Alternate moderate and fast pace intervals on treadmill.',
        difficulties: {
            easy: { xp: 18, description: '3-4 min mod, 1 min brisk' },
            moderate: { xp: 25, description: '2-3 min mod, 1 min fast' },
            advanced: { xp: 35, description: '1-2 min mod, 1 min sprint' }
        }
    },
    {
        id: 'arms-band-curls',
        name: 'Resistance Band Curls',
        category: 'Arms & Chest',
        minutes: 10,
        equipment: ['resistance bands'],
        instructions: 'Bicep curls with band. Control the movement both ways.',
        difficulties: {
            easy: { xp: 10, description: '8-10 x 2 sets' },
            moderate: { xp: 15, description: '12-15 x 3 sets' },
            advanced: { xp: 22, description: '16-20 x 4 sets' }
        }
    },
    {
        id: 'arms-band-press',
        name: 'Band Chest Press',
        category: 'Arms & Chest',
        minutes: 12,
        equipment: ['resistance bands'],
        instructions: 'Anchor band behind you. Press forward for chest and triceps.',
        difficulties: {
            easy: { xp: 12, description: '8-10 x 2 sets' },
            moderate: { xp: 18, description: '12-15 x 3 sets' },
            advanced: { xp: 26, description: '16-20 x 4 sets' }
        }
    },
    {
        id: 'arms-pushups',
        name: 'Push-Up Variations',
        category: 'Arms & Chest',
        minutes: 8,
        equipment: [],
        instructions: 'Push-ups focusing on proper form. Modify as needed.',
        difficulties: {
            easy: { xp: 8, description: '5-8 x 2 sets' },
            moderate: { xp: 12, description: '10-12 x 3 sets' },
            advanced: { xp: 20, description: '15-20 x 4 sets' }
        }
    },
    {
        id: 'legs-bodyweight-squats',
        name: 'Bodyweight Squats',
        category: 'Legs & Glutes',
        minutes: 6,
        equipment: [],
        instructions: 'Deep squats focusing on form. Keep chest up!',
        difficulties: {
            easy: { xp: 8, description: '8-10 x 2 sets' },
            moderate: { xp: 12, description: '12-15 x 3 sets' },
            advanced: { xp: 18, description: '16-20 x 4 sets' }
        }
    },
    {
        id: 'legs-glute-bridges',
        name: 'Glute Bridges',
        category: 'Legs & Glutes',
        minutes: 8,
        equipment: [],
        instructions: 'Glute bridges with hip activation. Hold at the top.',
        difficulties: {
            easy: { xp: 8, description: '10-12 x 2 sets' },
            moderate: { xp: 12, description: '15-18 x 3 sets' },
            advanced: { xp: 20, description: '20-25 x 4 sets' }
        }
    },
    {
        id: 'legs-band-sidesteps',
        name: 'Band Side Steps',
        category: 'Legs & Glutes',
        minutes: 10,
        equipment: ['resistance bands'],
        instructions: 'Band around ankles. Side steps keeping tension.',
        difficulties: {
            easy: { xp: 10, description: '8-10 each side x 2 sets' },
            moderate: { xp: 15, description: '10-12 each side x 3 sets' },
            advanced: { xp: 25, description: '12-15 each side x 4 sets' }
        }
    },
    {
        id: 'balance-single-leg',
        name: 'Single Leg Stands',
        category: 'Balance/Recovery',
        minutes: 5,
        equipment: [],
        instructions: 'Balance exercise with focus. Use wall if needed.',
        difficulties: {
            easy: { xp: 5, description: '15-20s each leg x 2 sets' },
            moderate: { xp: 8, description: '30-35s each leg x 2 sets' },
            advanced: { xp: 12, description: '45-60s each leg x 3 sets' }
        }
    },
    {
        id: 'balance-bird-dogs',
        name: 'Bird Dog Exercise',
        category: 'Balance/Recovery',
        minutes: 8,
        equipment: [],
        instructions: 'On hands/knees, extend opposite arm and leg.',
        difficulties: {
            easy: { xp: 8, description: '5-6 each side x 2 sets' },
            moderate: { xp: 12, description: '8-10 each side x 3 sets' },
            advanced: { xp: 18, description: '10-12 each side x 4 sets' }
        }
    },
    {
        id: 'cardio-walk-brisk',
        name: 'Brisk Walk',
        category: 'Balance/Recovery',
        minutes: 15,
        equipment: [],
        instructions: 'Walking/running workout at your pace.',
        difficulties: {
            easy: { xp: 10, description: '3-4 min mod, 1 min brisk' },
            moderate: { xp: 15, description: '2-3 min mod, 1 min fast' },
            advanced: { xp: 22, description: '1-2 min mod, 1 min sprint' }
        }
    },
    {
        id: 'core-russian-twists',
        name: 'Russian Twists',
        category: 'Core & Cardio',
        minutes: 6,
        equipment: [],
        instructions: 'Core twisting movement. Seated position.',
        difficulties: {
            easy: { xp: 7, description: '12-15 x 2 sets' },
            moderate: { xp: 10, description: '18-22 x 3 sets' },
            advanced: { xp: 15, description: '25-30 x 4 sets' }
        }
    },
    {
        id: 'core-dead-bug',
        name: 'Dead Bug Exercise',
        category: 'Core & Cardio',
        minutes: 10,
        equipment: [],
        instructions: 'Lie on back, extend opposite arm and leg slowly.',
        difficulties: {
            easy: { xp: 10, description: '5-6 each side x 2 sets' },
            moderate: { xp: 15, description: '8-10 each side x 3 sets' },
            advanced: { xp: 22, description: '10-12 each side x 4 sets' }
        }
    },
    {
        id: 'cardio-jumping-jacks',
        name: 'Jumping Jacks Intervals',
        category: 'Core & Cardio',
        minutes: 8,
        equipment: [],
        instructions: 'Jumping exercise with good form.',
        difficulties: {
            easy: { xp: 8, description: '15-20 x 2 sets' },
            moderate: { xp: 12, description: '25-30 x 3 sets' },
            advanced: { xp: 18, description: '40-45 x 4 sets' }
        }
    },
    {
        id: 'arms-band-rows',
        name: 'Band Rows',
        category: 'Arms & Chest',
        minutes: 10,
        equipment: ['resistance bands'],
        instructions: 'Rowing movement with good posture. Squeeze shoulder blades.',
        difficulties: {
            easy: { xp: 10, description: '8-10 x 2 sets' },
            moderate: { xp: 15, description: '12-15 x 3 sets' },
            advanced: { xp: 22, description: '16-20 x 4 sets' }
        }
    },
    {
        id: 'legs-wall-sit',
        name: 'Wall Sit Challenge',
        category: 'Legs & Glutes',
        minutes: 6,
        equipment: [],
        instructions: 'Back against wall, slide down to sitting position.',
        difficulties: {
            easy: { xp: 7, description: '15-20s x 2 sets' },
            moderate: { xp: 10, description: '30-35s x 3 sets' },
            advanced: { xp: 15, description: '45-60s x 4 sets' }
        }
    },
    {
        id: 'core-bicycle-crunches',
        name: 'Bicycle Crunches',
        category: 'Core & Cardio',
        minutes: 8,
        equipment: [],
        instructions: 'Lie on back, alternate bringing elbow to opposite knee.',
        difficulties: {
            easy: { xp: 8, description: '12-15 x 2 sets' },
            moderate: { xp: 12, description: '18-22 x 3 sets' },
            advanced: { xp: 18, description: '25-30 x 4 sets' }
        }
    },
    {
        id: 'cardio-step-ups',
        name: 'Step-Ups',
        category: 'Core & Cardio',
        minutes: 10,
        equipment: [],
        instructions: 'Step-up exercise with alternating legs.',
        difficulties: {
            easy: { xp: 10, description: '6-8 each leg x 2 sets' },
            moderate: { xp: 15, description: '8-10 each leg x 3 sets' },
            advanced: { xp: 22, description: '10-12 each leg x 4 sets' }
        }
    },
    {
        id: 'balance-yoga-tree',
        name: 'Tree Pose Balance',
        category: 'Balance/Recovery',
        minutes: 8,
        equipment: [],
        instructions: 'Balance exercise with focus. Stand on one leg.',
        difficulties: {
            easy: { xp: 7, description: '15-20s each leg x 2 sets' },
            moderate: { xp: 10, description: '25-30s each leg x 2 sets' },
            advanced: { xp: 15, description: '40-45s each leg x 3 sets' }
        }
    },
    {
        id: 'core-side-plank-rotations',
        name: 'Side Plank Rotations',
        category: 'Core & Cardio',
        minutes: 8,
        equipment: [],
        instructions: 'Side plank with arm rotation movement.',
        difficulties: {
            easy: { xp: 10, description: '15-20s each side x 2 sets' },
            moderate: { xp: 15, description: '25-30s each side x 3 sets' },
            advanced: { xp: 22, description: '40-45s each side x 4 sets' }
        }
    },
    {
        id: 'core-hollow-hold',
        name: 'Hollow Body Hold',
        category: 'Core & Cardio',
        minutes: 5,
        equipment: [],
        instructions: 'Lie flat, lift shoulders and legs off floor.',
        difficulties: {
            easy: { xp: 8, description: '10-15s x 2 sets' },
            moderate: { xp: 12, description: '20-25s x 3 sets' },
            advanced: { xp: 18, description: '35-40s x 4 sets' }
        }
    },
    {
        id: 'cardio-burpees',
        name: 'Burpee Challenge',
        category: 'Core & Cardio',
        minutes: 6,
        equipment: [],
        instructions: 'Full body burpee exercise. Great fat burner.',
        difficulties: {
            easy: { xp: 12, description: '3-5 x 2 sets' },
            moderate: { xp: 20, description: '6-8 x 3 sets' },
            advanced: { xp: 30, description: '10-12 x 4 sets' }
        }
    },
    {
        id: 'arms-diamond-pushups',
        name: 'Diamond Push-Ups',
        category: 'Arms & Chest',
        minutes: 6,
        equipment: [],
        instructions: 'Push-ups with hands in diamond shape.',
        difficulties: {
            easy: { xp: 10, description: '2-3 x 2 sets' },
            moderate: { xp: 15, description: '4-6 x 3 sets' },
            advanced: { xp: 22, description: '8-10 x 4 sets' }
        }
    },
    {
        id: 'arms-band-overhead-triceps',
        name: 'Band Overhead Triceps Extension',
        category: 'Arms & Chest',
        minutes: 8,
        equipment: ['resistance bands'],
        instructions: 'Hold band behind back, extend arms overhead.',
        difficulties: {
            easy: { xp: 10, description: '6-8 x 2 sets' },
            moderate: { xp: 15, description: '10-12 x 3 sets' },
            advanced: { xp: 22, description: '14-16 x 4 sets' }
        }
    },
    {
        id: 'arms-chair-dips',
        name: 'Chair Dips',
        category: 'Arms & Chest',
        minutes: 6,
        equipment: [],
        instructions: 'Dips with controlled movement. Hands on chair edge.',
        difficulties: {
            easy: { xp: 8, description: '4-5 x 2 sets' },
            moderate: { xp: 12, description: '6-8 x 3 sets' },
            advanced: { xp: 18, description: '10-12 x 4 sets' }
        }
    },
    {
        id: 'legs-lunges',
        name: 'Forward Lunges',
        category: 'Legs & Glutes',
        minutes: 10,
        equipment: [],
        instructions: 'Lunges with alternating legs. Step forward.',
        difficulties: {
            easy: { xp: 10, description: '6-8 each leg x 2 sets' },
            moderate: { xp: 15, description: '8-10 each leg x 3 sets' },
            advanced: { xp: 22, description: '10-12 each leg x 4 sets' }
        }
    },
    {
        id: 'legs-calf-raises',
        name: 'Calf Raises',
        category: 'Legs & Glutes',
        minutes: 5,
        equipment: [],
        instructions: 'Raises with controlled movement. Rise onto toes.',
        difficulties: {
            easy: { xp: 5, description: '8-10 x 2 sets' },
            moderate: { xp: 8, description: '12-15 x 3 sets' },
            advanced: { xp: 12, description: '18-20 x 4 sets' }
        }
    },
    {
        id: 'legs-band-squat-pulse',
        name: 'Band Squat Pulses',
        category: 'Legs & Glutes',
        minutes: 8,
        equipment: ['resistance bands'],
        instructions: 'Squats with band around thighs. Pulse movement.',
        difficulties: {
            easy: { xp: 8, description: '12-15 x 2 sets' },
            moderate: { xp: 12, description: '18-22 x 3 sets' },
            advanced: { xp: 18, description: '25-30 x 4 sets' }
        }
    },
    {
        id: 'balance-yoga-warrior3',
        name: 'Warrior 3 Pose',
        category: 'Balance/Recovery',
        minutes: 6,
        equipment: [],
        instructions: 'Balance exercise with focus. Lean forward with arms extended.',
        difficulties: {
            easy: { xp: 7, description: '15-20s each side x 2 sets' },
            moderate: { xp: 10, description: '25-30s each side x 2 sets' },
            advanced: { xp: 15, description: '40-45s each side x 3 sets' }
        }
    },
    {
        id: 'balance-hip-flexor-stretch',
        name: 'Hip Flexor Stretch',
        category: 'Balance/Recovery',
        minutes: 5,
        equipment: [],
        instructions: 'Stretching exercise for flexibility. Kneeling lunge position.',
        difficulties: {
            easy: { xp: 4, description: '25-30s each side x 2 sets' },
            moderate: { xp: 6, description: '40-45s each side x 2 sets' },
            advanced: { xp: 9, description: '55-60s each side x 3 sets' }
        }
    },
    {
        id: 'arms-custom-pushups',
        name: 'Custom Push-Up Challenge',
        category: 'Arms & Chest',
        minutes: 10,
        equipment: [],
        instructions: 'Progressive push-up challenge with custom rep schemes.',
        difficulties: {
            easy: { xp: 15, description: '4-5 x 3 sets, 60s rest' },
            moderate: { xp: 25, description: '6-8 x 4 sets, 45s rest' },
            advanced: { xp: 35, description: '10-12 x 5 sets, 30s rest' }
        }
    },
    {
        id: 'legs-pyramid-squats',
        name: 'Pyramid Squat Challenge',
        category: 'Legs & Glutes',
        minutes: 12,
        equipment: [],
        instructions: 'Pyramid sets: increase reps each set, then decrease.',
        difficulties: {
            easy: { xp: 20, description: '5-8-5 reps, 3 sets' },
            moderate: { xp: 30, description: '8-12-15-12-8 reps, 5 sets' },
            advanced: { xp: 40, description: '10-15-20-25-20-15-10 reps, 7 sets' }
        }
    },
    {
        id: 'cardio-tabata-style',
        name: 'Tabata-Style Intervals',
        category: 'Core & Cardio',
        minutes: 8,
        equipment: [],
        instructions: '20 seconds work, 10 seconds rest, multiple rounds.',
        difficulties: {
            easy: { xp: 20, description: '20s work, 10s rest, 4 rounds' },
            moderate: { xp: 30, description: '20s work, 10s rest, 6 rounds' },
            advanced: { xp: 40, description: '20s work, 10s rest, 8 rounds' }
        }
    }
];

// Default weekly plan with soccer on Wed/Thu/Sun
function generateDefaultWeeklyPlan() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const plan = {};
    
    days.forEach(day => {
        plan[day] = {
            missions: [],
            stretches: [],
            activities: []
        };
             
        // Add 2-3 missions from library for other aspects
        const dayMissions = selectDailyMissions();
        plan[day].missions = dayMissions;
        
        // Add 5 stretches from library
        const dayStretches = selectDailyStretches();
        plan[day].stretches = dayStretches;
    });
    
    return plan;
}

// Smart mission selection based on user priorities and equipment
function selectDailyMissions() {
    const userEquipment = defaultUser.equipment;
    const availableMissions = missionsLibrary.filter(mission => 
        mission.equipment.every(eq => userEquipment.includes(eq)) ||
        mission.equipment.length === 0
    );
    
    // Prioritize core/cardio for belly fat loss
    const coreMissions = availableMissions.filter(m => m.category === 'Core & Cardio');
    const otherMissions = availableMissions.filter(m => m.category !== 'Core & Cardio');
    
    const selected = [];
    
    // Always include one core mission
    if (coreMissions.length > 0) {
        const randomCore = coreMissions[Math.floor(Math.random() * coreMissions.length)];
        selected.push(randomCore);
    }
    
    // Add 1-2 other missions to reach 3 total
    while (selected.length < 3 && otherMissions.length > 0) {
        const randomOther = otherMissions[Math.floor(Math.random() * otherMissions.length)];
        if (!selected.find(m => m.id === randomOther.id)) {
            selected.push(randomOther);
        }
    }
    
    return selected;
}

// Smart stretch selection for daily variety - 5 stretches per day
function selectDailyStretches() {
    const availableStretches = [...stretchesLibrary];
    const selected = [];
    
    // Try to get variety across categories
    const categories = ['Upper Body', 'Lower Body', 'Core & Back', 'Full Body'];
    
    // Pick at least one from each category if possible
    categories.forEach(category => {
        const categoryStretches = availableStretches.filter(s => s.category === category);
        if (categoryStretches.length > 0 && selected.length < 5) {
            const randomStretch = categoryStretches[Math.floor(Math.random() * categoryStretches.length)];
            if (!selected.find(s => s.id === randomStretch.id)) {
                selected.push(randomStretch);
            }
        }
    });
    
    // Fill to exactly 5 stretches with random selections ensuring variety
    while (selected.length < 5) {
        const randomStretch = availableStretches[Math.floor(Math.random() * availableStretches.length)];
        if (!selected.find(s => s.id === randomStretch.id)) {
            selected.push(randomStretch);
        }
    }
    
    return selected.slice(0, 5); // Exactly 5 stretches
}

// One-time Badge definitions - earned once and never repeated
const badgeDefinitions = [
    // 🟢 Starter / First Achievements
    {
        id: 'first-workout',
        name: 'First Step',
        description: 'Complete your very first mission',
        icon: '👟',
        requirement: { type: 'missions-total', value: 1 }
    },
    {
        id: 'getting-started',
        name: 'Getting Started',
        description: '3 days in a row - you\'re on your way!',
        icon: '🚀',
        requirement: { type: 'streak', value: 3 }
    },

    // 🌈 Variety & Discovery
    {
        id: 'variety-master',
        name: 'Variety Master',
        description: 'Try all 4 exercise categories',
        icon: '🌈',
        requirement: { type: 'variety', value: 4 }
    },
    {
        id: 'double-duty',
        name: 'Double Duty',
        description: 'Do two different categories in one day',
        icon: '🔄',
        requirement: { type: 'multi-category-day', value: 2 }
    },

    // ⏱️ Time-Based Habits Discovery
    {
        id: 'early-bird',
        name: 'Early Bird',
        description: 'Complete your first morning workout (before 9am)',
        icon: '🌅',
        requirement: { type: 'time-based', condition: 'before-9am', value: 1 }
    },
    {
        id: 'lunch-breaker',
        name: 'Lunch Break Legend',
        description: 'Complete your first midday workout (12pm–2pm)',
        icon: '🥪',
        requirement: { type: 'time-based', condition: 'midday', value: 1 }
    },
    {
        id: 'night-owl',
        name: 'Night Owl',
        description: 'Complete your first evening workout (after 9pm)',
        icon: '🌙',
        requirement: { type: 'time-based', condition: 'after-9pm', value: 1 }
    },

    // 🔥 Streak Milestones
    {
        id: 'week-warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day workout streak',
        icon: '🔥',
        requirement: { type: 'streak', value: 7 }
    },
    {
        id: 'month-master',
        name: 'Month Master',
        description: 'Maintain a 30-day workout streak',
        icon: '🌟',
        requirement: { type: 'streak', value: 30 }
    },
    {
        id: 'hundred-hero',
        name: '100-Day Hero',
        description: 'Maintain a 100-day workout streak',
        icon: '💯',
        requirement: { type: 'streak', value: 100 }
    },

    // 💎 XP Milestones
    {
        id: 'xp-starter',
        name: 'XP Starter',
        description: 'Earn your first 1000 XP',
        icon: '💎',
        requirement: { type: 'total-xp', value: 1000 }
    },
    {
        id: 'xp-achiever',
        name: 'XP Achiever',
        description: 'Earn 5000 total XP',
        icon: '🏔️',
        requirement: { type: 'total-xp', value: 5000 }
    },
    {
        id: 'level-hero',
        name: 'Level 10 Hero',
        description: 'Reach level 10',
        icon: '👑',
        requirement: { type: 'level', value: 10 }
    },

    // 🎉 Special / Fun
    {
        id: 'perfect-week',
        name: 'Perfect Week',
        description: 'Complete all planned activities in one week',
        icon: '✨',
        requirement: { type: 'perfect-week', value: 1 }
    },
    {
        id: 'comeback',
        name: 'Comeback Kid',
        description: 'Return after missing 7 days',
        icon: '🔄',
        requirement: { type: 'comeback', value: 7 }
    },

    // 🏆 Individual Advanced Mission Badges
    {
        id: 'advanced-core-plank-basic',
        name: 'Advanced Plank Master',
        description: 'Complete Basic Plank Hold on advanced difficulty',
        icon: '🔥',
        requirement: { type: 'advanced-mission', missionId: 'core-plank-basic', value: 1 }
    },
    {
        id: 'advanced-core-mountain-climbers',
        name: 'Advanced Mountain Climber',
        description: 'Complete Mountain Climbers on advanced difficulty',
        icon: '⛰️',
        requirement: { type: 'advanced-mission', missionId: 'core-mountain-climbers', value: 1 }
    },
    {
        id: 'advanced-cardio-treadmill-intervals',
        name: 'Advanced Treadmill Master',
        description: 'Complete Treadmill Intervals on advanced difficulty',
        icon: '🏃',
        requirement: { type: 'advanced-mission', missionId: 'cardio-treadmill-intervals', value: 1 }
    },
    {
        id: 'advanced-arms-band-curls',
        name: 'Advanced Curl Champion',
        description: 'Complete Resistance Band Curls on advanced difficulty',
        icon: '💪',
        requirement: { type: 'advanced-mission', missionId: 'arms-band-curls', value: 1 }
    },
    {
        id: 'advanced-arms-band-press',
        name: 'Advanced Press Master',
        description: 'Complete Band Chest Press on advanced difficulty',
        icon: '💪',
        requirement: { type: 'advanced-mission', missionId: 'arms-band-press', value: 1 }
    },
    {
        id: 'advanced-arms-pushups',
        name: 'Advanced Push-Up Pro',
        description: 'Complete Push-Up Variations on advanced difficulty',
        icon: '💪',
        requirement: { type: 'advanced-mission', missionId: 'arms-pushups', value: 1 }
    },
    {
        id: 'advanced-legs-bodyweight-squats',
        name: 'Advanced Squat Master',
        description: 'Complete Bodyweight Squats on advanced difficulty',
        icon: '🦵',
        requirement: { type: 'advanced-mission', missionId: 'legs-bodyweight-squats', value: 1 }
    },
    {
        id: 'advanced-legs-glute-bridges',
        name: 'Advanced Bridge Builder',
        description: 'Complete Glute Bridges on advanced difficulty',
        icon: '🦵',
        requirement: { type: 'advanced-mission', missionId: 'legs-glute-bridges', value: 1 }
    },
    {
        id: 'advanced-legs-band-sidesteps',
        name: 'Advanced Side Step Star',
        description: 'Complete Band Side Steps on advanced difficulty',
        icon: '🦵',
        requirement: { type: 'advanced-mission', missionId: 'legs-band-sidesteps', value: 1 }
    },
    {
        id: 'advanced-balance-single-leg',
        name: 'Advanced Balance Pro',
        description: 'Complete Single Leg Stands on advanced difficulty',
        icon: '🧘',
        requirement: { type: 'advanced-mission', missionId: 'balance-single-leg', value: 1 }
    },
    {
        id: 'advanced-balance-bird-dogs',
        name: 'Advanced Bird Dog Master',
        description: 'Complete Bird Dog Exercise on advanced difficulty',
        icon: '🧘',
        requirement: { type: 'advanced-mission', missionId: 'balance-bird-dogs', value: 1 }
    },
    {
        id: 'advanced-cardio-walk-brisk',
        name: 'Advanced Walker',
        description: 'Complete Brisk Walk on advanced difficulty',
        icon: '🚶',
        requirement: { type: 'advanced-mission', missionId: 'cardio-walk-brisk', value: 1 }
    },
    {
        id: 'advanced-core-russian-twists',
        name: 'Advanced Twist Master',
        description: 'Complete Russian Twists on advanced difficulty',
        icon: '🔄',
        requirement: { type: 'advanced-mission', missionId: 'core-russian-twists', value: 1 }
    },
    {
        id: 'advanced-core-dead-bug',
        name: 'Advanced Dead Bug Pro',
        description: 'Complete Dead Bug Exercise on advanced difficulty',
        icon: '🐛',
        requirement: { type: 'advanced-mission', missionId: 'core-dead-bug', value: 1 }
    },
    {
        id: 'advanced-cardio-jumping-jacks',
        name: 'Advanced Jumping Jack',
        description: 'Complete Jumping Jacks Intervals on advanced difficulty',
        icon: '🤸',
        requirement: { type: 'advanced-mission', missionId: 'cardio-jumping-jacks', value: 1 }
    },
    {
        id: 'advanced-arms-band-rows',
        name: 'Advanced Row Master',
        description: 'Complete Band Rows on advanced difficulty',
        icon: '🚣',
        requirement: { type: 'advanced-mission', missionId: 'arms-band-rows', value: 1 }
    },
    {
        id: 'advanced-legs-wall-sit',
        name: 'Advanced Wall Warrior',
        description: 'Complete Wall Sit Challenge on advanced difficulty',
        icon: '🧱',
        requirement: { type: 'advanced-mission', missionId: 'legs-wall-sit', value: 1 }
    },
    {
        id: 'advanced-core-bicycle-crunches',
        name: 'Advanced Bicycle Master',
        description: 'Complete Bicycle Crunches on advanced difficulty',
        icon: '🚴',
        requirement: { type: 'advanced-mission', missionId: 'core-bicycle-crunches', value: 1 }
    },
    {
        id: 'advanced-cardio-step-ups',
        name: 'Advanced Step Master',
        description: 'Complete Step-Ups on advanced difficulty',
        icon: '🪜',
        requirement: { type: 'advanced-mission', missionId: 'cardio-step-ups', value: 1 }
    },
    {
        id: 'advanced-balance-yoga-tree',
        name: 'Advanced Tree Pose Master',
        description: 'Complete Tree Pose Balance on advanced difficulty',
        icon: '🌳',
        requirement: { type: 'advanced-mission', missionId: 'balance-yoga-tree', value: 1 }
    },
    {
        id: 'advanced-core-side-plank-rotations',
        name: 'Advanced Side Plank Pro',
        description: 'Complete Side Plank Rotations on advanced difficulty',
        icon: '🔄',
        requirement: { type: 'advanced-mission', missionId: 'core-side-plank-rotations', value: 1 }
    },
    {
        id: 'advanced-core-hollow-hold',
        name: 'Advanced Hollow Master',
        description: 'Complete Hollow Body Hold on advanced difficulty',
        icon: '⭕',
        requirement: { type: 'advanced-mission', missionId: 'core-hollow-hold', value: 1 }
    },
    {
        id: 'advanced-cardio-burpees',
        name: 'Advanced Burpee Beast',
        description: 'Complete Burpee Challenge on advanced difficulty',
        icon: '💥',
        requirement: { type: 'advanced-mission', missionId: 'cardio-burpees', value: 1 }
    },
    {
        id: 'advanced-arms-diamond-pushups',
        name: 'Advanced Diamond Pro',
        description: 'Complete Diamond Push-Ups on advanced difficulty',
        icon: '💎',
        requirement: { type: 'advanced-mission', missionId: 'arms-diamond-pushups', value: 1 }
    },
    {
        id: 'advanced-arms-band-overhead-triceps',
        name: 'Advanced Tricep Master',
        description: 'Complete Band Overhead Triceps Extension on advanced difficulty',
        icon: '💪',
        requirement: { type: 'advanced-mission', missionId: 'arms-band-overhead-triceps', value: 1 }
    },
    {
        id: 'advanced-arms-chair-dips',
        name: 'Advanced Dip Champion',
        description: 'Complete Chair Dips on advanced difficulty',
        icon: '🪑',
        requirement: { type: 'advanced-mission', missionId: 'arms-chair-dips', value: 1 }
    },
    {
        id: 'advanced-legs-lunges',
        name: 'Advanced Lunge Master',
        description: 'Complete Forward Lunges on advanced difficulty',
        icon: '🦵',
        requirement: { type: 'advanced-mission', missionId: 'legs-lunges', value: 1 }
    },
    {
        id: 'advanced-legs-calf-raises',
        name: 'Advanced Calf Champion',
        description: 'Complete Calf Raises on advanced difficulty',
        icon: '🦵',
        requirement: { type: 'advanced-mission', missionId: 'legs-calf-raises', value: 1 }
    },
    {
        id: 'advanced-legs-band-squat-pulse',
        name: 'Advanced Pulse Master',
        description: 'Complete Band Squat Pulses on advanced difficulty',
        icon: '🔄',
        requirement: { type: 'advanced-mission', missionId: 'legs-band-squat-pulse', value: 1 }
    },
    {
        id: 'advanced-balance-yoga-warrior3',
        name: 'Advanced Warrior Master',
        description: 'Complete Warrior 3 Pose on advanced difficulty',
        icon: '⚔️',
        requirement: { type: 'advanced-mission', missionId: 'balance-yoga-warrior3', value: 1 }
    },
    {
        id: 'advanced-balance-hip-flexor-stretch',
        name: 'Advanced Hip Flexor Pro',
        description: 'Complete Hip Flexor Stretch on advanced difficulty',
        icon: '🧘',
        requirement: { type: 'advanced-mission', missionId: 'balance-hip-flexor-stretch', value: 1 }
    }
];

// Multi-level Achievement definitions - have 10 levels to progress through
const achievementDefinitions = [
    // 💪 Arm/Chest Achievements
    {
        id: 'arm-champion',
        name: 'Arm Champion',
        description: 'Master arm and chest workouts',
        icon: '💪',
        category: 'strength',
        levels: [
            { level: 1, requirement: { type: 'category', category: 'Arms & Chest', value: 1 }, title: 'First Flex', reward: 'Starting your arm journey!' },
            { level: 2, requirement: { type: 'category', category: 'Arms & Chest', value: 3 }, title: 'Getting Stronger', reward: 'Arms are waking up!' },
            { level: 3, requirement: { type: 'category', category: 'Arms & Chest', value: 5 }, title: 'Strength Builder', reward: 'Real progress!' },
            { level: 4, requirement: { type: 'category', category: 'Arms & Chest', value: 10 }, title: 'Arm Warrior', reward: 'Solid foundation!' },
            { level: 5, requirement: { type: 'category', category: 'Arms & Chest', value: 15 }, title: 'Power Player', reward: 'Getting serious!' },
            { level: 6, requirement: { type: 'category', category: 'Arms & Chest', value: 25 }, title: 'Strength Star', reward: 'Real strength!' },
            { level: 7, requirement: { type: 'category', category: 'Arms & Chest', value: 35 }, title: 'Muscle Master', reward: 'Elite level!' },
            { level: 8, requirement: { type: 'category', category: 'Arms & Chest', value: 50 }, title: 'Iron Champion', reward: 'Incredible dedication!' },
            { level: 9, requirement: { type: 'category', category: 'Arms & Chest', value: 75 }, title: 'Steel Titan', reward: 'Almost legendary!' },
            { level: 10, requirement: { type: 'category', category: 'Arms & Chest', value: 100 }, title: 'Arm Legend', reward: 'Ultimate upper body!' }
        ]
    },

    // 🎯 Core/Cardio Achievements
    {
        id: 'core-master',
        name: 'Core Master',
        description: 'Strengthen your core and boost cardio',
        icon: '🎯',
        category: 'fitness',
        levels: [
            { level: 1, requirement: { type: 'category', category: 'Core & Cardio', value: 1 }, title: 'Core Awakening', reward: 'Your core journey begins!' },
            { level: 2, requirement: { type: 'category', category: 'Core & Cardio', value: 3 }, title: 'Getting Centered', reward: 'Finding your core!' },
            { level: 3, requirement: { type: 'category', category: 'Core & Cardio', value: 5 }, title: 'Core Builder', reward: 'Solid foundation!' },
            { level: 4, requirement: { type: 'category', category: 'Core & Cardio', value: 10 }, title: 'Core Champion', reward: 'Strong center!' },
            { level: 5, requirement: { type: 'category', category: 'Core & Cardio', value: 15 }, title: 'Cardio Crusher', reward: 'Heart and core strong!' },
            { level: 6, requirement: { type: 'category', category: 'Core & Cardio', value: 25 }, title: 'Fitness Fighter', reward: 'Amazing endurance!' },
            { level: 7, requirement: { type: 'category', category: 'Core & Cardio', value: 35 }, title: 'Cardio King', reward: 'Elite fitness!' },
            { level: 8, requirement: { type: 'category', category: 'Core & Cardio', value: 50 }, title: 'Core Conqueror', reward: 'Incredible stamina!' },
            { level: 9, requirement: { type: 'category', category: 'Core & Cardio', value: 75 }, title: 'Fitness Titan', reward: 'Almost unstoppable!' },
            { level: 10, requirement: { type: 'category', category: 'Core & Cardio', value: 100 }, title: 'Core Legend', reward: 'Unshakeable foundation!' }
        ]
    },

    // 🦵 Leg/Glute Achievements
    {
        id: 'leg-legend',
        name: 'Leg Legend',
        description: 'Build powerful legs and glutes',
        icon: '🦵',
        category: 'strength',
        levels: [
            { level: 1, requirement: { type: 'category', category: 'Legs & Glutes', value: 1 }, title: 'First Steps', reward: 'Leg journey begins!' },
            { level: 2, requirement: { type: 'category', category: 'Legs & Glutes', value: 3 }, title: 'Finding Footing', reward: 'Getting grounded!' },
            { level: 3, requirement: { type: 'category', category: 'Legs & Glutes', value: 5 }, title: 'Leg Builder', reward: 'Foundation strong!' },
            { level: 4, requirement: { type: 'category', category: 'Legs & Glutes', value: 10 }, title: 'Lower Body Warrior', reward: 'Solid base!' },
            { level: 5, requirement: { type: 'category', category: 'Legs & Glutes', value: 15 }, title: 'Leg Champion', reward: 'Power in your step!' },
            { level: 6, requirement: { type: 'category', category: 'Legs & Glutes', value: 25 }, title: 'Glute Guardian', reward: 'Incredible power!' },
            { level: 7, requirement: { type: 'category', category: 'Legs & Glutes', value: 35 }, title: 'Thunder Thighs', reward: 'Elite strength!' },
            { level: 8, requirement: { type: 'category', category: 'Legs & Glutes', value: 50 }, title: 'Leg Destroyer', reward: 'Amazing power!' },
            { level: 9, requirement: { type: 'category', category: 'Legs & Glutes', value: 75 }, title: 'Quad Titan', reward: 'Almost legendary!' },
            { level: 10, requirement: { type: 'category', category: 'Legs & Glutes', value: 100 }, title: 'Leg Legend', reward: 'Unstoppable legs!' }
        ]
    },

    // 🧘 Balance/Recovery Achievements
    {
        id: 'balance-master',
        name: 'Balance Master',
        description: 'Perfect your balance and recovery',
        icon: '🧘',
        category: 'wellness',
        levels: [
            { level: 1, requirement: { type: 'category', category: 'Balance/Recovery', value: 1 }, title: 'Finding Balance', reward: 'First step to zen!' },
            { level: 2, requirement: { type: 'category', category: 'Balance/Recovery', value: 3 }, title: 'Getting Centered', reward: 'Balance building!' },
            { level: 3, requirement: { type: 'category', category: 'Balance/Recovery', value: 5 }, title: 'Steady Progress', reward: 'Finding your center!' },
            { level: 4, requirement: { type: 'category', category: 'Balance/Recovery', value: 10 }, title: 'Balance Champion', reward: 'Rock solid stability!' },
            { level: 5, requirement: { type: 'category', category: 'Balance/Recovery', value: 15 }, title: 'Zen Warrior', reward: 'Perfect poise!' },
            { level: 6, requirement: { type: 'category', category: 'Balance/Recovery', value: 25 }, title: 'Recovery Master', reward: 'Mind-body harmony!' },
            { level: 7, requirement: { type: 'category', category: 'Balance/Recovery', value: 35 }, title: 'Stability Star', reward: 'Elite balance!' },
            { level: 8, requirement: { type: 'category', category: 'Balance/Recovery', value: 50 }, title: 'Balance Titan', reward: 'Incredible stability!' },
            { level: 9, requirement: { type: 'category', category: 'Balance/Recovery', value: 75 }, title: 'Zen Master', reward: 'Almost perfect!' },
            { level: 10, requirement: { type: 'category', category: 'Balance/Recovery', value: 100 }, title: 'Balance Legend', reward: 'Ultimate stability!' }
        ]
    },

    // 🌿 Stretching Achievements
    {
        id: 'flexibility-master',
        name: 'Flexibility Master',
        description: 'Improve flexibility and mobility through stretching',
        icon: '🌿',
        category: 'wellness',
        levels: [
            { level: 1, requirement: { type: 'stretches-total', value: 1 }, title: 'First Stretch', reward: 'Starting to stretch!' },
            { level: 2, requirement: { type: 'stretches-total', value: 3 }, title: 'Flexibility Starter', reward: 'Getting bendy!' },
            { level: 3, requirement: { type: 'stretches-total', value: 8 }, title: 'Stretch Seeker', reward: 'Building flexibility!' },
            { level: 4, requirement: { type: 'stretches-total', value: 15 }, title: 'Limber Learner', reward: 'Getting flexible!' },
            { level: 5, requirement: { type: 'stretches-total', value: 25 }, title: 'Mobility Master', reward: 'Smooth and supple!' },
            { level: 6, requirement: { type: 'stretches-total', value: 40 }, title: 'Flexibility Fighter', reward: 'Incredibly limber!' },
            { level: 7, requirement: { type: 'stretches-total', value: 60 }, title: 'Stretch Star', reward: 'Elite flexibility!' },
            { level: 8, requirement: { type: 'stretches-total', value: 80 }, title: 'Yoga Warrior', reward: 'Amazing mobility!' },
            { level: 9, requirement: { type: 'stretches-total', value: 120 }, title: 'Flexibility Titan', reward: 'Almost perfect!' },
            { level: 10, requirement: { type: 'stretches-total', value: 150 }, title: 'Flexibility Legend', reward: 'Ultimate flexibility!' }
        ]
    },

    // 🎯 Mission Achievements
    {
        id: 'mission-master',
        name: 'Mission Master',
        description: 'Complete missions and grow stronger',
        icon: '🎯',
        category: 'dedication',
        levels: [
            { level: 1, requirement: { type: 'missions-total', value: 1 }, title: 'Mission Starter', reward: 'First mission done!' },
            { level: 2, requirement: { type: 'missions-total', value: 5 }, title: 'Getting Started', reward: 'Building momentum!' },
            { level: 3, requirement: { type: 'missions-total', value: 10 }, title: 'Mission Regular', reward: 'Into the groove!' },
            { level: 4, requirement: { type: 'missions-total', value: 20 }, title: 'Mission Warrior', reward: 'Real dedication!' },
            { level: 5, requirement: { type: 'missions-total', value: 35 }, title: 'Mission Champion', reward: 'Serious commitment!' },
            { level: 6, requirement: { type: 'missions-total', value: 50 }, title: 'Half Century', reward: 'Amazing milestone!' },
            { level: 7, requirement: { type: 'missions-total', value: 75 }, title: 'Mission Elite', reward: 'Elite dedication!' },
            { level: 8, requirement: { type: 'missions-total', value: 100 }, title: 'Century Club', reward: 'Incredible achievement!' },
            { level: 9, requirement: { type: 'missions-total', value: 150 }, title: 'Mission Titan', reward: 'Almost legendary!' },
            { level: 10, requirement: { type: 'missions-total', value: 200 }, title: 'Mission Legend', reward: 'Ultimate dedication!' }
        ]
    }
];

// Inspiring fitness quotes for footer display
const inspiringQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can do it. It's your mind you need to convince.",
    "Success isn't given. It's earned in the gym.",
    "Every workout is progress, no matter how small.",
    "Strength doesn't come from what you can do. It comes from overcoming what you once thought you couldn't.",
    "You're stronger than your excuses.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't wish for it, work for it.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "Start where you are. Use what you have. Do what you can.",
    "Champions train, losers complain.",
    "Sweat is fat crying.",
    "Make yourself proud.",
    "It's not about perfect. It's about effort.",
    "The groundwork for all happiness is good health.",
    "Take care of your body. It's the only place you have to live.",
    "Health is not about the weight you lose, but about the life you gain.",
    "Every step counts, no matter how small.",
    "Believe in yourself and all that you are.",
    "Progress, not perfection.",
    "You are stronger than you think.",
    "Fall seven times, stand up eight.",
    "The best project you'll ever work on is you.",
    "Small steps every day lead to big changes.",
    "Your only limit is your mind.",
    "Consistency beats perfection.",
    "A healthy outside starts from the inside.",
    "Move your body, boost your mood.",
    "Invest in your health today for a better tomorrow.",
    "You don't have to be perfect, you just have to be consistent."
];

// Make quotes available globally
window.inspiringQuotes = inspiringQuotes;

// All functions and data are now globally available