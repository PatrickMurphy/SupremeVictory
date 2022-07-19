class UIElement extends Entity {
    constructor(loc,dimensions,visibility){
        super(location);
        this.dimensions = dimensions || createVector(width,height);
        this.visibility = visibility || true;
    }

    update(){

    }

    display(){
        if(this.visibility){

        }
    }

    hasChildren(){
        return false;
    }
}
