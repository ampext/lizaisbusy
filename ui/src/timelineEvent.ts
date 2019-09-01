export enum TimelineEventType {
  Busy,
  Service,
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