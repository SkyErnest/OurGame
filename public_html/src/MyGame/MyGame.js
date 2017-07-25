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
    // The camera to view the scene
    this.leftCamera = new LeftView();
    this.rightCamera=new RightView();
    this.miniCamera=new MiniView();
    this.mCameras = [];
    //this.mCamera = null;
    this.mCamera =null;

    this.mSnake = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {

    this.leftCamera.loadScene();
    this.rightCamera.loadScene();
    this.miniCamera.loadScene();
    gEngine.Textures.loadTexture(this.kFontImage);
};

MyGame.prototype.unloadScene = function () {
    this.leftCamera.unloadScene();
    this.rightCamera.unloadScene();
    this.miniCamera.unloadScene();
    //gEngine.Fonts.unloadFont(this.fontofplayer);
    gEngine.Textures.unloadTexture(this.kFontImage);

    // unload the fonts
    // Step B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {

    // Step A: set up the cameras
    /*this.mCamera = new Camera(
        vec2.fromValues(0, 0),   // position of the camera
        100,                       // width of camera
        [0, 0, 860, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
*/
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
    

    this.mSnake  = new Snake(this.kFontImage,this.kFontImage);
    this.mSnake.initialize();
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
    //this.mSnake.draw(this.mCamera.getVPMatrix());
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
        
        views[i].draw(this.mCamera.getVPMatrix()
                );
        this.mSnake.draw(this.mCamera.getVPMatrix());
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

    this.mSnake.update(0.5);
    

};