$(
  function(){
    var categories = new ContactList.Collections.Categories();
    var categoriesView = new ContactList.Views.Categories({
      collection: categories,
      el: $("#main")
    });

    categories.fetch({reset: true});
  }//function to run when ready
);//jquery ready
