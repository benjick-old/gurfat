Template.new.events({
	'dropped .well': function(event, temp) {

		var album = Albums.insert({
			user: Meteor.userId()
		});
		console.log(album)

		FS.Utility.eachFile(event, function(file) {
			var id = Images.insert(file);
			Albums.update({ _id: album },{ $push: { 
				files: {
					id: id._id,
					text: ""
				}
			}})
		});

		FlowRouter.go('/album/:album', {
			album: album
		});
	}
});