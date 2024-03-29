import React, { useRef } from 'react';
import { useRect } from '@reach/rect';

import TimelineChart from './TimelineChart';
import TimelineViewHeader from './TimelineViewHeader';
import ThemeSwitch from './ThemeSwitch';

import { Timeline } from 'timelineEvent';
import useDarkMode from 'useDarkMode';

import './TimelineView.scss';

interface Props {
  data?: ReadonlyArray<Timeline>,
}

function TimelineView(props: Props) {
  const {
    data = [],
  } = props;

  const [isDark, setDarkMode] = useDarkMode();
  const ref = useRef();
  const rect = useRect(ref);

  const [startDate, endDate] = getDateRangeFromTimeline(data);

  return (
    <div className="timeline-view" ref={ref}>
      <div className="timeline-view__header">
        { startDate && endDate && <TimelineViewHeader startDate={startDate} endDate={endDate} /> }
        <ThemeSwitch isDark={isDark} onChange={setDarkMode} />
      </div>
      { rect && <TimelineChart width={rect.width} data={data} /> }
    </div>
  );
}

function getDateRangeFromTimeline(data: ReadonlyArray<Timeline>): [Date, Date] {
  if (data.length === 0)  {
    return [undefined, undefined];
  }

  return [data[0].date, data[data.length - 1].date];
}

export default React.memo(TimelineView);