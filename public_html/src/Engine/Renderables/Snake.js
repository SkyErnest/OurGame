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
}

Snake.prototype.initialize = function () {
    this.mSnake[0]=new TextureRenderable(this.kSnakeHead);
    this.mSnake[0].getXform().setPosition(0,0);
    this.mSnake[0].getXform().setSize(10,10);
    this.mSnake[0].setColor([1,1,1,0]);
    for(var i=1;i<this.mLength;i++){
        this.mSnake[i]=new TextureRenderable(this.kSnakeBody);
        this.updatePos();    
        this.mSnake[i].getXform().setSize(10,10);
        this.mSnake[i].setColor([1,1,1,0]);
    }

};
Snake.prototype.updatePos=function(){
    for(var i=1;i<length;i++){
        this.mSnake[i].getXform().setPosition(this.mSnake[i-1].getXform().getXPos(),this.mSnake[i-1].getXform().getYPos());
    }
};
Snake.prototype.draw = function () {
    
};