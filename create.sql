CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  type INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);