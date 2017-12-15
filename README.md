# Streaming databases project with PipelineDB

Use case implementation of streaming databases paradigm extending postgreSQL

##PipelineDB configuration
###PipelineDB Installation

###Run pipeline server
```bash
pipeline-ctl -D <local-data-directory> -l <local-data-directory>/pipeline.log start
```bash

####Connect to pipeline
```bash
pipeline pipeline
```bash

##Data ingestion

###Insert hashtags in the database

```bash
./data-ingestion/generateRandomHashtags.sh
```bash

####Create Tables

make




