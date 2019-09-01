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
    <React.Fragment>
      <text className="timeline-date__label" x={textX} y={textY} textAnchor="middle" dominantBaseline="middle">
        {formatDate(date)}
      </text>
      <line className="timeline-date__separator" x1={0} y1={height + 0.5} x2={width} y2={height  + 0.5} />
    </React.Fragment>
  );
}

function formatDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default React.memo(TimelineDate);