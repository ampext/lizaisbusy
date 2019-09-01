import React, { useRef } from 'react';
import { useRect } from '@reach/rect';

import TimelineChart from './TimelineChart';
import { Timeline } from '../timelineEvent';

import './TimelineView.css';

/*const data = [
  {
    date: new Date('2019-08-24'),
    events: [{
      startTime: new Date('2019-08-24T01:40:00'),
      endTime: new Date('2019-08-24T01:45:00'),
      type: TimelineEventType.Busy,
    }, {
      startTime: new Date('2019-08-24T16:03:00'),
      endTime: new Date('2019-08-24T16:04:00'),
      type: TimelineEventType.Busy,
    }]
  },
  {
    date: new Date('2019-08-25'),
    events: [],
  }
];*/

interface Props {
  data: ReadonlyArray<Timeline>,
}

function TimelineView(props: Props) {
  const ref = useRef();
  const rect = useRect(ref);

  return (
    <div className="timeline-view" ref={ref}>
      { rect && <TimelineChart width={rect.width} data={props.data} /> }
    </div>
  );
}

export default React.memo(TimelineView);