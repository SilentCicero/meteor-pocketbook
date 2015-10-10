// Router defaults
Router.configure({
});

// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/

// Default route


// disconnect any meteor server
if(location.host == 'meteor-pocketbook.meteor.com')
    Router.route('/', {
        template: 'views_pocketbook',
        name: 'pocketbook'
    });