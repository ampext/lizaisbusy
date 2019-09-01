import { Timeline, TimelineEvent } from './timelineEvent';
import { endOfDay, startOfDay } from './dateHelpers';

function groupEventsByDay(events: ReadonlyArray<TimelineEvent>): Array<Timeline> {
  const result = {};

  const insertEvent = (date, event) => {
    const events = result[date] || [];
    events.push(event);
    result[date] = events;
  };

  for (const event of events) {
    const startDate = startOfDay(event.startTime).valueOf();
    const endDate = startOfDay(event.endTime).valueOf();

    if (startDate === endDate) {
      insertEvent(startDate, event);
    } else {
      const [startEvent, endEvent] = splitEventByDay(event);

      insertEvent(startDate, startEvent);
      insertEvent(endDate, endEvent);
    }
  }

  return Object.keys(result).map(date => ({
    date: new Date(+date),
    events: result[date],
  }));
}

function splitEventByDay(event: TimelineEvent): [TimelineEvent, TimelineEvent] {
  return [
    {
      type: event.type,
      startTime: event.startTime,
      endTime: endOfDay(event.startTime),
    },
    {
      type: event.type,
      startTime: startOfDay(event.endTime),
      endTime: event.endTime,
    }
  ];
}

export default groupEventsByDay;