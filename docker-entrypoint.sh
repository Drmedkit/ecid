#!/bin/sh
set -e

# Initialize database from template if it doesn't exist
if [ ! -f /app/data/ecid.db ]; then
    echo "Initializing database from template..."
    cp /app/ecid.db.template /app/data/ecid.db
fi

# Execute the main command
exec "$@"
