var Helper = (function () {
    var TITLE_FONTSTYLE = { font: '50px Arial', fill: '#fff' };
    var SUBTITLE_FONTSTYLE = { font: '20px Arial', fill: '#fff' };

    var _me = {}
    _me.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    _me.addTitle = function (x, y, text) {
        var text = game.add.text(x, y, text, TITLE_FONTSTYLE);
        text.anchor.set(0.5);
        return text;
    };

    _me.addSubTitle = function (x, y, text) {
        var text = game.add.text(x, y, text, SUBTITLE_FONTSTYLE);
        text.anchor.set(0.5);
        return text;
    };
     _me.addText = function (x, y, text) {
        var text = game.add.text(x, y, text, SUBTITLE_FONTSTYLE);
        return text;
    };
    _me.addKeyOnce = function (keyCode, callback, context) {
        let key = game.input.keyboard.addKey(keyCode)
        key.onDown.addOnce(callback, context)
    };
    return _me;
}());