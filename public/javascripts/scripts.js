$(
  function(){
    var categories = new ContactList.Collections.Categories();
    var categoriesView = new ContactList.Views.Categories({
      collection: categories,
      el: $("#main")
    });

    categories.fetch({reset: true});

    // debugger;

    // var $contactCat = $('select#contactCat');

    //populate the options in the select
    // categories.each(function(model){
    //   debugger;
    //   $('<option>').val(model.id).text(model.name);
    // });
  }//function to run when ready
);//jquery ready
