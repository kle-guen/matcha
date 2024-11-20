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
    fame_rating       FLOAT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE interests
(
    id         VARCHAR(255) PRIMARY KEY,
    name       VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_interests
(
    user_id     INT          NOT NULL,
    interest_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, interest_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests (id) ON DELETE CASCADE
);

CREATE TABLE pictures
(
    id                 SERIAL PRIMARY KEY,
    user_id            INT          NOT NULL,
    picture_path        VARCHAR(255) NOT NULL,
    is_profile_picture BOOLEAN DEFAULT FALSE,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    content    TEXT,
    is_read    BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);