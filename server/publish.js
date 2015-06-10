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