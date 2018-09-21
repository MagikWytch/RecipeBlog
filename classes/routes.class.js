

module.exports = class Routes {


    constructor(app, foodData) {
        this.app = app;
        this.foodData = foodData;
        this.setRoutes();
    }

   setRoutes(){

     this.app.get(
      '/autocomplete-recipe-name/:startOfName',
      (req, res) => {
        // req.params will include properties with the names
        // of params I have defined with :paramName in my route/url
        let start = req.params.startOfName.toLowerCase();
        // require at least two characters
        if(start.length < 2){
          res.json({error: 'Please provide at least two characters...'});
          return;
        }
        // filter foods so that only those with a Namn
        // matching start are left, then map from obj to obj.Namn
        let result = this.foodData.filter(
          food => food.Namn.toLowerCase().indexOf(start) == 0
        ).map(
          food => food.Namn
        );
        res.json(result);
      }
    );



   }

}