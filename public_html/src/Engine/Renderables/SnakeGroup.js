/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine */

function SnakeGroup(num,headImage,bodyImage){
    this.num=num;
    this.mSnakeGroup=[];
    this.headImage=headImage;
    this.bodyImage=bodyImage;
    this.deadArr=[];
    this.CRASH_DIS=4;
    this.mState=[];
    this.mSpeedUpImage=[];
    this.mReverseImage=[];
    this.mInvincibilityImage=[];
    this.kSpeedUpImage="assets/Consolas-72.png";
    this.kReverseImage="assets/Consolas-72.png";
    this.kInvincibilityImage="assets/Consolas-72.png";
}
SnakeGroup.prototype.loadScene=function(){
    gEngine.Textures.loadTexture(this.kSpeedUpImage);
    gEngine.Textures.loadTexture(this.kReverseImage);
    gEngine.Textures.loadTexture(this.kInvincibilityImage);
};
SnakeGroup.prototype.unloadScene=function(){
    gEngine.Textures.unloadTexture(this.kSpeedUpImage);
    gEngine.Textures.unloadTexture(this.kReverseImage);
    gEngine.Textures.unloadTexture(this.kInvincibilityImage);
};
SnakeGroup.prototype.initialize=function(snake1,snake2){
    for(var i=0;i<this.num;i++){
        this.mInvincibilityImage[i]=null;
        this.mReverseImage[i]=null;
        this.mSpeedUpImage[i]=null;
    }
    this.mSnakeGroup[0]=snake1;
    this.mSnakeGroup[1]=snake2;
    for(var i=2;i<this.num;i++){
        this.mSnakeGroup[i]=new Snake(this.headImage,this.bodyImage);
    }
};
SnakeGroup.prototype.draw=function(vpMatrix){
    for(var i=0;i<this.num;i++){
        this.mSnakeGroup[i].draw(vpMatrix);
    }
};
SnakeGroup.prototype.drawEffects=function(vpMatrix,m){
        if(this.mInvincibilityImage[m]!==null){this.mInvincibilityImage[m].draw(vpMatrix);}
        if(this.mReverseImage[m]!==null){this.mReverseImage[m].draw(vpMatrix);}
        if(this.mSpeedUpImage[m]!==null){this.mSpeedUpImage[m].draw(vpMatrix);}
};
SnakeGroup.prototype.deathCheck=function(){
    var a=false;
    for(var i=0;i<this.num;i++){
        this.deadArr[i]=false;
        for(var j=0;j<this.num;j++){
            if(j!==i){
                for(var n=0;n<this.mSnakeGroup[j].getSnakeLen();n++){
                    if(Math.sqrt(Math.pow(this.mSnakeGroup[i].getHeadPos()[0]-this.mSnakeGroup[j].getSnake()[n].getXform().getXPos(),2)+Math.pow(this.mSnakeGroup[i].getHeadPos()[1]-this.mSnakeGroup[j].getSnake()[n].getXform().getYPos(),2))<this.CRASH_DIS){
                        //console.log([i,j,n]);
                        this.deadArr[i]=true;
                        a=true;
                }
                }
            }
        }
    }
    return a;
};
SnakeGroup.prototype.update=function(energy,fruit){
    for(var i=0;i<this.num;i++){
        this.mState[i]=false;
    }
    this.mState[1]=this.mSnakeGroup[1].update(gEngine.Input.keys.Up,gEngine.Input.keys.Down,gEngine.Input.keys.Left,gEngine.Input.keys.Right,gEngine.Input.keys.Enter);
    this.mState[0]=this.mSnakeGroup[0].update(gEngine.Input.keys.W,gEngine.Input.keys.S,gEngine.Input.keys.A,gEngine.Input.keys.D,gEngine.Input.keys.Space);
    for(var i=2;i<this.num;i++){
        this.mSnakeGroup[i].update();
    }
    energy.change(this.mSnakeGroup[0].getHeadPos()[0], this.mSnakeGroup[0].getHeadPos()[1], 5, 1);
    energy.change(this.mSnakeGroup[1].getHeadPos()[0], this.mSnakeGroup[1].getHeadPos()[1], 5, 2);
    fruit.change(this.mSnakeGroup[0].getHeadPos()[0], this.mSnakeGroup[0].getHeadPos()[1], 5, 1);
    fruit.change(this.mSnakeGroup[1].getHeadPos()[0], this.mSnakeGroup[1].getHeadPos()[1], 5, 2);
    

    
    this.deathCheck();
    for(var i=0;i<this.num;i++){
        if(this.deadArr[i]&&this.mSnakeGroup[i].mInvincibility===false){
            this.mState[i]=true;
            this.mSnakeGroup[i].newBorn();
        }
        this.mSnakeGroup[i].eat(energy.getSum()[i+1],fruit.getName()[i]);
        if(this.mSnakeGroup[i].mReverseEat){
            for(var j=0;j<this.num;j++){
                this.mSnakeGroup[j].mReverse=true;
                this.mSnakeGroup[j].mTime[1]+=300;
            }
            this.mSnakeGroup[i].mReverse=false;
            this.mSnakeGroup[i].mReverseEat=false;
        }
    }
    for(var i=0;i<this.num;i++){
        if(this.mSnakeGroup[i].mRushing){
            if(this.mSpeedUpImage[i]===null){
                this.mSpeedUpImage[i]=new TextureRenderable(this.kSpeedUpImage);  
                this.mSpeedUpImage[i].getXform().setSize(20,20);
                this.mSpeedUpImage[i].setColor([1,1,1,0]);
            }
            if(i===0){this.mSpeedUpImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]-40,this.mSnakeGroup[i].getHeadPos()[1]+45);}
            if(i===1){this.mSpeedUpImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]-10,this.mSnakeGroup[i].getHeadPos()[1]+45);}
        }else{this.mSpeedUpImage[i]=null;}

        if(this.mSnakeGroup[i].mReverse){
            if(this.mReverseImage[i]===null){
                this.mReverseImage[i]=new TextureRenderable(this.kReverseImage);  
                this.mReverseImage[i].getXform().setSize(20,20);
                this.mReverseImage[i].setColor([1,1,1,0]);
            }
            if(i===0){this.mReverseImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]-15,this.mSnakeGroup[i].getHeadPos()[1]+45);}
            if(i===1){this.mReverseImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]+15,this.mSnakeGroup[i].getHeadPos()[1]+45);}

        }else{this.mReverseImage[i]=null;}
        
        if(this.mSnakeGroup[i].mInvincibility){
            if(this.mInvincibilityImage[i]===null){
                this.mInvincibilityImage[i]=new TextureRenderable(this.kInvincibilityImage);  
                this.mInvincibilityImage[i].getXform().setSize(20,20);
                this.mInvincibilityImage[i].setColor([1,1,1,0]);
            }
            if(i===0){this.mInvincibilityImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]+10,this.mSnakeGroup[i].getHeadPos()[1]+45);}
            if(i===1){this.mInvincibilityImage[i].getXform().setPosition(this.mSnakeGroup[i].getHeadPos()[0]+40,this.mSnakeGroup[i].getHeadPos()[1]+45);}

        }else{this.mInvincibilityImage[i]=null;}
    }
};
SnakeGroup.prototype.getState=function(){return this.mState;};

