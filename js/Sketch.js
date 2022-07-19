/*=========== Setup Options =============== */
var OPTION_HAT_IMAGE_URL = 'images/Hat.png';
var OPTION_DUCK_IMAGE_URL = 'images/DuckAndTextNoFeetCropped.png';
var OPTION_DUCK_LEFT_FOOT_IMAGE_URL = 'images/LeftDuckFoot.png';
var OPTION_DUCK_RIGHT_FOOT_IMAGE_URL = 'images/RightDuckFoot.png';
var OPTION_TEXT_HIGHLIGHT_IMAGE_URL = 'images/TextHighlight.png';
var OPTION_MAIN_AUDIO_MUTE_IMAGE_URL = 'images/audio_volume.png';
var OPTION_MAIN_AUDIO_UNMUTE_IMAGE_URL = 'images/audio_mute.png';
var OPTION_TEAM_LOGO_IMAGE_URL = 'images/teamlogos.png';
var OPTION_MAIN_AUDIO_URL = 'audio/supremevictoryquack.mp3';

var OPTION_CLOUD_MASK_VAL = 0.3; // background black areas less than equal to this (val range: 0.00-1.00)
var OPTION_HAT_JIGGLE_BOOLEAN = true; // do jiggle hat
var OPTION_HAT_JIGGLE_RANGE_PX = 4; // range of pixles to jiggle hat
var OPTION_HAT_INITIAL_POSITION = [425,-10]; // init pos of hat
var OPTION_DUCK_LEFT_FOOT_MAX_Y_HEIGHT = 40;
var OPTION_DUCK_RIGHT_FOOT_MAX_Y_HEIGHT = 40;
var OPTION_DUCK_FEET_SPEED_MOD = 20;
/*========================================= */

var options = {'image_urls':{'HAT':OPTION_HAT_IMAGE_URL, 'DUCK':OPTION_DUCK_IMAGE_URL}};
var canvas_element;
var TeamParticleEmitterEntityTMP;

var images = {};
var audio = {};
var entities; // type: EntityCollection

var bttnClickCount = 0;

var params_to_options_map = [
    {from:'move_hat',to:''}
]
var params;
var uielements;
var timelineUIInstance;

/* Setup Methods */
function preload(){
    images['hat'] = loadImage(OPTION_HAT_IMAGE_URL);
    images['duck'] = loadImage(OPTION_DUCK_IMAGE_URL);
    images['duck_foot_left'] = loadImage(OPTION_DUCK_LEFT_FOOT_IMAGE_URL);
    images['duck_foot_right'] = loadImage(OPTION_DUCK_RIGHT_FOOT_IMAGE_URL);
    images['text_highlight'] = loadImage(OPTION_TEXT_HIGHLIGHT_IMAGE_URL);
    images['team_logo'] = loadImage(OPTION_TEAM_LOGO_IMAGE_URL);
    
    images['audio_mute'] = loadImage(OPTION_MAIN_AUDIO_MUTE_IMAGE_URL);//.resize(30,30);
    images['audio_unmute'] = loadImage(OPTION_MAIN_AUDIO_UNMUTE_IMAGE_URL);//.resize(30,30);

    audio['main'] = loadSound(OPTION_MAIN_AUDIO_URL);
}

function setup() {
    entities = new EntityCollection();
    uielements = new UIElementCollection();

    // add entities
    entities.addEntity(new CloudBackdropEntity(createVector(0,0)));
    entities.addEntity(new DuckEntity(createVector(0,0)));
    entities.addEntity(new TextEntity(createVector(0,0)));

    timelineUIInstance = new TimelineUIElement(createVector(0,0),createVector(100,100));
    uielements.addUIElement(new AudioControlUIElement());
    uielements.addUIElement(new MuteButtonUIElement());
    uielements.addUIElement(timelineUIInstance);

    // test add team logo
    //entities.addEntity(new TeamParticleEntity(createVector(-100,130),'BOS',5));
    TeamParticleEmitterEntityTMP = new TeamParticleEmitterEntity(createVector(-100,130),65);
    entities.addEntity(TeamParticleEmitterEntityTMP);
    // end add entities

    params = getURLParams();
    canvas_element = createCanvas(1280, 720);
    canvas_element.mouseOver(()=>{getAudioContext().resume()});
    
    frameRate(30);
    noStroke();
    
    images['audio_mute'].resize(30,30);
    images['audio_unmute'].resize(30,30);
}

/* Display Methods */
function draw() {
    background(30);
    entities.update();
    entities.display();
    uielements.update();
    uielements.display();
}

/* UI Methods */
function touchStarted() {
  getAudioContext().resume();
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

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
