var bg,tomImg,cheeseImg,spatulaImg,trapImg,jerryImg,cheeseGroup;
var score = 0;
var timer = 1000;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  bg = loadImage("background.jpg");
  tomImg = loadImage("tom.png");
  cheeseImg = loadImage("cheese.png");
  spatulaImg = loadImage("spatula.png");
  trapImg = loadImage("trap.jpg");
  //jerryImg = loadAnimation("jerry.png","jerry 2.png");
  jerryImg = loadImage("jerry 1.png");
  jerry2Img = loadImage("jerry 2.png");
}

function setup() {
  createCanvas(1000,600);

  //jerryImg.frameDelay = 10;

  jerry = createSprite(80,500,50,100);
  //jerry.addAnimation("running",jerryImg);
  jerry.addImage(jerryImg);
  jerry.scale = 0.7;

  cheeseGroup = new Group();
  edges = createEdgeSprites();
}

function draw(){
  background(bg);

  if(gameState === PLAY){
    
  timer = timer - 0.03;

  textSize(25);
  fill(0);
  textFont("merienda");
  text("Time Remaining: "+Math.round(timer),500,50);
  text("Score: "+score,500,100);

  if(keyDown("UP_ARROW")){
    jerry.velocityY = -8;
    jerry.changeImage("running",jerry2Img);
  }

  jerry.velocityY = jerry.velocityY+0.8;

  if(keyDown("LEFT_ARROW")){
    jerry.velocityX = -8;
  }

  if(keyDown("RIGHT_ARROW")){
    jerry.velocityX = 8;
  }

   /*if(keyDown("UP_ARROW")){
    jerry.velocityY = -5;
  }
*/
  spawnCheese();

  if(cheeseGroup.isTouching(jerry)){
    cheeseGroup.destroyEach();
    jerry.scale = jerry.scale + 0.02;
    score ++;
  }

  if(timer < 0){
    gameState = END; 
   }
}

if(gameState ===END){
  jerry.velocityY = 0;
  jerry.velocityX = 0;
  cheeseGroup.destroyEach();

}

jerry.collide(edges);
  drawSprites();
}

function spawnCheese(){
  if(frameCount%60 === 0){
    cheese = createSprite(random(50,750),random(50,500),10,10);
    cheese.addImage(cheeseImg);
    cheese.scale = 0.1;
    cheese.lifetime = 60;
    cheeseGroup.add(cheese);
  }
}
