class Entity {
	constructor(location, mass) {
		this.location = location;

		// The mass of the cat
		this.mass = mass || 10;

		// current velocity, collective from multiple updates, private
		this.velocity = createVector(0, 0);

		// current vectors applied this frame, private
		this.acceleration = new createVector(0, 0);

        // entity type id
        this.entity_type = 'default';

        // generate unique id
        this.entity_id = uuidv4();

        // default set active
        this.setIsActive(true);
	}

    getEntityID(){
        return this.entity_id;
    }

	// update function for every frame, physics
	update() {
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);
        //if(frameCount % 60 === 0) console.log(this.acceleration);
        if(this.acceleration.x !== 0 || this.acceleration.y !== 0 || this.acceleration.z !== 0){
		  this.acceleration.mult(0.8);
        }
        //if(frameCount % 60 === 0) console.log(this.acceleration);
	}

    display(){
        circle(this.getLocation().x,this.getLocation().y,this.mass);
    }

    hasChildren(){
        return false;
    }

    setEntityType(type){
        this.entity_type = type;
    }

    getEntityType(){
        return this.entity_type;
    }

	setLocation(vector) {
		this.location = vector;
	}

	// get the current location vector
	getLocation() {
		return this.location;
	}

    setMass(m){
        this.mass = m;
    }

    getMass(){
        return this.mass;
    }

	// Apply vector force to cat physics
	applyForce(force) {
		// Scale To mass
		var f = p5.Vector.div(force, this.mass);

		// Apply to this frames accel
		this.acceleration.add(f);
	}

	// Return Boolean if within screen
	inBounds() {
		return (this.location.x < width + this.mass &&
			this.location.x > -this.mass &&
			this.location.y < height + this.mass &&
			this.location.y > -this.mass);
	}

	distance(m) {
		// distance to another location object
		return dist(m.location.x, m.location.y, this.location.x, this.location.y);
	}

    wasHit(){
        //console.log(this.entity_type + " was hit");
    }

    getIsActive(){
        return this.isActive;
    }

    setIsActive(newBool){
        this.isActive = new Boolean(newBool);
    }
}
