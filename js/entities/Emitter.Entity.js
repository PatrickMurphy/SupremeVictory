class EmitterEntity extends EntityCollectionEntity {
    constructor(location,emitRate){
        super(location);
        this.emitRate_frames = emitRate;
        this.lastEmitFrame = 0;
        this.lastEmitObjIndex = 0;
    }

    lookAt(t) {
        //if (debug) println("call lookAt " + stationary + "  : " + userControlled);
        var tempVect = createVector(t.x, t.y);
        tempVect.sub(location);
        tempVect.setMag(0.00001);
        this.velocity = tempVect;
    }

    canEmit(){
        return (frameCount - this.lastEmitFrame >= this.emitRate_frames);
    }

    // fire a projectile towards the current orientation
    emit(entity) {
        if (this.canEmit()) {
            entity = entity || new TeamParticleEntity(this.location.copy(), 'BOS', 5);
            this.EntityCollection.addEntity(entity);
            this.lastEmitFrame = frameCount;
            this.lastEmitObjIndex++;
        }
    }

    display(){
        super.display();
        fill(255);
        rect(this.location.x,this.location.y,10,10);
    }

    update(){
        super.update();
    }
}
