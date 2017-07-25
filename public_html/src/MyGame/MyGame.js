/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // textures: 

    this.kFontImage = "assets/Consolas-72.png";
    this.kBound = "assets/Bound.png";
    // The camera to view the scene
    this.leftCamera = new LeftView();
    this.rightCamera=new RightView();
    this.miniCamera=new MiniView();
    this.mCameras = [];
    this.mEnergy = new Energy();
    //this.mCamera = null;
    this.mCamera =null;
    this.mBound=null;
    this.mSnake1 = null;
    this.mSnake2 = null;
    this.mSnakeGroup=null;
    this.updateTime=0.5;

}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    this.mEnergy.loadScene();
    this.leftCamera.loadScene();
    this.rightCamera.loadScene();
    this.miniCamera.loadScene();
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kBound);
};

MyGame.prototype.unloadScene = function () {
    this.mEnergy.unloadScene();
    this.leftCamera.unloadScene();
    this.rightCamera.unloadScene();
    this.miniCamera.unloadScene();
    //gEngine.Fonts.unloadFont(this.fontofplayer);
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kBound);

    // unload the fonts
    // Step B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    this.mBound=new SpriteRenderable(this.kBound);
    this.mBound.getXform().setPosition(0,0);
    this.mBound.getXform().setSize(200,120);
    this.mBound.setColor([1,1,1,0]);
    // Step A: set up the cameras
    /*this.mCamera = new Camera(
        vec2.fromValues(0, 0),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
*/
    this.mEnergy.initialize();
    this.leftCamera.initialize();
    this.rightCamera.initialize();
    this.miniCamera.initialize();
    this.mCameras.push(this.leftCamera);
    this.mCameras.push(this.rightCamera);
    this.mCameras.push(this.miniCamera);
    //this.rightCamera.setBackgroundColor([1,1,1, 1]);
//    this.miniCamera = new Camera(
//        vec2.fromValues(50, 33),   // position of the camera
//        100,                       // width of camera
//        [330, 359, 200, 120]           // viewport (orgX, orgY, width, height)
//    );
//    this.miniCamera.setBackgroundColor([1,1,1, 0.1]);
    

    this.mSnake1  = new Snake(this.kFontImage,this.kFontImage,this.leftCamera.getCamera().getWCCenter()[0],this.leftCamera.getCamera().getWCCenter()[1]);
    this.mSnake1.initialize();
    this.mSnake2  = new Snake(this.kFontImage,this.kFontImage,this.rightCamera.getCamera().getWCCenter()[0],this.rightCamera.getCamera().getWCCenter()[1]);
    this.mSnake2.initialize();
    this.mSnakeGroup=new SnakeGroup(2,this.kFontImage,this.kFontImage);
    this.mSnakeGroup.initialize(this.mSnake1,this.mSnake2);
    //</editor-fold>

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1]); // clear to light gray

    // Step  B: Activate the drawing Camera
    //this.mCamera.setupViewProjection();
    // drawing the text output
    //this.mSnake1.draw(this.mCamera.getVPMatrix());
//    this.leftCamera.setupViewProjection();
//    this.player1text.draw(this.leftCamera.getVPMatrix());
    
//    this.rightCamera.draw();
//    this.leftCamera.draw();

        this.createViews(this.mCameras);
//    this.rightCamera.setupViewProjection();
//    this.player2text.draw(this.leftCamera.getVPMatrix());
//    this.miniCamera.setupViewProjection();
};


MyGame.prototype.createViews = function(views) {
    for(var i = 0; i < views.length; i++) {
        this.mCamera = views[i].getCamera();
        this.mCamera.setupViewProjection();
        
        views[i].draw(this.mCamera.getVPMatrix());
        this.mSnake1.draw(this.mCamera.getVPMatrix());
        this.mSnake2.draw(this.mCamera.getVPMatrix());
        this.mEnergy.draw(this.mCamera.getVPMatrix());
        if(i!==2)this.mBound.draw(this.mCamera.getVPMatrix());
    }
//    alert(view.getCamera().getWCCenter());

};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
        
    // let's only allow the movement of hero, 
    // and if hero moves too far off, this level ends, we will
    // load the next level

   this.leftCamera.updateWCcenter(this.updateTime,this.mSnake1);
   this.rightCamera.updateWCcenter(this.updateTime,this.mSnake2);
    this.mSnake2.update(this.updateTime,gEngine.Input.keys.Up,gEngine.Input.keys.Down,gEngine.Input.keys.Left,gEngine.Input.keys.Right);
    this.mSnake1.update(this.updateTime,gEngine.Input.keys.W,gEngine.Input.keys.S,gEngine.Input.keys.A,gEngine.Input.keys.D);
//    this.mEnergy.change(x,y,width);
    this.mEnergy.change(this.mSnake1.getHeadPos()[0],this.mSnake1.getHeadPos()[1],5,1);
    this.mEnergy.change(this.mSnake2.getHeadPos()[0],this.mSnake2.getHeadPos()[1],5,2);
    this.mEnergy.produce();
    this.mSnakeGroup.deadCheck();
    this.mSnakeGroup.update(0.5,this.mEnergy.getSum());
};

//MyGame.prototype.changeWC=function(){
//    this.leftCamera.setWCCenter(this.mSnake1.getHeadPos());
//    this.rightCamera.setWCCenter(this.mSnake2.getHeadPos());
//};