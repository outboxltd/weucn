export const levels = [
    {
        name: 'התחלה',
        background: 'sky',
        platforms: [
            { x: 400, y: 568, scale: 1.5 },
            { x: 600, y: 400 },
            { x: 50, y: 250 },
            { x: 750, y: 220 }
        ],
        gravity: 300,
        enemies: [
            { x: 300, y: 500, range: 100 },
            { x: 500, y: 350, range: 100 }
        ],
        stars: [
            { x: 100, y: 200 },
            { x: 400, y: 300 },
            { x: 700, y: 200 }
        ],
        coins: [
            { x: 200, y: 350 },
            { x: 500, y: 200 }
        ],
        diamonds: [
            { x: 300, y: 150 }
        ]
    },
    {
        name: 'מערה',
        background: 'sky',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 200, y: 400 },
            { x: 400, y: 300 },
            { x: 600, y: 200 }
        ],
        gravity: 250,
        enemies: [
            { x: 200, y: 350, range: 150 },
            { x: 400, y: 250, range: 150 },
            { x: 600, y: 150, range: 150 }
        ],
        stars: [
            { x: 100, y: 350 },
            { x: 300, y: 250 },
            { x: 500, y: 150 }
        ],
        coins: [
            { x: 200, y: 300 },
            { x: 400, y: 200 },
            { x: 600, y: 100 }
        ],
        diamonds: [
            { x: 300, y: 100 },
            { x: 500, y: 50 }
        ]
    },
    {
        name: 'הר געש',
        background: 'background3',
        platforms: [
            { x: 400, y: 568, scale: 2 },
            { x: 100, y: 450 },
            { x: 300, y: 350 },
            { x: 500, y: 250 },
            { x: 700, y: 150 }
        ],
        gravity: 200,
        enemies: [
            { x: 100, y: 400, range: 200 },
            { x: 300, y: 300, range: 200 },
            { x: 500, y: 200, range: 200 },
            { x: 700, y: 100, range: 200 }
        ],
        stars: [
            { x: 50, y: 400 },
            { x: 250, y: 300 },
            { x: 450, y: 200 },
            { x: 650, y: 100 }
        ],
        coins: [
            { x: 150, y: 350 },
            { x: 350, y: 250 },
            { x: 550, y: 150 }
        ],
        diamonds: [
            { x: 250, y: 200 },
            { x: 450, y: 100 },
            { x: 650, y: 50 }
        ]
    }
];
