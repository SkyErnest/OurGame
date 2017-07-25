
# OurGame
## Game members:
Pu MiHan
Chen Long
Chen Yang
\ No newline at end of file
Chen Yang
### Energy.js
initialize(probability):按照probability概率初始化资源二维数组
getEnergyMap():返回资源二维数组
change(x,y,width):按照蛇头坐标和宽度，完成资源的获取累加和置零
produce(probability):按probability的概率，新增资源

Snake.js:
Snake(kSnakeHead,kSnakeBody):设置头和身的图片
initialize(xPos,yPos):蛇初始坐标
update(updateTime,up,down,left,right):设置更新间隔及控制键位，并刷新
getHeadPos():返回坐标数组
