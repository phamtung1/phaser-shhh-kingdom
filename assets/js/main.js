var GlobalStorage = {
    level: 1,
    player1Score: 0,
    isWin: false
};

let game = new Phaser.Game(600, 600, Phaser.AUTO)
game.state.add('BootState', BootState)
game.state.add('PreloadState', PreloadState)
game.state.add('MenuState', MenuState)
game.state.add('GuideState', GuideState)
game.state.add('GameState', GameState)
game.state.add('NextLevelState', NextLevelState)
game.state.add('GameOverState', GameOverState)

game.state.start('BootState')
