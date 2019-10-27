package timeline

import (
	"lizaisbusy/monitor"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestConvertToTimelineEventsWith2Groups(t *testing.T) {
	events := []monitor.Event{
		monitor.Event{
			Type: monitor.SensorOpen,
			Time: time.Date(2000, time.May, 25, 12, 0, 0, 0, time.UTC),
		},
		monitor.Event{
			Type: monitor.SensorClose,
			Time: time.Date(2000, time.May, 25, 12, 0, 2, 0, time.UTC),
		},
		monitor.Event{
			Type: monitor.SensorOpen,
			Time: time.Date(2000, time.May, 25, 12, 3, 2, 0, time.UTC),
		},
		monitor.Event{
			Type: monitor.SensorClose,
			Time: time.Date(2000, time.May, 25, 12, 3, 54, 0, time.UTC),
		},
		monitor.Event{
			Type: monitor.SensorOpen,
			Time: time.Date(2000, time.May, 25, 12, 4, 12, 0, time.UTC),
		},
		monitor.Event{
			Type: monitor.SensorClose,
			Time: time.Date(2000, time.May, 25, 12, 4, 15, 0, time.UTC),
		},
	}

	timelineEvents := ConvertToTimelineEvents(events)

	assert.Len(t, timelineEvents, 2)

	assert.Equal(t, timelineEvents[0], Event{
		Type:      Busy,
		StartTime: events[0].Time,
		EndTime:   events[1].Time,
	})

	assert.Equal(t, timelineEvents[1], Event{
		Type:      Busy,
		StartTime: events[2].Time,
		EndTime:   events[5].Time,
	})
}

func TestConvertToTimelineEventsWith1Group(t *testing.T) {
	events := []monitor.Event{
		monitor.Event{
			Type: monitor.SensorOpen,
			Time: time.Date(2000, time.May, 25, 12, 0, 0, 0, time.UTC),
		},
		monitor.Event{
			Type: monitor.SensorClose,
			Time: time.Date(2000, time.May, 25, 12, 0, 2, 0, time.UTC),
		},
	}

	timelineEvents := ConvertToTimelineEvents(events)

	assert.Len(t, timelineEvents, 1)

	assert.Equal(t, timelineEvents[0], Event{
		Type:      Busy,
		StartTime: events[0].Time,
		EndTime:   events[1].Time,
	})
}

func TestConvertToTimelineEventsWithEmptyEvents(t *testing.T) {
	events := []monitor.Event{}

	timelineEvents := ConvertToTimelineEvents(events)

	assert.Len(t, timelineEvents, 0)

}
