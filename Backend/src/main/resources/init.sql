CREATE TABLE users
(
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    username      VARCHAR(50) UNIQUE  NOT NULL,
    password      VARCHAR(255)        NOT NULL,
    first_name    VARCHAR(50)         NOT NULL,
    last_name     VARCHAR(50)         NOT NULL,
    is_verified   BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP
);

CREATE TABLE profiles
(
    user_id           INT PRIMARY KEY,
    gender            VARCHAR(20) NOT NULL,
    sexual_preference VARCHAR(20) NOT NULL,
    biography         TEXT        NOT NULL,
    latitude          FLOAT,
    longitude         FLOAT,
    city              VARCHAR(100),
    birthdate         TIMESTAMP   NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE interests
(
    code  VARCHAR(255) PRIMARY KEY,
    label VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_interests
(
    user_id       INT          NOT NULL,
    interest_code VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, interest_code),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (interest_code) REFERENCES interests (code) ON DELETE CASCADE
);

CREATE TABLE pictures
(
    user_id           INT PRIMARY KEY,
    profile_picture       VARCHAR(255) NOT NULL,
    picture1       VARCHAR(255),
    picture2       VARCHAR(255),
    picture3       VARCHAR(255),
    picture4       VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE visits
(
    visitor_id INT NOT NULL,
    visited_id INT NOT NULL,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (visitor_id, visited_id),
    FOREIGN KEY (visitor_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (visited_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE likes
(
    liker_id   INT NOT NULL,
    liked_id   INT NOT NULL,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disliked  BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (liker_id, liked_id),
    FOREIGN KEY (liker_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (liked_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE blocks
(
    blocker_id INT NOT NULL,
    blocked_id INT NOT NULL,
    PRIMARY KEY (blocker_id, blocked_id),
    FOREIGN KEY (blocker_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (blocked_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE messages
(
    id          SERIAL PRIMARY KEY,
    sender_id   INT  NOT NULL,
    receiver_id INT  NOT NULL,
    content     TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE notifications
(
    id         SERIAL PRIMARY KEY,
    user_id    INT         NOT NULL,
    type       VARCHAR(50) NOT NULL,
    username    VARCHAR(50) NOT NULL,
    is_read    BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE email_tokens (
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO interests (code, label)
VALUES ('SPORTS', 'Sports'),
       ('MUSIC', 'Music'),
       ('TRAVEL', 'Traveling'),
       ('MOVIES', 'Watching Movies'),
       ('COOKING', 'Cooking'),
       ('READING', 'Reading Books'),
       ('HIKING', 'Hiking'),
       ('GAMING', 'Video Games'),
       ('FITNESS', 'Fitness and Gym'),
       ('YOGA', 'Yoga'),
       ('PHOTOGRAPHY', 'Photography'),
       ('ART', 'Art and Drawing'),
       ('ANIMALS', 'Animals and Pets'),
       ('GARDENING', 'Gardening'),
       ('DANCING', 'Dancing'),
       ('TECHNOLOGY', 'Technology'),
       ('FASHION', 'Fashion'),
       ('BOARD_GAMES', 'Board Games'),
       ('VOLUNTEERING', 'Volunteering'),
       ('WRITING', 'Writing and Blogging');

CREATE OR REPLACE FUNCTION calculate_distance(lat1 DOUBLE PRECISION, lon1 DOUBLE PRECISION, lat2 DOUBLE PRECISION, lon2 DOUBLE PRECISION)
    RETURNS DOUBLE PRECISION AS $$
DECLARE
    earth_radius CONSTANT DOUBLE PRECISION := 6371; -- Rayon de la Terre en km
    dLat DOUBLE PRECISION;
    dLon DOUBLE PRECISION;
    a DOUBLE PRECISION;
    c DOUBLE PRECISION;
BEGIN
    -- Convertir les différences en radians
    dLat := RADIANS(lat2 - lat1);
    dLon := RADIANS(lon2 - lon1);

    -- Formule de Haversine
    a := POWER(SIN(dLat / 2), 2) +
         COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * POWER(SIN(dLon / 2), 2);

    c := 2 * ATAN2(SQRT(a), SQRT(1 - a));

    -- Retourner la distance
    RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_date_minus_years(years INT)
    RETURNS TIMESTAMP AS $$
BEGIN
    RETURN NOW() - (years || ' years')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_fame_rating(user_id INT)
    RETURNS INT AS $$
DECLARE
    views_count INT;
    likes_count INT;
BEGIN
    -- Récupère le nombre de vues pour cet utilisateur
    SELECT COUNT(*)
    INTO views_count
    FROM visits
    WHERE visited_id = user_id;

    -- Récupère le nombre de likes pour cet utilisateur
    SELECT COUNT(*)
    INTO likes_count
    FROM likes
    WHERE liked_id = user_id AND disliked = FALSE;

    -- Si views_count est zéro, on retourne 0 pour éviter la division par zéro
    IF views_count = 0 THEN
        RETURN 0;
    END IF;

    -- Calcul de la fame rating
    RETURN (likes_count * 10 / views_count);
END;
$$ LANGUAGE plpgsql;