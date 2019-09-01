import React from 'react';
import { scaleLinear } from 'd3-scale';

import { Timeline } from 'timelineEvent';
import { endOfDay, startOfDay } from '../../dateHelpers';
import { eventPadding, rowHeight } from './constants';

import './TimelineRow.css';

interface Props {
  timeline: Timeline,
  width: number,
}

function TimelineRow(props: Props) {
  const {
    timeline: {
      date,
      events = [],
    },
    width,
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

          const x = timeScale(startTime);
          const width = Math.max(2, timeScale(endTime) - x);

          return (
            <rect
              key={`event-${i}`}
              className="timeline-row__event"
              x={Math.round(x)} y={eventPadding} width={Math.round(width)} height={rowHeight - 2 * eventPadding}
            />
          )
      })}
    </g>
  );
}

export default React.memo(TimelineRow);