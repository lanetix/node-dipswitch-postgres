INSERT INTO dipswitch_features
(name)
SELECT $name
WHERE NOT EXISTS (
  SELECT * FROM dipswitch_features WHERE name = $name
)
