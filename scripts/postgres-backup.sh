#!/bin/bash

# Define options
user="cards"
db="cards"
bkp="/mnt/backup/customers-$(date +%F).dump"

# Exit if file already exists
if [ -f $bkp];then
	echo "Backup file $bkp already exists!"
	exit 1
else
	:
fi

# Backup Database
pg_dump -U $user $db > $bkp
