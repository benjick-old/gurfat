Template.album.helpers({
	loading: function() {
		if(FlowRouter.subsReady("album")) {
			return false;
		}
		return true;
	},
	images: function() {
		if(FlowRouter.subsReady("album")) {
			var imageIds = []
			var files = Albums.findOne(FlowRouter.getParam("album")).files.forEach(function (image) {
				imageIds.push(image.id);
			});
			return Images.find({ _id : { $in : imageIds }}).map(function(image) {
				image.s3 = image.copies.images.key.split('/').pop();
				return image
			});
		}
	},
	album: function() {
		if(FlowRouter.subsReady("album")) {
			return Albums.findOne(FlowRouter.getParam("album"));
		}
	}
});

Template.albumImage.events({
	'click .edit': function () {
		var self = this;
		bootbox.prompt({
			title: "Text for this image",
			value: self.text,
			callback: function(result) {
				if (result === null) {
					//Example.show("Prompt dismissed");
				} else {
					console.log(self);
					Meteor.call('updateText', FlowRouter.getParam("album"), self.id, result, function (error, result) {});
					//Example.show("Hi <b>"+result+"</b>");
				}
			}
		});
	}
});

Template.albumImage.helpers({
	image: function(id) {
		if(FlowRouter.subsReady("album") && typeof(image) !== 'undefined') {
			var image = Images.findOne(id);
			image.s3 = image.copies.images.key.split('/').pop();
			return image;
		}
	},
	isOwner: function () {
		if(FlowRouter.subsReady("album")) {
			return Albums.findOne(FlowRouter.getParam("album")).user === Meteor.userId();
		}
	},
});