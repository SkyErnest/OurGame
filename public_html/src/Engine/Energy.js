/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Energy() {
    this.energyMap = new Array();  //先声明一维
    
    //设置吃掉的资源总量
    this.sum = 0;

}

//生成随机数的函数
var randomSet = function (energyMap,probability) {

        var rand = 0;

        for (var i = 0; i < 860; i ++)//资源可能太密集，到时候可以调整
            for (var j = 0; j < 480; j++) {
                rand = Math.random();
                if (rand > probability)
                    energyMap[i][j] = 1;
            }
        console.log(energyMap);
        return energyMap;
    }

Energy.prototype.initialize = function (probability) {//probability(0,1)越大，出现能量的概率越小
    for (var k = 0; k < 860; k++) {   //声明二维
        this.energyMap[k] = new Array();  
        for (var j = 0; j < 480; j++) {   
            this.energyMap[k][j] = 0;
        }
    }
    this.energyMap = randomSet(this.energyMap,probability);
};

Energy.prototype.getEnergyMap = function () { return this.energyMap; }


Energy.prototype.change = function (x,y,width) { //当蛇吃到之后设置内容为0,当前蛇头坐标和蛇头的宽度
    //设置0，并完成累加
    var bl = x - width/2;
    var br = x + width/2;
    var tl = y - width/2;
//    var tr = y + width/2;

    for(var i = bl;i < br;i++)
        for(var j = bl;j < tl;j++){
            if(this.energyMap[i][j] == 1){
                this.energyMap[i][j] = 0;
                this.sum++;
            }
        }
    
}

Energy.prototype.produce = function (chance) { //一段时间之后资源再次出现
    this.energyMap = randomSet(this.energyMap,chance);//暂定出现的概率为0.9,如果出现资源太少，将其调整小即可
}
