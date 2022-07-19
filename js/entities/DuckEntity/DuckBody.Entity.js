// todo: replace with static image entity
class DuckBodyEntity extends Entity {
    constructor(location){
        super(location);
    }

    display(){
        image(images['duck'],this.location.x,this.location.y);
    }
}
