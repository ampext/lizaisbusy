import React from 'react';

import './TimeAxis.css';

interface Props {
  height: number;
  ticks: Array<number>,
}

function TimeAxis(props: Props) {
  const {
    height,
  } = props;

  const ticks = props.ticks.slice(0, props.ticks.length - 1);

  return (
    <div className="time-axis" style={{ height }}>
      { ticks.map(h => (
        <div key={h} className="time-axis__item">
          <span className="time-axis__label">{formatHour(h)}</span>
        </div>
        )
      )}
    </div>
  );
}

function formatHour(hour: number) {
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
}

export default React.memo(TimeAxis);