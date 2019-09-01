package timeline

import (
	"fmt"
	"lizaisbusy/monitor"
	"log"
	"time"
)

// ConvertToTimelineEvents convers sequence of monitor events to sequence of timeline events
func ConvertToTimelineEvents(sensorEvents []monitor.Event) []Event {
	groupedSensorEvents := groupMonitorSensorEvents(sensorEvents, 2)
	timelineEvents := make([]Event, len(groupedSensorEvents))

	for i, sensorEvents := range groupedSensorEvents {
		timelineEvents[i] = Event{
			Type:      Busy,
			StartTime: sensorEvents[0].Time,
			EndTime:   sensorEvents[len(sensorEvents)-1].Time,
		}
	}

	return timelineEvents
}

// groupSensorEvents groups SensorOpen and SensorClose events based on specific time window in minutes
func groupMonitorSensorEvents(events []monitor.Event, window int) [][]monitor.Event {
	var eventGroups [][]monitor.Event
	windowDuration, err := time.ParseDuration(fmt.Sprintf("%dm", window))

	if err != nil {
		return eventGroups
	}

	if len(events) == 0 {
		return eventGroups
	}

	startIndex := 0

	for i := 1; i < len(events); i++ {
		eventTime := events[i].Time
		prevEventTime := events[i-1].Time

		if prevEventTime.After(prevEventTime) {
			log.Print("events are not sorted by timestamp")
			return eventGroups
		}

		duration := eventTime.Sub(prevEventTime)

		if duration > windowDuration {
			eventGroups = append(eventGroups, events[startIndex:i])
			startIndex = i
		}
	}

	return eventGroups
}
