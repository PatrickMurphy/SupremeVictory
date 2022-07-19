class LaserEmitterEntity extends EmitterEntity {
    constructor(location,range,fireRate_frames){
        super(location,fireRate_frames);
        this.range = range;
    }

    // fire a projectile towards the current orientation
    emit() {
        if (this.canEmit()) {
            this.EntityCollection.addEntity(new ProjectileEntity(this,10,5));
            this.lastEmitFrame = frameCount;
        }
    }

    update(){
        super.update();
        var all_entities = entities.getEntities();
        for(var i = 0; i<all_entities.length; i++){
            if(!this.canEmit()){
                break; // if the emitter is not fireable, exit the loop (break) to reduce computations
            }
            var ent = all_entities[i];
            if(ent.getEntityType() === 'TargetEntity'){
                // fire if in range
                if(this.distance(ent) <= this.range){
                    //console.log('fire ' + frameCount);
                    this.lookAt(ent.location);
                    this.emit();
                }
            }
        }
    }
}
