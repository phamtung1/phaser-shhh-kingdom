class Enemy extends Player {
    constructor(x, y, resourceName) {
        super(x, y, resourceName);
        this._ORIGNAL_SPEED = 60;
        this._MOVING_SPEED = 60;
        this.hasShootingSound = false
    }
    setSpeed(speed) {
        this._ORIGNAL_SPEED = speed;
        this._MOVING_SPEED = speed;
    }
    boostSpeed() {
        this._MOVING_SPEED = 300;
    }
    resetSpeed() {
        if (this._MOVING_SPEED !== this._ORIGNAL_SPEED) {
            this._MOVING_SPEED = this._ORIGNAL_SPEED;
            this.sprite.body.velocity.x = 0
            this.sprite.body.velocity.y = 0
        }
    }
    move() {

        var direction = Helper.randomInt(0, 200);
        if (direction === 0) {
            this.sprite.body.velocity.x = -this._MOVING_SPEED
            this.sprite.body.velocity.y = 0
            this.sprite.frame = 3
            this.angle = 270
        } else if (direction === 1) {
            this.sprite.body.velocity.x = this._MOVING_SPEED
            this.sprite.body.velocity.y = 0
            this.sprite.frame = 1
            this.angle = 90
        } else if (direction === 2) {
            this.sprite.body.velocity.x = 0
            this.sprite.body.velocity.y = -this._MOVING_SPEED
            this.sprite.frame = 0
            this.angle = 0
        } else if (direction === 3) {
            this.sprite.body.velocity.x = 0
            this.sprite.body.velocity.y = this._MOVING_SPEED
            this.sprite.frame = 2
            this.angle = 180
        }
    }
}