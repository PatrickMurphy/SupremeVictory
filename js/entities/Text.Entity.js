class TextEntity extends Entity {
    constructor(location){
        super(location);
    }

    display(){
        let img = images['text_highlight'];
        let graphics = createGraphics(width,height);
        let xPosVal = ((frameCount*15) % (img.width-500))+250;

        img.loadPixels();
        graphics.loadPixels();

        for (let x = 250; x < img.width-250; x++) {
            for (let y = 310; y < img.height-310; y++) {
                // Calculate the 1D location from a 2D grid
                let loc = (x + y*img.width)*4;

                // if alpha not equal to zero continue
                if(img.pixels[loc+3] === 0){
                    continue; // next loop iteration
                }else{
                    if(Math.abs(x - xPosVal)<=25){
                        let r,g,b,a;
                        // make white for now, but blend later
                        r = 255;
                        g = 255;
                        b = 255;
                        a = map(Math.abs(x - xPosVal),0,26,240,0);

                        // Make a new color and set pixel in the window
                        let pixloc = (y * graphics.width + x)*4;
                        graphics.pixels[pixloc] = r;
                        graphics.pixels[pixloc+1] = g;
                        graphics.pixels[pixloc+2] = b;
                        graphics.pixels[pixloc+3] = a; // Always have to set alpha
                    }
                }
            }
        }

        graphics.updatePixels();
        image(graphics,this.location.x,this.location.y);
        graphics.remove();
    }
}
