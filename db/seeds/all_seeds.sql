-- Users table seeds here (Example)
INSERT INTO users (first_name, last_name, email, password)
VALUES
('Jade', 'Tyana', 'jade@gmail.com', '123'),
('Sophie', 'Smith', 'sophiesmith@hotmail.com', '456'),
('Alex', 'Brown', 'alexbrown@hotmail.com', '789'),
('Lucy', 'Glaze', 'lucyg@gmail.com', 'password');

INSERT INTO products (title, seller_id, price, description, product_photo, sold)
VALUES
(
  'Chanel Classic Double Flap Bag', 1, 800000,'Condition: Very good. Creasing and scuffs on exterior and underneath flap, moderate wear on base corners, scuffs on interior flap and in interior. Wear and marks in interior, scratches on hardware.
', './public/images/item1.png', FALSE
),
(
  'Prada Black Nylon Flap Buckle Messenger Bag', 2, 92000, 'This practical leather shoulder bag is accented by the enameled metal triangle logo and external pocket with buckle.', './public/images/item2.png', TRUE
  ),
(
  'Dior Vintage Croissant Black Oblique Shoulder Bag ', 2, 183700,'This Dior bag is constructed of black canvas with monogram oblique print throughout. The bag features a croissant shape, black leather finishes, a top strap, silver tone hardware, top zip closure and black woven fabric lining with a slip and slip pockets.', './public/images/item3.png', FALSE
),
(
  'Gucci x Balenciaga The Hacker Project Hourglass Bag', 1, 1130600,'Balenciaga silhouettes with Gucci codes in unique creations. Presented as a part of the selection, the Hourglass bag is reimagined in Balenciaga print GG Supreme canvas. Featuring beige and ebony GG Supreme canvas, antique gold-toned hardware, magnetic closure and and the Balenciaga.', './public/images/item4.png', FALSE
  ),
(
  'Louis Vuitton Red Epi Leather Segur PM Handbag ', 2, 169600 ,'The Louis Vuitton Red Epi Leather Segur PM Bag features durable Epi leather with a gorgeous silvertone metal push-lock securing its flap closure. This PM size is the smaller size of the Segur family, which features double rolled handles and a rear slip pocket. A perfectly elegant bag for day or night.', './public/images/item5.png', FALSE
  ),
(
  'Fendi Brown & Black Leather Runaway Bag', 1, 204900,'Brown leather Fendi Runaway bag with black leather trim. This bag was first seen on the Fall Winter 2017 runway and has a very straightforward and modern look with the trapezoid shape. The short & removable black leather top handle strap features the Fendi reversed ‘F’ signature logo hardware in gold metal on the left and silver on the right. The calfskin leather is smooth and luxurious, yet durable. Single zippered slit pocket on front. Magnetic closure at centre top. Grey suede interior with one large compartment, one zippered slit pocket and two small open slit pockets. Excellent unused condition. Made in Italy.', './public/images/item6.png', TRUE
  ),
(
  'Louis Vuitton Indigo Coquelicot Epi Leather Dark Blue Twist Tote', 1, 120000,'This tote is crafted of textured epi leather in dark blue. The handbag features red glazing trim, contrasting yellow stitching, adjustable leather side straps, and polished silver hardware including a frontal LV turn lock. Dual top handles and an adjustable shoulder strap. The top opens to a partitioned blue microfiber interior with a center zipper and patch pockets.', './public/images/item7.png', FALSE
  ),
(
  'Chanel Classic Double Flap Bag', 2, 1130600,'This classic model nicknamed the Diana is constructed of supple diamond-quilted lambskin leather in pink. The shoulder bag features a waist-length polished gold chain-link and leather shoulder strap, Chanel CC turn lock closure on front flap and a burgundy leather interior with zipper and patch pockets.', './public/images/item8.png' , FALSE
  );


INSERT INTO chats (user_one, user_two)
VALUES
(1, 2);

INSERT INTO messages (sender_id, chat_id, message_content)
VALUES
(1, 1, 'Hello! I really want to buy that purse!'),
(2, 1, 'Hi! That is great because I have been wanting to sell it!'),
(1, 1, 'Can we negotiable a better price?'),
(2, 1, 'Sorry, I am firm with that price. Its ONE OF A KIND!');
