CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE roles (
    uid_rol UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rol_type VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (rol_type) VALUES
('productor'),
('distribuidor'),
('asesor'),
('analista'),
('director');
---

CREATE TABLE users (
    firebase_uid_user VARCHAR(255) PRIMARY KEY,
    name_user VARCHAR(100),
    email_user VARCHAR(255) UNIQUE NOT NULL,
    uid_rol UUID NOT NULL REFERENCES roles(uid_rol)
);
---

CREATE TABLE director_producer (
    uid_director VARCHAR(255) NOT NULL REFERENCES users(firebase_uid_user),
    uid_producer VARCHAR(255) NOT NULL REFERENCES users(firebase_uid_user),
    PRIMARY KEY (uid_director, uid_producer)
);
---

CREATE TABLE parcels (
    uid_parcel VARCHAR(255) PRIMARY KEY,
    uid_producer VARCHAR(255) NOT NULL REFERENCES users(firebase_uid_user),
    name_parcel VARCHAR(100),
    product_parcel VARCHAR(100),
    coordinates_parcel TEXT
);
---