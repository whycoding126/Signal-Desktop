const React = require('react');

const { LoadingWidget } = require('./loading_widget');

const { message: messageType } = require('./types/message');


class DocumentListEntry extends React.Component {
  renderContent() {
    const { message } = this.props;
    const { attachments } = message;
    const attachment = attachments[0];

    if (!attachment.data) {
      return <LoadingWidget />;
    }

    return <div>{attachment.fileName}</div>;
  }

  render() {
    return (
      <div className="document-list-entry">
        {this.renderContent()}
      </div>
    );
  }
}

DocumentListEntry.propTypes = {
  message: messageType.isRequired,
};

module.exports = { DocumentListEntry };
