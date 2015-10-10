/**
Template Controllers

@module Templates
*/

var template;

/**
The to name template

@class [template] components_pocketbookToName
@constructor
*/

Template['components_pocketbookToName'].onCreated(function(){
    template = this;
});
    
Template['components_pocketbookToName'].onRendered(function(){
    template = this;
    
    TemplateVar.set('name', '');
});
    
Template['components_pocketbookToName'].helpers({
    'load': function(){
        TemplateVar.set('name', PocketBook.objects.names[template.data]);
    },
}); 