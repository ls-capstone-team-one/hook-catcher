CREATE TABLE IF NOT EXISTS bins (
  id text PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '48 hours')
);

CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  bin_id      TEXT NOT NULL REFERENCES bins(id) ON DELETE CASCADE,
  mongo_id    TEXT NOT NULL,
  method      TEXT NOT NULL,
  path        TEXT NOT NULL DEFAULT '/',
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_requests_bin_id ON requests(bin_id);



