create continuous view hashtags_view as select h, count(*) as total from hashtag_stream group by h
create continuous view likes_view as select l, count(*) as total from likes_stream group by l
