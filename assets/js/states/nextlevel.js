let NextLevelState = {
  create() {
    Helper.addTitle(game.world.centerX, 200, 'Level ' + GlobalStorage.level)
    Helper.addSubTitle(game.world.centerX, 250, 'Current Score: ' + GlobalStorage.player1Score)
    Helper.addSubTitle(game.world.centerX, 300, 'Press Enter to start')
    Helper.addKeyOnce(Phaser.Keyboard.ENTER, this.startGame, this)
  },
  startGame() {
    game.state.start('GameState')
  }
}
