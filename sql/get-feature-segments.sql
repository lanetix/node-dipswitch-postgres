SELECT value 
FROM dipswitch_feature_segments
WHERE key = ANY($keys::text[])
