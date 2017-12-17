# STREAMING DATABASES PROJECT WITH PIPELINEDB

As part of the Advanced Databases course in ULB-Bruxelles in the Block 1 of the Big Data Management and Analytics European programme this project was implemented with three main objectives.
* Detailed insights on Streaming Databases
* Use case implementation on PipelineDB
* Benchmarking with PostgreSQL

## Requirements

* [PipelineDB](https://www.pipelinedb.com/) - The Streaming Database SQL system.
* [Nodejs](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)

##Run pipeline server

	pipeline-ctl -D /local/dir/ -l /local/dir/pipeline.log start

## Connect to pipeline

	pipeline pipeline

## Install project

	git clone https://github.com/marcgarnica13/Pipeline-DB-project.git
    cd Pipeline-DB-project/

## Create Tables
	make
    
## Create Pictures_Tags Table (Wait to finish - 30 secs)

	./data-ingestion/picturesTagData.sh

## Insert hashtags in the database

	./data-ingestion/generateRandomHashtags.sh paramInterval

## Insert likes in the database

	./data-ingestion/generateRandomLikes.sh paramInterval
    
## Data visualization
	cd ./data-visualization
	npm start

Open Localhost:3000
