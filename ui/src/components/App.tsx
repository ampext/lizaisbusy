import React from 'react';

import TimelineView from './TimelineView';
import useFetch from '../useFetch';
import groupEventsByDay from '../groupEventsByDay';
import { TimelineEventType } from '../timelineEvent';

interface Event {
  type: TimelineEventType,
  startTime: string,
  endTime: string,
}

type Response = ReadonlyArray<Event>;

function App() {
  const url = `${process.env.API_URL}/events?last_days=100`;
  const [response, loading, error] = useFetch<Response>(url, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (response) {
    const events = response.map(event => ({
      ...event,
      startTime: new Date(event.startTime),
      endTime: new Date(event.endTime),
    }));

    return <TimelineView data={groupEventsByDay(events)} />;
  }

  return null;
}

export default App;