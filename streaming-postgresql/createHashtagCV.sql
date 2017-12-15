create continuous view hashtags_view as select h, count(*) as total from hashtag_stream group by h;
