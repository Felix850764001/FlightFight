// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //敌机移动速度
        maxMoveSpeed: 0,
        minMoveSpeed: 0,

        //碰撞半径
        playerRadius: 0,
        //血量
        // blood: {
        //     default: null,
        //     type: cc.Sprite,
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.speed = this.minMoveSpeed + (this.maxMoveSpeed - this.minMoveSpeed)*Math.random();
        // let fillStart = 0.5;
        // this.blood.fillStart = fillStart;
    },

    //敌机碰撞子弹
    onCollisionEnter: function (other, self) {
        this.game.gainScore(1);
        this.game.onEnemyKilled(this.node);
    },

    start () {

    },

    update: function(dt) {
        this.node.x -= dt * this.speed;
        //敌机飞出屏幕，自动销毁
        if(this.node.x < -500){
            this.game.onEnemyKilled(this.node);
        }
    },
});
