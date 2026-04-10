#!/usr/bin/env sh
# Run user scripts, if they exist
for f in /var/www/html/.fly/scripts/*.sh; do
    # Bail out this loop if any script exits with non-zero status code
    bash "$f" -e
done

# Fix SQLite permissions
touch /data/database.sqlite
chown www-data:www-data /data/database.sqlite
chmod 664 /data/database.sqlite
chown www-data:www-data /data
chmod 755 /data

if [ $# -gt 0 ]; then
    # If we passed a command, run it as root
    exec "$@"
else
    exec supervisord -c /etc/supervisor/supervisord.conf
fi