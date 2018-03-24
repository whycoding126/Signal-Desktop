const React = require('react');
const PropTypes = require('prop-types');

const { LoadingWidget } = require('./loading_widget');

const { message: messageType } = require('./types/message');


class ImageThumbnail extends React.Component {
  renderContent() {
    const { i18n, message } = this.props;

    if (!message.imageUrl) {
      return <LoadingWidget />;
    }

    return (
      <img
        src={message.imageUrl}
        alt={`${i18n('messageCaption')}: ${message.body}`}
      />
    );
  }

  render() {
    return (
      <div className="image-thumbnail">
        {this.renderContent()}
      </div>
    );
  }
}

ImageThumbnail.propTypes = {
  message: messageType.isRequired,
  i18n: PropTypes.func.isRequired,
};

module.exports = { ImageThumbnail };
