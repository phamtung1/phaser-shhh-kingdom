let GameState = {
  create() {
    game.stage.disableVisibilityChange = true;
    game.stage.backgroundColor = '#000'

    game.physics.startSystem(Phaser.Physics.ARCADE)
    this.player1Lives = 3;
    this.player1Score = GlobalStorage.player1Score || 0;

    this.map = game.add.tilemap('level' + GlobalStorage.level);
    this.map.addTilesetImage('tiles')
    this.layer = this.map.createLayer('Tile Layer 1')

    this.bricks = game.add.group()
    this.whiteBricks = game.add.group()
    this.leaves = game.add.group()
    this.waters = game.add.group()
    this.ices = game.add.group()
    this.map.createFromTiles(2, 1, 'brick', this.layer.index, this.bricks)
    this.map.createFromTiles(3, 3, 'whitebrick', this.layer.index, this.whiteBricks)
    this.map.createFromTiles(4, 4, 'leave', this.layer.index, this.leaves)
    this.map.createFromTiles(5, 5, 'water', this.layer.index, this.waters)
    this.map.createFromTiles(6, 6, 'ice', this.layer.index, this.ices)

    game.physics.enable(this.bricks)
    game.physics.enable(this.whiteBricks)
    game.physics.enable(this.waters)
    game.physics.enable(this.ices)

    this.bricks.setAll('body.immovable', true)
    this.whiteBricks.setAll('body.immovable', true)
    this.waters.setAll('body.immovable', true)
    // this.ices.setAll('body.immovable', true)
    this.king = game.add.sprite(30 * 10, game.world.height - 60 + 30, 'king');
    this.king.anchor.set(0.5)
    setInterval(() => {
      this.king.frame = this.king.frame == 1 ? 2 : 1
    }, 1000);

    game.physics.enable(this.king)
    this.king.body.immovable = true;
    this.player1LivesText = game.add.text(10, 10, 'Lives: 3', { font: '16px Arial', fill: '#fff' });
    this.player1ScoreText = game.add.text(10, 30, 'Score: ' + this.player1Score, { font: '16px Arial', fill: '#fff' });

    this.player1 = new Player(30 * 8 - 15, game.world.height - 15, 'player')
    this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.spaceBar.onDown.add(() => this.player1.shoot())

    this.enemyGroup = new EnemyGroup();
    game.world.bringToTop(this.leaves)
    this.enemyLeftText = game.add.text(game.world.width - 100, 10, 'Enemies: ' + this.enemyGroup.enemyLeft, { font: '16px Arial', fill: '#fff' });

    this.cursors = game.input.keyboard.createCursorKeys()
  },

  update() {
    if (game.physics.arcade.overlap(this.player1.sprite, this.ices)) {
      this.player1.boostSpeed();
    } else {
      this.player1.resetSpeed();
    }
    game.physics.arcade.collide(this.player1.sprite, this.king)
    game.physics.arcade.collide(this.player1.sprite, this.bricks, this.collideBrick, null, this)
    game.physics.arcade.collide(this.player1.sprite, this.whiteBricks)
    game.physics.arcade.collide(this.player1.sprite, this.waters)

    game.physics.arcade.collide(this.player1.bullets, this.bricks, this.killBrick, null, this)
    game.physics.arcade.collide(this.player1.bullets, this.whiteBricks, this.killBullet, null, this)
    game.physics.arcade.collide(this.player1.bullets, this.king, this.killKing, null, this)
    this.player1.move(this.cursors)

    for (var enemy of this.enemyGroup.list) {
      if (enemy.sprite.alive) {
        if (game.physics.arcade.overlap(enemy.sprite, this.ices)) {
          enemy.boostSpeed();
        } else {
          enemy.resetSpeed();
        }
        game.physics.arcade.collide(this.player1.sprite, enemy.sprite)
        game.physics.arcade.collide(enemy.sprite, this.player1.bullets, this.killEnemy, null, this)
        game.physics.arcade.collide(enemy.sprite, this.bricks)
        game.physics.arcade.collide(enemy.sprite, this.waters)
        game.physics.arcade.collide(enemy.sprite, this.whiteBricks)
        game.physics.arcade.collide(enemy.bullets, this.bricks, this.killBrick, null, this)
        game.physics.arcade.collide(enemy.bullets, this.whiteBricks, this.killBullet, null, this)
        game.physics.arcade.collide(enemy.bullets, this.player1.sprite, this.killPlayer, null, this)
        game.physics.arcade.collide(enemy.bullets, this.king, this.killKing, null, this)

        enemy.move()
        enemy.shoot()
      }
    }
  },
  addPlayer(id, x, y, angle) {
    this.player1 = new Player(30, 30, 'player')
    this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.spaceBar.onDown.add(() => this.player1.shoot())
    this.player1.angle = angle
  },
  createExplosion(x, y) {
    this.explosion = game.add.sprite(x, y, 'explosion')
    this.explosion.anchor.setTo(0.5, 0.5)
    this.explosion.animations.add('explode', [0, 1, 2, 3, 2, 1, 0], 20, false)
    this.explosion.animations.play('explode', 100, false, true)
  },
  killKing(king, bullet) {
    this.createExplosion(bullet.x, bullet.y)
    bullet.kill()
    king.kill()
    GlobalStorage.player1Score = this.player1Score;
    game.state.start('GameOverState');
  },
  killPlayer(player, bullet) {
    bullet.kill()
    if (this.player1Lives > 0) {
      this.player1Lives--;
      this.player1.sprite.x = 30 * 8 - 15
      this.player1.sprite.y = game.world.height - 15
      this.updatePlayer1Live()
    }
    else {
      GlobalStorage.player1Score = this.player1Score;
      game.state.start('GameOverState');
    }
  },
  killBullet(bullet, brick) {
    this.createExplosion(bullet.x, bullet.y)
    bullet.kill()
  },
  killEnemy(enemySprite, bullet) {
    this.createExplosion(enemySprite.x, enemySprite.y)
    bullet.kill()
    this.enemyGroup.remove(enemySprite)
    this.addPlayer1Score(enemySprite._tanktype === 0 ? 1 : 3);
    this.enemyLeftText.setText('Enemies: ' + this.enemyGroup.enemyLeft);

    game.world.bringToTop(this.leaves) // bring leaves to top
    if (this.enemyGroup.list.length === 0) {
      GlobalStorage.player1Score = this.player1Score;
      if (GlobalStorage.level < 4) {
        GlobalStorage.level++;
        game.state.start('NextLevelState')
      } else {
        GlobalStorage.isWin = true;
        game.state.start('GameOverState')
      }
    }

  },
  collideBrick(player, brick) {
    if (brick.frame == 0) {
      brick.frame = 3;
      setTimeout(() => brick.frame = 0, 1000);
    }
  },
  killBrick(bullet, brick) {
    this.createExplosion(bullet.x, bullet.y)
    bullet.kill()
    brick.frame = 2;
    setTimeout(() => brick.kill(), 200);
  },
  addPlayer1Score(score) {
    this.player1Score += score
    this.player1ScoreText.setText('Score: ' + this.player1Score);
  },
  updatePlayer1Live() {
    this.player1LivesText.setText('Lives: ' + this.player1Lives);
  },
  shutdown() {
    this.game.world.removeAll();
  },
  render() {
    // game.debug.body(this.player1.sprite, 32, 32);
    //  game.debug.text(this.enemyGroup.list.length + "", 300, 30);
    //   game.debug.text(GlobalStorage.player1Score + "", 300, 60);
  }
}
