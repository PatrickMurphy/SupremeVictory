class UIElementCollection {
    constructor(){
        this.uielements = [];
    }

    update(){
        for(var i = 0; i<this.uielements.length; i++){
            this.uielements[i].update();
        }
    }

    display(){
        for(var i = 0; i<this.uielements.length; i++){
            this.uielements[i].display();
        }
    }

    addUIElement(uielement){
        this.uielements.push(uielement);
    }

    getLength(){
        return this.uielements.length;
    }

    getUIElementByIndex(index){
        return this.uielements[index];
    }

    getUIElements(){
        var retElements = [];
        for(var i = 0; i<this.uielements.length; i++){
            var element = this.uielements[i];
            retElements.push(element);
            if(element.hasChildren()){
                retElements = retElements.concat(element.getUIElementCollection().getUIElements());
            }
        }
        return retElements;
    }
}
