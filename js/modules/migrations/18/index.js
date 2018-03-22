const { addMediaAnnotations } = require('../../types/message');


exports.run = async (transaction) => {
  const messagesStore = transaction.objectStore('messages');

  console.log('Adding media annotations');
  const numUpgradedMessages = await updateAllMessages(messagesStore);
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

function updateAllMessages(messagesStore) {
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
      const annotatedMessage = addMediaAnnotations(message);
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
