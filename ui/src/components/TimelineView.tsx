import React, { useRef } from 'react';
import { useRect } from '@reach/rect';

import TimelineChart from './TimelineChart';
import { Timeline } from '../timelineEvent';

import './TimelineView.scss';

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