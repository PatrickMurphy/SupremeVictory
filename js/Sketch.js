var images = {};
var audio = {};
var OPTION_HAT_IMAGE_URL = 'images/Hat.png';
var OPTION_DUCK_IMAGE_URL = 'images/DuckAndTextNoFeet.png';
var OPTION_DUCK_LEFT_FOOT_IMAGE_URL = 'images/LeftDuckFoot.png';
var OPTION_DUCK_RIGHT_FOOT_IMAGE_URL = 'images/RightDuckFoot.png';
var OPTION_TEXT_HIGHLIGHT_IMAGE_URL = 'images/TextHighlight.png';
var OPTION_MAIN_AUDIO_MUTE_IMAGE_URL = 'images/audio_volume.png';
var OPTION_MAIN_AUDIO_UNMUTE_IMAGE_URL = 'images/audio_mute.png';
var OPTION_MAIN_AUDIO_URL = 'audio/supremevictoryquack.mp3';

var OPTION_CLOUD_MASK_VAL = 0.3; // background black areas less than equal to this (val range: 0.00-1.00)
var OPTION_HAT_JIGGLE_BOOLEAN = true; // do jiggle hat
var OPTION_HAT_JIGGLE_RANGE_PX = 4; // range of pixles to jiggle hat
var OPTION_HAT_INITIAL_POSITION = [425,-10]; // init pos of hat
var OPTION_DUCK_LEFT_FOOT_MAX_Y_HEIGHT = 40;
var OPTION_DUCK_RIGHT_FOOT_MAX_Y_HEIGHT = 40;
var OPTION_DUCK_FEET_SPEED_MOD = 20;

var canvas_element;

var xVal;
var bttnClickCount = 0;
var LeftDuckFootPos, RightDuckFootPos;

function preload(){
    images['hat'] = loadImage(OPTION_HAT_IMAGE_URL);
    images['duck'] = loadImage(OPTION_DUCK_IMAGE_URL);
    images['duck_foot_left'] = loadImage(OPTION_DUCK_LEFT_FOOT_IMAGE_URL);
    images['duck_foot_right'] = loadImage(OPTION_DUCK_RIGHT_FOOT_IMAGE_URL);
    images['text_highlight'] = loadImage(OPTION_TEXT_HIGHLIGHT_IMAGE_URL);
    
    images['audio_mute'] = loadImage(OPTION_MAIN_AUDIO_MUTE_IMAGE_URL);//.resize(30,30);
    images['audio_unmute'] = loadImage(OPTION_MAIN_AUDIO_UNMUTE_IMAGE_URL);//.resize(30,30);
    audio['main'] = loadSound(OPTION_MAIN_AUDIO_URL);
}

function setup() {
    canvas_element = createCanvas(1280, 720);
    canvas_element.mouseOver(()=>{getAudioContext().resume()});
    
    xVal = 0;
    
    frameRate(40);
    noStroke();
    
    images['audio_mute'].resize(30,30);
    images['audio_unmute'].resize(30,30);
}

function touchStarted() {
  getAudioContext().resume();
}

function draw() {
    background(30);
    drawClouds();
    drawDuck();
    drawText();
    drawHat();
    drawMuteButton();
    
    if(bttnClickCount==0){
        if(!(audio['main'].isPlaying())){ 
            audio['main'].play();
            if(!(audio['main'].isLooping())){
                audio['main'].loop();
            }
        }
    }
}

function drawClouds(){
    xVal++;
    for(var i = 0; i < 128; i++) {
        for(var j = 0; j < 72; j++) {
            var ran = noise((i+xVal) / 50, j / 15);
            var color1 = color('#693b93');
            var color2 = color(0);
            var col = color(0);
            if(ran >= OPTION_CLOUD_MASK_VAL){
                col = lerpColor(color2, color1, map(ran,OPTION_CLOUD_MASK_VAL,1,0,1));
            }
            fill(col);
            rect(i * 10, j * 10, 10, 10); 
        }
    }
}

function drawDuckFeet(){
    LeftDuckFootPos = createVector(452,442);
    RightDuckFootPos = createVector(682,517);
    drawDuckLeftFoot();
    drawDuckRightFoot();
}

function drawDuckLeftFoot(){
    var img_id = 'duck_foot_left';
    var maxYHeightOption = OPTION_DUCK_LEFT_FOOT_MAX_Y_HEIGHT;
    
    var yMod = (frameCount * OPTION_DUCK_FEET_SPEED_MOD) % (maxYHeightOption * 2);
    var yModVector = createVector(0,yMod);
    
    if(yMod <= maxYHeightOption){
        LeftDuckFootPos.add(yModVector);
    }else{
        yModVector = createVector(0,maxYHeightOption*2-yMod);
        LeftDuckFootPos.add(yModVector);
    }
    image(images[img_id],LeftDuckFootPos.x,LeftDuckFootPos.y);
}

function drawDuckRightFoot(){
    var img_id = 'duck_foot_right';
    var maxYHeightOption = OPTION_DUCK_RIGHT_FOOT_MAX_Y_HEIGHT;
    
    var yMod = (frameCount * OPTION_DUCK_FEET_SPEED_MOD + maxYHeightOption) % (maxYHeightOption * 2);
    var yModVector = createVector(0,yMod);
    
    if(yMod <= maxYHeightOption){
        RightDuckFootPos.add(yModVector);
    }else{
        yModVector = createVector(0,maxYHeightOption*2-yMod);
        RightDuckFootPos.add(yModVector);
    }
    image(images[img_id],RightDuckFootPos.x,RightDuckFootPos.y);
}

function drawDuck(){
    drawDuckFeet(); // draw under duck
    image(images['duck'],0,0);
}

function drawText(){
    let img = images['text_highlight'];
    let graphics = createGraphics(width,height);
    let xPosVal = ((frameCount*15) % (img.width-500))+250;
    img.loadPixels();
    graphics.loadPixels();
    for (let x = 250; x < img.width-250; x++) {
        for (let y = 310; y < img.height-310; y++) {
            // Calculate the 1D location from a 2D grid
            let loc = (x + y*img.width)*4;

            // if alpha not equal to zero continue
            if(img.pixels[loc+3] === 0){
                continue; // next loop iteration    
            }else{
                if(Math.abs(x - xPosVal)<=25){
                    let r,g,b,a;
                    // make white for now, but blend later
                    r = 255;
                    g = 255;
                    b = 255;
                    a = map(Math.abs(x - xPosVal),0,26,240,0);

                    // Make a new color and set pixel in the window
                    let pixloc = (y * graphics.width + x)*4;
                    graphics.pixels[pixloc] = r;
                    graphics.pixels[pixloc+1] = g;
                    graphics.pixels[pixloc+2] = b;
                    graphics.pixels[pixloc+3] = a; // Always have to set alpha
                }
            }
        }
    }
    graphics.updatePixels();
    image(graphics,0,0);
    graphics.remove();
}

function drawHat(){
    // draw mariners hat
    var hatPos = createVector(OPTION_HAT_INITIAL_POSITION[0],OPTION_HAT_INITIAL_POSITION[1]);
    if(OPTION_HAT_JIGGLE_BOOLEAN){
        var tmpJiggleVector = createVector(lerp(-OPTION_HAT_JIGGLE_RANGE_PX,OPTION_HAT_JIGGLE_RANGE_PX,Math.random()),lerp(-OPTION_HAT_JIGGLE_RANGE_PX,OPTION_HAT_JIGGLE_RANGE_PX,Math.random()));
        hatPos.add(tmpJiggleVector);
    }
    image(images['hat'],hatPos.x,hatPos.y);
}

function drawMuteButton(){
    fill(255);
    rect(10,height-40-10,40,40);
    if(audio['main'].isPlaying()){
        image(images['audio_mute'],15,height-40-5);
    }else{
        image(images['audio_unmute'],15,height-40-5);
    }
}

function mouseClicked(){
    if(mouseX >= 10 && mouseX <= 50){
        if(mouseY >= height-50 && mouseY <= height-10){
            if(audio['main'].isPlaying() && bttnClickCount>0){
                audio['main'].stop();
            }else{
                audio['main'].play();
                audio['main'].loop();
            }
            bttnClickCount++;
        }
    }
}