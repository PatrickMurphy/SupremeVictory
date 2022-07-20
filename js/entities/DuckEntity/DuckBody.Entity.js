// todo: replace with static image entity
class DuckBodyEntity extends Entity {
    constructor(location){
        super(location);
        this.displayImage = images['duck'];
    }

    setDisplayImage(img){
        img = img || images['duck'];
        this.displayImage = img;
    }

    getDisplayImage(){
        return this.displayImage;
    }

    display(){
        image(this.getDisplayImage(),this.location.x,this.location.y);
    }
}
