import React from 'react';
import { scaleLinear } from 'd3-scale';

import { Timeline } from 'timelineEvent';
import { endOfDay, startOfDay } from '../../dateHelpers';

import './TimelineRow.css';

const eventPadding = 4;

interface Props {
  timeline: Timeline,
  width: number,
  rowHeight: number,
}

function TimelineRow(props: Props) {
  const {
    timeline: {
      date,
      events = [],
    },
    width,
    rowHeight,
  } = props;

  const timeScale = scaleLinear().domain([startOfDay(date), endOfDay(date)]).range([0, width]);

  return (
    <g className="timeline-row">
      { events.map((event, i) => {
          const {
            type,
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
              key={`event-${i}`}
              className="timeline-row__event"
              x={Math.round(x)} y={eventPadding} width={eventWidth} height={rowHeight - 2 * eventPadding}
            />
          )
      })}
    </g>
  );
}

export default React.memo(TimelineRow);