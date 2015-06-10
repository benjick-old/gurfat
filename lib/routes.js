FlowRouter.route('/', {
    action: function(params) {
        FlowLayout.render("mainLayout", {main: "new"});
    }
});

FlowRouter.route('/album/:album', {
    subscriptions: function(params, queryParams) {
        this.register('album', Meteor.subscribe('album', params.album));
    },
    action: function(params) {
        FlowLayout.render("mainLayout", {main: "album"});
    },
    name: 'album'
});