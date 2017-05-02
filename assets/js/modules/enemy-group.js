class EnemyGroup {
    constructor() {
        this._MAXIMUM_ENEMY = 4 + GlobalStorage.level * 2
        this._NUM_OF_ENEMY = 4
        this.enemyCreate = 0
        this.list = [];
        for (var i = 0; i < this._NUM_OF_ENEMY; i++) {
            this._createNew()
        }
        this.enemyLeft = this._MAXIMUM_ENEMY;
    }
    _createNew() {
        var x = Helper.randomInt(0, 1) === 0 ? 15 : game.world.width - 15;
        var type = Helper.randomInt(0, 2);
        var enemy = new Enemy(x, 15, 'enemy')
        enemy.sprite._tanktype = type === 2 ? 2 : 0;
        enemy.sprite._index = this.enemyCreate;
        if (type === 2) {
            enemy.setSpeed(150)
            enemy.sprite.tint = 0xff1122;
        }

        this.list.push(enemy);
        this.enemyCreate++;
    }
    remove(enemySprite) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].sprite._index === enemySprite._index) {
                this.list.splice(i, 1);
                break;
            }
        }
        enemySprite.kill()
        this.enemyLeft--;
        if (this.enemyCreate < this._MAXIMUM_ENEMY) {
            this._createNew()
        }
    }


}