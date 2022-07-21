class DuckEntity extends EntityCollectionEntity {
    constructor(location){
        super(location);

        this.healthBar = new PercentBarUIElement(this.location,createVector(250,5),createVector(600,500));
        this.healthBar.setBackgroundColor(color(55,55,55)); // not red because color changing

        var left_foot_options = {
            img_id:'duck_foot_left'
            , initialLocation: createVector(452,442)
        };
        var right_foot_options = {
            img_id:'duck_foot_right'
            , initialPosition: 1
            , initialLocation: createVector(682,517)
        };

        this.duckBody = new DuckBodyEntity(createVector(279,47));

        this.getEntityCollection().addEntity(new DuckFootEntity(left_foot_options.initialLocation,left_foot_options));//left
        this.getEntityCollection().addEntity(new DuckFootEntity(right_foot_options.initialLocation,right_foot_options));//right
        this.getEntityCollection().addEntity(this.duckBody);
        this.getEntityCollection().addEntity(new DuckHatEntity(createVector(OPTION_HAT_INITIAL_POSITION[0],OPTION_HAT_INITIAL_POSITION[1])));
        this.getEntityCollection().addEntity(new LaserEmitterEntity(createVector(605,135),520,2));
    }

    updateHealthBarColor(){
        this.healthBar.setForegroundColor(lerpColor(color(255,0,0),color(0,255,0),timelineUIInstance.getHealthPCT()));
        if(timelineUIInstance.getHealthPCT() >= .5){
            this.healthBar.setForegroundColor(lerpColor(color(0,150,0),color(0,255,0),timelineUIInstance.getHealthPCT()));
        }else{
            this.healthBar.setForegroundColor(lerpColor(color(255,0,0),color(0,150,0),timelineUIInstance.getHealthPCT()));
        }
    }

    display(){
        super.display();
        if(timelineUIInstance.getTotalGames()>0){
            this.healthBar.setLocation(this.location);
            this.updateHealthBarColor();
            this.healthBar.display(timelineUIInstance.getHealthPCT());
            fill(255);
            text("Record: " + timelineUIInstance.getWins() + "-" + timelineUIInstance.getLosses() + "    AVG: "+timelineUIInstance.getAVG() + "    GB500: " + timelineUIInstance.getGamesFrom500(),this.location.x+600,this.location.y+497);
        }
    }
}
