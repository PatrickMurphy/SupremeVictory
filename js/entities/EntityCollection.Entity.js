class EntityCollectionEntity extends Entity {
    constructor(location){
        super(location);

        this.EntityCollection = new EntityCollection();
    }

    hasChildren(){
        return this.EntityCollection.getLength() > 0;
    }

    setEntityCollection(entColl){
        this.EntityCollection = entColl;
    }

    getEntityCollection(){
        return this.EntityCollection;
    }

    update(){
        super.update();
        this.EntityCollection.update();
    }

    display(){
        super.display();
        this.EntityCollection.display();
    }
}
