package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/ampext/lizaisbusy/monitor"
	"github.com/ampext/lizaisbusy/timeline"

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

	mux.Handle("/", http.FileServer(http.Dir("static")))
	mux.Handle("/events", withDatabase(db, handleEvents))

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":8080", handler)
}

func withDatabase(db *sql.DB, handler func(http.ResponseWriter, *http.Request, *sql.DB)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handler(w, r, db)
	})
}

func handleEvents(w http.ResponseWriter, r *http.Request, db *sql.DB) {
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
}
