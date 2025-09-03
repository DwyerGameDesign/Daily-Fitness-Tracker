// Weekly plan data with daily recommendations
const weeklyPlan = {
    day1: {
        focus: "Core & Cardio",
        exercises: [
            "core-plank-basic", "core-mountain-climbers", "core-russian-twists", 
            "core-bicycle-crunches", "cardio-jumping-jacks", "cardio-burpees", 
            "cardio-step-ups", "core-dead-bug", "core-side-plank", "core-hollow-hold"
        ],
        messages: [
            "A strong core supports your spine and improves posture.",
            "Core stability reduces risk of back pain as you age.",
            "Cardio boosts heart health and daily energy levels."
        ]
    },
    day2: {
        focus: "Legs & Glutes",
        exercises: [
            "legs-bodyweight-squats", "legs-lunges", "legs-glute-bridges", 
            "legs-wall-sit", "legs-calf-raises", "legs-band-sidesteps", 
            "legs-reverse-lunges", "legs-single-leg-glute-bridges", "legs-sumo-squats"
        ],
        messages: [
            "Strong legs make everyday activities easier — from climbing stairs to playing with your kids.",
            "Working glutes protects your lower back and improves hip stability.",
            "Building leg strength increases overall calorie burn."
        ]
    },
    day3: {
        focus: "Arms & Chest",
        exercises: [
            "arms-pushups", "arms-diamond-pushups", "arms-chair-dips", 
            "arms-band-curls", "arms-band-press", "arms-band-rows", 
            "arms-band-overhead-triceps", "arms-pike-pushups"
        ],
        messages: [
            "Upper body strength improves posture and reduces shoulder strain.",
            "Stronger arms and chest make pushing, pulling, and lifting in daily life easier.",
            "Muscle mass helps maintain a healthy metabolism as you age."
        ]
    },
    day4: {
        focus: "Balance & Recovery",
        exercises: [
            "balance-single-leg", "balance-bird-dogs", "balance-yoga-tree", 
            "cardio-walk-brisk", "balance-yoga-warrior3", "balance-leg-swings", 
            "balance-standing-figure-4"
        ],
        messages: [
            "Balance training reduces risk of falls and injuries.",
            "Recovery days give your muscles time to rebuild and grow stronger.",
            "Mind-body movements improve focus and reduce stress."
        ]
    },
    day5: {
        focus: "Full Body Mix",
        exercises: [
            "cardio-burpees", "cardio-step-ups", "arms-pike-pushups", 
            "core-side-plank", "legs-sumo-squats", "arms-pushups", 
            "legs-lunges", "core-russian-twists"
        ],
        messages: [
            "Full-body workouts build balanced strength and endurance.",
            "Mixing exercises keeps your routine fun and effective.",
            "Variety challenges your body and prevents plateaus."
        ]
    },
    day6: {
        focus: "Lower Body Strength",
        exercises: [
            "legs-reverse-lunges", "legs-single-leg-glute-bridges", "legs-sumo-squats", 
            "legs-band-sidesteps", "legs-wall-sit", "legs-glute-bridges", "legs-bodyweight-squats"
        ],
        messages: [
            "Lower body strength powers athletic movements like running and jumping.",
            "Strong hips and legs protect your knees and back.",
            "Leg training improves balance and everyday mobility."
        ]
    },
    day7: {
        focus: "Active Recovery & Mobility",
        exercises: [
            "balance-standing-figure-4", "balance-yoga-warrior3", "core-hollow-hold", 
            "core-bicycle-crunches", "cardio-walk-brisk", "balance-yoga-tree", "balance-single-leg"
        ],
        messages: [
            "Mobility keeps your joints healthy and pain-free.",
            "Active recovery reduces soreness and speeds up progress.",
            "Flexibility training improves posture and movement quality."
        ]
    }
};

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

// Get daily recommendations based on day of week
function getDailyRecommendations() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Map JavaScript day (0-6) to our plan days (1-7)
    const planDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Sunday becomes day 7
    const dayKey = `day${planDay}`;
    
    const dayPlan = weeklyPlan[dayKey];
    if (!dayPlan) return { exercises: [], message: "", focus: "" };
    
    // Select 5 random exercises from the day's list
    const shuffled = [...dayPlan.exercises].sort(() => 0.5 - Math.random());
    const selectedExerciseIds = shuffled.slice(0, 5);
    
    // Get full exercise objects
    const recommendedExercises = selectedExerciseIds.map(id => 
        exerciseLibrary.find(ex => ex.id === id)
    ).filter(Boolean);
    
    // Select random inspirational message
    const randomMessage = dayPlan.messages[Math.floor(Math.random() * dayPlan.messages.length)];
    
    return {
        exercises: recommendedExercises,
        message: randomMessage,
        focus: dayPlan.focus
    };
}

// Make functions available globally
window.exerciseLibrary = exerciseLibrary;
window.weeklyPlan = weeklyPlan;
window.getDailyRecommendations = getDailyRecommendations;
