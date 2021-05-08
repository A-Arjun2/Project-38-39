var backgroundImg
var ground , groundImg
var run , runImg
var tigerImg
var foxImg
var goImg
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var resetImg , restart

function preload(){

backgroundImg = loadImage("bg.png")
groundImg = loadImage("ground.png")
runImg = loadAnimation("run1.JPG" , "run2.JPG" , "run3.JPG" , "run4.JPG" , "run5.JPG" ,
"run6.JPG" , "run7.JPG" , "run8.JPG" )
tigerImg = loadImage("tiger-2.png")
foxImg = loadImage("fox.png")
goImg = loadImage("gameover.png")
resetImg = loadImage("reset.png")
elephantImage = loadImage("elephant.png")

}

function setup() {
  createCanvas(510,555);

    ground=createSprite(380,560,600,20);
    ground.addImage("grImg",groundImg)
    ground.scale=0.2;
    ground.velocityX=-3.8;

    run=createSprite(70,460)
    run.addAnimation("runImage",runImg)
    run.scale=1;

    gameover=createSprite(200,250)
    gameover.addImage("goImage",goImg)
    gameover.scale=1.4;
    gameover.visible = false;

    restart = createSprite(200,140);
    restart.addImage("reset",resetImg);
    restart.scale = 0.4

    animalsGroup = new Group()

    /*run.setCollider("rectangle",0,0,20,50)
    run.debug = true*/
   
  
}

function draw() {
  background(backgroundImg); 
  fill("black");
  textSize(23);
  text("Score: "+ score, 20,20);

  
  if(gameState == PLAY){
    restart.visible = false;
    score = score + Math.round(getFrameRate()/27);
    ground.velocityX = -(6 + 1*score/100);

    fill("blue");
    textSize(17);
    text("**Press Space Key To Jump**",180,20);

        if(ground.x<0){
          ground.x=200 
        }
        
        flyRun();
        spawnAnimals();
        

      if(animalsGroup.isTouching(run)){
        gameState = END;
      }

      run.collide(ground)
     
      }

   else if(gameState === END){
      fill("blue");
      textSize(19);
      text("**Press Reset To Restart The Game**",180,20);
      gameover.visible=true
      restart.visible = true;
      ground.velocityX = 0;
      run.velocityY = 0;
      animalsGroup.destroyEach();
      animalsGroup.setVelocityXEach(0);

       if(mousePressedOver(restart)) {
          reset();
         }
         }
  
    drawSprites();
}

function flyRun(){
  if(keyDown("space")) {
   run.velocityY = -20;
    }
    run.velocityY = run.velocityY + 1.6
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  animalsGroup.destroyEach();
  
  score = 0;
  
}

function spawnAnimals() {
  if (frameCount % 100 === 0) {
     var animals = createSprite(556,random(480,480))
     animals.scale = 0.5;
     animals.velocityX = -7;

     var images = Math.round(random(1,3))
     switch (images){
      
     case 1 : animals.addImage(tigerImg)
              break;
     case 2 : animals.addImage(foxImg)
              break;
     case 3 : animals.addImage(elephantImage)
              break;
     default: break;

     }
     animalsGroup.add(animals);
  }
  }
  

