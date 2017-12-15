Client=psql
flags=-p 5432 -h localhost -d pipeline -f

all:  create_hashtag_stream create_hashtags_view create_timings_hashtags_view create_likes
drop: drop_hashtags_view drop_timings_hashtags_view drop_likes drop_hashtag_stream

create_hashtag_stream:
	$(Client) $(flags) ./streaming-postgresql/createHashtags.sql
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
drop_hashtag_stream:
	$(Client) $(flags) ./streaming-postgresql/dropHashtags.sql
