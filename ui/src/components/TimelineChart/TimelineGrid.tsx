import React from 'react';
import range from 'lodash/range';

import { getRowOffset, getRowsTotalHeight } from './layoutHelpers';

import './TimelineGrid.css';

interface Props {
  rowsCount: number,
  rowHeight: number,
  width: number,
  startOffset?: number
}

function TimelineGrid(props: Props) {
  const {
    rowsCount,
    rowHeight,
    width,
    startOffset = 0,
  } = props;

  const startX = startOffset + 0.5;

  return (
    <React.Fragment>
      { range(rowsCount).map(row => {
        const rowOffset = getRowOffset(row);

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
      <line
        className="timeline-grid__separator"
        x1={0} y1={0.5} x2={width} y2={0.5}
      />
      <line
        key="zero" className="timeline-grid__zero"
        x1={0.5} y1={0} x2={0.5} y2={getRowsTotalHeight(rowsCount)}
      />
      <line
        key="start" className="timeline-grid__start"
        x1={startX} y1={0} x2={startX} y2={getRowsTotalHeight(rowsCount)}
      />
      <line
        key="end" className="timeline-grid__end"
        x1={width + 0.5} y1={0} x2={width + 0.5} y2={getRowsTotalHeight(rowsCount)}
      />
    </React.Fragment>
  );
}

export default React.memo(TimelineGrid);