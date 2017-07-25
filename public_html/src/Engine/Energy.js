/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, TextureRenderable */

function Energy() {
    this.energyMap = new Array();//先声明一维
    this.kPortal = "assets/minion_portal.png";
    this.kEaten = "assets/minion_collector.png";
    this.flag = 0;
    this.eaten = new Array();
    this.resource = new Array();
    
    
    //设置吃掉的资源总量
    this.sum = new Array();
    
    
}

gEngine.Core.inheritPrototype(Energy, TextureRenderable);


Energy.prototype.loadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.loadTexture(this.kPortal);
    gEngine.Textures.loadTexture(this.kEaten);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Energy.prototype.unloadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.unloadTexture(this.kPortal);
    gEngine.Textures.unloadTexture(this.kEaten);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

//生成随机数的函数
var randomSet = function () {
        
        var randx = 0;
        var randy = 0;
        for (var i = 0; i < 100; i ++){
                randx = Math.random();
                randy = Math.random();
//                console.log(randx,randy);
                this.energyMap[i].getXform().setXPos(randx*100*2 - 50*2);
                this.energyMap[i].getXform().setYPos(randy*54*2 - 27*2);
                this.resource[i] = [randx*100*2 - 50*2,randy*54*2 - 27*2];
            }
            
};
//生成随机数的函数
var randomUpdate = function () {
        var flag = 0;
        for(var i = 0;i < this.eaten.length;i++){
//            console.log( this.eaten[0]);
            flag = this.eaten[i];
            randx = Math.random();
            randy = Math.random();
            this.energyMap[flag] = new TextureRenderable(this.kPortal);
             this.energyMap[flag].setColor([1, 0, 0, 0.2]);  // tints red
            this.energyMap[flag].getXform().setSize(2, 2);
            this.energyMap[flag].getXform().setXPos(randx*100*2 - 50*2);
            this.energyMap[flag].getXform().setYPos(randy*54*2 - 27*2);
            this.resource[flag] = [randx*100*2 - 50*2,randy*54*2 - 27*2];
        }
        this.eaten = new Array();
        
            
};

Energy.prototype.initialize = function () {//probability(0,1)越大，出现能量的概率越小
//    for (var k = 0; k < 100; k++) {   //声明二维,100个坐标x,y
//        this.energyMap[k] = new Array();  
//        for (var j = 0; j < 2; j++) {   
//            this.energyMap[k][j] = 0;
//        }
//    }
    for(var i = 0;i < 100;i++){
            this.energyMap[i] = new TextureRenderable(this.kPortal);  //一维数组中存储的是100个TextureRenderable,可通过getXform()获取
    this.energyMap[i].setColor([0, 0, 0, 0.2]);  // tints red
    this.energyMap[i].getXform().setSize(2, 2);
    
    }


    randomSet.call(this);
//    console.log(this.energyMap);
};

Energy.prototype.draw = function (VPMatrix) {
    // Step A: clear the canvas

    // Step  B: Activate the drawing Camera

    // Step  C: Draw everything
    for(i = 0;i < 100 ;i++) {
        if(this.eaten.indexOf(i) === -1)
//            console.log(this.eaten.indexOf(i));
        this.energyMap[i].draw(VPMatrix);
//        console.log(this.energyMap[i]);
    }
    
    
};



Energy.prototype.getEnergyMap = function () { return this.energyMap; };//一维数组存Texture对象

Energy.prototype.change = function (x,y,width,id) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
//    console.log(x,y,width);
    var bl = x - width/2;
    var br = x + width/2;
    var t = y + width/2;
    var b = y - width/2;
    this.sum = [];
//    console.log(bl,br,t,b);
    
    for(var i = 0;i < 100;i++){
//        console.log(this.energyMap[i].getXform().getXPos(),this.energyMap[i].getXform().getYPos());
        if(this.resource[i][0]>bl && this.resource[i][0]<br
                &&this.resource[i][1]>b && this.resource[i][1]<t && this.energyMap[i] !==null 
                &&this.eaten.indexOf(i) === -1){
//            console.log(this.resource[i][0],this.resource[i][1]);
            this.energyMap[i] = null;
            this.resource[i] = [-100,-100];

            this.sum[id] = 0;
            if(id === 1){
                this.sum[id]++;
                
            }else{
                this.sum[id]++;
                //console.log(this.sum[2]);
            }
            
            this.eaten.push(i);
        } 
    }
    
   

};

 Energy.prototype.getSum = function () {
     return this.sum;
 };
 
  Energy.prototype.setSum = function () {
     this.sum = [];
 };


Energy.prototype.produce = function () { //一段时间之后资源再次出现
    this.flag++;
    if(this.flag === 120){
        randomUpdate.call(this);
        this.flag = 0;
    }
};


