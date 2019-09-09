export enum TimelineEventType {
  Busy,
  Service,
}

export interface ServerTimelineEvent {
  type: TimelineEventType,
  startTime: string,
  endTime: string,
}

export interface TimelineEvent {
  type: TimelineEventType,
  startTime: Date,
  endTime: Date,
}

export interface Timeline {
  date: Date,
  events: ReadonlyArray<TimelineEvent>,
}