CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       first_name VARCHAR(50) NOT NULL,
                       last_name VARCHAR(50) NOT NULL,
                       is_verified BOOLEAN DEFAULT FALSE,
                       last_login_at TIMESTAMP
);

CREATE TABLE profiles (
                          user_id INT PRIMARY KEY,
                          gender VARCHAR(20),
                          sexual_preference VARCHAR(20),
                          biography TEXT,
                          profile_picture VARCHAR(255),
                          location VARCHAR(100),
                          fame_rating FLOAT DEFAULT 0,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE interests (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(50) UNIQUE NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_interests (
                                user_id INT,
                                interest_id INT,
                                PRIMARY KEY (user_id, interest_id),
                                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

CREATE TABLE pictures (
                          id SERIAL PRIMARY KEY,
                          user_id INT,
                          picture_url VARCHAR(255) NOT NULL,
                          is_profile_picture BOOLEAN DEFAULT FALSE,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE visits (
                        id SERIAL PRIMARY KEY,
                        visitor_id INT,
                        visited_id INT,
                        visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (visitor_id) REFERENCES users(id) ON DELETE CASCADE,
                        FOREIGN KEY (visited_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE likes (
                       id SERIAL PRIMARY KEY,
                       liker_id INT,
                       liked_id INT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (liker_id) REFERENCES users(id) ON DELETE CASCADE,
                       FOREIGN KEY (liked_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE blocks (
                        id SERIAL PRIMARY KEY,
                        blocker_id INT,
                        blocked_id INT,
                        FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
                        FOREIGN KEY (blocked_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
                          id SERIAL PRIMARY KEY,
                          sender_id INT,
                          receiver_id INT,
                          content TEXT NOT NULL,
                          sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
                          FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
                               id SERIAL PRIMARY KEY,
                               user_id INT,
                               type VARCHAR(50) NOT NULL,
                               content TEXT,
                               is_read BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);