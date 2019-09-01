package timeline

import (
	"time"
)

// Event type
const (
	Busy = "busy" // litter box is busy
)

// Event struct
type Event struct {
	Type string `json:"type"`

	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime"`
}
