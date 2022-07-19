class DuckHatEntity extends Entity {
    constructor(location){
        super(location);
    }

    display(){
        var hatPos = createVector(OPTION_HAT_INITIAL_POSITION[0],OPTION_HAT_INITIAL_POSITION[1]);
        if(OPTION_HAT_JIGGLE_BOOLEAN){
            var tmpJiggleVector = createVector(lerp(-OPTION_HAT_JIGGLE_RANGE_PX,OPTION_HAT_JIGGLE_RANGE_PX,Math.random()),lerp(-OPTION_HAT_JIGGLE_RANGE_PX,OPTION_HAT_JIGGLE_RANGE_PX,Math.random()));
            hatPos.add(tmpJiggleVector);
        }
        image(images['hat'],hatPos.x,hatPos.y);
    }
}
