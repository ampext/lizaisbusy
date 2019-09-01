package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"lizaisbusy/monitor"
	"lizaisbusy/timeline"
	"log"
	"net/http"
	"strconv"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/cors"
)

func main() {
	dbPathPtr := flag.String("db", "./events.db", "a path to sqlite database file")
	flag.Parse()

	connStr := fmt.Sprintf("file:%s?&mode=ro", *dbPathPtr)

	db, err := sql.Open("sqlite3", connStr)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	mux := http.NewServeMux()

	mux.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
		queryParams := r.URL.Query()

		lastDays, err := strconv.Atoi(queryParams.Get("last_days"))
		if err != nil || lastDays <= 0 {
			http.Error(w, "bad \"lastDays\" query parameter", http.StatusBadRequest)
			return
		}

		events, err := monitor.GetEvents(db, lastDays)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		timelineEvents := timeline.ConvertToTimelineEvents(events)

		result, err := json.Marshal(timelineEvents)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(result)
	})

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":8080", handler)
}
