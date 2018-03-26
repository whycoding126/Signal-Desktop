const React = require('react');

const { LoadingWidget } = require('./loading_widget');

const { message: messageType } = require('./types/message');


function ImageThumbnail({ message }) {
  if (!message.imageUrl) {
    return (
      <div className="image-thumbnail">
        <LoadingWidget />
      </div>
    );
  }


  return (
    <div className="image-thumbnail">
      <img src={message.imageUrl} />
    </div>
  );
}

ImageThumbnail.propTypes = {
  message: messageType.isRequired,
};

module.exports = { ImageThumbnail };
