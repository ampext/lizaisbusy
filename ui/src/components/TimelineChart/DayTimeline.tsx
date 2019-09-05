import React from 'react';
import { scaleLinear } from 'd3-scale';

import { Timeline } from 'timelineEvent';
import { endOfDay, startOfDay } from '../../dateHelpers';

import './DayTimeline.scss';

interface Props {
  data: Timeline,
  width: number,
  height: number,
}

function DayTimeline(props: Props) {
  const {
    data: {
      date,
      events,
    },
    width,
    height,
  } = props;

  const timeScale = scaleLinear().domain([startOfDay(date), endOfDay(date)]).range([0, width]);

  return (
    <svg width={width} height={height}>
      { events.map((event, i) => {
          const {
            startTime,
            endTime,
          } = event;

          let x = timeScale(startTime);
          const eventWidth = Math.round(Math.max(2, timeScale(endTime) - x));

          // a hack to make events that close to 12:00 look better
          if (x + eventWidth > width) {
            x = width - eventWidth;
          }

          return (
            <rect
              key={`event-${i}`} className="day-timeline__event"
              x={Math.round(x)} y={0} width={eventWidth} height={height}
            />
          )
      })}
    </svg>
  );
}

export default React.memo(DayTimeline);