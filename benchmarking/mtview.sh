#!/bin/bash


i=1

while [ "$i" -ne 0 ]
do
rows=$(psql -h localhost -p 5432 -d pipeline -c "SELECT COUNT(*) FROM likes_table;" | grep -v 'row\|count\|--')
RESULT=$(psql -h localhost -p 5432 -d pipeline -c "EXPLAIN ANALYSE REFRESH MATERIALIZED VIEW likes_mtview" | grep Execution)
time=$(echo -n $RESULT | tail -c 8)
echo "$rows,$time"
sleep 5
done
