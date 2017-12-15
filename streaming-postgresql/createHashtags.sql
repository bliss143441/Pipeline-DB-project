CREATE STREAM hashtag_stream (h integer);
create CONTINUOUS VIEW hashtags_view as select h, count(*) as total from hashtag_stream group by h;
