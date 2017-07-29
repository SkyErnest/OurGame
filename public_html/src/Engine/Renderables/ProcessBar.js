/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ProcessBar(){
    this.mWidth=null;
    this.mHeight=null;
    this.mBg=new Renderable();
    this.mFr=new Renderable();
}
ProcessBar.prototype.setColor=function(colorFr,colorBg){
    this.mBg.setColor(colorBg);
    this.mFr.setColor(colorFr);
};
ProcessBar.prototype.setPosition=function(x,y){
    this.mBg.getXform().setPosition(x,y);
    this.mFr.getXform().setPosition(x,y);
};
ProcessBar.prototype.setSize=function(width,height){
    this.mWidth=width;
    this.mHeight=height;
    this.mBg.getXform().setSize(this.mWidth,this.mHeight);
    this.mFr.getXform().setSize(this.mWidth,this.mHeight);
};
ProcessBar.prototype.update=function(percent){
    var p=percent;
    if(p>1){p=1;};
    this.mFr.getXform().setPosition(this.mFr.getXform().getXPos()-this.mWidth*(1-p)/2,this.mFr.getXform().getYPos());
    this.mFr.getXform().setSize(this.mWidth*p,this.mHeight);
};
ProcessBar.prototype.draw=function(vpMatrix){
    this.mBg.draw(vpMatrix);
    this.mFr.draw(vpMatrix);
};

