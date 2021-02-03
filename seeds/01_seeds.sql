INSERT INTO users (name, email, password)
VALUES 
('chef jeff', 'manama@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('pink guy', 'eyb0ss@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('horse horseman', 'nay@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('cat catman', 'meow@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('dog dogman', 'woof@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1, 'maNama Jeff', 'desc', 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg', 5, 20, 300, 1, 'Canada', 'Canada street', 'Toronto', 'Ontario', 111111, true),
(1, 'maNama chef', 'desc', 'https://images.pexels.com/photos/671956/pexels-photo-671956.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/671956/pexels-photo-671956.jpeg', 5333, 1, 23, 399, 'Canada', 'not Canada street', 'Quebec City', 'Quebec', 222222, true),
(1, 'maNama cheffff', 'desc', 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg', 50, 20, 300, 1, 'Canada', 'vancouver street', 'Victoria', 'Vancouver', 333333, true),
(3, 'gallop gallop', 'desc', 'https://images.pexels.com/photos/2042161/pexels-photo-2042161.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2042161/pexels-photo-2042161.jpeg', 5, 5, 5, 5, 'Canada', 'bay street', 'Toronto', 'Ontario', 444444, true),
(4, 'mrrrrrrrrrrrrrrreow', 'desc', 'https://images.pexels.com/photos/4790616/pexels-photo-4790616.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/4790616/pexels-photo-4790616.jpeg', 1, 1, 1, 1, 'Canada', 'yonge street', 'Toronto', 'Ontario', 555555, true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
('2018-09-11', '2018-09-26', 4, 1),
('2011-12-17', '2018-03-13', 1, 1),
('2018-02-09', '2018-04-01', 2, 3),
('2001-07-01', '2018-01-21', 5, 4),
('1995-10-22', '2018-11-18', 1, 5);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
(1,4,1, 5, 'message'),
(1,1,2, 5, 'message'),
(3,2,3, 5, 'message'),
(4,5,4, 5, 'message'),
(5,1,5, 5, 'message');