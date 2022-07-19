class UIElementCollectionUIElement extends UIElement {
    constructor(location){
        super(location);

        this.UIElementCollection = new UIElementCollection();
    }

    hasChildren(){
        return this.UIElementCollection.getLength() > 0;
    }

    setUIElementCollection(entColl){
        this.UIElementCollection = entColl;
    }

    getUIElementCollection(){
        return this.UIElementCollection;
    }

    update(){
        super.update();
        this.UIElementCollection.update();
    }

    display(){
        super.display();
        this.UIElementCollection.display();
    }
}
