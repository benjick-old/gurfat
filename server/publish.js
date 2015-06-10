Meteor.publish('album', function (album) {
	var album = Albums.find(album);
	var imageIds = [];
	album.fetch()[0].files.forEach(function (image) {
		imageIds.push(image.id);
	});
	var images = Images.find({ _id : { $in : imageIds } });
	//console.log(images.fetch())
	return [
		album,
		images
	]
});

Meteor.publish('albums', function () {
	var myAlbums = Albums.find({
		user: this.userId
	})
	myFirsts = []
	myAlbums.forEach(function (item) {
		myFirsts.push(item.files[0].id)
	});
	myImages = Images.find({ _id : { $in : myFirsts } });
	return [myAlbums, myImages]
});
