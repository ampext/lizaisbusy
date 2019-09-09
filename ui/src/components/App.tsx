import React from 'react';

import TimelineView from './TimelineView';
import useFetch from 'useFetch';
import groupEventsByDay from 'groupEventsByDay';
import { ServerTimelineEvent } from 'timelineEvent';
import tranformServerEvent from 'transformServerEvents';

type Response = ReadonlyArray<ServerTimelineEvent>;

interface Props {
  dataUrl?: string,
}

function App(props: Props) {
  const {
    dataUrl = `${process.env.API_URL}/events?last_days=100`,
  } = props;

  const [response, loading, error] = useFetch<Response>(dataUrl, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (response) {
    const events = response.map(tranformServerEvent);
    const data = groupEventsByDay(events);

    return <TimelineView data={data} />;
  }

  return null;
}

export default App;