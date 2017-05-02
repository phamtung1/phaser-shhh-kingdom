class Player {
    constructor(x, y, resourceName) {
        this._SHOOTING_DELAY = 300;
        this._MOVING_SPEED = 150;
        this._BULLET_SPEED = 350;
        this._nextShoot = game.time.now + this._SHOOTING_DELAY;
        this.angle = 0;
        this.sprite = game.add.sprite(x, y, resourceName)

        this.sprite.scale.set(0.9)
        this.sprite.anchor.setTo(0.5, 0.5)
        game.physics.enable(this.sprite)
        this.sprite.body.setSize(24, 24, 3, 3);
        this.sprite.body.collideWorldBounds = true

        this.bulletExists = false
        this.hasShootingSound = true;
        this.shootingSound = game.add.audio('shoot')

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 5; i++) {
            var b = this.bullets.create(0, 0, 'bullet');
            b.anchor.set(0.5);
            b.name = 'bullet' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.killBullet, this);
        }
    }
    boostSpeed() {
        this._MOVING_SPEED = 300;
    }
    resetSpeed() {
        if (this._MOVING_SPEED > 120) {
            this._MOVING_SPEED = 120;
        }
    }
    move(cursors) {
        this.sprite.body.velocity.x = 0
        this.sprite.body.velocity.y = 0

        if (cursors.left.isDown) {
            this.sprite.body.velocity.x = -this._MOVING_SPEED
            this.sprite.frame = 3
            this.angle = 270
        } else if (cursors.right.isDown) {
            this.sprite.body.velocity.x = this._MOVING_SPEED
            this.sprite.frame = 1
            this.angle = 90
        } else if (cursors.up.isDown) {
            this.sprite.body.velocity.y = -this._MOVING_SPEED
            this.sprite.frame = 0
            this.angle = 0
        } else if (cursors.down.isDown) {
            this.sprite.body.velocity.y = this._MOVING_SPEED
            this.sprite.frame = 2
            this.angle = 180
        }
    }

    shoot() {
        if (game.time.now > this._nextShoot) {

            var bullet = this.bullets.getFirstExists(false);

            if (bullet) {
                if (this.hasShootingSound) {
                    this.shootingSound.play()
                }
                bullet.reset(this.sprite.x, this.sprite.y);
                game.world.bringToTop(this.bullets)
                if (this.angle === 270) {
                    bullet.body.velocity.x = -this._BULLET_SPEED
                } else if (this.angle === 90) {
                    bullet.body.velocity.x = this._BULLET_SPEED
                } else if (this.angle === 0) {
                    bullet.body.velocity.y = -this._BULLET_SPEED
                } else if (this.angle === 180) {
                    bullet.body.velocity.y = this._BULLET_SPEED
                }
                this._nextShoot = game.time.now + this._SHOOTING_DELAY;
            }
        }
    }

    killBullet(bullet) {
        bullet.kill()
    }
}