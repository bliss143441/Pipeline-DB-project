CREATE CONTINUOUS VIEW recent_hashtags WITH (sw = '5 minutes') AS SELECT h, COUNT(*) FROM hashtag_stream;

CREATE CONTINUOUS VIEW timing_hashtags WITH (sw = '5 minutes') AS SELECT h, arrival_timestamp FROM hashtag_stream;
