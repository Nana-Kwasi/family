-- Seed of the storefront catalogue as it stood when the Market module was introduced.
-- Generated from src/data/products.js; from here on the admin console is the source of truth.
-- legacy_id preserves the old numeric product ids so existing /product/:id links keep working.

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (201, 'akosua-sunday-born-shirt-gye-nyame-back', 'Akosua Sunday Born Shirt — Gye Nyame Back', 'Sunday', NULL, 'tshirt', 'T-Shirt',
    'Born on Sunday · Akan Heritage', 'Royal blue · Gye Nyame back', 'Premium heritage T-shirt for Akosua, the Sunday-born. Royal blue colourway with the AKOSUA day-born print on the front and the Gye Nyame Adinkra symbol on the back.', 2000, '/images/sunday-borns/akosua/akosua-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H58WLSV2?th=1&psc=1', NULL, FALSE, 201);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), '/images/sunday-borns/akosua/akosua-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), '/images/sunday-borns/akosua/akosua-shirt-gyenyame-3.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), '/images/sunday-borns/akosua/akosua-shirt-gyenyame-4.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), '/images/sunday-borns/akosua/akosua-shirt-gyenyame-2.jpg', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 201), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (210, 'kojo-monday-born-shirt-sankofa-back', 'Kojo Monday Born Shirt — Sankofa Back', 'Monday', NULL, 'tshirt', 'T-Shirt',
    'Born on Monday · Akan Heritage', 'Navy · Sankofa back', 'Premium heritage T-shirt for Kojo (Kwadwo), the Monday-born. Navy colourway with the KOJO day-born print on the front and the Sankofa Adinkra symbol on the back.', 2000, '/images/monday-borns/kwadwo/kojo-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H2WZXCNJ?th=1&psc=1', NULL, FALSE, 210);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), '/images/monday-borns/kwadwo/kojo-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), '/images/monday-borns/kwadwo/kojo-shirt-sankofa-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), '/images/monday-borns/kwadwo/kojo-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 210), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (211, 'kojo-monday-born-shirt-gye-nyame-back', 'Kojo Monday Born Shirt — Gye Nyame Back', 'Monday', NULL, 'tshirt', 'T-Shirt',
    'Born on Monday · Akan Heritage', 'Navy · Gye Nyame back', 'Premium heritage T-shirt for Kojo (Kwadwo), the Monday-born. Navy colourway with the KOJO day-born print on the front and the Gye Nyame Adinkra symbol on the back.', 2000, '/images/monday-borns/kwadwo/kojo-shirt-gyenyame-1.jpeg', 'https://www.amazon.com/dp/B0H3HQ78MQ?th=1&psc=1', NULL, FALSE, 211);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), '/images/monday-borns/kwadwo/kojo-shirt-gyenyame-1.jpeg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), '/images/monday-borns/kwadwo/kojo-shirt-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), '/images/monday-borns/kwadwo/kojo-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 211), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (212, 'adwoa-monday-born-female-shirt', 'Adwoa Monday Born Female Shirt', 'Monday', NULL, 'tshirt', 'T-Shirt',
    'Born on Monday · Akan Heritage', 'Women''s cut · Sankofa & Gye Nyame', 'Premium heritage T-shirt for Adwoa (Adjoa), the Monday-born. Fitted women’s cut with the ADWOA day-born print and your choice of Sankofa or Gye Nyame Adinkra symbol on the back.', 2000, '/images/monday-borns/adwoa/adwoa-shirt-1.png', 'https://www.amazon.com/dp/B0H3HRDYFV?th=1&psc=1', NULL, FALSE, 212);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '/images/monday-borns/adwoa/adwoa-shirt-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '/images/monday-borns/adwoa/adwoa-shirt-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '/images/monday-borns/adwoa/adwoa-shirt-3.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '/images/monday-borns/adwoa/adwoa-shirt-4.png', 3);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '/images/monday-borns/adwoa/adwoa-shirt-5.jpg', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 212), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (213, 'kojo-monday-born-baby-onesie', 'Kojo Monday Born Baby Onesie', 'Monday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Monday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kojo (Kwadwo), the Monday-born baby. Soft, premium cotton with the KOJO day-born print.', 2500, '/images/monday-borns/kwadwo/kojo-baby-1.png', 'https://www.amazon.com/dp/B0H5DCV76Z?th=1&psc=1', NULL, FALSE, 213);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '/images/monday-borns/kwadwo/kojo-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '/images/monday-borns/kwadwo/kojo-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 213), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (214, 'adjoa-monday-born-baby-onesie', 'Adjoa Monday Born Baby Onesie', 'Monday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Monday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Adjoa (Adwoa), the Monday-born baby. Soft, premium cotton with the ADJOA day-born print.', 2500, '/images/monday-borns/adwoa/adjoa-baby-1.png', 'https://www.amazon.com/dp/B0H5B2JGBB', NULL, FALSE, 214);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '/images/monday-borns/adwoa/adjoa-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '/images/monday-borns/adwoa/adjoa-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 214), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (215, 'adwoa-monday-born-mug-sankofa', 'Adwoa Monday Born Mug — Sankofa', 'Monday', NULL, 'mug', 'Mug',
    'Born on Monday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Adwoa, the Monday-born. Features the ADWOA name with the Sankofa Adinkra symbol — a meaningful daily-use gift.', 2200, '/images/monday-borns/adwoa/adwoa-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BN6MN7?th=1', NULL, FALSE, 215);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), '/images/monday-borns/adwoa/adwoa-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), '/images/monday-borns/adwoa/adwoa-mug-sankofa-3.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), '/images/monday-borns/adwoa/adwoa-mug-sankofa-2.jpg', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), '/images/monday-borns/adwoa/adwoa-mug-sankofa-1.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 215), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (216, 'adwoa-monday-born-mug-gye-nyame', 'Adwoa Monday Born Mug — Gye Nyame', 'Monday', NULL, 'mug', 'Mug',
    'Born on Monday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Adwoa, the Monday-born. Features the ADWOA name with the Gye Nyame Adinkra symbol — a meaningful daily-use gift.', 2200, '/images/monday-borns/adwoa/adwoa-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BN942Z?th=1', NULL, FALSE, 216);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), '/images/monday-borns/adwoa/adwoa-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), '/images/monday-borns/adwoa/adwoa-mug-gyenyame-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), '/images/monday-borns/adwoa/adwoa-mug-gyenyame-1.jpeg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 216), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (217, 'kwadwo-monday-born-mug-gye-nyame', 'Kwadwo Monday Born Mug — Gye Nyame', 'Monday', NULL, 'mug', 'Mug',
    'Born on Monday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Kwadwo, the Monday-born. Features the KWADWO name with the Gye Nyame Adinkra symbol — a meaningful daily-use gift.', 2200, '/images/monday-borns/kwadwo/kwadwo-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BWBBT7', NULL, FALSE, 217);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), '/images/monday-borns/kwadwo/kwadwo-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), '/images/monday-borns/kwadwo/kwadwo-mug-gyenyame-1.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), '/images/monday-borns/kwadwo/kwadwo-mug-gyenyame-2.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), '/images/monday-borns/kwadwo/kwadwo-mug-gyenyame-3.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 217), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (218, 'kwadwo-monday-born-shirt-sankofa-back', 'Kwadwo Monday Born Shirt — Sankofa Back', 'Monday', NULL, 'tshirt', 'T-Shirt',
    'Born on Monday · Akan Heritage', 'Red · Sankofa back', 'Premium heritage T-shirt for Kwadwo, the Monday-born. Red colourway with the KWADWO day-born print on the front and the Sankofa Adinkra symbol on the back.', 2000, '/images/monday-borns/kwadwo/kwadwo-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H2WZXCNJ?th=1&psc=1', NULL, FALSE, 218);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), '/images/monday-borns/kwadwo/kwadwo-shirt-sankofa-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 218), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (219, 'kwadwo-monday-born-shirt-gye-nyame-back', 'Kwadwo Monday Born Shirt — Gye Nyame Back', 'Monday', NULL, 'tshirt', 'T-Shirt',
    'Born on Monday · Akan Heritage', 'Red · Gye Nyame back', 'Premium heritage T-shirt for Kwadwo, the Monday-born. Red colourway with the KWADWO day-born print on the front and the Gye Nyame Adinkra symbol on the back.', 2000, '/images/monday-borns/kwadwo/kwadwo-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H3HQ78MQ?th=1&psc=1', NULL, FALSE, 219);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), '/images/monday-borns/kwadwo/kwadwo-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 219), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (290, 'kwadwo-monday-born-baby-onesie', 'Kwadwo Monday Born Baby Onesie', 'Monday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Monday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kwadwo, the Monday-born baby. Soft, premium cotton with the KWADWO day-born print.', 2500, '/images/monday-borns/kwadwo/kwadwo-baby-1.png', 'https://www.amazon.com/dp/B0H5DCV76Z?th=1&psc=1', NULL, FALSE, 290);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), '/images/monday-borns/kwadwo/kwadwo-baby-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 290), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (220, 'abena-tuesday-born-mug-gye-nyame', 'Abena Tuesday Born Mug — Gye Nyame', 'Tuesday', NULL, 'mug', 'Mug',
    'Born on Tuesday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Abena, the Tuesday-born. Features the ABENA name with the Gye Nyame Adinkra symbol.', 2200, '/images/tuesday-borns/abena/abena-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BZRNLK?th=1', NULL, FALSE, 220);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), '/images/tuesday-borns/abena/abena-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), '/images/tuesday-borns/abena/abena-mug-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), '/images/tuesday-borns/abena/abena-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), '/images/tuesday-borns/abena/abena-mug-gyenyame-3.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 220), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (221, 'abena-tuesday-born-mug-sankofa', 'Abena Tuesday Born Mug — Sankofa', 'Tuesday', NULL, 'mug', 'Mug',
    'Born on Tuesday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Abena, the Tuesday-born. Features the ABENA name with the Sankofa Adinkra symbol.', 2200, '/images/tuesday-borns/abena/abena-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BTRF98', NULL, FALSE, 221);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), '/images/tuesday-borns/abena/abena-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), '/images/tuesday-borns/abena/abena-mug-sankofa-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), '/images/tuesday-borns/abena/abena-mug-sankofa-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), '/images/tuesday-borns/abena/abena-mug-sankofa-3.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 221), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (222, 'kwabena-tuesday-born-mug-sankofa', 'Kwabena Tuesday Born Mug — Sankofa', 'Tuesday', NULL, 'mug', 'Mug',
    'Born on Tuesday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Kwabena, the Tuesday-born. Features the KWABENA name with the Sankofa Adinkra symbol.', 2200, '/images/tuesday-borns/kwabena/kwabena-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BR541V', NULL, FALSE, 222);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '/images/tuesday-borns/kwabena/kwabena-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '/images/tuesday-borns/kwabena/kwabena-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '/images/tuesday-borns/kwabena/kwabena-mug-sankofa-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '/images/tuesday-borns/kwabena/kwabena-mug-sankofa-2.png', 3);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '/images/tuesday-borns/kwabena/kwabena-mug-sankofa-4.jpg', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 222), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (223, 'kwabena-tuesday-born-mug-gye-nyame', 'Kwabena Tuesday Born Mug — Gye Nyame', 'Tuesday', NULL, 'mug', 'Mug',
    'Born on Tuesday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Kwabena, the Tuesday-born. Features the KWABENA name with the Gye Nyame Adinkra symbol.', 2200, '/images/tuesday-borns/kwabena/kwabena-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BMG5X4', NULL, FALSE, 223);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), '/images/tuesday-borns/kwabena/kwabena-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), '/images/tuesday-borns/kwabena/kwabena-mug-gyenyame-3.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), '/images/tuesday-borns/kwabena/kwabena-mug-gyenyame-1.jpg', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), '/images/tuesday-borns/kwabena/kwabena-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 223), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (224, 'kwabena-tuesday-born-baby-onesie', 'Kwabena Tuesday Born Baby Onesie', 'Tuesday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Tuesday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kwabena, the Tuesday-born baby. Soft, premium cotton with the KWABENA day-born print.', 2500, '/images/tuesday-borns/kwabena/kwabena-baby-1.png', 'https://www.amazon.com/dp/B0H5FN245C?th=1&psc=1', NULL, FALSE, 224);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '/images/tuesday-borns/kwabena/kwabena-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '/images/tuesday-borns/kwabena/kwabena-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 224), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (225, 'abena-tuesday-born-baby-onesie', 'Abena Tuesday Born Baby Onesie', 'Tuesday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Tuesday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Abena, the Tuesday-born baby. Soft, premium cotton with the ABENA day-born print.', 2500, '/images/tuesday-borns/abena/abena-baby-1.png', 'https://www.amazon.com/dp/B0H5D5SZK4?th=1&psc=1', NULL, FALSE, 225);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '/images/tuesday-borns/abena/abena-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '/images/tuesday-borns/abena/abena-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 225), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (226, 'kwabena-tuesday-born-shirt-gye-nyame-back', 'Kwabena Tuesday Born Shirt — Gye Nyame Back', 'Tuesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Tuesday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Kwabena, the Tuesday-born. KWABENA day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/tuesday-borns/kwabena/kwabena-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H58N3JF6?th=1&psc=1', NULL, FALSE, 226);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), '/images/tuesday-borns/kwabena/kwabena-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), '/images/tuesday-borns/kwabena/kwabena-shirt-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), '/images/tuesday-borns/kwabena/kwabena-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 226), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (227, 'kwabena-tuesday-born-shirt-sankofa-back', 'Kwabena Tuesday Born Shirt — Sankofa Back', 'Tuesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Tuesday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Kwabena, the Tuesday-born. KWABENA day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/tuesday-borns/kwabena/kwabena-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H3J8K7NX?th=1&psc=1', NULL, FALSE, 227);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), '/images/tuesday-borns/kwabena/kwabena-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), '/images/tuesday-borns/kwabena/kwabena-shirt-sankofa-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), '/images/tuesday-borns/kwabena/kwabena-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 227), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (228, 'abena-tuesday-born-shirt-sankofa-back', 'Abena Tuesday Born Shirt — Sankofa Back', 'Tuesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Tuesday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Abena, the Tuesday-born. ABENA day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/tuesday-borns/abena/abena-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H3MPXCSF?th=1&psc=1', NULL, FALSE, 228);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), '/images/tuesday-borns/abena/abena-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), '/images/tuesday-borns/abena/abena-shirt-sankofa-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), '/images/tuesday-borns/abena/abena-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 228), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (229, 'abena-tuesday-born-shirt-gye-nyame-back', 'Abena Tuesday Born Shirt — Gye Nyame Back', 'Tuesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Tuesday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Abena, the Tuesday-born. ABENA day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/tuesday-borns/abena/abena-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H3MVVT3V?th=1&psc=1', NULL, FALSE, 229);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), '/images/tuesday-borns/abena/abena-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), '/images/tuesday-borns/abena/abena-shirt-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), '/images/tuesday-borns/abena/abena-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 229), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (230, 'akua-wednesday-born-mug-gye-nyame', 'Akua Wednesday Born Mug — Gye Nyame', 'Wednesday', NULL, 'mug', 'Mug',
    'Born on Wednesday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Akua, the Wednesday-born. Features the AKUA name with the Gye Nyame Adinkra symbol.', 2200, '/images/wednesday-borns/akua/akua-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BM22NV', NULL, FALSE, 230);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), '/images/wednesday-borns/akua/akua-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), '/images/wednesday-borns/akua/akua-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), '/images/wednesday-borns/akua/akua-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), '/images/wednesday-borns/akua/akua-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 230), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (231, 'akua-wednesday-born-mug-sankofa', 'Akua Wednesday Born Mug — Sankofa', 'Wednesday', NULL, 'mug', 'Mug',
    'Born on Wednesday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Akua, the Wednesday-born. Features the AKUA name with the Sankofa Adinkra symbol.', 2200, '/images/wednesday-borns/akua/akua-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BLBGRF', NULL, FALSE, 231);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), '/images/wednesday-borns/akua/akua-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), '/images/wednesday-borns/akua/akua-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), '/images/wednesday-borns/akua/akua-mug-sankofa-1.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 231), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (232, 'kwaku-wednesday-born-mug-sankofa', 'Kwaku Wednesday Born Mug — Sankofa', 'Wednesday', NULL, 'mug', 'Mug',
    'Born on Wednesday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Kwaku, the Wednesday-born. Features the KWAKU name with the Sankofa Adinkra symbol.', 2200, '/images/wednesday-borns/kwaku/kwaku-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BKJS7B', NULL, FALSE, 232);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), '/images/wednesday-borns/kwaku/kwaku-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), '/images/wednesday-borns/kwaku/kwaku-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), '/images/wednesday-borns/kwaku/kwaku-mug-sankofa-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), '/images/wednesday-borns/kwaku/kwaku-mug-sankofa-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 232), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (233, 'kwaku-wednesday-born-mug-gye-nyame', 'Kwaku Wednesday Born Mug — Gye Nyame', 'Wednesday', NULL, 'mug', 'Mug',
    'Born on Wednesday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Kwaku, the Wednesday-born. Features the KWAKU name with the Gye Nyame Adinkra symbol.', 2200, '/images/wednesday-borns/kwaku/kwaku-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BLYVXY', NULL, FALSE, 233);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), '/images/wednesday-borns/kwaku/kwaku-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), '/images/wednesday-borns/kwaku/kwaku-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), '/images/wednesday-borns/kwaku/kwaku-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), '/images/wednesday-borns/kwaku/kwaku-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 233), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (234, 'akua-wednesday-born-baby-onesie', 'Akua Wednesday Born Baby Onesie', 'Wednesday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Wednesday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Akua, the Wednesday-born baby. Soft, premium cotton with the AKUA day-born print.', 2500, '/images/wednesday-borns/akua/akua-baby-1.png', 'https://www.amazon.com/dp/B0H59R8Y9K?th=1&psc=1', NULL, FALSE, 234);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '/images/wednesday-borns/akua/akua-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '/images/wednesday-borns/akua/akua-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 234), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (235, 'kwaku-wednesday-born-baby-onesie', 'Kwaku Wednesday Born Baby Onesie', 'Wednesday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Wednesday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kwaku, the Wednesday-born baby. Soft, premium cotton with the KWAKU day-born print.', 2500, '/images/wednesday-borns/kwaku/kwaku-baby-1.png', 'https://www.amazon.com/dp/B0H5CXKVSN?th=1&psc=1', NULL, FALSE, 235);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), '/images/wednesday-borns/kwaku/kwaku-baby-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 235), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (236, 'akua-wednesday-born-shirt-sankofa-back', 'Akua Wednesday Born Shirt — Sankofa Back', 'Wednesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Wednesday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Akua, the Wednesday-born. AKUA day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/wednesday-borns/akua/akua-shirt-sankofa-2.png', 'https://www.amazon.com/dp/B0H3HZ5W8V?th=1&psc=1', NULL, FALSE, 236);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), '/images/wednesday-borns/akua/akua-shirt-sankofa-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), '/images/wednesday-borns/akua/akua-shirt-sankofa-1.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 236), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (237, 'akua-wednesday-born-shirt-gye-nyame-back', 'Akua Wednesday Born Shirt — Gye Nyame Back', 'Wednesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Wednesday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Akua, the Wednesday-born. AKUA day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/wednesday-borns/akua/akua-shirt-gyenyame-2.png', 'https://www.amazon.com/dp/B0H3J6QJ16?th=1&psc=1', NULL, FALSE, 237);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), '/images/wednesday-borns/akua/akua-shirt-gyenyame-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), '/images/wednesday-borns/akua/akua-shirt-gyenyame-1.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 237), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (238, 'kwaku-wednesday-born-shirt-sankofa-back', 'Kwaku Wednesday Born Shirt — Sankofa Back', 'Wednesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Wednesday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Kwaku, the Wednesday-born. KWAKU day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/wednesday-borns/kwaku/kwaku-shirt-sankofa-2.png', 'https://www.amazon.com/dp/B0H58X1PW4?th=1&psc=1', NULL, FALSE, 238);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), '/images/wednesday-borns/kwaku/kwaku-shirt-sankofa-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), '/images/wednesday-borns/kwaku/kwaku-shirt-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), '/images/wednesday-borns/kwaku/kwaku-shirt-sankofa-1.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 238), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (239, 'kwaku-wednesday-born-shirt-gye-nyame-back', 'Kwaku Wednesday Born Shirt — Gye Nyame Back', 'Wednesday', NULL, 'tshirt', 'T-Shirt',
    'Born on Wednesday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Kwaku, the Wednesday-born. KWAKU day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/wednesday-borns/kwaku/kwaku-shirt-gyenyame-2.png', 'https://www.amazon.com/dp/B0H3JHCZDZ?th=1&psc=1', NULL, FALSE, 239);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), '/images/wednesday-borns/kwaku/kwaku-shirt-gyenyame-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), '/images/wednesday-borns/kwaku/kwaku-shirt-gyenyame-1.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), '/images/wednesday-borns/kwaku/kwaku-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 239), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (240, 'yaa-thursday-born-mug-sankofa', 'Yaa Thursday Born Mug — Sankofa', 'Thursday', NULL, 'mug', 'Mug',
    'Born on Thursday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Yaa, the Thursday-born. Features the YAA name with the Sankofa Adinkra symbol.', 2200, '/images/thursday-borns/yaa/yaa-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H3JHCZDZ?th=1&psc=1', NULL, FALSE, 240);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), '/images/thursday-borns/yaa/yaa-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), '/images/thursday-borns/yaa/yaa-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), '/images/thursday-borns/yaa/yaa-mug-sankofa-1.jpeg', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), '/images/thursday-borns/yaa/yaa-mug-sankofa-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 240), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (241, 'yaa-thursday-born-mug-gye-nyame', 'Yaa Thursday Born Mug — Gye Nyame', 'Thursday', NULL, 'mug', 'Mug',
    'Born on Thursday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Yaa, the Thursday-born. Features the YAA name with the Gye Nyame Adinkra symbol.', 2200, '/images/thursday-borns/yaa/yaa-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H3JHCZDZ?th=1&psc=1', NULL, FALSE, 241);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), '/images/thursday-borns/yaa/yaa-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), '/images/thursday-borns/yaa/yaa-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), '/images/thursday-borns/yaa/yaa-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), '/images/thursday-borns/yaa/yaa-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 241), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (242, 'yaw-thursday-born-mug-gye-nyame', 'Yaw Thursday Born Mug — Gye Nyame', 'Thursday', NULL, 'mug', 'Mug',
    'Born on Thursday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Yaw, the Thursday-born. Features the YAW name with the Gye Nyame Adinkra symbol.', 2200, '/images/thursday-borns/yaw/yaw-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BQR2FD?th=1', NULL, FALSE, 242);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), '/images/thursday-borns/yaw/yaw-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), '/images/thursday-borns/yaw/yaw-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), '/images/thursday-borns/yaw/yaw-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), '/images/thursday-borns/yaw/yaw-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 242), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (243, 'yaw-thursday-born-mug-sankofa', 'Yaw Thursday Born Mug — Sankofa', 'Thursday', NULL, 'mug', 'Mug',
    'Born on Thursday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Yaw, the Thursday-born. Features the YAW name with the Sankofa Adinkra symbol.', 2200, '/images/thursday-borns/yaw/yaw-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BTP4GV', NULL, FALSE, 243);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), '/images/thursday-borns/yaw/yaw-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), '/images/thursday-borns/yaw/yaw-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), '/images/thursday-borns/yaw/yaw-mug-sankofa-1.jpeg', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), '/images/thursday-borns/yaw/yaw-mug-sankofa-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 243), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (244, 'yaa-thursday-born-baby-onesie', 'Yaa Thursday Born Baby Onesie', 'Thursday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Thursday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Yaa, the Thursday-born baby. Soft, premium cotton with the YAA day-born print.', 2500, '/images/thursday-borns/yaa/yaa-baby-1.png', 'https://www.amazon.com/dp/B0H59GDCYD?th=1&psc=1', NULL, FALSE, 244);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '/images/thursday-borns/yaa/yaa-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '/images/thursday-borns/yaa/yaa-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 244), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (245, 'yaw-thursday-born-baby-onesie', 'Yaw Thursday Born Baby Onesie', 'Thursday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Thursday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Yaw, the Thursday-born baby. Soft, premium cotton with the YAW day-born print.', 2500, '/images/thursday-borns/yaw/yaw-baby-1.png', 'https://www.amazon.com/dp/B0H59TQ4DL?th=1&psc=1', NULL, FALSE, 245);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '/images/thursday-borns/yaw/yaw-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '/images/thursday-borns/yaw/yaw-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 245), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (246, 'yaa-thursday-born-shirt-sankofa-back', 'Yaa Thursday Born Shirt — Sankofa Back', 'Thursday', NULL, 'tshirt', 'T-Shirt',
    'Born on Thursday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Yaa, the Thursday-born. YAA day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/thursday-borns/yaa/yaa-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H3J6JY17?th=1&psc=1', NULL, FALSE, 246);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), '/images/thursday-borns/yaa/yaa-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), '/images/thursday-borns/yaa/yaa-shirt-sankofa-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), '/images/thursday-borns/yaa/yaa-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 246), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (247, 'yaa-thursday-born-shirt-gye-nyame-back', 'Yaa Thursday Born Shirt — Gye Nyame Back', 'Thursday', NULL, 'tshirt', 'T-Shirt',
    'Born on Thursday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Yaa, the Thursday-born. YAA day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/thursday-borns/yaa/yaa-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H3JD7Z3B?th=1&psc=1', NULL, FALSE, 247);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), '/images/thursday-borns/yaa/yaa-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), '/images/thursday-borns/yaa/yaa-shirt-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), '/images/thursday-borns/yaa/yaa-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 247), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (248, 'yaw-thursday-born-shirt-gye-nyame-back', 'Yaw Thursday Born Shirt — Gye Nyame Back', 'Thursday', NULL, 'tshirt', 'T-Shirt',
    'Born on Thursday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Yaw, the Thursday-born. YAW day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/thursday-borns/yaw/yaw-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H3JD7Z3B?th=1&psc=1', NULL, FALSE, 248);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), '/images/thursday-borns/yaw/yaw-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), '/images/thursday-borns/yaw/yaw-shirt-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), '/images/thursday-borns/yaw/yaw-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 248), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (249, 'yaw-thursday-born-shirt-sankofa-back', 'Yaw Thursday Born Shirt — Sankofa Back', 'Thursday', NULL, 'tshirt', 'T-Shirt',
    'Born on Thursday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Yaw, the Thursday-born. YAW day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/thursday-borns/yaw/yaw-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H598WHS8?th=1&psc=1', NULL, FALSE, 249);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), '/images/thursday-borns/yaw/yaw-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), '/images/thursday-borns/yaw/yaw-shirt-sankofa-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), '/images/thursday-borns/yaw/yaw-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 249), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (250, 'kofi-friday-born-mug-gye-nyame', 'Kofi Friday Born Mug — Gye Nyame', 'Friday', NULL, 'mug', 'Mug',
    'Born on Friday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Kofi, the Friday-born. Features the KOFI name on the front with the Gye Nyame Adinkra symbol.', 2200, '/images/friday-borns/kofi/kofi-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H59VLGGH', NULL, FALSE, 250);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), '/images/friday-borns/kofi/kofi-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), '/images/friday-borns/kofi/kofi-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), '/images/friday-borns/kofi/kofi-mug-gyenyame-2.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), '/images/friday-borns/kofi/kofi-mug-gyenyame-1.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 250), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (251, 'kofi-friday-born-mug-sankofa', 'Kofi Friday Born Mug — Sankofa', 'Friday', NULL, 'mug', 'Mug',
    'Born on Friday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Kofi, the Friday-born. Features the KOFI name on the front with the Sankofa Adinkra symbol.', 2200, '/images/friday-borns/kofi/kofi-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5B667J5', NULL, FALSE, 251);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), '/images/friday-borns/kofi/kofi-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), '/images/friday-borns/kofi/kofi-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), '/images/friday-borns/kofi/kofi-mug-sankofa-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), '/images/friday-borns/kofi/kofi-mug-sankofa-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 251), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (252, 'afia-friday-born-mug-gye-nyame', 'Afia Friday Born Mug — Gye Nyame', 'Friday', NULL, 'mug', 'Mug',
    'Born on Friday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Afia, the Friday-born. Features the AFIA name on the front with the Gye Nyame Adinkra symbol.', 2200, '/images/friday-borns/afia/afia-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H59ZS41J', NULL, FALSE, 252);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), '/images/friday-borns/afia/afia-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), '/images/friday-borns/afia/afia-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), '/images/friday-borns/afia/afia-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), '/images/friday-borns/afia/afia-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 252), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (253, 'afia-friday-born-mug-sankofa', 'Afia Friday Born Mug — Sankofa', 'Friday', NULL, 'mug', 'Mug',
    'Born on Friday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Afia, the Friday-born. Features the AFIA name on the front with the Sankofa Adinkra symbol.', 2200, '/images/friday-borns/afia/afia-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H59RFLQ9', NULL, FALSE, 253);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), '/images/friday-borns/afia/afia-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), '/images/friday-borns/afia/afia-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), '/images/friday-borns/afia/afia-mug-sankofa-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), '/images/friday-borns/afia/afia-mug-sankofa-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 253), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (254, 'afia-friday-born-baby-onesie', 'Afia Friday Born Baby Onesie', 'Friday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Friday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Afia, the Friday-born baby. Soft, premium cotton with the AFIA day-born print.', 2500, '/images/friday-borns/afia/afia-baby-1.png', 'https://www.amazon.com/dp/B0H5BW8H5F?th=1&psc=1', NULL, FALSE, 254);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '/images/friday-borns/afia/afia-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '/images/friday-borns/afia/afia-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 254), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (255, 'kofi-friday-born-baby-onesie', 'Kofi Friday Born Baby Onesie', 'Friday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Friday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kofi, the Friday-born baby. Soft, premium cotton with the KOFI day-born print.', 2500, '/images/friday-borns/kofi/kofi-baby-1.png', 'https://www.amazon.com/dp/B0H5BSYK74?th=1&psc=1', NULL, FALSE, 255);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '/images/friday-borns/kofi/kofi-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '/images/friday-borns/kofi/kofi-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 255), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (256, 'afia-friday-born-shirt-sankofa-back', 'Afia Friday Born Shirt — Sankofa Back', 'Friday', NULL, 'tshirt', 'T-Shirt',
    'Born on Friday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Afia, the Friday-born. AFIA day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/friday-borns/afia/afia-shirt-sankofa-2.png', 'https://www.amazon.com/dp/B0H58XWNNX?th=1&psc=1', NULL, FALSE, 256);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), '/images/friday-borns/afia/afia-shirt-sankofa-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), '/images/friday-borns/afia/afia-shirt-sankofa-1.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), '/images/friday-borns/afia/afia-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 256), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (257, 'afia-friday-born-shirt-gye-nyame-back', 'Afia Friday Born Shirt — Gye Nyame Back', 'Friday', NULL, 'tshirt', 'T-Shirt',
    'Born on Friday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Afia, the Friday-born. AFIA day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/friday-borns/afia/afia-shirt-gyenyame-2.png', 'https://www.amazon.com/dp/B0H58RFZ49?th=1&psc=1', NULL, FALSE, 257);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), '/images/friday-borns/afia/afia-shirt-gyenyame-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), '/images/friday-borns/afia/afia-shirt-gyenyame-1.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), '/images/friday-borns/afia/afia-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 257), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (258, 'kofi-friday-born-shirt-sankofa-back', 'Kofi Friday Born Shirt — Sankofa Back', 'Friday', NULL, 'tshirt', 'T-Shirt',
    'Born on Friday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Kofi, the Friday-born. KOFI day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/friday-borns/kofi/kofi-shirt-sankofa-3.jpg', 'https://www.amazon.com/dp/B0H58W8X8W?th=1&psc=1', NULL, FALSE, 258);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), '/images/friday-borns/kofi/kofi-shirt-sankofa-3.jpg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), '/images/friday-borns/kofi/kofi-shirt-sankofa-1.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), '/images/friday-borns/kofi/kofi-shirt-sankofa-2.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 258), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (259, 'kofi-friday-born-shirt-gye-nyame-back', 'Kofi Friday Born Shirt — Gye Nyame Back', 'Friday', NULL, 'tshirt', 'T-Shirt',
    'Born on Friday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Kofi, the Friday-born. KOFI day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/friday-borns/kofi/kofi-shirt-gyenyame-2.jpg', 'https://www.amazon.com/dp/B0H58T4FGX?th=1&psc=1', NULL, FALSE, 259);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), '/images/friday-borns/kofi/kofi-shirt-gyenyame-2.jpg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), '/images/friday-borns/kofi/kofi-shirt-gyenyame-1.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 259), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (260, 'ama-saturday-born-baby-onesie', 'Ama Saturday Born Baby Onesie', 'Saturday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Saturday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Ama, the Saturday-born baby. Soft, premium cotton with the AMA day-born print.', 2500, '/images/saturday-borns/ama/ama-baby-1.png', 'https://www.amazon.com/dp/B0H5BWNNR5?th=1&psc=1', NULL, FALSE, 260);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '/images/saturday-borns/ama/ama-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '/images/saturday-borns/ama/ama-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 260), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (261, 'kwame-saturday-born-baby-onesie', 'Kwame Saturday Born Baby Onesie', 'Saturday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Saturday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kwame, the Saturday-born baby. Soft, premium cotton with the KWAME day-born print.', 2500, '/images/saturday-borns/kwame/kwame-baby-1.png', 'https://www.amazon.com/dp/B0H5BSV45R?th=1&psc=1', NULL, FALSE, 261);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '/images/saturday-borns/kwame/kwame-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '/images/saturday-borns/kwame/kwame-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 261), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (262, 'kwame-saturday-born-mug-gye-nyame', 'Kwame Saturday Born Mug — Gye Nyame', 'Saturday', NULL, 'mug', 'Mug',
    'Born on Saturday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Kwame, the Saturday-born. Features the KWAME name on the front with the Gye Nyame Adinkra symbol.', 2200, '/images/saturday-borns/kwame/kwame-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BR8FQ3', NULL, FALSE, 262);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), '/images/saturday-borns/kwame/kwame-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), '/images/saturday-borns/kwame/kwame-mug-gyenyame-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), '/images/saturday-borns/kwame/kwame-mug-gyenyame-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), '/images/saturday-borns/kwame/kwame-mug-gyenyame-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 262), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (263, 'kwame-saturday-born-mug-sankofa', 'Kwame Saturday Born Mug — Sankofa', 'Saturday', NULL, 'mug', 'Mug',
    'Born on Saturday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Kwame, the Saturday-born. Features the KWAME name on the front with the Sankofa Adinkra symbol. Currently out of stock.', 2200, '/images/saturday-borns/kwame/kwame-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5J11PLS', NULL, TRUE, 263);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), '/images/saturday-borns/kwame/kwame-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), '/images/saturday-borns/kwame/kwame-mug-sankofa-3.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), '/images/saturday-borns/kwame/kwame-mug-sankofa-1.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), '/images/saturday-borns/kwame/kwame-mug-sankofa-2.png', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 263), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (264, 'ama-saturday-born-shirt-sankofa-back', 'Ama Saturday Born Shirt — Sankofa Back', 'Saturday', NULL, 'tshirt', 'T-Shirt',
    'Born on Saturday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Ama, the Saturday-born. AMA day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/saturday-borns/ama/ama-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H3SFDJX2?th=1&psc=1', NULL, FALSE, 264);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), '/images/saturday-borns/ama/ama-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), '/images/saturday-borns/ama/ama-shirt-sankofa-3.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), '/images/saturday-borns/ama/ama-shirt-sankofa-2.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 264), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (265, 'ama-saturday-born-shirt-gye-nyame-back', 'Ama Saturday Born Shirt — Gye Nyame Back', 'Saturday', NULL, 'tshirt', 'T-Shirt',
    'Born on Saturday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Ama, the Saturday-born. AMA day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/saturday-borns/ama/ama-shirt-gyenyame-2.png', 'https://www.amazon.com/dp/B0H3SDZ5T5?th=1&psc=1', NULL, FALSE, 265);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), '/images/saturday-borns/ama/ama-shirt-gyenyame-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), '/images/saturday-borns/ama/ama-shirt-gyenyame-1.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), '/images/saturday-borns/ama/ama-shirt-gyenyame-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 265), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (266, 'kwame-saturday-born-shirt-gye-nyame-back', 'Kwame Saturday Born Shirt — Gye Nyame Back', 'Saturday', NULL, 'tshirt', 'T-Shirt',
    'Born on Saturday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Kwame, the Saturday-born. KWAME day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/saturday-borns/kwame/kwame-shirt-gyenyame-2.png', 'https://www.amazon.com/dp/B0H58WZVCH?th=1&psc=1', NULL, FALSE, 266);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), '/images/saturday-borns/kwame/kwame-shirt-gyenyame-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), '/images/saturday-borns/kwame/kwame-shirt-gyenyame-1.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 266), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (267, 'kwame-saturday-born-shirt-sankofa-back', 'Kwame Saturday Born Shirt — Sankofa Back', 'Saturday', NULL, 'tshirt', 'T-Shirt',
    'Born on Saturday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Kwame, the Saturday-born. KWAME day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/saturday-borns/kwame/kwame-shirt-sankofa-2.png', 'https://www.amazon.com/dp/B0H3SKZBHR?th=1&psc=1', NULL, FALSE, 267);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), '/images/saturday-borns/kwame/kwame-shirt-sankofa-2.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), '/images/saturday-borns/kwame/kwame-shirt-sankofa-1.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), '/images/saturday-borns/kwame/kwame-shirt-sankofa-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 267), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (270, 'akosua-sunday-born-shirt-sankofa-back', 'Akosua Sunday Born Shirt — Sankofa Back', 'Sunday', NULL, 'tshirt', 'T-Shirt',
    'Born on Sunday · Akan Heritage', 'Royal blue · Sankofa back', 'Premium heritage T-shirt for Akosua, the Sunday-born. Royal blue colourway with the AKOSUA day-born print on the front and the Sankofa Adinkra symbol on the back.', 2000, '/images/sunday-borns/akosua/akosua-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H5925J6Y?th=1&psc=1', NULL, FALSE, 270);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), '/images/sunday-borns/akosua/akosua-shirt-sankofa-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 270), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (271, 'akosua-sunday-born-baby-onesie', 'Akosua Sunday Born Baby Onesie', 'Sunday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Sunday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Akosua, the Sunday-born baby. Soft, premium cotton with the AKOSUA day-born print.', 2500, '/images/sunday-borns/akosua/akosua-baby-1.png', 'https://www.amazon.com/dp/B0H5D9SRCQ?th=1&psc=1', NULL, FALSE, 271);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '/images/sunday-borns/akosua/akosua-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '/images/sunday-borns/akosua/akosua-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 271), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (272, 'kwasi-sunday-born-baby-onesie', 'Kwasi Sunday Born Baby Onesie', 'Sunday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Sunday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kwasi, the Sunday-born baby. Soft, premium cotton with the KWASI day-born print.', 2500, '/images/sunday-borns/kwasi/kwasi-baby-1.png', 'https://www.amazon.com/dp/B0H5CZNV1P?th=1&psc=1', NULL, FALSE, 272);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '/images/sunday-borns/kwasi/kwasi-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '/images/sunday-borns/kwasi/kwasi-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 272), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (273, 'kwesi-sunday-born-baby-onesie', 'Kwesi Sunday Born Baby Onesie', 'Sunday', NULL, 'babysuit', 'Baby Onesie',
    'Born on Sunday · Akan Heritage', 'Soft cotton · Infant onesie', 'Personalized heritage infant onesie for Kwesi, the Sunday-born baby. Soft, premium cotton with the KWESI day-born print.', 2500, '/images/sunday-borns/kwesi/kwesi-baby-1.png', 'https://www.amazon.com/dp/B0H5BV7MD3?th=1&psc=1', NULL, FALSE, 273);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '/images/sunday-borns/kwesi/kwesi-baby-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '/images/sunday-borns/kwesi/kwesi-baby-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '0–3M', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '3–6M', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '6–12M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '12–18M', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), '18–24M', 4);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Soft cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Snap-button closure', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Heritage Adinkra print', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Multiple colour options', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Baby Shower Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Newborn Gift', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 273), 'Cultural Appreciation', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (274, 'kwesi-sunday-born-shirt-gye-nyame-back', 'Kwesi Sunday Born Shirt — Gye Nyame Back', 'Sunday', NULL, 'tshirt', 'T-Shirt',
    'Born on Sunday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Kwesi, the Sunday-born. KWESI day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/sunday-borns/kwesi/kwesi-shirt-gyenyame-1.png', 'https://www.amazon.com/dp/B0H3J8H89G?th=1&psc=1', NULL, FALSE, 274);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), '/images/sunday-borns/kwesi/kwesi-shirt-gyenyame-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 274), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (275, 'kwesi-sunday-born-shirt-sankofa-back', 'Kwesi Sunday Born Shirt — Sankofa Back', 'Sunday', NULL, 'tshirt', 'T-Shirt',
    'Born on Sunday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Kwesi, the Sunday-born. KWESI day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/sunday-borns/kwesi/kwesi-shirt-sankofa-1.png', 'https://www.amazon.com/dp/B0H3J2Z4HP?th=1&psc=1', NULL, FALSE, 275);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), '/images/sunday-borns/kwesi/kwesi-shirt-sankofa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), '/images/sunday-borns/kwesi/kwesi-shirt-sankofa-2.jpg', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 275), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (276, 'kwasi-sunday-born-shirt-gye-nyame-back', 'Kwasi Sunday Born Shirt — Gye Nyame Back', 'Sunday', NULL, 'tshirt', 'T-Shirt',
    'Born on Sunday · Akan Heritage', 'Gye Nyame back', 'Premium heritage T-shirt for Kwasi, the Sunday-born. KWASI day-born print on the front with the Gye Nyame Adinkra symbol on the back.', 2000, '/images/sunday-borns/kwasi/kwasi-shirt-gyenyame-1.0.png', 'https://www.amazon.com/dp/B0H3RJ79NN?th=1&psc=1', NULL, FALSE, 276);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), '/images/sunday-borns/kwasi/kwasi-shirt-gyenyame-1.0.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 276), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (277, 'kwasi-sunday-born-shirt-sankofa-back', 'Kwasi Sunday Born Shirt — Sankofa Back', 'Sunday', NULL, 'tshirt', 'T-Shirt',
    'Born on Sunday · Akan Heritage', 'Sankofa back', 'Premium heritage T-shirt for Kwasi, the Sunday-born. KWASI day-born print on the front with the Sankofa Adinkra symbol on the back.', 2000, '/images/sunday-borns/kwasi/kwasi-shirt-sankofa-1.0.png', 'https://www.amazon.com/dp/B0H3RDWFKR?th=1&psc=1', NULL, FALSE, 277);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), '/images/sunday-borns/kwasi/kwasi-shirt-sankofa-1.0.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 277), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (278, 'akosua-sunday-born-mug-sankofa', 'Akosua Sunday Born Mug — Sankofa', 'Sunday', NULL, 'mug', 'Mug',
    'Born on Sunday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Akosua, the Sunday-born. Features the AKOSUA name on the front with the Sankofa Adinkra symbol.', 2200, '/images/sunday-borns/akosua/akosua-mug-sankofa-card.png', 'https://www.amazon.com/dp/B0H5BPYLLH', NULL, FALSE, 278);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '/images/sunday-borns/akosua/akosua-mug-sankofa-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '/images/sunday-borns/akosua/akosua-mug-sankofa-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '/images/sunday-borns/akosua/akosua-mug-sankofa-2..0.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '/images/sunday-borns/akosua/akosua-mug-sankofa-2.0.png', 3);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '/images/sunday-borns/akosua/akosua-mug-sankofa-1.jpeg', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 278), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (279, 'akosua-sunday-born-mug-gye-nyame', 'Akosua Sunday Born Mug — Gye Nyame', 'Sunday', NULL, 'mug', 'Mug',
    'Born on Sunday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Akosua, the Sunday-born. Features the AKOSUA name on the front with the Gye Nyame Adinkra symbol.', 2200, '/images/sunday-borns/akosua/akosua-mug-gyenyame-card.png', 'https://www.amazon.com/dp/B0H5BTPKTN', NULL, FALSE, 279);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '/images/sunday-borns/akosua/akosua-mug-gyenyame-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '/images/sunday-borns/akosua/akosua-mug-gyenyame-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '/images/sunday-borns/akosua/akosua-mug-gyenyame-2.00.png', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '/images/sunday-borns/akosua/akosua-mug-gyenyame-2.0.png', 3);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '/images/sunday-borns/akosua/akosua-mug-gyenyame-1.jpeg', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 279), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (280, 'kwasi-sunday-born-mug-sankofa', 'Kwasi Sunday Born Mug — Sankofa', 'Sunday', NULL, 'mug', 'Mug',
    'Born on Sunday · Akan Heritage', 'Ceramic mug · Sankofa', 'Premium ceramic heritage mug for Kwasi, the Sunday-born. Features the KWASI name on the front with the Sankofa Adinkra symbol.', 2200, '/images/sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg', 'https://www.amazon.com/dp/B0H5BNJ6TL', NULL, FALSE, 280);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), '/images/sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), '/images/sunday-borns/kwasi/kwasi-mug-sankofa-1.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 280), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (281, 'kwasi-sunday-born-mug-gye-nyame', 'Kwasi Sunday Born Mug — Gye Nyame', 'Sunday', NULL, 'mug', 'Mug',
    'Born on Sunday · Akan Heritage', 'Ceramic mug · Gye Nyame', 'Premium ceramic heritage mug for Kwasi, the Sunday-born. Features the KWASI name on the front with the Gye Nyame Adinkra symbol.', 2200, '/images/sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg', 'https://www.amazon.com/dp/B0H5BM1WNS', NULL, FALSE, 281);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), '/images/sunday-borns/kwasi/kwasi-mug-sankofa-2.jpg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), '/images/sunday-borns/kwasi/kwasi-mug-gyenyame-1.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), '11oz', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), '15oz', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Quality ceramic', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Available in 11oz and 15oz', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Dishwasher safe', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 281), 'Mother''s Day', 3);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (300, 'ghana-black-stars-football-tee', 'Ghana Black Stars Football Tee', NULL, 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · Ghana Football Pride', 'Green · Black · Red', 'Show your Ghana football pride with the GHANA BLACK STARS heritage tee — the national flag and ball design on premium cotton. Available in green, black and red.', 2000, '/images/world-cup/wc-prod-2.jpg', 'https://www.amazon.com/dp/B0H5TT8PJX', NULL, FALSE, 300);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '/images/world-cup/wc-prod-2.jpg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '/images/world-cup/wc-prod-1.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '/images/world-cup/wc-prod-3.jpg', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '/images/world-cup/wc-prod-4.jpg', 3);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '/images/world-cup/wc-prod-5.jpg', 4);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '/images/world-cup/wc-prod-6.jpg', 5);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 300), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (301, 'afia-ghana-black-star-jersey', 'Afia Ghana Black Star Jersey', NULL, 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · Personalized', 'Your name & number · Green · Black · Red', 'Personalized Ghana Black Stars jersey-style tee with your own name and number on the back — rep the Black Stars your way. Available in green, black and red.', 2000, '/images/world-cup/wc-afia-jersey-card.png', 'https://www.amazon.com/dp/B0H5TT8PJX', NULL, FALSE, 301);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), '/images/world-cup/wc-afia-jersey-card.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), '/images/world-cup/wc-prod-7.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), '/images/world-cup/wc-prod-8.jpg', 2);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), '/images/world-cup/wc-prod-9.jpg', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 301), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (310, 'yaa-black-stars-jersey', 'Yaa Black Stars Jersey', 'Thursday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Yaa, the Thursday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/yaa-1.png', 'https://www.amazon.com/dp/B0H5T8PRCQ?th=1&psc=1', NULL, FALSE, 310);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), '/images/ghana-spotlight/yaa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), '/images/ghana-spotlight/yaa-2.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 310), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (311, 'yaw-black-stars-jersey', 'Yaw Black Stars Jersey', 'Thursday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Yaw, the Thursday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/yaw-1.png', 'https://www.amazon.com/dp/B0H5THKN8L?th=1&psc=1', NULL, FALSE, 311);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), '/images/ghana-spotlight/yaw-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 311), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (312, 'akua-black-stars-jersey', 'Akua Black Stars Jersey', 'Wednesday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Akua, the Wednesday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/akua-1.png', 'https://www.amazon.com/dp/B0H5TRD98Y?th=1&psc=1', NULL, FALSE, 312);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), '/images/ghana-spotlight/akua-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), '/images/ghana-spotlight/akua-2.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 312), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (313, 'kwabena-black-stars-jersey', 'Kwabena Black Stars Jersey', 'Tuesday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kwabena, the Tuesday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kwabena-1.png', 'https://www.amazon.com/dp/B0H5TL69V6?th=1&psc=1', NULL, FALSE, 313);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), '/images/ghana-spotlight/kwabena-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), '/images/ghana-spotlight/kwabena-2.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 313), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (314, 'adwoa-black-stars-jersey', 'Adwoa Black Stars Jersey', 'Monday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Adwoa, the Monday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/adwoa-1.png', 'https://www.amazon.com/dp/B0H5TQDNKT?th=1&psc=1', NULL, FALSE, 314);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), '/images/ghana-spotlight/adwoa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), '/images/ghana-spotlight/adwoa-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), '/images/ghana-spotlight/adwoa-3.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 314), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (315, 'kwadwo-black-stars-jersey', 'Kwadwo Black Stars Jersey', 'Monday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kwadwo, the Monday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kwadwo-1.png', 'https://www.amazon.com/dp/B0H5T91CPJ?th=1&psc=1', NULL, FALSE, 315);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), '/images/ghana-spotlight/kwadwo-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), '/images/ghana-spotlight/kwadwo-2.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 315), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (316, 'adjoa-black-stars-jersey', 'Adjoa Black Stars Jersey', 'Monday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Adjoa, the Monday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/adjoa-1.png', 'https://www.amazon.com/dp/B0H5TC6S83?th=1&psc=1', NULL, FALSE, 316);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), '/images/ghana-spotlight/adjoa-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), '/images/ghana-spotlight/adjoa-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), '/images/ghana-spotlight/adjoa-3.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 316), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (317, 'kojo-black-stars-jersey', 'Kojo Black Stars Jersey', 'Monday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kojo, the Monday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kojo-1.png', 'https://www.amazon.com/dp/B0H5TKGGM8?th=1&psc=1', NULL, FALSE, 317);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), '/images/ghana-spotlight/kojo-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), '/images/ghana-spotlight/kojo-2.png', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 317), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (318, 'ama-black-stars-jersey', 'Ama Black Stars Jersey', 'Saturday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Ama, the Saturday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/ama-1.jpg', 'https://www.amazon.com/dp/B0H5T9GR2W?th=1&psc=1', NULL, FALSE, 318);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), '/images/ghana-spotlight/ama-1.jpg', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), '/images/ghana-spotlight/ama-2.jpg', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), '/images/ghana-spotlight/ama-3.jpg', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 318), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (319, 'kwesi-black-stars-jersey', 'Kwesi Black Stars Jersey', 'Sunday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kwesi, the Sunday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kwesi-1.png', 'https://www.amazon.com/dp/B0H5TGY75J?th=1&psc=1', NULL, FALSE, 319);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), '/images/ghana-spotlight/kwesi-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), '/images/ghana-spotlight/kwesi-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), '/images/ghana-spotlight/kwesi-3.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 319), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (320, 'kofi-black-stars-jersey', 'Kofi Black Stars Jersey', 'Friday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kofi, the Friday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kofi-1.png', 'https://www.amazon.com/dp/B0H5T1VXLW?th=1&psc=1', NULL, FALSE, 320);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), '/images/ghana-spotlight/kofi-1.png', 0);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), '/images/ghana-spotlight/kofi-2.png', 1);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), '/images/ghana-spotlight/kofi-3.png', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 320), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (321, 'abena-black-stars-jersey', 'Abena Black Stars Jersey', 'Tuesday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Abena, the Tuesday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/abena-1.png', 'https://www.amazon.com/dp/B0H5T43CDS?th=1&psc=1', NULL, FALSE, 321);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), '/images/ghana-spotlight/abena-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 321), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (322, 'kwaku-black-stars-jersey', 'Kwaku Black Stars Jersey', 'Wednesday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kwaku, the Wednesday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kwaku-1.png', 'https://www.amazon.com/dp/B0H5TQKCCP?th=1&psc=1', NULL, FALSE, 322);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), '/images/ghana-spotlight/kwaku-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 322), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (323, 'akosua-black-stars-jersey', 'Akosua Black Stars Jersey', 'Sunday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Akosua, the Sunday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/akosua-1.png', 'https://www.amazon.com/dp/B0H5T83M2H?th=1&psc=1', NULL, FALSE, 323);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), '/images/ghana-spotlight/akosua-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 323), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (324, 'kwasi-black-stars-jersey', 'Kwasi Black Stars Jersey', 'Sunday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kwasi, the Sunday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kwasi-1.png', 'https://www.amazon.com/dp/B0H5TKT1KS?th=1&psc=1', NULL, FALSE, 324);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), '/images/ghana-spotlight/kwasi-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 324), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_product (legacy_id, slug, name, born_day, collection, product_type, type_label,
    tagline, card_blurb, description, price_cents, primary_image, amazon_url, etsy_url, sold_out, sort_order)
VALUES (325, 'kwame-black-stars-jersey', 'Kwame Black Stars Jersey', 'Saturday', 'Ghana Spotlight', 'tshirt', 'T-Shirt',
    'Black Stars · World Cup', 'Name & number jersey', 'Personalized Ghana Black Stars name & number jersey for Kwame, the Saturday-born — jersey-style print on premium cotton. Add your own name and number at checkout.', 2000, '/images/ghana-spotlight/kwame-1.png', 'https://www.amazon.com/dp/B0H5TCB7LJ?th=1&psc=1', NULL, FALSE, 325);
INSERT INTO market_product_image (product_id, url, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), '/images/ghana-spotlight/kwame-1.png', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'XS', 0);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'S', 1);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'M', 2);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'L', 3);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'XL', 4);
INSERT INTO market_product_size (product_id, label, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), '2XL', 5);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Premium cotton blend', 0);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Adinkra symbol print', 1);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Comfortable fit', 2);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Durable print', 3);
INSERT INTO market_product_detail (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Gift-ready', 4);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Birthday Gift', 0);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Heritage Gift', 1);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Day Born Celebration', 2);
INSERT INTO market_product_perfect_for (product_id, text, position) VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'Cultural Appreciation', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'XS', '32–34"', '81–86 cm', '25"', '63.5 cm', 0);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'S', '35–37"', '89–94 cm', '26"', '66 cm', 1);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'M', '38–40"', '97–102 cm', '27"', '68.5 cm', 2);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'L', '41–43"', '104–109 cm', '28"', '71 cm', 3);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), 'XL', '44–46"', '112–117 cm', '29"', '73.5 cm', 4);
INSERT INTO market_size_chart_row (product_id, size, us_chest, eu_chest, us_length, eu_length, position)
VALUES ((SELECT id FROM market_product WHERE legacy_id = 325), '2XL', '47–49"', '119–124 cm', '30"', '76 cm', 5);

INSERT INTO market_bundle (slug, title, subtitle, description, sort_order)
VALUES ('akan-family-set', 'Akan Family Heritage Set', 'Adult Tee + Baby Onesie', 'Celebrate your Akan day-born identity together — the premium Akosua adult day-born T-shirt paired with the matching Akua heritage baby onesie. Available on Amazon.', 0);
INSERT INTO market_bundle_item (bundle_id, product_id, position)
SELECT b.id, p.id, 0 FROM market_bundle b, market_product p
WHERE b.slug = 'akan-family-set' AND p.legacy_id = 201;
INSERT INTO market_bundle_item (bundle_id, product_id, position)
SELECT b.id, p.id, 1 FROM market_bundle b, market_product p
WHERE b.slug = 'akan-family-set' AND p.legacy_id = 234;

INSERT INTO market_promotion (slug, headline, badge_label, placement, active, sort_order)
VALUES ('limited-bundles', 'LIMITED BUNDLES: SIGNATURE · EVERYDAY · LEGACY', NULL, 'ANNOUNCEMENT_STRIP', TRUE, 0);
