module.exports = class Component {

    constructor(props) {

        this.id = props.Nummer;
        this.name = props.Namn;
        this.weightGrams = props.viktGram;
        this.mainGroup = props.Huvudgrupp;

        Object.assign(this, props);

    }
}