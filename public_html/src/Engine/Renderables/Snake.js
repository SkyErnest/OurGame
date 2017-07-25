/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Snake(kSnakeHead,kSnakeBody) {
    this.mSnake = [];
    this.kSnakeHead = kSnakeHead;
    this.kSnakeBody=kSnakeBody;
    this.mLength=5;
    this.mTime=0;
    this.SNAKE_SIZE=5;
    this.mDir=null;
    this.mHeadNext=null;

}
var DIRECTION={
    N:4,
    S:3,
    E:2,
    W:1
};

Snake.prototype.initialize = function (xPos,yPos) {
    this.mSnake[0]=new TextureRenderable(this.kSnakeHead);
    this.mSnake[0].getXform().setPosition(xPos,yPos);
    this.mSnake[0].getXform().setSize(this.SNAKE_SIZE,this.SNAKE_SIZE);
    this.mSnake[0].setColor([1,1,1,0]);
    for(var i=1;i<this.mLength;i++){
        this.mSnake[i]=new TextureRenderable(this.kSnakeBody);
        this.mSnake[i].getXform().setSize(this.SNAKE_SIZE,this.SNAKE_SIZE);
        this.mSnake[i].setColor([1,1,1,0]);
        this.mSnake[i].getXform().setPosition(this.mSnake[i-1].getXform().getXPos(),this.mSnake[i-1].getXform().getYPos()-this.SNAKE_SIZE);
    }
    this.mDir=DIRECTION.N;
    
    
        //this.updatePos();    

};
Snake.prototype.updatePos=function(){
    for(var i=this.mLength-1;i>0;i--){
        this.mSnake[i].getXform().setPosition(this.mSnake[i-1].getXform().getXPos(),this.mSnake[i-1].getXform().getYPos());
    }
};
Snake.prototype.draw = function (vpMatrix) {
    for(var i=0;i<this.mLength;i++){
        this.mSnake[i].draw(vpMatrix);
    }
};
Snake.prototype.update=function(time,up,down,left,right){
    this.mTime++;
    var xform=this.mSnake[0].getXform();
    
    
    if (gEngine.Input.isKeyPressed(right)) {
        if(this.mDir!==DIRECTION.W){
            this.mDir=DIRECTION.E;
        }
    }
    if (gEngine.Input.isKeyPressed(left)) {
        if(this.mDir!==DIRECTION.E){
            this.mDir=DIRECTION.W;
        }
    }
    if (gEngine.Input.isKeyPressed(up)) {
        if(this.mDir!==DIRECTION.S){
            this.mDir=DIRECTION.N;
        }
    }
    if (gEngine.Input.isKeyPressed(down)) {
        if(this.mDir!==DIRECTION.N){
            this.mDir=DIRECTION.S;
        }
    }
    

    if(this.mTime/gEngine.GameLoop.kFPS>time){
        this.mTime+=-gEngine.GameLoop.kFPS*time;
        this.updatePos();
        if(this.mDir===DIRECTION.E){xform.setPosition(xform.getXPos()+xform.getWidth(),xform.getYPos());}
        if(this.mDir===DIRECTION.N){xform.setPosition(xform.getXPos(),xform.getYPos()+xform.getHeight());}
        if(this.mDir===DIRECTION.S){xform.setPosition(xform.getXPos(),xform.getYPos()-xform.getHeight());}
        if(this.mDir===DIRECTION.W){xform.setPosition(xform.getXPos()-xform.getWidth(),xform.getYPos());}
        
    }

};