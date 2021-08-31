var personaje, personajeI, personajeA;
var vidasGroup;
var cajasGroup;
var topE,leftE,rightE,bottomE,eGroup;
var vidas, vidasI;
var gameState;
var cajasW = 100;
var cajasVY = -7;
var fondo,fondoI;
var asteroidesI1, asteroidesI2;
var sun, sunImage;
var gameOverI, gameOver

function preload(){
  
 //fondoI = loadImage("fondo.png");
 // personajeI = loadImage("astronauta.png");
  personajeA = loadAnimation("astr1.png","astr2.png","astr3.png","astr4.png","astr5.png");
  asteroidesI1 = loadImage("roca.png");
  asteroidesI2 = loadImage("roca2.png");
  vidasI = loadImage("VidasI.png");
  gameOverI = loadImage("die.png");

}
function setup(){
  createCanvas (800,800);

  gameState ="start";

  gameOver = createSprite(400,400,10,10);
  gameOver.addImage(gameOverI);
  gameOver.scale = 0.50;
  
  
  //fondo = createSprite(400,400,100,100);
 // fondo. addImage(fondoI);
  //fondo.scale = 2;
  
  vidasGroup = new Group();
  eGroup = new Group();
  cajasGroup = new Group();
  
  sun = createSprite(400,25,1000,200);
  sun. shapeColor = "orange";
  
  personaje = createSprite(400,400,40,40);
  personaje.shapeColor = "white";
  personaje.scale = 0.25;
  //personaje. addImage(personajeI);
  personaje.addAnimation('runing',personajeA);
  
  
  vidas = 25;
  
  
  
  topE   = createSprite(400,-10,800,30);
  eGroup. add(topE);
  topE.shapeColor = "white";
  leftE  = createSprite(-10,400,30,800);
  eGroup. add(leftE);
  leftE.shapeColor = "white";
  rightE =createSprite(810,400,30,800);
  eGroup. add(rightE);
  rightE.shapeColor = "white";
  bottomE=createSprite(400,810,800,30);
  eGroup. add(bottomE);
  bottomE.shapeColor = "white";
  

  
}
function draw(){
 background(0);
  console.log(gameState);
 
  if(gameState === "start"){
    vidas = 25;
    theStart();
  

  
  if(keyDown("space")){
    gameState = "play";
    
  }
  }  
    
  if(gameState === "play"){
    
    personaje.y = personaje.y -10;
    personajeM();
    personaje.changeAnimation("runing",personajeA)
  
  personaje.collide(eGroup);
  
  if(personaje.isTouching(vidasGroup)){
    vidasGroup.destroyEach();
    vidas = vidas + 2;
  }
    
  if(personaje.isTouching(cajasGroup)){
  cajasGroup.destroyEach();
  vidas = vidas - 5; 
  }
    
  if(personaje.isTouching(sun)){
    vidas = vidas -1;
  }
    
  livesSpawn();
  cajasSpawn();
  
  if(vidas < 0 || vidas === 0){
    gameState = "GameOver";
  }  
  
  }
  
  if(gameState === "GameOver"){
      gameTheOver();
    
    if(keyDown("r")){
      gameState = "start";
    }
  }
  
  drawSprites();
  textSize(20);
  text("Vidas: "+vidas,400,100);
  
}
function personajeM(){

  if(keyDown("s")){
    personaje.y = personaje.y +20;
  }
  if(keyDown("a")){
    personaje.x = personaje.x -20;
  }
  if(keyDown("d")){
    personaje.x = personaje.x +20;
  }
}
function livesSpawn(){
  if(frameCount % 150 === 0){
    var random1 = Math.round(random(0,800));
    var vidas = createSprite(random1,800,20,20);
    vidas.addImage(vidasI);
    vidas.scale = 0.10
    vidas. shapeColor = "white";
    vidas.velocityY = -5;
    vidas.lifetime= 850;
    vidasGroup.add(vidas);
  }  
}
function cajasSpawn(){

  if(frameCount % 100 === 0){

    var random3 = Math.round(random(30,770))
    var cajas = createSprite(random3,800,cajasW,20);
    var rdm2 = Math.round(random(1,2))
    cajas.scale = 0.25;
    cajas.velocityY= cajasVY;
    cajas.lifetime = 850;
    cajasGroup. add(cajas);
    switch(rdm2){
      case 1:
      cajas.addImage(asteroidesI1);
      break;
      case 2:
      cajas.addImage(asteroidesI2);
      break;
      default: break;
        
    }
  }
  if(frameCount % 500 === 0){
    cajasW = cajasW+10;
    cajasVY = cajasVY-2;
  }
  console.log(cajasW,cajasVY)
}
function gameTheOver(){
  
  gameOver.visible= true;
  cajasGroup.destroyEach();
  vidasGroup.destroyEach();
  
  sun.velocityY = -3;
  sun.lifetime = 10;
  
}
function theStart(){
  
  gameOver. visible= false;

  personaje.x = 400;
  personaje.y = 400;
  
  sun.y = 25;
}