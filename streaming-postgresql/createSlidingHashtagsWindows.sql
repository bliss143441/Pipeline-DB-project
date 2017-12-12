CREATE CONTINUOUS VIEW timing_hashtags WITH (sw = '2 minutes') AS SELECT h, minute(arrival_timestamp) as minuteOfArrival, COUNT(*) as quantity FROM hashtag_stream GROUP BY h, minuteOfArrival;
