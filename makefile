Client=psql
flags=-p 5432 -h localhost -d pipeline

all: create_all drop_all

create_all: create_hashtags_view
drop_all: drop_hashtags_view

hashtags_view: drop_hashtags_view create_hashtags_view

create_hashtags_view:
	$(Client) $(flags) -f ./streaming-postgresql/createAggregateHashtags.sql

drop_hashtags_view:
	$(Client) $(flags) -f ./streaming-postgresql/dropAggregateHashtags.sql

