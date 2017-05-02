let MenuState = {
  create() {
    Helper.addTitle(game.world.centerX, 200, 'Shhh Kingdom')
    Helper.addSubTitle(game.world.centerX, 250, 'version: 1.0.1')
    Helper.addSubTitle(game.world.centerX, 300, 'Press Enter to continue')
    Helper.addKeyOnce(Phaser.Keyboard.ENTER, this.startGame, this)
  },
  startGame() {
    GlobalStorage.level = 1;
    GlobalStorage.player1Score = 0;
    GlobalStorage.isWin = false;
    game.state.start('GuideState')
  }
}
