#!/bin/bash


if [ $# -ne 1 ]
then
echo "Please specify the time required between two likes appearances!" 1>&2
echo "example: ./generateRandomLikes 2" 1>&2
echo "This will generate a like every 2 seconds" 1>&2
exit 0
fi

# Constants
X=0
ALL_NON_RANDOM_WORDS=/home/marc/Development/advancedDB/socialMonitoring/hashtags

# total number of non-random words available
non_random_words=`cat $ALL_NON_RANDOM_WORDS | wc -l`

# while loop to generate random words
# number of random generated words depends on supplied argument
i=1
while [ "$i" -ne 0 ]
do
random_number=`od -N3 -An -i /dev/urandom |
awk -v f=0 -v r=2 '{printf "%i\n", f + r * $1 / 16777216}'`
echo $random_number
sleep $1
done
