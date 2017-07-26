/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, TextureRenderable */

function Fruits() {
    this.kPeach = "assets/peach.png";
    this.fruit = null;
    
    
}

gEngine.Core.inheritPrototype(Fruits, TextureRenderable);


Fruits.prototype.loadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.loadTexture(this.kPeach);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

Fruits.prototype.unloadScene = function () {
    // Game loop not running, unload all assets

    gEngine.Textures.unloadTexture(this.kPortal);

    // starts the next level
//    var nextLevel = new BlueLevel();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};



Fruits.prototype.initialize = function () {
    this.fruit = new TextureRenderable(this.kPeach);
    this.fruit.setColor([1, 1, 1, 0.2]);  // tints red
    this.fruit.getXform().setSize(5, 5);
    
    randx = Math.random();
    randy = Math.random();
    this.fruit.getXform().setXPos(0);//randx*100*2 - 50*2
    this.fruit.getXform().setYPos(0);//randy*54*2 - 27*2

    
};

Fruits.prototype.draw = function (VPMatrix) {
    this.fruit.draw(VPMatrix);
};

Fruits.prototype.change = function (x,y,width,id) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
//    console.log(x,y,width);
    var bl = x - width/2;
    var br = x + width/2;
    var t = y + width/2;
    var b = y - width/2;
   
//    console.log(bl,br,t,b);
    
    for(var i = 0;i < this.resource.length;i++){
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

            }
            
            this.eaten.push(i);
        } 
    }
    
   

};


