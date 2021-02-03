SELECT r.*, p.*, AVG(pr.rating) AS average_rating
FROM reservations r
  JOIN properties p ON p.id = r.property_id
  JOIN property_reviews pr ON pr.property_id = p.id
WHERE 
  r.guest_id = 1
  AND r.end_date < now()::date
GROUP BY p.id, r.id
ORDER BY r.start_date
LIMIT 10;