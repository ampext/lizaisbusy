import React from 'react';

import './TimelineDate.css';

interface Props {
  date: Date,
  width: number,
  height: number,
}

function TimelineDate(props: Props) {
  const {
    date,
    width,
    height,
  } = props;

  const textX = Math.round(width / 2);
  const textY = Math.round(height / 2);

  return (
    <text className="timeline-date__label" x={textX} y={textY} textAnchor="middle" dominantBaseline="middle">
      {formatDate(date)}
    </text>
  );
}

function formatDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default React.memo(TimelineDate);