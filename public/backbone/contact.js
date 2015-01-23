var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

var ContactViewTemplate = [
  "<image src=<%= picture %> />",
  "<div>",
  "<p><%= name %></p>",
  "<p><%= age %></p>",
  "<p><%= phone_number %></p>",
  "<p><%= address %></p>",
  "</div>"
].join;

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


// define the contact view
// have all the mechanics in the view

ContactList.Views.ContactView = Backbone.View.extend(
  { //hash to define the contact view start
    initialize: function(){
      //re-render upon change
      this.listenTo( this.model, "change", this.render );
      //remove upon removal
      this.listenTo( this.model, "destroy", this.remove );
    },//initialize
    tagName: 'div',
    template: _.template(
      ContactViewTemplate
    ),//template
    events: {
      'dblclick' : 'renderEditForm' //double click the view to edit the form
    },//events
    render: function(){
      this.$el.empty();

      //using a template to render the form, because of the image.... wait...
      this.$el.html(this.template(this.model.attributes));

      return this;
    },//render
    renderEditForm: function(){
      //need a template to render the form? or can I dynamic it?
      self.mode.set({
        //hash of values to save to model
      });
      self.model.save();//bothers me that this is linear in async
    }, //render edit form
    destroyme: function(){
      this.model.destroy();
    }//destroyme
  } //hash to define the contact view end
);//defining the contact view

contactList.Views.ContactList = Backbone.View.edtend({
  initialize: function(){
    this.listenTo(this.collection, 'all', this.render);
  },//initialize
  render: function(){
    var self = this;
    this.$el.empty();
    _.each( this.collection.models,
      function(contact){
        var contactView = new ContactView({model: contact});
        self.$el.append( contactView.render().el );
      }//function, render action per contact
    );//each
  }//render
});// defining contact list view
