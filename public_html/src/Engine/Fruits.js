/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, TextureRenderable */

function Fruits() {
    this.kPeach = "assets/peach.png";
    this.kWater = "assets/water.png";
    this.kStraw = "assets/straw.png";
    this.fruit = null;
    this.eaten = new Array();
    this.resource = new Array();
    this.fruitMap = new Array();
    this.sum = new Array();
    this.flag = 0;
    this.flag2 = 0;
    this.sum = new Array();
    for(var i = 0;i < 2;i++) {
        this.sum[i] = 0;
    }
    
    
}

gEngine.Core.inheritPrototype(Fruits, TextureRenderable);


Fruits.prototype.loadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.loadTexture(this.kPeach);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kStraw);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Fruits.prototype.unloadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.unloadTexture(this.kPeach);
    gEngine.Textures.unloadTexture(this.kWater);
    gEngine.Textures.unloadTexture(this.kStraw);
    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Fruits.prototype.produce = function () {
    this.flag ++;
    
    if(this.flag == 300){
        var randx = 0;
        var randy = 0;
        randx = Math.random();
        randy = Math.random();
        if(randx>0.95){
            this.fruit = new TextureRenderable(this.kStraw);
        }else if(randx<=0.9&&randx>0.6){
            this.fruit = new TextureRenderable(this.kWater);
        }else
            this.fruit = new TextureRenderable(this.kPeach);
        
        this.fruit.setColor([1, 1, 1, 0.2]);  
        this.fruit.getXform().setSize(5, 5);
        this.fruit.getXform().setPosition(randx*100*2 - 50*2,randy*54*2 - 27*2);
        this.resource[this.flag2] = [randx*100*2 - 50*2,randy*54*2 - 27*2];
//        console.log("produce执行",randx*100*2 - 50*2,randy*54*2 - 27*2);
        this.fruitMap.push(this.fruit);
        this.flag2++;
        this.flag = 0;
        
        
    }
    
    
}

Fruits.prototype.initialize = function () {
    this.fruit = new TextureRenderable(this.kPeach);
    this.fruit.setColor([1, 1, 1, 0.2]);  
    this.fruit.getXform().setSize(5, 5);
    this.fruit.getXform().setXPos(0);//randx*100*2 - 50*2
    this.fruit.getXform().setYPos(0);//randy*54*2 - 27*2

    this.fruitMap.push(this.fruit);
    this.resource[this.flag2] = [0,0];
    this.flag2++;
   
   
    
};

Fruits.prototype.draw = function (VPMatrix) {
    for(i = 0;i < this.fruitMap.length ;i++) {
        if(this.eaten.indexOf(i) === -1){
            this.fruitMap[i].draw(VPMatrix);
        }
            
        
    }
    
};

Fruits.prototype.change = function (x,y,width,id) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
//    console.log(x,y,width);
    var bl = x - width/2;
    var br = x + width/2;
    var t = y + width/2;
    var b = y - width/2;
   
    console.log(bl,br,t,b);
    console.log(this.resource[0][0],this.resource[0][1]);
    for(var i = 0;i < this.resource.length;i++){
//        console.log(this.energyMap[i].getXform().getXPos(),this.energyMap[i].getXform().getYPos());
        if(this.resource[i][0]>bl && this.resource[i][0]<br
                &&this.resource[i][1]>b && this.resource[i][1]<t && this.fruitMap[i] !==null 
                &&this.eaten.indexOf(i) === -1){
            console.log(this.resource[i][0],this.resource[i][1]);
            this.fruitMap[i] = null;
            
            this.resource[i] = [-100,-100];
            
            this.sum[id] = 0;
            if(id === 1){

                this.sum[id]++;
                
            }else{
                this.sum[id]++;

            }
            
            this.eaten.push(i);
        } 
    }
    
   

};


