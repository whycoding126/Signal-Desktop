const React = require('react');

function LoadingWidget() {
  return (
    <div className="loading-widget">
      <div className="container">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

module.exports = { LoadingWidget };
