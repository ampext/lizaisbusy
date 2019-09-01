import groupEventsByDay from 'groupEventsByDay';
import { TimelineEventType } from 'timelineEvent';

describe('groupEventsByDate', () => {
  // makes local time
  const makeDate = (value: string) => {
    const date = new Date(value);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    return date;
  };

  it('2 events for one date and 1 event for another', () => {
    const events = [
      {
        type: TimelineEventType.Busy,
        startTime: makeDate('2019-08-30T15:38:08Z'),
        endTime: makeDate('2019-08-30T16:03:12Z'),
      },
      {
        type: TimelineEventType.Busy,
        startTime:makeDate('2019-08-30T21:07:45Z'),
        endTime: makeDate('2019-08-30T21:10:01Z'),
      },
      {
        type: TimelineEventType.Busy,
        startTime: makeDate('2019-08-31T00:00:00Z'),
        endTime: makeDate('2019-08-31T00:00:02Z'),
      },
    ];

    expect(groupEventsByDay(events)).toEqual([
      {
        date: makeDate('2019-08-30T00:00:00Z'),
        events: [events[0], events[1]],
      },
      {
        date: makeDate('2019-08-31T00:00:00Z'),
        events: [events[2]],
      }
    ]);
  });

  it('event started and ended in different days, should be split into 2 events', () => {
    const event = {
      type: TimelineEventType.Busy,
      startTime: makeDate('2019-08-29T23:51:41Z'),
      endTime: makeDate('2019-08-30T00:03:09Z'),
    };

    expect(groupEventsByDay([event])).toEqual([
      {
        date: makeDate('2019-08-29T00:00:00Z'),
        events: [
          {
            type: event.type,
            startTime: event.startTime,
            endTime: makeDate('2019-08-29T23:59:59.999Z'),
          }
        ],
      },
      {
        date: makeDate('2019-08-30T00:00:00Z'),
        events: [
          {
            type: event.type,
            startTime: makeDate('2019-08-30T00:00:00Z'),
            endTime: event.endTime,
          }
        ],
      }
    ]);
  });
});