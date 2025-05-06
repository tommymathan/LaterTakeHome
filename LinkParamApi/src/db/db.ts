import Database from 'better-sqlite3';

// Initialize SQLite database (file: links.db)
const db = new Database('links.db');

// Create links table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    parameters TEXT NOT NULL,
    updated_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export { db };