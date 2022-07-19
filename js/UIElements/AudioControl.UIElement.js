class AudioControlUIElement extends UIElement {
    constructor(){
        super(createVector(0,0));
    }
    update(){
        if(bttnClickCount==0){
            // if audio is not playing
            if(!(audio['main'].isPlaying())){
                // press play
                audio['main'].play();
                // if not looping set loop
                if(!(audio['main'].isLooping())){
                    audio['main'].loop();
                }
            }
        }
    }
}
