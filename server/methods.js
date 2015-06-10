Meteor.methods({
	updateText: function (id, fileId, text) {
		Albums.update({
			_id: id,
			"files.id": fileId,
			user: this.userId
		}, {
			$set : { "files.$.text": text }
		});
	}
});