ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS pk_planet_votes_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;


DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
  id serial NOT NULL,
  username text NOT NULL UNIQUE ,
  password text NOT NULL
);

DROP TABLE IF EXISTS public.planet_votes;
CREATE TABLE planet_votes (
  id serial NOT NULL,
  planet_id integer,
  planet_name text,
  user_id integer,
  submission_time timestamp without time zone
);

ALTER TABLE ONLY users
  ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
  ADD CONSTRAINT pk_planet_votes_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);

SELECT pg_catalog.setval('users_id_seq', (SELECT MAX(id) from "users"), true);

SELECT pg_catalog.setval('planet_votes_id_seq', (SELECT MAX(id) from "planet_votes"), true);
