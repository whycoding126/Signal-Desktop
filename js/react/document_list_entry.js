const React = require('react');

const { LoadingWidget } = require('./loading_widget');

const { message: messageType } = require('./types/message');


function DocumentListEntry({ message }) {
  const { attachments } = message;
  const attachment = attachments[0];

  if (!attachment.data) {
    return (
      <div className="document-list-entry">
        <LoadingWidget />
      </div>
    );
  }

  return (
    <div className="document-list-entry">
      {attachment.fileName}
    </div>
  );
}

DocumentListEntry.propTypes = {
  message: messageType.isRequired,
};

module.exports = { DocumentListEntry };
