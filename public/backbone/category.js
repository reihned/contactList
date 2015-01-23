// recall or define the var holding everything
var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

//define the category view template
var CategoryViewTemplate = [
  "<div>",
    "<h3><%= name %></h3>",
    "<div class='contacts'>",
    "</div>",
  "</div>"
].join();

//define the category edit/delete template

// define the category model
ContactList.Models.Category = Backbone.Model.extend({
  initialize: function(){

  },//initialize
  defaults: {
    name: "Category"
  }
}); // define the category model end

// define the category collection
ContactList.Collections.Category = Backbone.Collection.extend({
  model: ContactList.Models.Category
});

// define the category view
ContactList.Views.Category = Backbone.View.extend({
  initialize: function(){
    this.listenTo( this.model, 'all', this.render );
  }, //init
  tagName: 'div',
  template: _.template($(CategoryViewTemplate).html()),
  events: {},
  render: function(){
    this.$el.empty();
    this.$el.html( this.template( this.model.attributes ) );

    var contactsview = new ContactList.Views.ContactList({
      collection: this.model.get('contacts'),
      el: this.$el.find('.contacts')
    });
  } //render

});//cat view

// define the category list view

ContactList.Views.Categories = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.colelction, 'all', this.render);
  },//init
  render: function(){
    var self = this;
    this.$el.empty();
    _.each(this.collection.models, function(category){
      var categoryView = new ContactList.Views.Category({ model: category });
      self.$el.append( categoryView.render().el )
;    });
  }//render
});//cat list view






//
