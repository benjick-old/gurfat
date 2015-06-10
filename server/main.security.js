Security.defineMethod("ifCreated", {
	fetch: [],
	transform: null,
	deny: function (type, arg, userId, doc) {
		console.log(userId);
		console.log(doc);
		return userId !== doc.user;
	}
});

Albums.permit('insert').apply();
Albums.permit('update').ifCreated().apply();
Images.files.permit(['insert', 'update']).apply();