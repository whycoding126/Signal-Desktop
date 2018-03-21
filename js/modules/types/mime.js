exports.isJPEG = mimeType =>
  mimeType === 'image/jpeg';

exports.isImage = mimeType =>
  mimeType.startsWith('image/') && mimeType !== 'image/tiff';

// TODO: there are some video types that we can't play, that we consider a document
exports.isVideo = mimeType =>
  mimeType.startsWith('video/');
