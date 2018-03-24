const React = require('react');
const PropTypes = require('prop-types');

const moment = require('moment');
const _ = require('lodash');

const { AttachmentListSection } = require('./attachment_list_section');
const { LoadingWidget } = require('./loading_widget');

const { message: messageType } = require('./types/message');

const MONTH_FORMAT = 'MMMM YYYY';

function groupByDates(messages) {
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');
  const thisWeek = moment().startOf('week');
  const thisMonth = moment().startOf('month');

  const sorted = _.sortBy(messages, message => -message.received_at);
  const annotations = sorted.map((message) => {
    const date = moment(message.received_at);

    if (date.isAfter(today)) {
      return {
        order: 0,
        label: 'today',
        message,
      };
    } else if (date.isAfter(yesterday)) {
      return {
        order: 1,
        label: 'yesterday',
        message,
      };
    } else if (date.isAfter(thisWeek)) {
      return {
        order: 2,
        label: 'thisWeek',
        message,
      };
    } else if (date.isAfter(thisMonth)) {
      return {
        order: 3,
        label: 'thisMonth',
        message,
      };
    }
    return {
      order: (date.year() * 100) + date.month(),
      label: 'yearMonth',
      message,
    };
  });

  return _.groupBy(annotations, 'label');
}


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

  renderSections() {
    const { i18n, media, documents } = this.props;
    const { selectedTab } = this.state;

    const messages = selectedTab === 'media' ? media : documents;
    const type = selectedTab;

    if (!messages || !messages.length) {
      return <LoadingWidget />;
    }

    const groups = groupByDates(messages);
    return _.map(groups, (annotations) => {
      const first = annotations[0];
      const date = moment(first.message.receivedAt);

      const header = first.label === 'yearMonth'
        ? date.format(MONTH_FORMAT)
        : i18n(first.label);
      const groupMessages = _.map(annotations, 'message');

      return (
        <AttachmentListSection
          key={header}
          header={header}
          i18n={i18n}
          type={type}
          messages={groupMessages}
        />
      );
    });
  }

  render() {
    const { i18n } = this.props;

    return (
      <div className="media-gallery">
        <div className="header">
          <div className="tab">
            <button onClick={this.switchToMedia}>{i18n('media')}</button>
          </div>
          <div className="tab">
            <button onClick={this.switchToDocuments}>{i18n('documents')}</button>
          </div>
        </div>
        <div className="content">
          {this.renderSections()}
        </div>
      </div>
    );
  }
}

MediaGallery.propTypes = {
  media: PropTypes.arrayOf(messageType).isRequired,
  documents: PropTypes.arrayOf(messageType).isRequired,
  i18n: PropTypes.func.isRequired,
};

module.exports = MediaGallery;
