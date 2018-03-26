const React = require('react');
const PropTypes = require('prop-types');

const { ImageThumbnail } = require('./image_thumbnail');
const { DocumentListEntry } = require('./document_list_entry');
const { LoadingWidget } = require('./loading_widget');

const { message: messageType } = require('./types/message');


class MediaGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'media',
    };

    this.switchToMedia = this.switchToMedia.bind(this);
    this.switchToDocuments = this.switchToDocuments.bind(this);
  }

  switchToMedia() {
    this.setState({
      selectedTab: 'media',
    });
  }

  switchToDocuments() {
    this.setState({
      selectedTab: 'documents',
    });
  }

  renderMessages() {
    const { media, documents } = this.props;
    const { selectedTab } = this.state;
    const messages = selectedTab === 'media' ? media : documents;
    const Component = selectedTab === 'media' ? ImageThumbnail : DocumentListEntry;

    if (!messages || !messages.length) {
      return <LoadingWidget />;
    }

    return messages.map(message => <Component key={message.id} message={message} />);
  }

  render() {
    return (
      <div className="media-gallery">
        <div className="header">
          <div className="tab" onClick={this.switchToMedia}>Media</div>
          <div className="tab" onClick={this.switchToDocuments}>Documents</div>
        </div>
        <div className="content">
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

MediaGallery.propTypes = {
  media: PropTypes.arrayOf(messageType).isRequired,
  documents: PropTypes.arrayOf(messageType).isRequired,
};

module.exports = MediaGallery;
