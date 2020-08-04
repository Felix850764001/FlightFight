// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        minMoveSpeed: 0,
        maxMoveSpeed: 0,
        //碰撞半径
        playerRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.speed = this.minMoveSpeed + (this.maxMoveSpeed - this.minMoveSpeed)*Math.random();
    },

    //敌机碰撞子弹
    onCollisionEnter: function (other, self) {
        if(other.tag == 3){
            this.game.onSmallEnemyKilled(this.node);
        }
        if(other.tag == 0){
            this.game.gainScore(2);   //小飞机一架两分
            this.game.onSmallEnemyKilled(this.node);
        }
    },


    start () {

    },

    update: function(dt) {
        this.node.x -= dt * this.speed;
        //敌机飞出屏幕，自动销毁
        if(this.node.x < -500){
            this.game.onSmallEnemyKilled(this.node);
        }
    },
});
