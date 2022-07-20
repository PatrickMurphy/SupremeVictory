class TimelineUIElement extends UIElement {
	constructor(pos, dim) {
        super(pos,dim);
        this.record = createVector(0,0);
        this.recent_result = 'WIN';
	}

    update() {
        if(this.recent_result === 'WIN'){
            // set duck image as supreme victory
            duckEntityInstance.duckBody.setDisplayImage(images['duck']);
            // display text highlight
            duckTextEntityInstance.setIsActive(true);
        }else{
            // set duck image as no text
            duckEntityInstance.duckBody.setDisplayImage(images['duck_no_text']);
            // hide text highlight
            duckTextEntityInstance.setIsActive(false);
        }
    }

	display() {

	}

    addWin(){
        this.record.x++;
        OPTION_DUCK_FEET_SPEED_MOD++;
        OPTION_HAT_JIGGLE_RANGE_PX = OPTION_HAT_JIGGLE_RANGE_PX + 1;
        this.recent_result = 'WIN';
        audio['main'].play();
    }

    addLoss(){
        this.record.y++;
        OPTION_DUCK_FEET_SPEED_MOD--;
        OPTION_HAT_JIGGLE_RANGE_PX = OPTION_HAT_JIGGLE_RANGE_PX - 1;
        this.recent_result = 'LOSS';
        audio['main'].stop();
    }

    setWins(winInt){
        this.record.x = parseInt(winInt);
    }

    setlosses(lossInt){
        this.record.y = parseInt(lossInt);
    }

    getWins(){
        return this.record.x;
    }

    getLosses(){
        return this.record.y;
    }

    getTotalGames(){
        return this.record.x+this.record.y;
    }

    get500Value(){
        return this.getTotalGames()/2;
    }

    getGamesFrom500(){
        return this.getWins()-this.get500Value();
    }

    getAVG(){
        return Math.round(this.getHealthPCT() * 1000) / 1000;
    }

    getHealthPCT(){
        if((this.record.x+this.record.y) > 0){
            return this.record.x/(this.getTotalGames());
        }else{
            return .5;
        }
    }
}
