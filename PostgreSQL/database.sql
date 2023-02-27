
CREATE TABLE "JOUEURS" (
    "ID"             int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    "NOM"            varchar(20) NOT NULL,
    "MDP"            varchar NOT NULL,
    "EMAIL"          varchar NOT NULL,
    "TEL"            varchar(12) NOT NULL,
    "AVATAR"         varchar NOT NULL,
    "DATE_CREATION"  date NOT NULL,
    "HEURE_CREATION" time NOT NULL,
    "ETAT"           int NOT NULL,
    "VICTOIRES"      int NOT NULL,
    "DEFAITES"       int NOT NULL,
    "NIVEAU"         int NOT NULL,
    "EXP"            int NOT NULL
);

CREATE TABLE "PARTIE" (
    "ID"                 int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    "JOUEUR1"            int NOT NULL,
    "JOUEUR2"            int NOT NULL,
    "JOUEUR_1_SCORE"     int NOT NULL,
    "JOUEUR_2_SCORE"     int NOT NULL,
    "STATUS"             int NOT NULL,
    "DATE_DEBUT"         timestamp NOT NULL,
    "DATE_FIN"           timestamp NOT NULL,
    CONSTRAINT "FK_JOUEUR1" FOREIGN KEY("JOUEUR1") REFERENCES "JOUEURS"("ID"),
    CONSTRAINT "FK_JOUEUR2" FOREIGN KEY("JOUEUR2") REFERENCES "JOUEURS"("ID")
);

CREATE TABLE "MESSAGES" (
    "ID"            int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    "EXPEDITEUR"    int NOT NULL,
    "DESTINATAIRE"  int NOT NULL,
    "MESSAGE"       text NOT NULL,
    "DATE_DEBUT"    timestamp NOT NULL,
    "DATE_FIN"      timestamp NOT NULL,
    CONSTRAINT "FK_EXPEDITEUR" FOREIGN KEY("EXPEDITEUR") REFERENCES "JOUEURS"("ID"),
    CONSTRAINT "FK_DESTINATAIRE" FOREIGN KEY("DESTINATAIRE") REFERENCES "JOUEURS"("ID")
);
