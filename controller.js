app.factory('snapActions', [
  function() {

    var fn = {};

    fn.registerColor = function(name, rgb) {
      if (rgb == "") {
        return;
      }
      var rgb_array = rgb.split(", ");
      var r_value = rgb_array[0];
      var g_value = rgb_array[1];
      var b_value = rgb_array[2];

      tracking.ColorTracker.registerColor(name, function(r, g, b) {
        var threshold = 60,
          dx = r - r_value,
          dy = g - g_value,
          dz = b - b_value;

        if ((r - b) >= threshold && (g - b) >= threshold) {
          return true;
        }
        return dx * dx + dy * dy + dz * dz < 10000;
      });
    }

    return fn;

  }
]);

app.controller('mainCtrl', ['$scope', 'MyResource', 'snapActions', '$http', '$timeout', function($scope, MyResource, snapActions, $http, $timeout) {

  var tracker_interaction = function() {

  }

  //GET local file 
  var get_colors_variants = function() {
    $http.get('colors.json').then(function(data) {
      var colors = data.data;
      var variants = [];
      for (var i in colors) {
        var current_color_name = colors[i].name;
        var current_color_variants = colors[i].variants;
        if (current_color_variants.length > 0) {
          for (var j in current_color_variants) {
            var color_name_variant = current_color_name + "_" + j;
            var color_variant_value = current_color_variants[j];
            variants.push(color_name_variant);
            snapActions.registerColor(color_name_variant, current_color_variants[j]);
          }
        }
      }

      
    });
  }

  get_colors_variants();


  // //GET OQV Colors 
  // var get_taxons_colors = function() {
  //   var taxons_resource_instance = new MyResource;
  //   taxons_resource_instance.$get().then(function(data) {
  //     var taxons_colors = [];
  //     var option_values = data.option_values;
  //     for (var i in option_values) {
  //       if (option_values[i].option_type_id === 1) {
  //         taxons_colors.push(option_values[i]);
  //         console.log(option_values[i].name);
  //       }
  //     }

  //   }).catch(function(err) {

  //   })
  // }

  // // get_taxons_colors();

}]);