INSERT INTO dipswitch_feature_segments
(key, value)
SELECT $key, $value
WHERE NOT EXISTS (
  SELECT * FROM dipswitch_feature_segments WHERE key = $key
)
