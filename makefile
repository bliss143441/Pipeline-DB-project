Client=psql
flags=-p 5432 -h localhost -d pipeline -f

all: drop_all create_all

create_all: create_hashtags_view create_timings_hashtags_view create_likes
drop_all: drop_hashtags_view drop_timings_hashtags_view drop_likes

hashtags_view: drop_hashtags_view create_hashtags_view

create_hashtags_view:
	$(Client) $(flags) ./streaming-postgresql/createAggregateHashtags.sql

drop_hashtags_view:
	$(Client) $(flags) ./streaming-postgresql/dropAggregateHashtags.sql

timing_hashtags_view: drop_timings_hashtags_view create_timings_hashtags_view

create_timings_hashtags_view:
	$(Client) $(flags) ./streaming-postgresql/createTimingsHashtagsViews.sql

drop_timings_hashtags_view:
	$(Client) $(flags) ./streaming-postgresql/dropTimingsHashtagsView.sql

likes_views: drop_likes create_likes

create_likes:
	$(Client) $(flags) ./streaming-postgresql/createLikes.sql

drop_likes:
	$(Client) $(flags) ./streaming-postgresql/dropLikes.sql

