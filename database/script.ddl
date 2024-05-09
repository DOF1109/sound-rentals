-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE `_user` (
    id          INTEGER NOT NULL,
    dni         INTEGER,
    name        VARCHAR(60),
    lastname    VARCHAR(60),
    phone       VARCHAR(60),
    email       VARCHAR(60),
    adress      VARCHAR(200),
    city_id     INTEGER NOT NULL,
    country_id  INTEGER NOT NULL,
    province_id INTEGER NOT NULL
);

ALTER TABLE `_user` ADD CONSTRAINT user_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE city (
    id   INTEGER NOT NULL,
    city VARCHAR(60)
);

ALTER TABLE city ADD CONSTRAINT city_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE country (
    id      INTEGER NOT NULL,
    country VARCHAR(30)
);

ALTER TABLE country ADD CONSTRAINT country_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE djs (
    id          INTEGER NOT NULL,
    dni         INTEGER,
    name        VARCHAR(60),
    lastname    VARCHAR(60),
    phone       VARCHAR(60),
    email       VARCHAR(60),
    charge      INTEGER,
    `comment`   VARCHAR(300),
    adress      VARCHAR(200),
    city_id     INTEGER NOT NULL,
    province_id INTEGER NOT NULL,
    country_id  INTEGER NOT NULL,
    mstyle_id   INTEGER NOT NULL,
    mstyle_id1  INTEGER NOT NULL,
    sample1     VARCHAR(300),
    sample2     VARCHAR(300),
    pic         VARCHAR(300)
);

ALTER TABLE djs ADD CONSTRAINT djs_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE mstyle (
    id    INTEGER NOT NULL,
    style VARCHAR(30)
);

ALTER TABLE mstyle ADD CONSTRAINT mstyle_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE province (
    id       INTEGER NOT NULL,
    province VARCHAR(60)
);

ALTER TABLE province ADD CONSTRAINT province_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE reservation (
    id          INTEGER NOT NULL,
    djs_id      INTEGER NOT NULL,
    user_id     INTEGER NOT NULL,
    fechahora   DATETIME(6),
    `comment`   VARCHAR(360),
    adress      VARCHAR(200),
    city_id     INTEGER NOT NULL,
    country_id  INTEGER NOT NULL,
    province_id INTEGER NOT NULL
);

ALTER TABLE reservation ADD CONSTRAINT reservation_pk PRIMARY KEY ( id );

ALTER TABLE djs
    ADD CONSTRAINT djs_city_fk FOREIGN KEY ( city_id )
        REFERENCES city ( id );

ALTER TABLE djs
    ADD CONSTRAINT djs_country_fk FOREIGN KEY ( country_id )
        REFERENCES country ( id );

ALTER TABLE djs
    ADD CONSTRAINT djs_mstyle_fk FOREIGN KEY ( mstyle_id )
        REFERENCES mstyle ( id );

ALTER TABLE djs
    ADD CONSTRAINT djs_mstyle_fkv2 FOREIGN KEY ( mstyle_id1 )
        REFERENCES mstyle ( id );

ALTER TABLE djs
    ADD CONSTRAINT djs_province_fk FOREIGN KEY ( province_id )
        REFERENCES province ( id );

ALTER TABLE reservation
    ADD CONSTRAINT reservation_city_fk FOREIGN KEY ( city_id )
        REFERENCES city ( id );

ALTER TABLE reservation
    ADD CONSTRAINT reservation_country_fk FOREIGN KEY ( country_id )
        REFERENCES country ( id );

ALTER TABLE reservation
    ADD CONSTRAINT reservation_djs_fk FOREIGN KEY ( djs_id )
        REFERENCES djs ( id );

ALTER TABLE reservation
    ADD CONSTRAINT reservation_province_fk FOREIGN KEY ( province_id )
        REFERENCES province ( id );

ALTER TABLE reservation
    ADD CONSTRAINT reservation_user_fk FOREIGN KEY ( user_id )
        REFERENCES `_user` ( id );

ALTER TABLE `_user`
    ADD CONSTRAINT user_city_fk FOREIGN KEY ( city_id )
        REFERENCES city ( id );

ALTER TABLE `_user`
    ADD CONSTRAINT user_country_fk FOREIGN KEY ( country_id )
        REFERENCES country ( id );

ALTER TABLE `_user`
    ADD CONSTRAINT user_province_fk FOREIGN KEY ( province_id )
        REFERENCES province ( id );