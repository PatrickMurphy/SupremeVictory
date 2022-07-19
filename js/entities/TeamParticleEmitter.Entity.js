class TeamParticleEmitterEntity extends EmitterEntity {
    constructor(location,emitRate){
        super(location, emitRate);
        this.lastEmitFrame = -emitRate;
        this.lastEmitObjIndex = 0;
        this.emitQueue = new EntityCollection();

        for(var i = 0; i < season_results_data.length; i++){
            this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),season_results_data[i].Opp, i+1, season_results_data[i].R, season_results_data[i].RA));
        }
        /*this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),'SD', 8,2));
        this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),'SD', 6,2));
        this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),'TOR', 8,3));
        this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),'TOR', 5,2));
        this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),'TOR', 2,1));
        this.emitQueue.addEntity(new TeamParticleEntity(this.location.copy(),'TOR', 6,5));*/
    }
    // fire a projectile towards the current orientation
    emit(team_code) {
        team_code = team_code || "TOR";
        if (this.canEmit()) {
            if(this.emitQueue.hasIndex(this.lastEmitObjIndex)){
                this.EntityCollection.addEntity(this.emitQueue.getEntityByIndex(this.lastEmitObjIndex));
                this.lastEmitFrame = frameCount;
                this.lastEmitObjIndex++;
            }
        }
    }
    update(){
        super.update();
        if(this.canEmit()){
            this.emit();
        }
    }
}
