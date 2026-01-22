DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS parcels;
DROP TABLE IF EXISTS director_producer;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

DROP EXTENSION IF EXISTS "uuid-ossp";


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE roles (
    uid_rol UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rol_type VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (uid_rol, rol_type) VALUES
('9717e4fb-c034-46e9-9350-9375f797a384', 'productor'),
('d9ac3cf9-80a5-46b0-b7f3-fc9e9ef05768', 'distribuidor'),
('f4409e7e-ec44-4f3b-86a6-a3692a81a7e1', 'asesor'),
('f868c9f0-be0b-4817-bbd2-aa8775e527d8', 'analista'),
('fe95e061-f046-46cb-9253-5ede9be81a12', 'director');

---

CREATE TABLE users (
    firebase_uid_user VARCHAR(255) PRIMARY KEY,
    name_user VARCHAR(100),
    email_user VARCHAR(255) UNIQUE NOT NULL,
    uid_rol UUID NOT NULL REFERENCES roles(uid_rol)
);
ALTER TABLE users
ADD COLUMN photo_url TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dbi5thf23/image/upload/v1769005926/timothy-oldfield-luufnHoChRU-unsplash_l1tliv.jpg';

INSERT INTO users (firebase_uid_user, name_user, email_user, uid_rol) VALUES
(
    '0ZodTLyMMaQ49pecJsthqPzfdh03',
    'Olga',
    'olga@tb.com',
    '9717e4fb-c034-46e9-9350-9375f797a384'
),
(
    'dfDPwARjdLPqcA2JJExcPaDVNNo2',
    'Holly',
    'holly@tb.com',
    'd9ac3cf9-80a5-46b0-b7f3-fc9e9ef05768'
),
(
    '2hUFVMeqnFPNLh0YHfqxVQqN11l2',
    'Alina',
    'alina@tb.com',
    'fe95e061-f046-46cb-9253-5ede9be81a12'
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
ALTER TABLE reports
ADD COLUMN is_draft BOOLEAN NOT NULL DEFAULT TRUE;

---
SELECT * FROM roles;

SELECT * FROM users;
SELECT * FROM parcels;

-- Datos de prueba para parcelas:
-- INSERT INTO parcels (uid_parcel, uid_producer, name_parcel, product_parcel, coordinates_parcel)
-- VALUES
-- (
--     'parcel001',
--     '0ZodTLyMMaQ49pecJsthqPzfdh03',
--     'Parcela A',
--     'Maíz',
--     'POLYGON((-72.60537242850114 -37.220596252953385,-72.60537242850114 -37.216194509829975,-72.59459209415944 -37.216194509829975,-72.59459209415944 -37.220596252953385,-72.60537242850114 -37.220596252953385))'
-- );


INSERT INTO parcels (
    uid_parcel,
    uid_producer,
    name_parcel,
    product_parcel,
    coordinates_parcel
)
VALUES (
    'parcel001',
    '0ZodTLyMMaQ49pecJsthqPzfdh03',
    'Parcela A',
    'Maíz',
    '[[-37.220596252953385,-72.60537242850114],[-37.216194509829975,-72.60537242850114],[-37.216194509829975,-72.59459209415944],[-37.220596252953385,-72.59459209415944],[-37.220596252953385,-72.60537242850114]]'
);