package monitor

import "time"

// Event type
const (
	MonitorStart = 0 // monitor app started
	SensorOpen   = 1 // litter box door opened
	SensorClose  = 2 // litter box door closed
)

// Event struct
type Event struct {
	ID   int
	Type int
	Time time.Time
}
