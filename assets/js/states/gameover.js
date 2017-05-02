let GameOverState = {
    create() {
        Helper.addTitle(game.world.centerX, 200, GlobalStorage.isWin ? 'Congratulation!' : 'Game Over!')
        Helper.addSubTitle(game.world.centerX, 250, 'Your score: ' + GlobalStorage.player1Score)
        Helper.addSubTitle(game.world.centerX, 300, 'Press Enter to continue')
        Helper.addKeyOnce(Phaser.Keyboard.ENTER, this.startGame, this)
    },
    startGame() {
        game.state.start('MenuState')
    }
}
