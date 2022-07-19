class CloudBackdropEntity extends Entity {
    constructor(location){
        super(location);

        this.xValue = 0;
        this.cellSize = 15;
        this.noiseXScale = 40;
        this.noiseYScale = 15;
    }

    display(){
        this.xValue++;

        for(var i = 0; i < width/this.cellSize; i++) {
            for(var j = 0; j < height/this.cellSize; j++) {
                var ran = noise((i+this.xValue) / this.noiseXScale, j / this.noiseYScale);
                var color1 = color('#693b93');
                var color2 = color(0);
                var col = color(0);
                if(ran >= OPTION_CLOUD_MASK_VAL){
                    col = lerpColor(color2, color1, map(ran,OPTION_CLOUD_MASK_VAL,1,0,1));
                }
                fill(col);
                rect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }
}
