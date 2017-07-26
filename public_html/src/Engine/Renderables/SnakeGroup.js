/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function SnakeGroup(num,headImage,bodyImage){
    this.num=num;
    this.mSnakeGroup=[];
    this.headImage=headImage;
    this.bodyImage=bodyImage;
    this.deadArr=[];
    this.CRASH_DIS=4;
}
SnakeGroup.prototype.initialize=function(snake1,snake2){

    this.mSnakeGroup[0]=snake1;
    this.mSnakeGroup[1]=snake2;
    for(var i=2;i<this.num;i++){
        this.mSnakeGroup[i]=new Snake(this.headImage,this.bodyImage);
    }
};
SnakeGroup.prototype.deathCheck=function(){
    var a=false;
    for(var i=0;i<this.num;i++){
        this.deadArr[i]=false;
        for(var j=0;j<this.num;j++){
            if(j!==i){
                for(var n=0;n<this.mSnakeGroup[j].getSnakeLen();n++){
                    if(Math.sqrt(Math.pow(this.mSnakeGroup[i].getHeadPos()[0]-this.mSnakeGroup[j].getSnake()[n].getXform().getXPos(),2)+Math.pow(this.mSnakeGroup[i].getHeadPos()[1]-this.mSnakeGroup[j].getSnake()[n].getXform().getYPos(),2))<this.CRASH_DIS){
                        this.deadArr[i]=true;
                        a=true;
                }
                }
            }
        }
    }
    return a;
};
SnakeGroup.prototype.update=function(updateTime,energyNum){

   for(var i=2;i<this.num;i++){
       this.mSnakeGroup[i].update(updateTime);
   }
   for(var i=0;i<this.num;i++){
       if(this.deadArr[i]){
           this.mSnakeGroup[i].initialize();
       }
       this.mSnakeGroup[i].eat(energyNum[i+1]);
   }
};

