// recall or define the var holding everything
var ContactList = ContactList || { Models: {}, Collections: {}, Views: {} };

//define the category view template
var CategoryViewTemplate = [
  "<div>",
    "<h3><%= name %></h3>",
    "<div class='contacts' id='<%= id %>'>",
    "</div>",
  "</div>"
].join("");

//define the category edit/delete template
// var allContacts = new ContactList.Collections.Contacts();
// define the category model
ContactList.Models.Category = Backbone.Model.extend({
  initialize: function(){
    var allContacts = new ContactList.Collections.Contacts();
    // debugger;
    var cat_id = this.attributes.id;
    allContacts.url = '/categories/' + cat_id + '/contacts';
    // allContacts.fetch({reset: true});
    this.set('contacts', allContacts);
  },//initialize
  defaults: {
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
    this.listenTo( this.model, 'all', this.render );
  }, //init
  tagName: 'div',
  template: _.template(CategoryViewTemplate),
  events: {},
  render: function(){
    this.$el.empty();
    this.$el.html( this.template( this.model.attributes ) );

    var contactsView = new ContactList.Views.Contacts({
      collection: this.model.get('contacts'),
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
