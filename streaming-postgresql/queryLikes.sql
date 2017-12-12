EXPLAIN ANALYZE SELECT name, sum(likes) as sumLikes FROM likes_table l JOIN pictures_tags t ON l.pid = t.pid GROUP BY name ORDER BY sumLikes desc;
