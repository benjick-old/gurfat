var imageStore = new FS.Store.S3("images", {
  region: "us-east-1", //optional in most cases
  bucket: "fatgur", //required
  fileKeyMaker: function (fileObj) {
    console.log(fileObj)
    var ext = fileObj.original.name.split('.').pop();
    return fileObj.collectionName + '/' + fileObj._id + '.' + ext;
  }
});

Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
    maxSize: 10485760,
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Images.allow({
    download: function(userId, fileObj) {
        return true
    }
})

FS.File.prototype.directUrl = function(baseUrl, storeName) {
  var self = this;
  if (self.isMounted()) {
    var fileKey = self.collectionName + '/' + self._id + '-' + self.name;
    return baseUrl + fileKey;
  }
  return null;
}