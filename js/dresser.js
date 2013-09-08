/*/ programatically insert js
var head = document.getElementsByTagName("head");
var node = document.createElement("script");
node.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
head[0].appendChild(node);
*/
var devKey = "uid8641-23662879-69";

var url = "http://api.shopstyle.com/api/v2/products?pid="+devKey+"&fts=red+dress&offset=0&limit=10&format=jsonp&callback=?";

function changeCatalogue(list,loc){
    var n = '';
    loc = loc || 'try it';
    i = 0;
    $.each(list.products, function(index, product){
        products[product.id] = product;
        n += "<div class='thumbnail'>";
        n += '<img src="'+product.image.sizes.Large.url+'" />';
        n += "<h3>" + product.name + "</h3>";
        n += "<button class='lefts' data-product='"+product.id+"'>"+loc+"</button>";
        n += "<button class='rights' data-product='"+product.id+"'>Right</button>";
        n += "</div>";
        i += 1;
    });
    if(i < 1 ) {
        n = "<h4>Sorry, we couldn't find any products matching this query</h4>";
    }
    $('.thumbnails').html(n);
}
function changeItem(product , side) {
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



function queryShop(u,page, limit){
    u = u.replace(' ','+');
    page = page || 0;
    limit = limit || 9;
    u =  "http://api.shopstyle.com/api/v2/products?pid="+devKey+"&fts="+u+"&offset="+page+"&limit="+ limit + "&format=jsonp&callback=?";
    console.log(u);
    $.getJSON(u , function(data){
        changeCatalogue(data);
    });
}


$(function(){
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
});




