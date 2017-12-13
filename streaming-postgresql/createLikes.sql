Create Table pictures_tags (PID integer not null, name varchar(15) not null, PRIMARY KEY(PID,name));

insert into pictures_tags Values
	(1,'Batu'),
	(1,'Simay'),
	(2,'Bruno'),
	(2,'Duy'),
	(2,'Yue'),
	(2,'Marc'),
	(3,'Simay'),
	(3,'Judit'),
	(4,'Simay'),
	(4,'Judit'),
	(4,'Marc'),
	(4,'Batu'),
	(5,'Batu'),
	(5,'Marc'),
	(5,'Judit'),
	(5,'Simay'),
	(5,'Yue'),
	(5,'Bruno'),
	(5,'Duy'),
	(6,'Ali'),
	(6,'Ayse'),
	(7,'Max'),
	(8,'Daisy'),
	(9,'Max'),
	(10,'Marc'),
	(11,'Duy'),
	(12,'Bruno'),
	(12,'Yue');
	
CREATE STREAM likes_stream ( pid integer, likes integer);
CREATE TABLE likes_table ( pid integer, likes integer);

CREATE CONTINUOUS TRANSFORM likes_ct AS
  SELECT t.name, l.likes FROM likes_stream l JOIN pictures_tags t ON l.pid = t.pid;

CREATE CONTINUOUS VIEW likes_ctView AS
  SELECT name, sum(likes) as sumLikes FROM output_of('likes_ct') GROUP BY name;
  
 CREATE MATERIALIZED VIEW likes_mtView AS SELECT name, sum(likes) as sumLikes FROM likes_table l JOIN pictures_tags t ON l.pid = t.pid 	GROUP BY name ORDER BY sumLikes desc;
