let GuideState = {
  create() {
    Helper.addTitle(game.world.centerX, 100, 'How To Play')
    Helper.addText(100, 150, 'Arrow keys to move')
    Helper.addText(100, 200, 'Spacebar to shoot')

    game.add.sprite(65, 250, 'enemy')
    Helper.addText(100, 250, 'Old enemy (+1 point per kill)')
    game.add.sprite(65, 300, 'enemy').tint = 0xff1122;
    Helper.addText(100, 300, 'Young enemy (+3 points per kill)')

    Helper.addText(100, 400, 'The Queen is your, protect her with all')
    Helper.addText(100, 450, 'your life and kill all enemies')
    Helper.addSubTitle(game.world.centerX, 550, 'Press Enter to start')
    Helper.addKeyOnce(Phaser.Keyboard.ENTER, this.startGame, this)
  },
  startGame() {
    game.state.start('GameState')
  }
}
