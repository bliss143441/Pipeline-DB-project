Create Table pictures_tags (PID integer not null, name varchar(15) not null, PRIMARY KEY(PID,name));

COPY pictures_tags FROM '/home/marc/Development/advancedDB/Pipeline-DB-project/streaming-postgresql/tags' (DELIMITER ',');

CREATE STREAM likes_stream ( pid integer, likes integer);
CREATE TABLE likes_table ( pid integer, likes integer);

CREATE CONTINUOUS TRANSFORM likes_ct AS
  SELECT t.name, l.likes FROM likes_stream l JOIN pictures_tags t ON l.pid = t.pid;

CREATE CONTINUOUS VIEW likes_ctView AS
  SELECT name, sum(likes) as sumLikes FROM output_of('likes_ct') GROUP BY name;

 CREATE MATERIALIZED VIEW likes_mtView AS SELECT name, sum(likes) as sumLikes FROM likes_table l JOIN pictures_tags t ON l.pid = t.pid GROUP BY name;
