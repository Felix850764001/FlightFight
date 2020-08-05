// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//dev分支第二次创作
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onCollisionEnter: function (other, self) {
        this.game.onBulletKilled(this.node);
    },

    start () {

    },

    update: function(dt) {
        this.node.x += this.speed * dt;
        //子弹飞出屏幕，自动销毁
        if(this.node.x > 430){
            this.game.onBulletKilled(this.node);
            return;
        }
    },
});
