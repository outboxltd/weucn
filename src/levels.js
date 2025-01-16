export const levels = [
    {
        name: 'שלב 1 - התחלה',
        background: 'sky',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 600, y: 400 },
            { x: 50, y: 250 },
            { x: 750, y: 220 }
        ],
        gravity: 300,
        stars: [
            { x: 100, y: 200 },
            { x: 200, y: 200 },
            { x: 300, y: 200 },
            { x: 400, y: 200 },
            { x: 500, y: 200 },
            { x: 600, y: 200 },
            { x: 700, y: 200 },
            { x: 800, y: 200 }
        ],
        coins: [
            { x: 250, y: 300 },
            { x: 550, y: 300 }
        ],
        diamonds: [
            { x: 400, y: 100 }
        ],
        enemies: [
            { x: 300, y: 500, range: 200 }
        ]
    },
    {
        name: 'שלב 2 - מערה',
        background: 'sky',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 200, y: 450, scale: 0.5 },
            { x: 400, y: 350, scale: 0.5 },
            { x: 600, y: 450, scale: 0.5 },
            { x: 400, y: 250, scale: 0.5 },
            { x: 100, y: 150, scale: 0.5 }
        ],
        gravity: 250,
        stars: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
            { x: 300, y: 300 },
            { x: 400, y: 200 },
            { x: 500, y: 300 },
            { x: 600, y: 200 },
            { x: 700, y: 300 },
            { x: 800, y: 200 },
            { x: 150, y: 400 },
            { x: 650, y: 400 }
        ],
        coins: [
            { x: 200, y: 350 },
            { x: 400, y: 150 },
            { x: 600, y: 350 }
        ],
        diamonds: [
            { x: 300, y: 100 },
            { x: 500, y: 100 }
        ],
        enemies: [
            { x: 200, y: 500, range: 150 },
            { x: 600, y: 500, range: 150 }
        ]
    },
    {
        name: 'שלב 3 - חלל',
        background: 'background3',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 100, y: 450, scale: 0.3 },
            { x: 700, y: 450, scale: 0.3 },
            { x: 400, y: 350, scale: 0.3 },
            { x: 200, y: 250, scale: 0.3 },
            { x: 600, y: 250, scale: 0.3 },
            { x: 400, y: 150, scale: 0.3 }
        ],
        gravity: 200,
        stars: [],
        coins: [],
        diamonds: [],
        enemies: []
    },
    {
        name: 'שלב 4 - אתגר',
        background: 'sky',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 150, y: 480, scale: 0.2 },
            { x: 300, y: 400, scale: 0.2 },
            { x: 450, y: 320, scale: 0.2 },
            { x: 600, y: 240, scale: 0.2 },
            { x: 750, y: 160, scale: 0.2 },
            { x: 50, y: 160, scale: 0.2 }
        ],
        gravity: 180,
        stars: [],
        coins: [],
        diamonds: [],
        enemies: []
    },
    {
        name: 'שלב 5 - בוס',
        background: 'background2',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 200, y: 450, scale: 0.15 },
            { x: 600, y: 450, scale: 0.15 },
            { x: 400, y: 350, scale: 0.15 },
            { x: 100, y: 250, scale: 0.15 },
            { x: 700, y: 250, scale: 0.15 },
            { x: 300, y: 150, scale: 0.15 },
            { x: 500, y: 150, scale: 0.15 }
        ],
        gravity: 150,
        stars: [],
        coins: [],
        diamonds: [],
        enemies: []
    }
];
