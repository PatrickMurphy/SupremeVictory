class LaserEmitterEntity extends EntityCollectionEntity {
    constructor(location,range,fireRate_frames){
        super(location);
        this.range = range;
        this.fireRate_frames = fireRate_frames;
        this.lastFireFrame = 0;
    }

    findTarget(callback){
        if(this.isFireable()){
            // if the emitter is not fireable, exit the loop (break) to reduce computations
            var all_entities = entities.getEntities();
            for(var i = 0; i<all_entities.length; i++){
                var ent = all_entities[i];
                if(ent.getEntityType() === 'TargetEntity'){
                    callback(ent);
                }
            }
        }
    }

    validateTarget(ent){
        // fire if in range
        if(this.distance(ent) <= this.range && ent.getHealthPCT() > 0 && ent.getTargetedCount() < ent.getRuns()){
            //console.log('fire ' + frameCount);
            this.lookAt(ent.location);
            this.fire(ent.getEntityID());
            ent.incrementTargetedCount();
        }
    }

    lookAt(entLocation) {
        //if (debug) println("call lookAt " + stationary + "  : " + userControlled);
        var tempVect = createVector(entLocation.x, entLocation.y);
        tempVect.sub(this.location);
        tempVect.setMag(0.00001);
        this.velocity = tempVect;
    }

    isFireable(){
        return (frameCount - this.lastFireFrame >= this.fireRate_frames);
    }

    // fire a projectile towards the current orientation
    fire(targetUUID) {
        targetUUID = targetUUID || '';
        if (this.isFireable()) {
            this.EntityCollection.addEntity(new ProjectileEntity(this,10,5,targetUUID));
            this.lastFireFrame = frameCount;
        }
    }

    display(){
        super.display();
        //fill(255);
        //rect(this.location.x,this.location.y,10,10);
    }

    update(){
        super.update();
        this.findTarget((ent)=>{
            this.validateTarget(ent);
        });
    }
}
