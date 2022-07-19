class TimelineUIElement extends UIElement {
	constructor(pos, dim) {
        super(pos,dim);
        this.record = createVector(0,0);
	}
	display() {

	}

    addWin(){
        this.record.x++;
    }

    addLoss(){
        console.log('add loss');
        this.record.y++;
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
