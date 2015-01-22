var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

// Define the contact model
// a backbone model's only job is to store data.

ContactList.Models.Contact = Backbone.Model.extend(
  { //hash to define contact start
    initialize: function(){

    },
    defaults:{

    }
  } //hash to define contact end
);//defining the contact model


// define the contact view
// have all the mechanics in the view

ContactList.Views.ContactView = Backbone.View.endtend(
  { //hash to define the contact view start
    initialize: function(){
      //re-render upon change
      this.listenTo( this.model, "change", this.render );
      //remove upon removal
      this.listenTo( this.model, "destroy", this.remove );
    },//initialize
    tagName: 'div',
    template: _.template(
      "<image src=<%= picture %> /> <p> <%= name %> </p><p> <%= age %> </p><p> <%= phone_number %> </p><p> <%= address %> </p>"
    ),//template

    render: function(){
      this.$el.empty();
      this.$el.html(this.template(this.model.attributes));

      return this;
    }//render
  } //hash to define the contact view end
);//defining the contact view
