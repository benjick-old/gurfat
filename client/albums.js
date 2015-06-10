Template.albums.helpers({
	albums: function () {
		return Albums.find({
			user: Meteor.userId()
		})
	}
});

Template.albumsSingle.helpers({
	first: function (self) {
		var image = Images.findOne(self.files[0].id);
		if(typeof(image) !== 'undefined') {
			image.s3 = image.copies.images.key.split('/').pop();
			return image
		}
	}
});