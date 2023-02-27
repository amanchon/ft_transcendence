#!/bin/bash
systemctl restart postgresql
#####################

echo "CREATE USER pong WITH ENCRYPTED PASSWORD 'pong' NOCREATEDB;" | sudo -u postgres psql
echo "CREATE DATABASE "DB_PONG" WITH OWNER='pong';" | sudo -u postgres psql
cat /database.sql | sudo -u postgres psql
