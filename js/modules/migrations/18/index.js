const { isImage, isVideo } = require('../../types/mime');


exports.run = async (transaction) => {
  const messagesStore = transaction.objectStore('messages');

  console.log('Adding media annotations');
  const numUpgradedMessages = await _addMediaAnnotations(messagesStore);
  console.log('Completed pass across all messages', { numUpgradedMessages });

  console.log('Create indices to search for visual media and other media');
  messagesStore.createIndex(
    'visual-media',
    ['conversationId', 'received_at', 'visualMedia'],
    { unique: false }
  );
  messagesStore.createIndex(
    'other-media',
    ['conversationId', 'received_at', 'otherMedia'],
    { unique: false }
  );
};

function _addMediaAnnotations(messagesStore) {
  return new Promise((resolve, reject) => {
    const putOperations = [];

    const cursorRequest = messagesStore.openCursor();
    cursorRequest.onsuccess = async (event) => {
      const cursor = event.target.result;
      const hasMoreData = Boolean(cursor);
      if (!hasMoreData) {
        await Promise.all(putOperations);
        return resolve(putOperations.length);
      }

      const message = cursor.value;
      const annotatedMessage = _addMediaAnnotation(message);
      if (message !== annotatedMessage) {
        putOperations.push(putItem(
          messagesStore,
          annotatedMessage,
          annotatedMessage.id
        ));
      }

      return cursor.continue();
    };

    cursorRequest.onerror = event =>
      reject(event.target.error);
  });
}

//       _addMediaAnnotation :: Message -> Message
function _addMediaAnnotation(message) {
  let result = message;
  const attachments = message.attachments || [];

  for (let i = 0, max = attachments.length; i < max; i += 1) {
    const attachment = attachments[i];
    const mimeType = attachment.contentType || '';

    // We set these keys as 1 instead of true because IndexedDB doesn't allow you to
    //   index on a boolean key.
    if (isImage(mimeType) || isVideo(mimeType)) {
      result = Object.assign({}, result, { visualMedia: 1 });
    } else {
      result = Object.assign({}, result, { otherMedia: 1 });
    }
  }

  return result;
}

//       putItem :: IDBObjectStore -> Item -> Key -> Promise Item
function putItem(store, item, key) {
  return new Promise((resolve, reject) => {
    try {
      const request = store.put(item, key);
      request.onsuccess = event =>
        resolve(event.target.result);
      request.onerror = event =>
        reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
}
