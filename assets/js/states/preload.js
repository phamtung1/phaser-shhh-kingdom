let PreloadState = {
  preload() {
    var loadingBar = game.add.sprite(game.world.centerX, game.world.centerY, "loading");
    loadingBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(loadingBar);
    game.load.spritesheet('player', 'assets/img/player.png', 30, 30)
    game.load.spritesheet('enemy', 'assets/img/enemy.png', 30, 30)
    game.load.spritesheet('explosion', 'assets/img/explosion.png', 30, 30)
    game.load.spritesheet('brick', 'assets/img/brick.png', 30, 30)
    game.load.image('whitebrick', 'assets/img/whitebrick.png')
    game.load.image('leave', 'assets/img/leave.png')
    game.load.image('water', 'assets/img/water.png')
    game.load.image('ice', 'assets/img/ice.png')
    game.load.image('bullet', 'assets/img/bullet.png')
    game.load.spritesheet('king', 'assets/img/king-shit.png', 60, 60, 2)

    game.load.image('tiles', 'assets/img/tiles.png')
    game.load.tilemap('level1', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.tilemap('level2', 'assets/maps/level2.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.tilemap('level3', 'assets/maps/level3.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.tilemap('level4', 'assets/maps/level4.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.tilemap('level5', 'assets/maps/level5.json', null, Phaser.Tilemap.TILED_JSON)

    game.load.audio('shoot', ['assets/sound/shoot.mp3'])
  },
  create() {
    game.state.start('MenuState')
  }
}
