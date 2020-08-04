// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,

        heart: 0,

        //生命值
        heartLabel: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onKeyDown(event) {
        switch(event.keyCode){
            case cc.macro.KEY.a: this.left = true;
                break;
            case cc.macro.KEY.d: this.right = true;
                break;
            case cc.macro.KEY.s: this.down = true;
                break;
            case cc.macro.KEY.w: this.up = true;
                break;
        }
    },

    onKeyUp(event) {
        switch(event.keyCode){
            case cc.macro.KEY.a: this.left = false;
                break;
            case cc.macro.KEY.d: this.right = false;
                break;
            case cc.macro.KEY.s: this.down = false;
                break;
            case cc.macro.KEY.w: this.up = false;
                break;
        }
    },

    onLoad: function() {
        //初始化运动方向
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        //初始化碰撞
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;

        //初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.heartLabel.string = ': ' + this.heart;
    },

    //取消键盘输入监听
    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onCollisionEnter: function (other, self) {
        this.boom();
    },

    //被击中判定
    boom: function(){
        this.heart--;
        if(this.heart == 0){
            this.gameOver();
        }
        this.heartLabel.string = ": " + this.heart;
    },

    gameOver: function(){
        cc.director.loadScene("gameOver");
    },

    start () {

    },

    update: function(dt){
        if(this.left){
            this.node.x -= this.moveSpeed * dt;
            if(this.node.x < -430){
                this.node.x = -430;
            }
        }
        else if(this.right){
            this.node.x += this.moveSpeed * dt;
            if(this.node.x > 430){
                this.node.x = 430;
            }
        }
        else if(this.up){
            this.node.y += this.moveSpeed * dt;
            if(this.node.y > 276){
                this.node.y = 276;
            }
        }
        else if(this.down){
            this.node.y -= this.moveSpeed * dt;
            if(this.node.y < -276){
                this.node.y = -276;
            }
        }
    },
});
