var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

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


// master function that grabs everything, then splits it into the collections by category ID
// only setup views after the data is fetched?
// jqeury the master function
// use underscrore findWhere to filter it.
// new collection({models: [array_of_objects]})
