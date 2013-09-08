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
    console.log(p);
    // inArray( value, array [, fromIndex ] )

    $.each(types, function(ind, val){
        if(  $.inArray(p.categories[0].id, val) != -1 ) {
            $('[data-role="'+ind+'"].'+side).css('background-image', 'url('+p.image.sizes.Large.url+')' );
            scope.selected[ind][side] = p.id;
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
    $scope.selected = {shirt: {left: {}, right: {} }, pants: {left: {}, right: {} }};

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









/****DROPBOX***/
// Insert your Dropbox app key here:
var DROPBOX_APP_KEY = 'i24tvq3lih0u992';

// Exposed for easy access in the browser console.
var client = new Dropbox.Client({key: DROPBOX_APP_KEY});
var taskTable;

$(function () {
    // Insert a new task record into the table.
    function saveSelected() {
        taskTable.insert({
            selected: scope.selected,
            created: new Date()
        });
    }


    // Insert a new task record into the table.
    function insertTask(text) {
        taskTable.insert({
            taskname: text,
            created: new Date(),
            completed: false
        });
    }

    // updateList will be called every time the table changes.
    function updateList() {
        $('#tasks').empty();

        var records = taskTable.query();

        // Sort by creation time.
        records.sort(function (taskA, taskB) {
            if (taskA.get('created') < taskB.get('created')) return -1;
            if (taskA.get('created') > taskB.get('created')) return 1;
            return 0;
        });

        // Add an item to the list for each task.
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            $('#tasks').append(
                renderTask(record.getId(),
                           record.get('completed'),
                           record.get('taskname')));
        }

        addListeners();
        $('#newTask').focus();
    }

    // The login button will start the authentication process.
    $('#loginButton').click(function (e) {
        e.preventDefault();
        // This will redirect the browser to OAuth login.
        client.authenticate();
    });
    $('#submitButton').click(function(e){
            saveSelected(); 
    });

    // Try to finish OAuth authorization.
    client.authenticate({interactive:false}, function (error) {
        if (error) {
            alert('Authentication error: ' + error);
        }
    });

    if (client.isAuthenticated()) {
        // Client is authenticated. Display UI.
        $('#loginButton').hide();
        $('#main').show();

        client.getDatastoreManager().openDefaultDatastore(function (error, datastore) {
            if (error) {
                alert('Error opening default datastore: ' + error);
            }

            taskTable = datastore.getTable('collections');

            // Populate the initial task list.
            //updateList();

            // Ensure that future changes update the list.
            //datastore.recordsChanged.addListener(updateList);
        });
    }

    // Set the completed status of a task with the given ID.
    function setCompleted(id, completed) {
        taskTable.get(id).set('completed', completed);
    }

    // Delete the record with a given ID.
    function deleteRecord(id) {
        taskTable.get(id).deleteRecord();
    }

    // Render the HTML for a single task.
    function renderTask(id, completed, text) {
        return $('<li>').attr('id', id).append(
            $('<button>').addClass('delete').html('&times;')
        ).append(
        $('<span>').append(
            $('<button>').addClass('checkbox').html('&#x2713;')
        ).append(
        $('<span>').addClass('text').text(text)
        )
        )
        .addClass(completed ? 'completed' : '');
    }

    // Register event listeners to handle completing and deleting.
    function addListeners() {
        $('span').click(function (e) {
            e.preventDefault();
            var li = $(this).parents('li');
            var id = li.attr('id');
            setCompleted(id, !li.hasClass('completed'));
        });

        $('button.delete').click(function (e) {
            e.preventDefault();
            var id = $(this).parents('li').attr('id');
            deleteRecord(id);
        });
    }

    // Hook form submit and add the new task.
    $('#addForm').submit(function (e) {
        e.preventDefault();
        if ($('#newTask').val().length > 0) {
            insertTask($('#newTask').val());
            $('#newTask').val('');
        }
        return false;
    });

    $('#newTask').focus();
});

