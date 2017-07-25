/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Energy() {
    this.energyMap = new Array();//先声明一维
    this.kPortal = "assets/minion_portal.png";
    this.kEaten = "assets/minion_collector.png";
    this.flag = 0;
    this.eaten = new Array();
    
    
    //设置吃掉的资源总量
    this.sum = 0;
    
    
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
            }
};
//生成随机数的函数
var randomUpdate = function () {
        var flag = 0;
        for(var i = 0;i < this.eaten.length;i++){
            flag = this.eaten[i];
            randx = Math.random();
            randy = Math.random();
            this.energyMap[flag].getXform().setXPos(randx*100 - 50);
            this.energyMap[flag].getXform().setYPos(randx*54 - 27);
        }
        
            
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
    for(i = 0;i < 100;i++) {
        this.energyMap[i].draw(VPMatrix);
    }
    
    
}



Energy.prototype.getEnergyMap = function () { return this.energyMap; }//一维数组存Texture对象
Energy.prototype.getSum = function () { return this.sum; }//一维数组存Texture对象

Energy.prototype.change = function (x,y,width) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
    var bl = x - width/2;
    var br = x + width/2;
    var tl = y - width/2;
//    var tr = y + width/2;

    for(var i = 0;i < 100;i++){
        if(this.energyMap[i].getXform().getXPos()>bl && this.energyMap[i].getXform().getXPos()<br
                &&this.energyMap[i].getXform().getYPos()>bl && this.energyMap[i].getXform().getYPos()<tl){
            this.energyMap[i] = new TextureRenderable(this.kEaten);
            this.sum++;
            this.eaten.push(i);
        } 
    }
   
    
}

Energy.prototype.produce = function () { //一段时间之后资源再次出现
    this.flag = 0;
    this.flag++;
    if(this.flag == 120){
        this.energyMap = randomUpdate.call(this);
        this.flag = 0;
    }
}


