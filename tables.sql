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
    coordinates_parcel TEXT -- Guardaremos POLYGON WKT
);
---
CREATE TABLE messages (
    uid_message UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_creator VARCHAR(255) NOT NULL REFERENCES users(email_user),
    email_receiver VARCHAR(255) NOT NULL REFERENCES users(email_user),
    content_message TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
---
CREATE TABLE reports (
	uid_report UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_creator VARCHAR(255) NOT NULL REFERENCES users(email_user),
    email_receiver TEXT[] NOT NULL,
    content_message TEXT,
    attached TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


---
SELECT * FROM roles;

SELECT * FROM users;
SELECT * FROM parcels;

-- Datos de prueba para parcelas:
INSERT INTO parcels (uid_parcel, uid_producer, name_parcel, product_parcel, coordinates_parcel)
VALUES
(
    'parcel001',
    '0ZodTLyMMaQ49pecJsthqPzfdh03',
    'Parcela A',
    'Maíz',
    'POLYGON((-72.60537242850114 -37.220596252953385,-72.60537242850114 -37.216194509829975,-72.59459209415944 -37.216194509829975,-72.59459209415944 -37.220596252953385,-72.60537242850114 -37.220596252953385))'
);

