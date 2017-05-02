let BootState = {
  preload () {
    game.load.image('loading', 'assets/img/brick.png')
  },
  create () {
    game.state.start('PreloadState')
  }
}
