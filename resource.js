app.factory('MyResource', MyResource);

function MyResource($resource) {
    return $resource('http://99taxons.oqvestir.com.br/api/v2/option_values?q[option_type_id]=1', {}, {
        'get' : {
            'method' : 'GET'
        }
    });
}