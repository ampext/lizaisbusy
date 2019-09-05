import React from 'react';

import './TimelineDate.scss';

interface Props {
  children: Date,
}

function TimelineDate(props: Props) {
  return (
    <span className="timeline-date">
      {formatDate(props.children)}
    </span>
  );
}

function formatDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default React.memo(TimelineDate);