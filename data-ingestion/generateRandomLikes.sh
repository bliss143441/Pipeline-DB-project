#!/bin/bash


if [ $# -ne 1 ]
then
echo "Please specify the time required between two likes appearances!" 1>&2
echo "example: ./generateRandomLikes 2" 1>&2
echo "This will generate a like every 2 seconds" 1>&2
exit 0
fi

# Constants

# total number of non-random words available
non_random_words=100

# while loop to generate random words
# number of random generated words depends on supplied argument
i=1
while [ "$i" -ne 0 ]
do
random_photo=`od -N3 -An -i /dev/urandom |
awk -v f=1 -v r=12 '{printf "%i\n", f + r * $1 / 16777216}'`
random_likes=`od -N3 -An -i /dev/urandom |
awk -v f=1 -v r=2 '{printf "%i\n", f + r * $1 / 16777216}'`
echo $random_photo, $random_likes
RESULT=$(psql -h localhost -p 5432 -d pipeline -c "INSERT INTO likes_stream VALUES ($random_photo,$random_likes);INSERT INTO likes_table VALUES ($random_photo,$random_likes);")
sleep $1
done
