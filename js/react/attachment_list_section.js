const React = require('react');
const PropTypes = require('prop-types');

const { ImageThumbnail } = require('./image_thumbnail');
const { DocumentListEntry } = require('./document_list_entry');

const { message: messageType } = require('./types/message');


class AttachmentListSection extends React.Component {
  renderMessages() {
    const { i18n, messages, type } = this.props;
    const Component = type === 'media' ? ImageThumbnail : DocumentListEntry;

    return messages.map(message => (<Component
      i18n={i18n}
      key={message.id}
      message={message}
    />));
  }

  render() {
    const { header } = this.props;

    return (
      <div className="attachment-list-section">
        <div className="header">{header}</div>
        <div className="messages">
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

AttachmentListSection.propTypes = {
  i18n: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(messageType).isRequired,
};

module.exports = { AttachmentListSection };
