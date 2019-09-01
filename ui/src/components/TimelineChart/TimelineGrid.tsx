import React from 'react';
import { ScaleLinear } from 'd3-scale';
import range from 'lodash/range';

import { axisHeight, rowHeight } from './constants';
import { getViewHeight, getRowOffset } from './layoutHelpers';

import './TimelineGrid.css';

interface Props {
  rowsCount: number,
  scale: ScaleLinear<number, number>,
  ticks: Array<number>,
}

function TimelineGrid(props: Props) {
  const {
    rowsCount,
    scale,
    ticks,
  } = props;

  return (
    <React.Fragment>
      { range(rowsCount).map(row => {
        const rowOffset = getRowOffset(row);
        const width = scale(24);

        return (
          <g key={`row-${row}`} className="timeline-grid__row" transform={`translate(0 ${rowOffset})`}>
            <rect x={0} y={0} width={width} height={rowHeight} />
            <line
              className="timeline-grid__separator"
              x1={0} y1={rowHeight + 0.5} x2={width} y2={rowHeight + 0.5}
            />
          </g>
        );
      })}
      { ticks.map(t => {
        const x = Math.round(scale(t)) + 0.5;

        return (
          <line
            key={`grid-${t}`} className="timeline-grid__grid"
            x1={x} y1={axisHeight} x2={x} y2={getViewHeight(rowsCount)}
            strokeDasharray="4 4"
          />
        )
      })}
    </React.Fragment>
  );
}

export default React.memo(TimelineGrid);