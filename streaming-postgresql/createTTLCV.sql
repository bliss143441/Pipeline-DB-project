CREATE CONTINUOUS VIEW v_ttl WITH (ttl = '2 minute', ttl_column = 'minute') AS
  SELECT minute(arrival_timestamp), COUNT(*) FROM likes_stream GROUP BY minute;
