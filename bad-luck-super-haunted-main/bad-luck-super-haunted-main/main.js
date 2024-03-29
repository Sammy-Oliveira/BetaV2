import {k} from "./kaboom.js"

loadSprite("wood", "sprites/wood.png");
loadSprite("door", "sprites/door.png");
loadSprite("player", "sprites/player.png");
loadSprite("enemy1", "sprites/enemy1.png");
loadSprite("enemy2", "sprites/enemy2.png");
loadSprite("table", "sprites/table.png");
//loadPedit("cat", "sprites/cat.pedit");
loadSprite("cat", "sprites/cat.png");
loadSprite("invis-wall", "sprites/invis-wall.png");
// let img1 = loadImage(assets/wood.png);
// let img2 = loadImage(assets/door.png);
// let img3 = loadImage(assets/player.png);
// let img4 = loadImage(assets/enemy1.png);
// let img5 = loadImage(assets/flashlight.png);
// let img6 = loadImage(assets/table.png);
// let img7 = loadImage(assets/cat.png);
// let img8 = loadImage(assets/invis-wall.png);

let MOVE_SPEED = 220
let JUMP_FORCE = 550
let ENEMY_SPEED = 50
let BOSS_SPEED = 75
let poss = false

const LEVELS = [
  [
  '                                          ',
  '                                          ',
  '                                          ', 
  '                                          ',
  '                                          ',
  '                 ?- &  ?                  ',
  '                 !!!!!!!                  ',
  '                                          ',
  '             !!               !!!!        ',
  '                                          ',
  '    ~  ?                 ^    ?           ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
], 
[
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '                                        ',
  '        ?    -  &           ?           ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
],
[
  '                                          ',
  '                                          ',
  '                                          ', 
  '                                          ',
  '        !!!                  !!!          ',
  '                ?   ^   ?                 ',
  '                !!!!!!!!!                 ',
  '                                          ',
  '        !!!                  !!!          ',
  '                                          ',
  '                                          ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
],
[
  '                                          ',
  '                                          ',
  '                               ?   & ?    ', 
  '                               !!!!!!!    ',
  '                      ? ^ ?               ',
  '                      !!!!!               ',
  '              ? ^ ?                       ',
  '              !!!!!                       ',
  '      ? ^ ?                  ~            ',
  '      !!!!!                 !!!           ',
  '                                          ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
 ],
 [
  '                                          ',
  '       ?  &  ?      !!     ?  &  ?        ',
  '       !!!!!!!             !!!!!!!        ', 
  '                                          ',
  '                   !!!!                   ',
  '                                          ',
  '          !!!!             !!!!           ',
  '                                          ',
  '                   !!!!                   ',
  '          !!!!             !!!!           ',
  ' ?                  ^                   ? ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
 ],
 [
  '      ?& ?        ?& ?        ?& ?        ',
  '      !!!!        !!!!        !!!!        ',
  '            ?& ?         ?& ?             ', 
  '            !!!!         !!!!             ',
  '      ?& ?        ?& ?        ?& ?        ',
  '      !!!!        !!!!        !!!!        ',
  '            ?& ?         ?  ?             ',
  '            !!!!         !!!!             ',
  '      ?  ?        ?  ?        ?  ?        ',
  '      !!!!        !!!!        !!!!        ',
  '                                          ',
  '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
 ],
]

let go_table = () => {return [
  sprite('table'),
  'table',
  area()
]}

let go_cat = () => {return [
  sprite('cat'),
  'cat',
  area(),
]}
  
scene("game", ({ levelIdx }) => {
  
  const level = addLevel(LEVELS[levelIdx || 0], {
  
  width: 32,
  height: 32,
  //'#' : ()=>[sprite('door'), 'door', scale(0.7),],

  '!' : ()=>[sprite('wood'), 'wood', solid(), area()],
  '?' : ()=>[sprite('invis-wall'), 'invis-wall', area()],
 '&' : ()=>[sprite('enemy1'), 'enemy1', area(), body()],
 '^' : ()=>[sprite('enemy2'), 'enemy2', area(), body(), ],
  '-' : go_table,
  '~' : go_cat,
})


let door = add([

  sprite('door'),
  pos(1000, 296),
  width(32), 
  height(64),
  area(),
  scale(1.7)
  //body(),
])

add([
  text('use the left and right arrow keys to go left and right'),
  origin('center'),
  pos(0, height() / 7),
])

add([
  text('jump using space'),
  origin('center'),
  pos(0, height() / 6),
])

add([
  text('enter doors by pressing the up arrow key'),
  origin('center'),
  pos(0, height() / 5),
])

add([
  text('attack pink civilians for points!'),
  origin('center'),
  pos(0, height() / 4),
])

add([
  text('but dont let the yellow enemies hit you, or youll lose!'),
  origin('center'),
  pos(0, height() / 3),
])

add([
  text('you can avoid the yellow by haunting objects like tables, haunt and unhaunt objects by pressing down'),
  origin('center'),
  pos(0, height() / 2.5),
])

add([
  text('but when possessing cats, you cant scare civies, so you gotta unpossess the cat!'),
  origin('center'),
  pos(0, height() / 2),
])


let player = add([
	sprite("player"),
	pos(40, 40),
	area(),
  body(),
])

//next level 

onKeyPress ("up", ()=> {
  if (player.isColliding(door)) {
     if (levelIdx < LEVELS.length - 1) {
  // If there's a next level, go() to the same scene but load the next level
  go("game", {
  levelIdx: levelIdx + 1,
      score: score,
})
  } else {
  // Otherwise we have reached the end of game, go to "win" scene!
  go("win", { score: score })
  }
}
})

// //next level 
// player.onCollide("door", () => {
 
//   })



onKeyPress ("down", ()=> {
  poss =! poss;
  if(poss==false){
    console.log("false"),
    MOVE_SPEED = 200,
    JUMP_FORCE = 550
    player.use(sprite('player'))
    player.unuse(sprite('table'))
    }
  let t = get('table')[0]
  if (player.isColliding(t)) {
    if(poss==true){
    MOVE_SPEED = 0,
    JUMP_FORCE = 0
    player.unuse(sprite('player'))
    player.use(sprite('table'))
    }
  }
})

//preparing for cat possession

// onKeyPress ("down", ()=> {
//   poss =! poss;
//   let c = get('cat')[0]
//   if(poss==false){
//     console.log("false"),
//     MOVE_SPEED = 200,
//     JUMP_FORCE = 550
//     player.use(sprite('player'))
//     player.unuse(sprite('cat'))
//     }
//   if (player.isColliding(c)) {
//     if(poss==true){
//     player.unuse(sprite('player'))
//     player.use(sprite('cat'))
//     }
//   }
// })


player.onUpdate(() => {
  camPos(player.pos)
})

const score = add([
  text('0'),
  pos(50,50),
  {
    value:0,
  }
])

//player movement
keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
  player.flipX(true);
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
  player.flipX(false);
})

keyPress('space', () => {
  if(player.isGrounded()) {
    player.jump(JUMP_FORCE)
  }
})

//player destroys enemy
player.onCollide('enemy1', (e)=> {
  if(poss==false){
  destroy(e);
  shake(2);
  score.value++
  score.text = score.value
  }
  ENEMY_SPEED = ENEMY_SPEED * -1;
});


//flashlight destroys player
player.onCollide('enemy2', ()=> {
  if(poss==true){
    BOSS_SPEED = BOSS_SPEED * -1;
  }
  if(poss==false){
  destroy(player);
  shake(2);
  go('lose', { score: score.value})
  }
});

action('enemy1', (s)=> {
  s.move(ENEMY_SPEED, 0)
  
})

action('enemy2', (s)=> {
  s.move(BOSS_SPEED, 0)
  
})

//enemy movement

onCollide('enemy1', 'invis-wall', (s,p)=> {
  if(ENEMY_SPEED == 50){
    s.flipX(false);
  } else{
   s.flipX(true);
  }
  ENEMY_SPEED = ENEMY_SPEED * -1
})

// if(ENEMY_SPEED == 50){
//   s.flipX(false);
// } else{
//  s.flipX(true);
// }

onCollide('enemy2', 'invis-wall', (s,p)=> {
  if(BOSS_SPEED == 50){
    s.flipX(false);
  } else{
   s.flipX(true);
  }
  BOSS_SPEED = BOSS_SPEED * -1
})

// if(BOSS_SPEED == 50){
//   s.flipX(false);
// } else{
//  s.flipX(true);
// }

onCollide('enemy1', 'enemy2', (s,p)=> {
  // if(ENEMY_SPEED == -50){
  //   s.flipX(false);
  // } else{
  //  s.flipX(true);
  // }
  // if(BOSS_SPEED == -50){
  //   p.flipX(false);
  // } else{
  //  p.flipX(true);
  // }
  ENEMY_SPEED = ENEMY_SPEED * -1,
  BOSS_SPEED = BOSS_SPEED * -1

})


})

function start() {
  // Start with the "game" scene, with initial parameters
  go("game", {
  levelIdx: 0,
  score: 0,
  })
}


start()
