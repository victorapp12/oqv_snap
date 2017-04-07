app.controller('mainCtrl', ['$scope', 'MyResource', function ($scope, MyResource) {

    //GET OQV Colors 
    var get_taxons_colors = function(){
        var taxons_resource_instance = new MyResource; 
        taxons_resource_instance.$get().then(function(data){
            var taxons_colors = []; 
            var option_values = data.option_values; 
            for(var i in option_values) {
                if(option_values[i].option_type_id === 1){
                    taxons_colors.push(option_values[i]);
                }
            }
            console.log(taxons_colors);
        }).catch(function(err){

        })
    }

    get_taxons_colors(); 

}]);