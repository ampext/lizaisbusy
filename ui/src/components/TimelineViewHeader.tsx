import React from 'react';

interface Props {
  startDate: Date,
  endDate: Date,
}

function TimelineViewHeader(props: Props) {
  const {
    startDate,
    endDate,
  } = props;

  return <h2>{formatDate(startDate)} - {formatDate(endDate)}</h2>;
}

function formatDate(date: Date) {
  const options = {
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-EN', options);
}

export default React.memo(TimelineViewHeader);