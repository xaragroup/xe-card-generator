#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "cards" --dbname "cards" <<-EOSQL
	CREATE TABLE users(
        email VARCHAR (355) UNIQUE NOT NULL,
    );
EOSQL
print('run')