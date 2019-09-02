import React from 'react';
import { scaleLinear } from 'd3-scale';

import TimelineDate from './TimelineDate';
import DayTimeline from './DayTimeline';
import TimeAxis from './TimeAxis';

import { Timeline } from 'timelineEvent';

import './TimelineChart.css';

export const dateColumnWidth = 100;
export const timelineHeight = 30;
export const axisHeight = 20;

interface Props {
  width: number;
  data: ReadonlyArray<Timeline>;
}

function TimelineChart(props: Props) {
  const {
    width,
    data = [],
  } = props;

  const timelineWidth = width - dateColumnWidth;

  const xScale = scaleLinear().domain([0, 24]).range([0, timelineWidth]);
  const ticks = getTicksForWidth(timelineWidth);

  return (
    <div className="timeline-chart">
      <div style={{ marginLeft: dateColumnWidth - 1 }}>
        <TimeAxis ticks={ticks} height={axisHeight} />
      </div>
      { data.map((timeline: Timeline, row: number) => (
          <div key={`row-${row}`} className="timeline-chart-row">
            <div className="timeline-chart-row__date" style={{ width: dateColumnWidth }}>
              <TimelineDate>
                {timeline.date}
              </TimelineDate>
            </div>
            <div className="timeline-chart-row__graph">
              <DayTimeline width={timelineWidth} height={timelineHeight} data={timeline} />
            </div>
          </div>
      ))}
    </div>
  )
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