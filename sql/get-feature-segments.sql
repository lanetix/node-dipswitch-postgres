SELECT value 
FROM dipswitch_feature_segments
WHERE key in ANY($keys::text[])
