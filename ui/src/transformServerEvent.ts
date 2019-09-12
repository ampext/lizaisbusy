import { ServerTimelineEvent, TimelineEvent } from 'timelineEvent';

function tranformServerEvent(event: ServerTimelineEvent): TimelineEvent {
  return {
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  };
}

export default tranformServerEvent;