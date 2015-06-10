Template.new.events({
	'dropped .drop': function(event, temp) {

		var album = Albums.insert({
			user: Meteor.userId()
		});

		FS.Utility.eachFile(event, function(file) {
			file.user = Meteor.userId();
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