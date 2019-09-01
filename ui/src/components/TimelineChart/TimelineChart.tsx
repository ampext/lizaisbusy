import React from 'react';
import { scaleLinear } from 'd3-scale';

import TimeAxis from './TimeAxis';
import TimelineGrid from './TimelineGrid';
import TimelineRow from './TimelineRow';

import { Timeline } from 'timelineEvent';
import { axisHeight, bottomPadding, dateWidth, leftPadding, rightPadding, topPadding } from './constants';
import { getRowOffset, getViewHeight } from './layoutHelpers';

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

  const viewX = leftPadding + dateWidth;
  const viewY = topPadding;
  const viewWidth = width - viewX - rightPadding;
  const viewHeight = getViewHeight(data.length);

  const xScale = scaleLinear().domain([0, 24]).range([0, viewWidth]);
  const ticks = getTicksForWidth(width);

  const height = viewHeight + bottomPadding + topPadding;

  return (
    <svg className="timeline-chart" width={width} height={height}>
      <g className="timeline-chart__view" transform={`translate(${viewX}, ${viewY})`}>
        <TimelineGrid scale={xScale} ticks={ticks} rowsCount={data.length} />
        <TimeAxis scale={xScale}  ticks={ticks} height={axisHeight}/>
        { data.map((d, row) => {
          const rowOffset = getRowOffset(row);

          return (
            <g key={row} transform={`translate(0 ${rowOffset})`}>
              <TimelineRow width={viewWidth} timeline={d} />
            </g>
          )
        })}
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