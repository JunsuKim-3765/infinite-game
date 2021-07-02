var PLAY = 1;
var END = 0;
var gameState = PLAY;

var soldier;

var zombie;

var bg;

var stone;

var soldierImg, zombieImg, stoneImg, canImg, bgImg;

var score=0;

var gameOver, restart;

var gameOverImg, restartImg;

var invisibleGround;

var bullet;

var hit=0;
function preload(){
soldierImg=loadImage("soldier.png");
zombieImg=loadImage("zombie1.png");

stone=loadImage("stone1.png");

bgImg=loadImage("bg.png");

gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
}

function setup() {
 createCanvas(1200, 600);

 bg=createSprite(500, 200);
 bg.addImage(bgImg);
 bg.velocityX=-4;
 bg.scale=1.1;

 soldier=createSprite(700, 500, 50, 50);
 soldier.addImage(soldierImg);
 soldier.scale=0.5;

 zombie=createSprite(90, 490, 50, 50);
 zombie.addImage(zombieImg);
 zombie.scale=0.2;
 zombie.velocityX=2;

 gameOver=createSprite(640, 200, 50, 50);
 gameOver.addImage(gameOverImg);

 restart=createSprite(640, 300, 50, 50);
 restart.addImage(restartImg);

 gameOver.scale=0.5;
 restart.scale=0.5;

 gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(700,590,100,10);
  invisibleGround.visible = false;

  soldier.setCollider("rectangle",0,0,270, 370);
  soldier.debug = true;

  zombie.setCollider("rectangle",0,0,570, 970);
  zombie.debug = true;
}

function draw() 
{
 background(0);

 drawSprites();

 fill("white");
 textSize(20);
 text("SCORE: "+ score, 1000,50);

 if(gameState===PLAY){
  spawnBullet();
  
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX=-6;
if(keyDown("space") && soldier.y >= 159) {
        soldier.velocityY = -12;
      }
if (zombie.isTouching(bullet)){
  hit+=1;
if (hit=10){
  zombie.destroyEach();
}
}
if (zombie.x>=1200){
  zombie.x=90;
}
      soldier.velocityY = soldier.velocityY + 0.8
 if(bg.x < 537 ){
    bg.x = bg.width/2;
 }
 soldier.collide(invisibleGround);

 if(zombie.isTouching(soldier)){
     gameState=END;
 }
 }
 else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    bg.velocityX=0;
    zombie.velocityX=0;
    soldier.collide(invisibleGround);

    
    if(mousePressedOver(restart)) {
      reset();
    }
 }
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  zombie.x=150;
  zombie.velocityX=2;
  score = 0;
}

function spawnBullet()
{
  var bullet = createSprite(600,120,11,8);
  bullet.y = soldier.y
  bullet.x= soldier.x;
  bullet.velocityX = -20;
  bullet.lifetime = 1200;
  }