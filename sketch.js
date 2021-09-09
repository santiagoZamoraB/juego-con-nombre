var personaje, personajeI, personajeA;
var vidasGroup;
var cajasGroup;
var vidas, vidasI;
var gameState;
var cajasVY;
var fondo,fondoI;
var asteroidesI1, asteroidesI2;
var sun, sunImage;
var gameOverI, gameOver
var estrellasI, estrellasG;
var vidasBarra0;
var vidasBarra;
var vidasBarra2;
var vidasBbarra3;
var vidasBarra4;
var vidasBarra5;
var energia;
var energiaBarra1;
var energiaBarra2;
var energiaBarra3;
var energiaBarra4;
var energiaBarra5;
var energiaBarra6;
var energiaBarra7;
var energiaBarra8;
var energiaBarra9;
var energiaBarra10;
var edges;
var mapasGrupo
var score; 
var niveles




function preload(){
  
 //fondoI = loadImage("fondo.png");
 // personajeI = loadImage("astronauta.png");
  personajeA = loadAnimation("astr1.png","astr2.png","astr3.png","astr4.png","astr5.png");
  asteroidesI1 = loadImage("roca.png");
  asteroidesI2 = loadImage("roca2.png");
  estrellasI = loadImage("estrellas3.png");
  vidasI = loadImage("VidasI.png");
  gameOverI = loadImage("die.png");

}
function setup(){
  createCanvas (windowWidth,windowHeight);

  gameState ="start";

  edges = createEdgeSprites();

  sun = createSprite(400,25,1000,200);
  sun. shapeColor = (255, 128, 0);
  
  vidasBarra0 = createSprite(80,105,20,20);
  vidasBarra0.shapeColor = "blue";
  vidasBarra = createSprite(100,100,20,30);
  vidasBarra.shapeColor = "blue";
  vidasBarra2 = createSprite(120,95,20,40);
  vidasBarra2.shapeColor = "blue";
  vidasBarra3 = createSprite(140,90,20,50);
  vidasBarra3.shapeColor = "blue";
  vidasBarra4 = createSprite(160,85,20,60);
  vidasBarra4.shapeColor = "blue";
  vidasBarra5 = createSprite(180,80,20,70);
  vidasBarra5.shapeColor = "blue";

  energiaBarra1 = createSprite(windowWidth - 290,100,10,50);
  energiaBarra1.shapeColor = "blue";
  energiaBarra2 = createSprite(windowWidth - 280,100,10,50);
  energiaBarra2.shapeColor = "blue";
  energiaBarra3 = createSprite(windowWidth - 270,100,10,50);
  energiaBarra3.shapeColor = "blue";
  energiaBarra4 = createSprite(windowWidth - 260,100,10,50);
  energiaBarra4.shapeColor = "blue";
  energiaBarra5 = createSprite(windowWidth - 250,100,10,50);
  energiaBarra5.shapeColor = "blue";
  energiaBarra6 = createSprite(windowWidth - 240,100,10,50);
  energiaBarra6.shapeColor = "blue";
  energiaBarra7 = createSprite(windowWidth - 230,100,10,50);
  energiaBarra7.shapeColor = "blue";
  energiaBarra8 = createSprite(windowWidth - 220,100,10,50);
  energiaBarra8.shapeColor = "blue";
  energiaBarra9 = createSprite(windowWidth - 210,100,10,50);
  energiaBarra9.shapeColor = "blue";
  energiaBarra10 = createSprite(windowWidth - 200,100,10,50);
  energiaBarra10.shapeColor = "blue";

  gameOver = createSprite(400,400,10,10);
  gameOver.addImage(gameOverI);
  gameOver.scale = 0.50;
  
  
  //fondo = createSprite(400,400,100,100);
 // fondo. addImage(fondoI);
  //fondo.scale = 2;
  
  vidasGroup = new Group();
  cajasGroup = new Group();
  estrellasG = new Group();
  
  
  
  
  personaje = createSprite(400,400,40,40);
  personaje.shapeColor = "white";
  personaje.scale = 0.25;
  //personaje. addImage(personajeI);
  personaje.addAnimation('runing',personajeA);
  personaje.debug = true;
  personaje.setCollider("circle",0,0,100);
  
}
function draw(){
 background(0);
  console.log(gameState);
 
  if(gameState === "start"){
    niveles = "nivel 1";
    vidas = 30;
    energia = 100;
    cajasVY = -7;
    score = 500;
    theStart();
  

  
  if(keyDown("space")){
    gameState = "play";
    
  }
  }  
    
  if(gameState === "play"){
    
    console.log();

    

    if(niveles = 1 ){
    
      mostrarVidas();
      mostrarEnergia();

      personaje.collide(edges[0,1,2,3]);
      personaje.y = personaje.y -10;
      personajeM();
      personaje.changeAnimation("runing",personajeA)
    
    
    if(personaje.isTouching(vidasGroup)){
      vidasGroup.destroyEach();
      vidas = vidas + 2;
      energia = 100;
    }
      
    if(personaje.isTouching(cajasGroup)){
    cajasGroup.destroyEach();
    vidas = vidas - 5; 
    energia = energia -15;
    }
      
    if(personaje.isTouching(sun)){
      vidas = vidas -1;
    }
      
    livesSpawn();
    cajasSpawn();
    
    if(vidas < 0 || vidas === 0){
      gameState = "GameOver";
    }  
    estrellas();
    
     if(score < 1){
       niveles = 2;
    }
    }
    if(niveles = 2){
      console.log("Hola");
    }

  }
  
  if(gameState === "GameOver"){
      gameTheOver();
      if(vidas === 0){
        vidasBarra0. shapeColor = "grey";
      }
    
    if(keyDown("r")){
      gameState = "start";
      resetear();
    }
  }
  
  drawSprites();
  fill("white");
  stroke("black");
  textSize(25);
  text("Energía: "+ Math.round(energia),windowWidth - 290,110);
  
}
function personajeM(){

  if(keyDown("s") && energia > 0){
    personaje.y = personaje.y +20;
    energia = energia - 0.75;
    score = score - 10;
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
    var random1 = Math.round(random(1,windowWidth - 100));
    var vidas = createSprite(random1,windowHeight - 50,20,20);
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

    var random3 = Math.round(random(1,windowHeight - 100))
    var cajas = createSprite(random3,windowHeight + 20,20,20);
    var rdm2 = Math.round(random(1,2))
    cajas.scale = 0.25;
    cajas.velocityY= cajasVY;
    cajas.lifetime = 850;
    cajasGroup. add(cajas);
    cajas.debug = true 
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
  if(frameCount % 300 === 0){
    cajasVY = cajasVY-2;
  }
  
}
function gameTheOver(){
  
  gameOver.visible= true;
  cajasGroup.destroyEach();
  vidasGroup.destroyEach();
  
  estrellasG.setVelocityYEach(0);
  estrellasG.setLifetimeEach(-1);
  //sun.velocityY = -3;
  
}
function theStart(){
  
  gameOver. visible= false;

  personaje.x = windowWidth/ 2;
  personaje.y = windowHeight/ 2;
  
  sun.velocityY = 0;
  sun.y = 25;
  
  

  
}
function estrellas(){

  if(frameCount % 10 === 0){
    var xRandom = Math.round(random(1,windowWidth - 100));
    
    var estrellas=createSprite(xRandom,windowHeight + 20,10,10);
        estrellas.addImage(estrellasI);
        estrellas. scale = 0.10;
        estrellas. velocityY = -5;
        estrellas. lifetime = 130;
        estrellasG. add(estrellas);
        
  }

}
function resetear(){
   estrellasG.destroyEach();
}
function mostrarVidas(){

   if( vidas < 30 ){

    vidasBarra5.shapeColor = "grey";
    vidasBarra4.shapeColor = "green";
    vidasBarra3.shapeColor = "green";
    vidasBarra2.shapeColor = "green";
    vidasBarra.shapeColor = "green";
    vidasBarra0.shapeColor = "green";
   }
   else{
    vidasBarra5.shapeColor = "blue";
    vidasBarra4.shapeColor = "blue";
    vidasBarra3.shapeColor = "blue";
    vidasBarra2.shapeColor = "blue";
    vidasBarra.shapeColor = "blue";
    vidasBarra0.shapeColor = "blue";
   }

   if(vidas <21  && vidas <25 ){
      
      vidasBarra4.shapeColor = "grey";
      vidasBarra3.shapeColor = "yellow";
      vidasBarra2.shapeColor = "yellow";
      vidasBarra0.shapeColor = "yellow";
      vidasBarra.shapeColor = "yellow";
   }
   if(vidas <16  && vidas < 20 ){
    vidasBarra3.shapeColor = "grey";
    vidasBarra2.shapeColor = "orange";
    vidasBarra.shapeColor = "orange";
    vidasBarra0.shapeColor = "orange";
   }
   if(vidas <10  && vidas <15 ){
     vidasBarra2.shapeColor = "grey";
     vidasBarra0.shapeColor = "red";
     vidasBarra.shapeColor = "red";
   }
   if(vidas <5 && vidas <9 ){
     vidasBarra0.shapeColor  = "red";
     vidasBarra.shapeColor = "grey";
   }

}
function mostrarEnergia(){
  if(energia < 100 ){
    energiaBarra10.shapeColor = "grey";
    energiaBarra9.shapeColor = "blue";
    energiaBarra8.shapeColor = "blue";
    energiaBarra7.shapeColor = "blue";
    energiaBarra6.shapeColor = "blue";
    energiaBarra5.shapeColor = "blue";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";

  }
  else{
    energiaBarra10.shapeColor = "blue";
    energiaBarra9.shapeColor = "blue";
    energiaBarra8.shapeColor = "blue";
    energiaBarra7.shapeColor = "blue";
    energiaBarra6.shapeColor = "blue";
    energiaBarra5.shapeColor = "blue";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if(energia < 91 && energia < 99 ){
    energiaBarra9.shapeColor = "grey";
    energiaBarra8.shapeColor = "blue";
    energiaBarra7.shapeColor = "blue";
    energiaBarra6.shapeColor = "blue";
    energiaBarra5.shapeColor = "blue";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if(energia < 81 && energia < 90){
    energiaBarra8.shapeColor = "grey";
    energiaBarra7.shapeColor = "blue";
    energiaBarra6.shapeColor = "blue";
    energiaBarra5.shapeColor = "blue";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if( energia < 71 && energia < 80){
    energiaBarra7.shapeColor = "grey";
    energiaBarra6.shapeColor = "blue";
    energiaBarra5.shapeColor = "blue";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if(energia < 61 && 70){
    energiaBarra6.shapeColor = "grey";
    energiaBarra5.shapeColor = "blue";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if( energia < 51 && energia < 60){
    energiaBarra5.shapeColor = "grey";
    energiaBarra4.shapeColor = "blue";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if( energia < 41 && energia < 50){
    energiaBarra4.shapeColor = "grey";
    energiaBarra3.shapeColor = "blue";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if( energia < 31 && energia < 40){
    energiaBarra3.shapeColor = "grey";
    energiaBarra2.shapeColor = "blue";
    energiaBarra1.shapeColor = "blue";
  }
  if( energia < 21 && energia < 30){
    energiaBarra2.shapeColor = "grey";
    energiaBarra1.shapeColor = "blue";
  }
  if( energia < 11 && energia < 20){
    energiaBarra1.shapeColor = "grey";
  }
  if(energia === 0 ){
    energiaBarra1 .shapeColor = "grey";
  }
}
