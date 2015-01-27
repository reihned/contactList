// recall or define the var holding everything
var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

// string template of the view
// should this be stored as a jquery object instead?
var ContactViewTemplate = [
  "<image src=<%= picture %> />",
  "<div>",
  "<p><%= name %></p>",
  "<p><%= age %></p>",
  "<p><%= phone_number %></p>",
  "<p><%= address %></p>",
  "</div>"
].join("");

var ContactEditTemplate = [
  "<image src=<%= picture %> />",
  "<form class='editContact'>",
  "<button name='save'>Save</button>",
  "</form>"
].join("");

// Define the contact model
// a backbone model's only job is to store data.

ContactList.Models.Contact = Backbone.Model.extend(
  { //hash to define contact start
    initialize: function(){
      //none?
    },
    defaults:{
      //none?
    }
  } //hash to define contact end
);//defining the contact model

//define the contact collection

ContactList.Collections.Contacts = Backbone.Collection.extend({
  model:  ContactList.Models.Contact//,
  // url:    "/contacts"
});

// define the contact view
// have all the mechanics in the view

ContactList.Views.Contact = Backbone.View.extend(
  { //hash to define the contact view start
    initialize: function(){
      //re-render upon change
      this.listenTo( this.model, "change", this.render );
      //remove upon removal
      this.listenTo( this.model, "destroy", this.remove );
    },//initialize
    tagName: 'div',
    template: _.template( ContactViewTemplate ),//template
    events: {
      'dblclick' : 'renderEditForm', //double click the view to edit the form
      'click button[name="save"]': 'updateme'
    },//events
    render: function(){
      this.$el.empty();

      // using a template to render the form, because of the image.... wait...
      this.$el.html(this.template(this.model.attributes));
      // iterate throught the attributes to add form elements
      // form class = editContact
      return this;
    },//render
    renderEditForm: function(){
      // debugger;
      self = this;
      this.$el.empty();
      var editTemplate = _.template(ContactEditTemplate);

      // debugger;

      this.$el.html(editTemplate(this.model.attributes));

      var $form = $("form.editContact");

      var pairs = this.model.pairs();

      pairs.forEach( function(pair){
        if(pair[0].indexOf("id") == -1){
          var $par = $('<p>').text(pair[0]);
          $('<input>').attr({
            name: pair[0],
            value: pair[1]
          }).appendTo($par);
          $par.appendTo($form);
        }//if
      });//for each

    }, //render edit form
    updateme: function(){
      this.model.set({

      });
    },
    destroyme: function(){
      this.model.destroy();
    }//destroyme
  } //hash to define the contact view end
);//defining the contact view

ContactList.Views.Contacts = Backbone.View.extend({
  initialize: function(){
    // debugger;
    this.collection.fetch();
    this.listenTo(this.collection, 'all', this.render);
  },//initialize
  render: function(){
    var self = this;
    this.$el.empty();
    // debugger;
    _.each( this.collection.models,
      function(contact){
        var contactView = new ContactList.Views.Contact({model: contact});
        self.$el.append( contactView.render().el );
      }//function, render action per contact
    );//each
    return this;
  }//render
});// defining contact list view
