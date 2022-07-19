// todo: replace with static image entity
class TeamParticleEntity extends Entity {
    constructor(location,team_code,gameNum,hit_limit,otherScore){
        super(location,60);

        this.gameNumber = gameNum || 162;
        this.image_part = images['team_logo'];
        this.sprite_dimensions = createVector(this.image_part.width/5,this.image_part.height/6);
        this.setEntityType('TargetEntity');

        this.hitCount = 0;
        this.hitLimit = hit_limit || 1;
        this.otherScore = otherScore || 0;

        this.healthBar = new PercentBarUIElement(this.location,createVector(50,5),createVector(-25,50));

        // static map
        this.team_code_list = ['ATL',
                                'ARI',
                                'BAL',
                                'BOS',
                                'STL',
                                'CHC',
                                'DET',
                                'KAN',
                                'LAA',
                                'LAD',
                                'CIN',
                                'HOU',
                                'MIA',
                                'MIL',
                                'NYM',
                                'CLE',
                                'NYY',
                                'PIT',
                                'PHI',
                                'TOR',
                                'COL',
                                'TEX',
                                'TB',
                                'SEA',
                                'OAK',
                                'CWS',
                                'MIN',
                                'SD',
                                'SF',
                                'WAS'];

        this.team_code_grid_map = {
            'ATL':createVector(0,0),
            'ARI':createVector(1,0),
            'BAL':createVector(2,0),
            'BOS':createVector(3,0),
            'STL':createVector(4,0),

            'CHC':createVector(0,1),
            'DET':createVector(1,1),
            'KAN':createVector(2,1),
            'LAA':createVector(3,1),
            'LAD':createVector(4,1),

            'CIN':createVector(0,2),
            'HOU':createVector(1,2),
            'MIA':createVector(2,2),
            'MIL':createVector(3,2),
            'NYM':createVector(4,2),

            'CLE':createVector(0,3),
            'NYY':createVector(1,3),
            'PIT':createVector(2,3),
            'PHI':createVector(3,3),
            'TOR':createVector(4,3),

            'COL':createVector(0,4),
            'TEX':createVector(1,4),
            'TB':createVector(2,4),
            'SEA':createVector(3,4),
            'OAK':createVector(4,4),

            'CWS':createVector(0,5),
            'MIN':createVector(1,5),
            'SD':createVector(2,5),
            'SF':createVector(3,5),
            'WAS':createVector(4,5)
        };
        var team_code_map = createVector(0,0);
        if(this.team_code_list.indexOf(team_code) > -1){
            team_code_map = this.team_code_grid_map[team_code];
        }

        this.image_part = this.image_part.get(team_code_map.x*this.sprite_dimensions.x,team_code_map.y*this.sprite_dimensions.y,this.sprite_dimensions.x,this.sprite_dimensions.y);

        this.applyForce(createVector(60,0));
    }

    getHealthPCT(){
        var scoreDiffInt = this.otherScore-this.hitLimit; // if positive we lost, if negitive we win
        var scoreWinBool = this.hitLimit > this.otherScore;

        if(scoreWinBool){
            return Math.max(0,(this.hitLimit-this.hitCount)/(this.hitLimit));
        }else{
            return Math.max(0,(this.hitLimit-this.hitCount+scoreDiffInt)/(this.hitLimit+scoreDiffInt))
        }
    }

    display(){
        //circle(this.location.x,this.location.y, 100);
        this.healthBar.setLocation(this.location);
        this.healthBar.display(this.getHealthPCT());
        text('G:'+this.gameNumber,this.location.x-10,this.location.y+70);
        imageMode(CENTER);
        image(this.image_part,this.location.x,this.location.y);
        imageMode(CORNER);
    }

    wasHit(){
        if(this.getHealthPCT()>0){
            super.wasHit();
            this.hitCount++;
            if(this.hitCount === this.hitLimit){
                this.eliminate();
            }
        }
    }

    eliminate(){
        if(this.hitLimit > this.otherScore){
            TeamParticleEmitterEntityTMP.getEntityCollection().removeEntity(this);
            timelineUIInstance.addWin();
        }else if(this.getIsActive()){ // lost and active
            timelineUIInstance.addLoss();
        }
        this.setIsActive(false);
    }
}
