#!/bin/bash

# WINDOWS:
# 1. Install WSL: https://learn.microsoft.com/en-us/windows/wsl/install.
# 2. Install Docker Desktop or Podman Desktop.
# On Linux and macOS you just need to run ./init-db.sh within /server. 

set -e

# Import environment variables from .env file. 
set -a
source .env

CONTAINER_NAME="beacon-postgres"
SQL_FILE="./src/db/create_tables.sql"

if [ -z "$DB_NAME" ]; then
  echo "Error: DB_NAME environment variable is not set."
  exit 1
fi

if [ -z "$DB_USER" ]; then
  echo "Error: DB_USER environment variable is not set."
  exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
  echo "Error: DB_PASSWORD environment variable is not set."
  exit 1
fi

if [ -z "$DB_PORT" ] || ! [[ "$DB_PORT" =~ ^[0-9]+$ ]]; then
  echo "Error: DB_PORT environment variable is not set or is not a valid number."
  exit 1
fi

if [ ! -f "$SQL_FILE" ]; then
  echo "Error: SQL file create_tables.sql not found."
  exit 1
fi

# Pull Postgres v17.5 image and run it in a container.
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  docker run -d \
    --name "$CONTAINER_NAME" \
    -e POSTGRES_DB="$DB_NAME" \
    -e POSTGRES_USER="$DB_USER" \
    -e POSTGRES_PASSWORD="$DB_PASSWORD" \
    -p "$DB_PORT":5432 \
    postgres:17.5
else 
  echo "Postgres container is already running."
fi  

# Ensure Postgres is up and running and accepting queries before continuing. 
echo -n "Waiting for Postgres to be ready"
until docker exec "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; do
  echo -n "."
  sleep 1
done
    
echo "Copying SQL file to container..."
docker cp "$SQL_FILE" "$CONTAINER_NAME":/create_tables.sql

echo "Running SQL file to create tables..."
docker exec "$CONTAINER_NAME" psql -U "$DB_USER" -d $DB_NAME -f /create_tables.sql

echo "Postgres database setup has completed successfully!"