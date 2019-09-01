import React from 'react';
import { ScaleLinear } from 'd3-scale';

import './TimeAxis.css';

interface Props {
  scale: ScaleLinear<number, number>,
  height: number;
  ticks: Array<number>,
  tickSize?: number;
}

function TimeAxis(props: Props) {
  const {
    scale,
    height,
    ticks,
    tickSize = 5,
  } = props;

  return (
    <g>
      <line
        key="axis"
        className="time-axis"
        x1={0}
        y1={height + 0.5}
        x2={scale(24)}
        y2={height + 0.5}
      />
      { ticks.map(t => {
        const x = Math.round(scale(t)) + 0.5;

        return (
          <React.Fragment key={t}>
            <line
              key={`tick-${t}`}
              className="time-axis__tick"
              x1={x}
              y1={height}
              x2={x}
              y2={height - tickSize}
            />
            <text
              key={`label-${t}`}
              className="time-axis__label"
              x={x}
              y={height - tickSize - 4}
              {...getLabelAlignAttrs(t)}
            >
              {t}
            </text>
          </React.Fragment>
        )
      })}
    </g>
  )
}

function getLabelAlignAttrs(hour) {
  switch (hour) {
    case 0: return {
      dx: 2,
      textAnchor: 'start',
    };
    case 24: return {
      dx: -2,
      textAnchor: 'end',
    };
    default: return {
      textAnchor: 'middle',
    };
  }
}

/*function TimeAxis(props: Props) {
  const xScale = scaleTime().nice();
  const ticks = xScale.ticks(24).map(d => d.getHours());

  return (
    <div className="time-axis">
      { ticks.map(h => (
        <div key={h} className="time-axis__item">
          <span className="time-axis__label">00</span>
        </div>
        )
      )}
    </div>
  );
}*/

export default React.memo(TimeAxis);