package monitor

import (
	"database/sql"
	"fmt"
	"time"
)

// GetEvents reads events from database
func GetEvents(db *sql.DB, lastDays int) ([]Event, error) {
	var events []Event

	stmt, err := db.Prepare("SELECT id, type, created_at FROM events WHERE created_at > date('now', ?)")
	if err != nil {
		return nil, err
	}

	defer stmt.Close()

	rows, err := stmt.Query(fmt.Sprintf("-%d day", lastDays))
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var eventID int
		var eventType int
		var eventTimeStr string

		err = rows.Scan(&eventID, &eventType, &eventTimeStr)
		if err != nil {
			return nil, err
		}

		eventTime, err := time.Parse(time.RFC3339, eventTimeStr)
		if err != nil {
			return nil, err
		}

		events = append(events, Event{
			ID:   eventID,
			Type: eventType,
			Time: eventTime,
		})
	}

	return events, nil
}
