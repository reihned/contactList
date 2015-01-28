var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

var newContactForm = [
  "<h3>New Contact</h3>",
  "<form id='contactNew'>",
    "<p>Name:<input type='text' name='name'></input></p>",
    "<p>Age:<input type='text' name='age'></input></p>",
    "<p>Address:<input type='text' name='address'></input></p>",
    "<p>Phone Number:<input type='text' name='phone_number'></input></p>",
    "<p>Picture Url:<input type='text' name='picture'></input></p>",
    "<p>Category:<select id='contactCat' name='category_id'></select></p>",
    "<input id='contactSubmit' value='submit' type='submit'></input>",
  "</form>"
].join("");

$(
  function(){
    var categories = new ContactList.Collections.Categories();
    var categoriesView = new ContactList.Views.Categories({
      collection: categories,
      el: $("#main")
    });


    categories.fetch({reset: true});

    var $divFormMain = $('div#formMain');
    var $formMain = $(newContactForm);
    $formMain.appendTo($divFormMain);
    $formMain.submit(function(e){
      e.preventDefault();
      var newContact = new ContactList.Models.Contact();
      var $submitted = $(this).serializeArray();
      //THE FOLLOWING DOESNT WORK
      // newContact.set($submitted);

      var newInfo = {};
      for(var i = 0; i < $submitted.length; i++ ){
        newInfo[$submitted[i].name] = $submitted[i].value;
      }//for newInfo
      newContact.set(newInfo);

      // newContact.url();
      newContact.save();

      return false;
    });


  }//function to run when ready
);//jquery ready
