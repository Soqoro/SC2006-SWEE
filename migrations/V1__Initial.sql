CREATE TABLE user_profile (
    id text NOT NULL PRIMARY KEY,

    favorite_book_isbns text[] DEFAULT '{}' NOT NULL,
    recent_book_isbns text[] DEFAULT '{}' NOT NULL
);


-- This isn't the most optimal way to represent a bidirectional relationship but KISS.
CREATE TABLE user_profile_user_profile (
    PRIMARY KEY (first_user_id, second_user_id),
    first_user_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,
    second_user_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,

    pending bool DEFAULT true NOT NULL -- Once again, this should be an enum but KISS.
);



CREATE TABLE book_rating (
    PRIMARY KEY (user_id, isbn),
    user_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,
    isbn text NOT NULL,

    rating double precision,

    created_at timestamp NOT NULL
);


CREATE TABLE book_comment (
    id uuid PRIMARY KEY NOT NULL,
    user_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,

    isbn text NOT NULL,
    content text NOT NULL,

    created_at timestamp NOT NULL
);

CREATE INDEX book_rating_isbn ON book_rating(isbn);


CREATE TABLE user_group (
    id uuid PRIMARY KEY NOT NULL,

    name text NOT NULL,
    description text NOT NULL,

    created_at timestamp NOT NULL
);

CREATE TABLE user_group_user_profile (
    PRIMARY KEY (group_id, user_id),
    group_id uuid REFERENCES user_group(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,
    user_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,

    permissions text[] DEFAULT '{}' NOT NULL -- This should be a separate table if it's actual production code but KISS.
);

CREATE TABLE user_group_discussion (
    id uuid PRIMARY KEY NOT NULL,
    group_id uuid REFERENCES user_group(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,

    name text NOT NULL,
    creator_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL
);

CREATE TABLE user_group_discussion_comment (
    id uuid PRIMARY KEY NOT NULL,
    discussion_id uuid REFERENCES user_group_discussion(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,

    name text NOT NULL,
    creator_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL
);

CREATE TABLE user_group_discussion_comment_like (
    PRIMARY KEY (comment_id, liker_id),
    comment_id uuid REFERENCES user_group_discussion_comment(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL,
    liker_id text REFERENCES user_profile(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED NOT NULL
);
