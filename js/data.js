// Exercise library - simplified from the original missions
const exerciseLibrary = [
    // Core & Cardio
    {
        id: 'core-plank-basic',
        name: 'Basic Plank Hold',
        category: 'Core & Cardio',
        description: '30s x 3 sets'
    },
    {
        id: 'core-mountain-climbers',
        name: 'Mountain Climbers',
        category: 'Core & Cardio',
        description: '25-30 x 3 sets'
    },
    {
        id: 'core-russian-twists',
        name: 'Russian Twists',
        category: 'Core & Cardio',
        description: '18-22 x 3 sets'
    },
    {
        id: 'core-bicycle-crunches',
        name: 'Bicycle Crunches',
        category: 'Core & Cardio',
        description: '18-22 x 3 sets'
    },
    {
        id: 'cardio-jumping-jacks',
        name: 'Jumping Jacks',
        category: 'Core & Cardio',
        description: '25-30 x 3 sets'
    },
    {
        id: 'cardio-burpees',
        name: 'Burpees',
        category: 'Core & Cardio',
        description: '6-8 x 3 sets'
    },
    {
        id: 'cardio-step-ups',
        name: 'Step-Ups',
        category: 'Core & Cardio',
        description: '8-10 each leg x 3 sets'
    },
    {
        id: 'core-dead-bug',
        name: 'Dead Bug Exercise',
        category: 'Core & Cardio',
        description: '8-10 each side x 3 sets'
    },
    {
        id: 'core-side-plank',
        name: 'Side Plank',
        category: 'Core & Cardio',
        description: '25-30s each side x 2 sets'
    },
    {
        id: 'core-hollow-hold',
        name: 'Hollow Body Hold',
        category: 'Core & Cardio',
        description: '20-25s x 3 sets'
    },

    // Arms & Chest
    {
        id: 'arms-pushups',
        name: 'Push-Ups',
        category: 'Arms & Chest',
        description: '10-12 x 3 sets'
    },
    {
        id: 'arms-diamond-pushups',
        name: 'Diamond Push-Ups',
        category: 'Arms & Chest',
        description: '4-6 x 3 sets'
    },
    {
        id: 'arms-chair-dips',
        name: 'Chair Dips',
        category: 'Arms & Chest',
        description: '6-8 x 3 sets'
    },
    {
        id: 'arms-band-curls',
        name: 'Resistance Band Curls',
        category: 'Arms & Chest',
        description: '12-15 x 3 sets'
    },
    {
        id: 'arms-band-press',
        name: 'Band Chest Press',
        category: 'Arms & Chest',
        description: '12-15 x 3 sets'
    },
    {
        id: 'arms-band-rows',
        name: 'Band Rows',
        category: 'Arms & Chest',
        description: '12-15 x 3 sets'
    },
    {
        id: 'arms-band-overhead-triceps',
        name: 'Band Overhead Triceps Extension',
        category: 'Arms & Chest',
        description: '10-12 x 3 sets'
    },
    {
        id: 'arms-pike-pushups',
        name: 'Pike Push-Ups',
        category: 'Arms & Chest',
        description: '5-8 x 3 sets'
    },

    // Legs & Glutes
    {
        id: 'legs-bodyweight-squats',
        name: 'Bodyweight Squats',
        category: 'Legs & Glutes',
        description: '12-15 x 3 sets'
    },
    {
        id: 'legs-lunges',
        name: 'Forward Lunges',
        category: 'Legs & Glutes',
        description: '8-10 each leg x 3 sets'
    },
    {
        id: 'legs-glute-bridges',
        name: 'Glute Bridges',
        category: 'Legs & Glutes',
        description: '15-18 x 3 sets'
    },
    {
        id: 'legs-wall-sit',
        name: 'Wall Sit',
        category: 'Legs & Glutes',
        description: '30-35s x 3 sets'
    },
    {
        id: 'legs-calf-raises',
        name: 'Calf Raises',
        category: 'Legs & Glutes',
        description: '12-15 x 3 sets'
    },
    {
        id: 'legs-band-sidesteps',
        name: 'Band Side Steps',
        category: 'Legs & Glutes',
        description: '10-12 each side x 3 sets'
    },
    {
        id: 'legs-reverse-lunges',
        name: 'Reverse Lunges',
        category: 'Legs & Glutes',
        description: '8-10 each leg x 3 sets'
    },
    {
        id: 'legs-single-leg-glute-bridges',
        name: 'Single Leg Glute Bridges',
        category: 'Legs & Glutes',
        description: '8-10 each leg x 3 sets'
    },
    {
        id: 'legs-sumo-squats',
        name: 'Sumo Squats',
        category: 'Legs & Glutes',
        description: '12-15 x 3 sets'
    },

    // Balance/Recovery
    {
        id: 'balance-single-leg',
        name: 'Single Leg Stands',
        category: 'Balance/Recovery',
        description: '30-35s each leg x 2 sets'
    },
    {
        id: 'balance-bird-dogs',
        name: 'Bird Dog Exercise',
        category: 'Balance/Recovery',
        description: '8-10 each side x 3 sets'
    },
    {
        id: 'balance-yoga-tree',
        name: 'Tree Pose Balance',
        category: 'Balance/Recovery',
        description: '25-30s each side x 2 sets'
    },
    {
        id: 'cardio-walk-brisk',
        name: 'Brisk Walk',
        category: 'Balance/Recovery',
        description: '15-20 minutes'
    },
    {
        id: 'balance-yoga-warrior3',
        name: 'Warrior 3 Pose',
        category: 'Balance/Recovery',
        description: '25-30s each side x 2 sets'
    },
    {
        id: 'balance-leg-swings',
        name: 'Leg Swings',
        category: 'Balance/Recovery',
        description: '10-15 each direction x 2 legs'
    },
    {
        id: 'balance-standing-figure-4',
        name: 'Standing Figure-4 Stretch',
        category: 'Balance/Recovery',
        description: '30-45s each leg x 2 sets'
    }
];

// Make exercise library available globally
window.exerciseLibrary = exerciseLibrary;