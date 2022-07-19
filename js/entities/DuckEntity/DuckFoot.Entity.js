class DuckFootEntity extends Entity {
    constructor(location, options){
        super(location);
        this.options = options || {};
    }

    update(){
        var maxYHeightOption = this.options.maxYHeight || 40.0;
        var initialLocation = this.options.initialLocation || createVector(0,0);
        var initialPosition = this.options.initialPosition || 0.0;
        initialPosition = Math.min(1.0,initialPosition);
        initialPosition = Math.max(0.0,initialPosition);

        var initialOffset = maxYHeightOption * initialPosition;
        var totalFrameMovement = frameCount * OPTION_DUCK_FEET_SPEED_MOD;
        var totalRange = (maxYHeightOption * 2);

        var yMod = (totalFrameMovement + initialOffset) % totalRange;
        var yModVector = createVector(0,yMod); // use y for vert

        // reset location
        this.location = initialLocation.copy();

        if(yMod <= maxYHeightOption){
            this.location.add(yModVector);
        }else{
            yModVector = createVector(0,totalRange-yMod);
            this.location.add(yModVector);
        }
    }

    display(){
        var imgOption = this.options.img_id || '';
        image(images[imgOption],this.location.x,this.location.y);
    }
}
