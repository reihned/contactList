var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };



$(
  function(){
    var categories = new ContactList.Collections.Categories();
    var categoriesView = new ContactList.Views.Categories({
      collection: categories,
      el: $("#main")
    });

    categories.fetch({reset: true});

    var $formMain = $('form#formMain');
    $formMain.submit(function(e){
      e.preventDefault();
      var newContact = new ContactList.Models.Contact();
      console.log( $( this ).serialize() );
    });

  }//function to run when ready
);//jquery ready
