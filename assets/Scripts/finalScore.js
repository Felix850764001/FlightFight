// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        finalScore: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        this.finalScore.string = "你的最终分数是:" + score;
        score = 0;
    },

    start () {

    },

    // update (dt) {},
});
