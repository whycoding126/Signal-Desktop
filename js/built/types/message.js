const PropTypes = require('prop-types');

exports.message = PropTypes.shape({
  id: PropTypes.string.isRequired,
  body: PropTypes.string
});