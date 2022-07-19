class PercentBarUIElement extends UIElement {
	constructor(pos, dim, off, c1, c2) {
        super(pos,dim);

		this.offset = off;

		this.c1 = c1 || color(255, 0, 0);
		this.c2 = c2 || color(0, 255, 0);
	}

    setBackgroundColor(colorValue){
        this.c1 = colorValue;
    }

    setForegroundColor(colorValue){
        this.c2 = colorValue;
    }

    getBackgroundColor(){
        return this.c1;
    }

    getForegroundColor(){
        return this.c2;
    }

	display(pct) {
		noStroke();
		fill(this.c1);
		rect(this.location.x + this.offset.x, this.location.y + this.offset.y, this.dimensions.x, this.dimensions.y);
		fill(this.c2);
		rect(this.location.x + this.offset.x, this.location.y + this.offset.y, this.dimensions.x * pct, this.dimensions.y);
		//stroke(255, 55);
		//line(this.location.x + this.offset.x, this.location.y + this.offset.y, this.location.x, this.location.y);
		noStroke();
	}
}
