// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


//待优化：拾取道具（生命回复，子弹种类），大飞机，敌机血量
window.score = 0,
cc.Class({
    extends: cc.Component,

    properties: {
        //调用敌机预制资源
        enemyPrefab: {
            default: null,
            type: cc.Prefab,
        },
        //调用子弹预制资源
        bulletPrefab: {
            default: null,
            type: cc.Prefab,
        },
        //小敌机预制资源
        smallEnemyPrefab: {
            default: null,
            type: cc.Prefab,
        },
        //敌机出现的时间间隔
        maxDuration: 0,
        minDuration: 0,
        //小敌机出现的时间间隔
        SmaxDuration: 0,
        SminDuration: 0, 
        //子弹射击时间
        shootDuration: 0,
        background: {
            default: null,
            type: cc.Node,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        Score: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //初始化计时器
        this.enemyDuration = 0;
        this.smallEnemyDuration = 0;
        this.timer = 0;   //敌机计时器
        this.timer2 = 0;   //子弹计时器
        this.timer3 = 0;  //小敌机计时器
        //this.score = 0;    //初始化分数
        this.heart = 20;   //初始化生命值
        //创建enemy对象池
        this.enemyPool = new cc.NodePool();
        let initEnemyCount = 10;
        for(let i = 0; i< initEnemyCount; ++i){
            var newEnemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(newEnemy);   //put接口放入对象池
        }
        //创建bullet对象池
        this.bulletPool = new cc.NodePool();
        let initBulletCount = 20;
        for(let i = 0;i < initBulletCount; ++i){
            var newBullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(newBullet);
        }
        //创建SmallEnemy对象池
        this.smallEnemyPool = new cc.NodePool();
        let initSmallEnemyCount = 20;
        for(let i = 0;i < initSmallEnemyCount; ++i){
            var newSmallEnemy = cc.instantiate(this.smallEnemyPrefab);
            this.smallEnemyPool.put(newSmallEnemy);
        }
        this.spawnNewBullet();
        this.spawnNewEnemy();
        this.spawnNewSmallEnemy();
    },

    //生成新的敌机
    spawnNewEnemy: function(){
        if(this.enemyPool.size() > 0){
            var newEnemy = this.enemyPool.get();
        } else{
            var newEnemy = cc.instantiate(this.enemyPrefab);
        }
        //添加到子节点
        this.node.addChild(newEnemy);
        //把随机位置赋值给敌机节点
        newEnemy.setPosition(this.getNewEnemyPosition());
        newEnemy.getComponent('enemy').game = this;
        //重置计时器，设定一个出击时间
        this.timer = 0;
        this.enemyDuration = this.minDuration + (this.maxDuration - this.minDuration)*Math.random();
    },
    //随机生成敌机位置
    getNewEnemyPosition: function(){
        let randX = this.node.width;
        let randY = (Math.random() - 0.5) * 2 * (this.node.height/2);
        return cc.v2(randX, randY);
    },
    //击中敌机，返回对象池
    onEnemyKilled: function(newEnemy){
        this.enemyPool.put(newEnemy);
    },

    //生成新的小敌机
    spawnNewSmallEnemy: function(){
        if(this.smallEnemyPool.size() > 0){
            var newSmallEnemy = this.smallEnemyPool.get();
        } else{
            var newSmallEnemy = cc.instantiate(this.smallEnemyPrefab);
        }
        //添加到子节点
        this.node.addChild(newSmallEnemy);
        //把随机位置赋值给敌机节点
        newSmallEnemy.setPosition(this.getNewEnemyPosition());
        newSmallEnemy.getComponent('smallEnemy').game = this;
        //重置计时器，设定一个出击时间
        this.timer3 = 0;
        this.smallEnemyDuration = this.SminDuration + (this.SmaxDuration - this.SminDuration)*Math.random();
    },
    //击中敌机，返回对象池
    onSmallEnemyKilled: function(newSmallEnemy){
        this.smallEnemyPool.put(newSmallEnemy);
    },

    //生成新的子弹
    spawnNewBullet: function(){
        var newBullet = null;
        if(this.bulletPool.size() > 0){
            newBullet = this.bulletPool.get();
        } else{
            newBullet = cc.instantiate(this.bulletPrefab);
        }
        this.node.addChild(newBullet);
        newBullet.setPosition(this.player.getPosition());
        //在bullet节点中调用game组件
        newBullet.getComponent("bullet").game = this;
        this.timer2 = 0;
    },
    //子弹销毁,返回对象池
    onBulletKilled: function(newBullet){
        this.bulletPool.put(newBullet);
    },

    //得分判定
    gainScore: function(num){
        score += num;
        this.Score.string = "Score: " + score;
    },

    start () {

    },

    update: function(dt) {
        this.timer += dt;
        this.timer2 += dt;
        this.timer3 += dt;
        //自动生成敌机
        if(this.timer > this.enemyDuration){
            this.spawnNewEnemy();
            return;
        }
        //自动射出子弹
        if(this.timer2 > this.shootDuration){
            this.spawnNewBullet();
            return;
        }
        if(this.timer3 > this.smallEnemyDuration){
            this.spawnNewSmallEnemy();
            return;
        }
    },
});
