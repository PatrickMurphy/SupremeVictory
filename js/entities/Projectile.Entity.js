class ProjectileEntity extends Entity {
    constructor(parent, ms, damage, targetUUID) {
        super(parent.location.copy());
        this.parentEntity = parent;
        this.speed = ms;
        this.damage = damage;
        this.velocity = createVector(-1, 0); // fix: assumes target is exactly to the left
        this.velocity.setMag(this.speed); // bullet speed + ship speed
        this.targetEntityUUID = targetUUID;
        this.display_tail_length = 6;
    }

    update() {
        super.update();
        var all_entities = entities.getEntities();
        var target_not_found = true;
        for (var i = 0; i < all_entities.length; i++) {
            var ent = all_entities[i];
            if(ent.getEntityID() === this.targetEntityUUID){
                target_not_found = false;
            }
            if (ent.getEntityType() === 'TargetEntity') {
                if (this.hitCheck(ent)) {
                    if(this.targetEntityUUID === ent.getEntityID()){
                        // do hit
                        ent.wasHit();
                        this.remove();
                    }
                }
            }
        }
        // remove if target already destroyed
        if(target_not_found){
            this.remove();
        }
    }

    getWidth() {
        return this.damage / 3;
    }
    getHeight() {
        return this.damage / 3;
    }

    getRadius() {
        return (this.damage / 3) / 2;
    }

    hitCheck(e) {
        return e != this.parentEntity && dist(e.location.x, e.location.y, this.location.x, this.location.y) <= e.mass / 2;
    }

    display() {
        fill(255, 0, 0);
        ellipse(this.location.x, this.location.y, 4, 4);
        // laser trail
        // fix: assumes fire directly left
        stroke(255, 0, 0);
        line(this.location.x, this.location.y, this.location.x + this.display_tail_length, this.location.y);
        noStroke();
    }

    remove() {
        this.parentEntity.EntityCollection.removeEntity(this);
    }
}
