#!/bin/bash


if [ $# -ne 1 ]
then
echo "Please specify the time required between two hashtag appearances!" 1>&2
echo "example: ./generateRandomHashTags 2" 1>&2
echo "This will generate a hashtage every 2 seconds" 1>&2
exit 0
fi

# Constants
X=0
ALL_NON_RANDOM_WORDS=/home/batu/Documents/Pipeline-DB-project/data-ingestion/hashtags

non_random_words=`cat $ALL_NON_RANDOM_WORDS | wc -l`

i=1
while [ "$i" -ne 0 ]
do
random_number=`od -N3 -An -i /dev/urandom |
awk -v f=1 -v r="$non_random_words" '{printf "%i\n", f + r * $1 / 16777216}'`
NEW_WORD=$(sed `echo $random_number`"q;d" $ALL_NON_RANDOM_WORDS)
echo $NEW_WORD
RESULT=$(psql -h localhost -p 5432 -d pipeline -c "INSERT INTO hashtag_stream (h) VALUES ('$NEW_WORD');")
sleep $1
done
