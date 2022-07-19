class MuteButtonUIElement extends UIElement {
    constructor(location){
        super(createVector(0,0));
    }
    display(){
        fill(255);
        rect(10,height-40-10,40,40);
        if(audio['main'].isPlaying()){
            image(images['audio_mute'],15,height-40-5);
        }else{
            image(images['audio_unmute'],15,height-40-5);
        }
    }
}
