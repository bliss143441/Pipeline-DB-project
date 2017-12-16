#!/bin/bash


# Constants
X=0
ALL_NON_RANDOM_NAMES=./names

non_random_names=`cat $ALL_NON_RANDOM_NAMES | wc -l`

i=1
while [ "$i" -le 5000 ]
do
random_number_of_names=`od -N3 -An -i /dev/urandom |
awk -v f=1 -v r=5 '{printf "%i\n", f + r * $1 / 16777216}'`
k=1
declare -a previous=( $(for i in {1..20}; do echo 0; done));

while [ "$k" -le "$random_number_of_names" ]
do
random_name=`od -N3 -An -i /dev/urandom |
awk -v f=1 -v r="$non_random_names" '{printf "%i\n", f + r * $1 / 16777216}'`

while [ ${previous[$random_name]} -eq 1 ]
do
random_name=`od -N3 -An -i /dev/urandom |
awk -v f=1 -v r="$non_random_names" '{printf "%i\n", f + r * $1 / 16777216}'`
done

let "previous["$random_name"] = 1";


NEW_NAME=$(sed `echo $random_name`"q;d" $ALL_NON_RANDOM_NAMES)
echo $i, $NEW_NAME

let "k = k + 1"
done
let "i = i + 1"
done
