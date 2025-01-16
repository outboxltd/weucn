import Phaser from 'phaser';
import { levels } from './levels';

/**
 * המחלקה הראשית של המשחק
 * מכילה את כל הלוגיקה של המשחק כולל:
 * - ניהול שחקן ודמויות
 * - מערכת ניקוד
 * - פיזיקה והתנגשויות
 * - אויבים ופרסים
 */
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        // מאפיינים בסיסיים של המשחק
        this.score = 0;          // ניקוד נוכחי
        this.highScore = 0;      // שיא
        this.hasShield = false;  // האם יש מגן
        this.hasPowerup = false; // האם יש כוח-על
        this.currentLevel = 0;   // שלב נוכחי
        this.selectedCharacter = 'dude'; // דמות נבחרת
        this.fireballs = 0;      // מספר כדורי אש זמינים
        this.gameOver = false;   // האם המשחק הסתיים
    }

    /**
     * טעינת כל הנכסים הדרושים למשחק
     * כולל תמונות, ספרייטים ואפקטים
     */
    preload() {
        // טעינת תמונות
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('diamond', 'diamond.png');
        this.load.image('coin', 'coin.png');
        this.load.image('bomb', 'bomb.png');
        this.load.image('fireball', 'fireball.png');
        this.load.image('robot', 'robot.png');

        // טעינת ספרייט-שיטים
        this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('ninja', 'dude.png', { frameWidth: 32, frameHeight: 48 }); // משתמש בדמות הרגילה בינתיים
        this.load.spritesheet('slime', 'slime.png', { frameWidth: 32, frameHeight: 32 });
    }

    /**
     * יצירת המשחק והגדרת כל המרכיבים הבסיסיים
     */
    create() {
        const level = levels[this.currentLevel];
        
        // יצירת רקע
        this.add.image(400, 300, 'sky');

        // יצירת טקסט מקשים
        this.keyText = this.add.text(600, 16, 'מקש אחרון: אין', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        // יצירת טקסט ניקוד
        this.scoreText = this.add.text(16, 16, 'ניקוד: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });

        // יצירת טקסט כדורי אש
        this.fireballText = this.add.text(16, 50, 'כדורי אש: 0', {
            fontSize: '32px',
            fill: '#ff0',
            fontFamily: 'Arial'
        });

        // יצירת פלטפורמות
        this.platforms = this.physics.add.staticGroup();
        level.platforms.forEach(platform => {
            const p = this.platforms.create(platform.x, platform.y, 'ground');
            if (platform.scale) {
                p.setScale(platform.scale).refreshBody();
            }
        });

        // יצירת השחקן
        this.createPlayer();

        // הגדרת התנגשויות עם פלטפורמות
        this.physics.add.collider(this.player, this.platforms);

        // יצירת אויבים
        this.createEnemies(level);

        // יצירת פריטים לאיסוף
        this.createCollectibles();

        // הגדרת שליטה במקלדת
        this.setupKeyboardControls();
    }

    /**
     * יצירת השחקן
     */
    createPlayer() {
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }

    /**
     * יצירת אויבים
     */
    createEnemies(level) {
        this.enemies = this.physics.add.group();
        
        level.enemies.forEach(enemy => {
            const e = this.enemies.create(enemy.x, enemy.y, 'slime');
            e.setBounce(0.2);
            e.setCollideWorldBounds(true);
            e.setVelocityX(100);
            e.range = enemy.range;
            e.startX = enemy.x;
        });

        // הגדרת התנגשויות
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.player, this.enemies, this.hitEnemy, null, this);
    }

    /**
     * יצירת פריטים לאיסוף
     */
    createCollectibles() {
        // יצירת קבוצות של פריטים
        this.stars = this.physics.add.group();
        this.coins = this.physics.add.group();
        this.diamonds = this.physics.add.group();

        // הוספת כוכבים
        const level = levels[this.currentLevel];
        level.stars.forEach(pos => {
            const star = this.stars.create(pos.x, pos.y, 'star');
            star.setBounceY(0.4);
        });

        // הוספת מטבעות
        level.coins.forEach(pos => {
            const coin = this.coins.create(pos.x, pos.y, 'coin');
            coin.setBounceY(0.4);
        });

        // הוספת יהלומים
        level.diamonds.forEach(pos => {
            const diamond = this.diamonds.create(pos.x, pos.y, 'diamond');
            diamond.setBounceY(0.4);
        });

        // הגדרת התנגשויות
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.collider(this.diamonds, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.diamonds, this.collectDiamond, null, this);
    }

    /**
     * הגדרת שליטה במקלדת
     */
    setupKeyboardControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // מקשים להחלפת דמות
        this.input.keyboard.on('keydown-ONE', () => {
            this.selectedCharacter = 'dude';
            this.keyText.setText('מקש אחרון: 1');
            this.restartLevel();
        });
        
        this.input.keyboard.on('keydown-TWO', () => {
            this.selectedCharacter = 'ninja';
            this.keyText.setText('מקש אחרון: 2');
            this.restartLevel();
        });
        
        this.input.keyboard.on('keydown-THREE', () => {
            this.selectedCharacter = 'robot';
            this.keyText.setText('מקש אחרון: 3');
            this.restartLevel();
        });

        // מקש לירי כדור אש
        this.input.keyboard.on('keydown-SPACE', () => {
            this.keyText.setText('מקש אחרון: רווח');
            this.shootFireball();
        });
    }

    /**
     * טיפול בירי כדור אש
     */
    shootFireball() {
        if (this.fireballs > 0) {
            const fireball = this.physics.add.sprite(this.player.x, this.player.y, 'fireball');
            fireball.setScale(0.5);
            
            // כיוון הירי בהתאם לכיוון השחקן
            const direction = this.player.flipX ? -1 : 1;
            fireball.setVelocityX(direction * 400);
            
            // הגדרת התנגשויות
            this.physics.add.collider(fireball, this.platforms, (fb) => fb.destroy());
            this.physics.add.overlap(fireball, this.enemies, this.hitEnemyWithFireball, null, this);
            
            // הפחתת כדור אש
            this.fireballs--;
            this.fireballText.setText('כדורי אש: ' + this.fireballs);
        }
    }

    /**
     * טיפול בפגיעת כדור אש באויב
     */
    hitEnemyWithFireball(fireball, enemy) {
        fireball.destroy();
        enemy.destroy();
        this.score += 30;
        this.scoreText.setText('ניקוד: ' + this.score);
    }

    /**
     * טיפול בפגיעה באויב
     */
    hitEnemy(player, enemy) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOver = true;
    }

    /**
     * איסוף כוכב
     */
    collectStar(player, star) {
        star.disableBody(true, true);
        
        // עדכון ניקוד
        this.score += 10;
        this.scoreText.setText('ניקוד: ' + this.score);
        this.updateHighScore();

        // הוספת כדור אש
        this.fireballs++;
        this.fireballText.setText('כדורי אש: ' + this.fireballs);

        this.checkLevelComplete();
    }

    /**
     * איסוף מטבע
     */
    collectCoin(player, coin) {
        coin.disableBody(true, true);
        this.score += 15;
        this.scoreText.setText('ניקוד: ' + this.score);
        this.updateHighScore();
        
        // הוספת כדור אש
        this.fireballs++;
        this.fireballText.setText('כדורי אש: ' + this.fireballs);
    }

    /**
     * איסוף יהלום
     */
    collectDiamond(player, diamond) {
        diamond.disableBody(true, true);
        this.score += 30;
        this.scoreText.setText('ניקוד: ' + this.score);
        this.updateHighScore();
        
        // הוספת שני כדורי אש
        this.fireballs += 2;
        this.fireballText.setText('כדורי אש: ' + this.fireballs);
    }

    /**
     * עדכון שיא
     */
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    /**
     * בדיקה אם השלב הושלם
     */
    checkLevelComplete() {
        if (this.stars.countActive(true) === 0 &&
            this.coins.countActive(true) === 0 &&
            this.diamonds.countActive(true) === 0) {
            this.currentLevel = (this.currentLevel + 1) % levels.length;
            this.scene.restart();
        }
    }

    /**
     * עדכון המשחק בכל פריים
     */
    update() {
        if (this.gameOver) {
            return;
        }

        this.updatePlayerMovement();
        this.updateEnemies();
    }

    /**
     * עדכון תנועת השחקן
     */
    updatePlayerMovement() {
        const speed = 160;

        if (this.cursors.left.isDown) {
            this.keyText.setText('מקש אחרון: שמאל');
            this.player.setVelocityX(-speed);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.keyText.setText('מקש אחרון: ימין');
            this.player.setVelocityX(speed);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.keyText.setText('מקש אחרון: למעלה');
            this.player.setVelocityY(-330);
        }

        // טיפול בירי
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.shootFireball();
        }
    }

    /**
     * עדכון תנועת האויבים
     */
    updateEnemies() {
        this.enemies.children.iterate((enemy) => {
            if (enemy && enemy.x < enemy.startX - enemy.range) {
                enemy.setVelocityX(100);
            } else if (enemy && enemy.x > enemy.startX + enemy.range) {
                enemy.setVelocityX(-100);
            }
        });
    }

    /**
     * הצגת מסך סיום משחק
     */
    showGameOver() {
        const gameOverText = this.add.text(400, 300, 'המשחק נגמר\nלחץ על ENTER להתחיל מחדש', {
            fontSize: '64px',
            fill: '#fff',
            fontFamily: 'Arial',
            align: 'center'
        });
        gameOverText.setOrigin(0.5);

        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.restart();
            this.score = 0;
            this.currentLevel = 0;
            this.gameOver = false;
            this.fireballs = 0;
        });
    }
}

// הגדרות המשחק
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

// יצירת המשחק
new Phaser.Game(config);
