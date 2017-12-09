CREATE CONTINUOUS VIEW recent_hashtags WITH (sw = '5 minute') AS SELECT h,arrival_timestamp FROM hashtag_stream;
