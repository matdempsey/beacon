CREATE TABLE IF NOT EXISTS boards (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL UNIQUE,
    description text,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lists (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    board_id integer REFERENCES boards (id) ON DELETE CASCADE,
    UNIQUE (name, board_id)
);

CREATE TABLE IF NOT EXISTS tasks (
    id serial PRIMARY KEY,
    summary varchar(255) NOT NULL,      
    description text, 
    priority_level integer CHECK (priority_level IN (1, 2, 3, 4)),
    position integer,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    list_id integer REFERENCES lists (id) ON DELETE CASCADE
)