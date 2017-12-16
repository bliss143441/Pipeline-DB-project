# Streaming databases project with PipelineDB

Use case implementation of streaming databases paradigm extending postgreSQL

#PRE-REQUISITES
PipelineDB
Nodejs
npm

#Run pipeline server
pipeline-ctl -D <local-data-directory> -l <local-data-directory>/pipeline.log start

#Connect to pipeline
pipeline pipeline

##For Demonstrating Hashtags Use Case
#Create Tables
make
#Insert hashtags in the database
./data-ingestion/generateRandomHashtags.sh
cd ./data-visualization
npm start
Open Localhost:3000

##For Demonstrating Likes Use Case
cd/data-ingestion
##Create Pictures_Tags Table (Wait to finish - 30 secs)
./data-ingestion/picturesTagData.sh
##Generate likes and add them into likes_stream and likes_table (Stop when desired)
./data-ingestion/generateRandomLikes.sh


