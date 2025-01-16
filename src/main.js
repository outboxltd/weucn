import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.score = 0;
    }

    preload() {
        // טעינת נכסים מקומיים
        this.load.image('sky', '/assets/sky.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('star', '/assets/star.png');
        this.load.image('bomb', '/assets/bomb.png');
        this.load.spritesheet('dude', 
            '/assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        // רקע
        this.add.image(400, 300, 'sky');

        // פלטפורמות
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // שחקן
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // אנימציות
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // כוכבים
        const stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // פצצות
        this.bombs = this.physics.add.group();

        // טקסט ניקוד
        this.scoreText = this.add.text(16, 16, 'ניקוד: 0', { 
            fontSize: '32px', 
            fill: '#000',
            fontFamily: 'Arial'
        });

        // התנגשויות
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(this.player, stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        // שליטה במקלדת
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.gameOver) {
            return;
        }

        // תנועה
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // קפיצה
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('ניקוד: ' + this.score);

        if (this.score % 100 === 0) {
            this.addBomb();
        }

        // בדוק אם כל הכוכבים נאספו
        const remainingStars = this.children.list.filter(child => 
            child.texture && child.texture.key === 'star' && child.active
        );

        if (remainingStars.length === 0) {
            // צור כוכבים חדשים
            const stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });

            stars.children.iterate((child) => {
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });

            // הוסף התנגשויות לכוכבים החדשים
            this.physics.add.collider(stars, this.platforms);
            this.physics.add.overlap(this.player, stars, this.collectStar, null, this);
        }
    }

    addBomb() {
        const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;

        // הוסף טקסט Game Over
        const gameOverText = this.add.text(400, 300, 'המשחק נגמר\nלחץ על הרווח להתחיל מחדש', {
            fontSize: '64px',
            fill: '#000',
            fontFamily: 'Arial',
            align: 'center'
        });
        gameOverText.setOrigin(0.5);

        // הוסף אפשרות להתחיל מחדש
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.restart();
            this.score = 0;
            this.gameOver = false;
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: MainScene
};

new Phaser.Game(config);
