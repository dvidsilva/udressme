/*/ programatically insert js
var head = document.getElementsByTagName("head");
var node = document.createElement("script");
node.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
head[0].appendChild(node);
*/
var devKey = "uid8641-23662879-69";

var url = "http://api.shopstyle.com/api/v2/products?pid="+devKey+"&fts=red+dress&offset=0&limit=10&format=jsonp&callback=?";

function changeCatalogue(list,loc,action){
    var n = '';
    loc = loc || 'try it';
    action = action || 'dresser';
    i = 0;
    products = {};
    scope.products = {};
    $.each(list.products, function(index, product){
        products[product.id] = product;
        scope.products[product.id] = product;
        i += 1;
    });
    if(i < 1 ) {
        n = "<h4>Sorry, we couldn't find any products matching this query</h4>";
    }
//    $('.thumbnails').html(n);
    scope.$apply();
    
}
function changeItem(product , side) {
    var p = products[product];
    //console.log(p);
    // inArray( value, array [, fromIndex ] )

    $.each(types, function(ind, val){
        if(  $.inArray(p.categories[0].id, val) != -1 ) {
            $('[data-role="'+ind+'"].'+side).css('background-image', 'url('+p.image.sizes.Large.url+')' );
        }else{
            //$('[data-role="pants"].'+side).css('background-image', 'url('+p.image.sizes.Large.url+')' );            
        }
    });
    return true;
}



function queryShop(u,page, limit){
    u = u.replace(' ','+');
    page = page || 0;
    limit = limit || 9;
    u =  "http://api.shopstyle.com/api/v2/products?pid="+devKey+"&fts="+u+"&offset="+page+"&limit="+ limit + "&cat=female&format=jsonp&callback=?";
    //console.log(u);
    $.getJSON(u , function(data){
        changeCatalogue(data);
    });
}


$(function(){
    scope = angular.element('header').scope();
    queryShop('');
    $(document).on('click', '.lefts',  function() {
        changeItem($(this).data('product'), 'left');
    });
    $(document).on('click', '.rights',  function() {
        changeItem($(this).data('product'), 'right');
    });
    $(document).on('blur','.sbox', function(){
        queryShop($('.sbox').val());
    });

    $(".sbox").keypress(function(e) {
        if(e.which == 13){
            queryShop($('.sbox').val());
        }
    });
});





function TodoCtrl($scope) {
    $scope.products = {};
    $scope.model =  './images/modelin.png';
    $scope.styleone = 'Style 1';
    $scope.styletwo = 'Style 2';
    $scope.selected = {};

    $scope.changeItem = function(product , side) {
    var p = products[product];
    //console.log(p);
    // inArray( value, array [, fromIndex ] )
    $.each(types, function(ind, val){
        if(  $.inArray(p.categories[0].id, val) != -1 ) {
            $('[data-role="'+ind+'"].'+side).css('background-image', 'url('+p.image.sizes.Large.url+')' );
        }
    });
    return true;
}


}
$(function(){
});

