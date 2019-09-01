import React from 'react';
import { scaleLinear } from 'd3-scale';
import range from 'lodash/range';

import TimeAxis from './TimeAxis';
import TimelineGrid from './TimelineGrid';
import TimelineRow from './TimelineRow';
import TimelineDate from './TimelineDate';

import { Timeline } from 'timelineEvent';
import {
  axisHeight,
  bottomPadding,
  dateColumnWidth,
  leftPadding,
  rightPadding,
  rowHeight,
  topPadding
} from './constants';
import { getRowOffset, getRowsTotalHeight } from './layoutHelpers';

import './TimelineChart.css';

interface Props {
  width: number;
  data: ReadonlyArray<Timeline>;
}

function TimelineChart(props: Props) {
  const {
    width,
    data = [],
  } = props;

  const viewX = leftPadding;
  const viewY = topPadding;
  const viewWidth = width - viewX - rightPadding;
  const viewHeight = axisHeight + getRowsTotalHeight(data.length);
  const timelineWidth = viewWidth - dateColumnWidth;

  const xScale = scaleLinear().domain([0, 24]).range([0, timelineWidth]);
  const ticks = getTicksForWidth(timelineWidth);

  const height = viewHeight + bottomPadding + topPadding;

  return (
    <svg className="timeline-chart" width={width} height={height}>
      <g className="timeline-chart__view" transform={`translate(${viewX}, ${viewY})`}>
        <g className="timeline-chart__rows" transform={`translate(0, ${axisHeight})`}>
          <TimelineGrid rowsCount={data.length} width={viewWidth} rowHeight={rowHeight} startOffset={dateColumnWidth} />
          { data.map((timeline, row) => {
            const rowOffset = getRowOffset(row);

            return (
              <React.Fragment key={row}>
                <g key="date" transform={`translate(0 ${rowOffset})`}>
                  <TimelineDate width={dateColumnWidth} height={rowHeight} date={timeline.date} />
                </g>
                <g key="timeline" transform={`translate(${dateColumnWidth} ${rowOffset})`}>
                  <TimelineRow width={timelineWidth} timeline={timeline} />
                </g>
              </React.Fragment>
            );
          })}
        </g>
        <g key="time-axis" transform={`translate(${dateColumnWidth} 0)`}>
          <TimeAxis scale={xScale}  ticks={ticks} height={axisHeight}/>
        </g>
      </g>
    </svg>
  );
}

function getTicksForWidth(width: number): Array<number> {
  if (width < 200) {
    return [0, 8, 16, 24];
  }

  if (width < 400) {
    return  [0, 3, 6, 9, 12, 15, 18, 21, 24];
  }

  return [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
}

export default React.memo(TimelineChart);