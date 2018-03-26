const React = require('react');

const { message: messageType } = require('./types/message');

function ImageThumbnail({ message }) {
  return (
    <div className="image-thumbnail">
      {message.id} {message.body}
    </div>
  );
}

ImageThumbnail.propTypes = {
  message: messageType.isRequired,
};

module.exports = { ImageThumbnail };
