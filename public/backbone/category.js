// recall or define the var holding everything
var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

//define the category view template
var CategoryViewTemplate = [
  "<div>",
    "<h3><%= name %></h3>",
    "<div class='contacts'>",
    "</div>",
  "</div>"
].join("");

//define the category edit/delete template

// define the category model
ContactList.Models.Category = Backbone.Model.extend({
  initialize: function(){
    contactsAll = new ContactList.Collections.Contacts();
    self = this;
    this.set('contacts',
      contactsAll.filter(contactsAll, function(contact){
          return contact.category_id == self.id;
      })  //filter
    ); //set
  },//initialize
  defaults: {
    // id
    name: "Category"
  }
}); // define the category model end

// define the category collection
ContactList.Collections.Categories = Backbone.Collection.extend({
  model:  ContactList.Models.Category,
  url:    '/categories'
});

// define the category view
ContactList.Views.Category = Backbone.View.extend({
  initialize: function(){
  }, //init
  tagName: 'div',
  template: _.template(CategoryViewTemplate),
  events: {},
  render: function(collectionFiltered){
    this.$el.empty();
    this.$el.html( this.template( this.model.attributes ) );

    var contactsView = new ContactList.Views.Contacts({
      collection: collectionFiltered,
      el: this.$el.find('.contacts')
    });

    contactsView.render();

    return this;
  } //render

});//cat view

// define the category list view

ContactList.Views.Categories = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'reset', this.render);
  },//init
  render: function(){
    var self = this;
    this.$el.empty();

    _.each(this.collection.models, function(category){
      var categoryView = new ContactList.Views.Category({ model: category });

      self.$el.append( categoryView.render().el );
    });
    return this;
  }//render
});//cat list view






//
