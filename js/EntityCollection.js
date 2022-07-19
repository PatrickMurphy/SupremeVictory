class EntityCollection {
    constructor(){
        this.entities = [];
    }

    update(){
        for(var i = 0; i<this.entities.length; i++){
            this.entities[i].update();
        }
    }

    display(){
        for(var i = 0; i<this.entities.length; i++){
            this.entities[i].display();
        }
    }

    removeEntity(entity){
        for( var i = 0; i < this.entities.length; i++){
            if ( this.entities[i].getEntityID() === entity.getEntityID()) {
                this.entities.splice(i, 1);
                i--;
            }
        }
    }

    removeEntityByIndex(index){
        if(index > 0 && index < this.entities.length){
            this.entities.splice(index, 1);
        }
    }

    addEntity(entity){
        this.entities.push(entity);
    }

    hasIndex(index){
        return this.entities.length-1 >= index;
    }

    getLength(){
        return this.entities.length;
    }

    getEntityByIndex(index){
        return this.entities[index];
    }

    getEntity(entity){
        for( var i = 0; i < this.entities.length; i++){
            if ( this.entities[i].getEntityID() === entity.getEntityID()) {
                return this.entities[i];
            }
        }
    }

    getEntities(){
        var retEntities = [];
        for(var i = 0; i<this.entities.length; i++){
            var ent = this.entities[i];
            retEntities.push(ent);
            if(ent.hasChildren()){
                retEntities = retEntities.concat(ent.getEntityCollection().getEntities());
            }
        }
        return retEntities;
    }
}
