var bg
var bgimg
var rulebg
var start=1
var play=2
var end=3
var wingame=4
var gamestate=start
var playbutton
var circleimg
var barimg
var balloon
var balloonimg
var girl
var happyballoongirlimg
var sadballoongirlimg
var balloonburst
var balloonburstimg
var endburstimg
var gameover
var gameoverimg
var exit
var exitimg
var pause
var pauseimg
var playbutton
var playimg
var replay
var replayimg
var win
var winimg 
var giftimg
var score
var timer
var bars
var circle
var gift
var ranscore

function preload()
{
bgimg =loadImage("images/final.png")
balloonimg = loadAnimation("images/balloonplay.png")
circleimg = loadImage("images/sharpcircle.png")
barimg = loadImage("images/Picture1.png")
happyballoongirlimg = loadAnimation("images/g1.png","images/g2.png","images/g3.png")
sadballoongirlimg = loadAnimation("images/gc3.png","images/gc2.png")
balloonburstimg = loadAnimation("images/balloonplay.png","images/balloonburst1.png","images/balloonburst2.png")
gameoverimg = loadImage("images/gameover.png")
exitimg = loadImage("images/Exit.jpg")
pauseimg = loadImage("images/pause.jpg")
playimg = loadImage("images/play1.jpg")
replayimg = loadImage("images/replay.jpg")
winimg = loadImage("images/win.png")
endburstimg = loadAnimation("images/balloonburst2.png")
giftimg = loadImage("images/gift.png")
}


function setup()
{
createCanvas(windowWidth,windowHeight)

bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
bg.addImage(bgimg)
bg.velocityY=8

balloon = createSprite(windowWidth/2,windowHeight-50,50,50)
balloon.addAnimation("balloon",balloonimg)
balloon.addAnimation("balloon burst",balloonburstimg)
balloon.addAnimation("balloon end burst",endburstimg)

girl = createSprite(windowWidth/2+200,windowHeight/2-300,30,30)
girl.addAnimation("happy",happyballoongirlimg)
girl.addAnimation("sad",sadballoongirlimg)
girl.scale=2
girl.visible=false


gameover = createSprite(windowWidth/2,windowHeight/2,40,40)
gameover.addImage(gameoverimg)
gameover.visible=false

b1 = createSprite(windowWidth/2-300,windowHeight/2,20,windowHeight)
b1.shapeColor="black"

b2 = createSprite(windowWidth/2+300,windowHeight/2,20,windowHeight)
b2.shapeColor="black"

rulebg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
rulebg.shapeColor="black"

playbutton = createSprite(windowWidth/2,windowHeight/2,40,40)
playbutton.addImage(playimg)

replay = createSprite(windowWidth/2,windowHeight/2+150,40,40)
replay.addImage(replayimg)
replay.visible=false
replay.scale=0.5

win = createSprite(windowWidth/2,windowHeight/2,40,40)
win.addImage(winimg)

bg1=new Group()
cg1=new Group()
gg1=new Group()

score=0
ranscore = Math.round(random(1,5))

timer=40
setInterval(function()
{
timer=timer-1
},1000)
}

function draw()
{
background("black")
drawSprites()

balloon.bounceOff(b1)
balloon.bounceOff(b2)

if(gamestate==start)
{
bg.visible=false
replay.visible=false
win.visible=false
textSize(40)
fill("white")
text("Make the birthday girl happy!",30,windowHeight/10)
text("Get all the gifts and save the balloon from all spikes from your Left and Right Keys!",30,windowHeight/10+100)
playbutton.scale=0.5
playbutton.visible=true
bg.velocityY=0
if(mousePressedOver(playbutton))
{
gamestate=play
}
}
else
if(gamestate==play)
{
playbutton.visible=false
rulebg.visible=false
bg.visible=true
replay.visible=false
gameover.visible=false
win.visible=false
girl.visible=false
fill("white")
textSize(40)

text("Score="+score+"/"+ranscore,windowWidth/2+700,200)
bg.velocityY=4
if(bg.y>=windowHeight/2)
{
bg.y=bg.width/2;
}

if(keyWentDown("left"))
{
balloon.velocityX=-5
balloon.velocityY=0
}

if(keyWentUp("left"))
{
balloon.velocityX=0
balloon.velocityY=0
}
   
if(keyWentDown("right"))
{
balloon.velocityX=5
balloon.velocityY=0
}

if(keyWentUp("right"))
{
balloon.velocityX=0
balloon.velocityY=0
}
      
var ran=Math.round(random(1,2))
if(frameCount%100==0)
{
switch(ran)
{
case 1: Spawnbars();
      break;

case 2: Spawncircle();
      break;

default:break;
}
spawngifts()
}

text("Time:"+timer,windowWidth/2+700,100)
if(timer===0)
{
gamestate=end
console.log(timer)      
}

if(bg1.isTouching(balloon)||cg1.isTouching(balloon))
{
balloon.changeAnimation("balloon burst",balloonburstimg)
gamestate=end
}

if(balloon.isTouching(gg1))
{
score=score+1
gg1.destroyEach()
}

if(timer>0&&score>=ranscore)
{
gamestate=wingame
}

}//gamestate play ending
else
if(gamestate==end)//gamestate end starting
{
cg1.setVelocityYEach(0)
bg1.setVelocityYEach(0)
gg1.setVelocityYEach(0)

cg1.setLifetimeEach(-1)
bg1.setLifetimeEach(-1)
gg1.setLifetimeEach(-1)

balloon.changeAnimation("balloon end burst",endburstimg)
balloon.velocityY=0
balloon.velocityX=0

girl.changeAnimation("sad")

bg.velocityY=0

gameover.visible=true
replay.visible=true
win.visible=false
girl.visible=true

gift.depth=1
bars.depth=1
circle.depth=1

if(mousePressedOver(replay))
{
replaygame()
}
}//end ending
else if(gamestate===wingame)//wingame gamestate
{
win.visible=true
gameover.visible=false
replay.visible=true
girl.visible=true
girl.changeAnimation("happy")
cg1.setVelocityYEach(0)
bg1.setVelocityYEach(0)
gg1.setVelocityYEach(0)

cg1.setLifetimeEach(-1)
bg1.setLifetimeEach(-1)
gg1.setLifetimeEach(-1)
balloon.velocityY=0
balloon.velocityX=0
bg.velocityY=0

if(mousePressedOver(replay))
{
replaygame()
}
}

}//draw ending

function Spawnbars()
{
bars = createSprite(Math.round(random(windowWidth/2-300,windowWidth/2+300)),0,30,30)  
bars.scale=0.5
bars.velocityY=7+score
bars.velocityX=0
bars.addImage(barimg)
bars.lifetime=500
bg1.add(bars)
}

function Spawncircle()
{
circle = createSprite(Math.round(random(windowWidth/2-300,windowWidth/2+300)),0,30,30)  
circle.setCollider("circle",0,0,60)
circle.scale=0.5
circle.velocityY=7+score
circle.velocityX=0
circle.addImage(circleimg)
circle.lifetime=500
cg1.add(circle)
}

function replaygame()
{
gamestate=play
cg1.destroyEach()
bg1.destroyEach()
gg1.destroyEach()
balloon.changeAnimation("balloon")
score=0
timer=30
}

function spawngifts()
{
if(frameCount%50===0)
{      
gift = createSprite(Math.round(random(windowWidth/2-300,windowWidth/2+300)),0,30,30)
gift.addImage(giftimg)
gift.velocityY=6+score
gift.scale=0.1
gg1.add(gift)
gift.lifetime=500
}
}
