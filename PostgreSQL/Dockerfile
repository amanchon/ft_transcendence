FROM debian:buster

#### INSTALLATION ####

RUN apt-get update;                 \
	apt-get install net-tools;       \
	apt install wget ca-certificates; \
	###https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04
	apt install postgresql postgresql-contrib; \
	apt-get install -y vim;            \
	rm -f ./etc/mysql/my.cnf;

COPY ./database.sql /

#### CONFIGURATION ####

RUN echo "\nlisten_addresses = '*'" >> /etc/postgresql/10/main/postgresql.conf; \
	echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/10/main/pg_hba.conf; \
	chown postgres:postgres /database.sql;\
	chmod 777 /database.sql;

EXPOSE 5432
COPY ./start.sh /
RUN ["chmod", "+x", "./start.sh"]
ENTRYPOINT ["./start.sh"]
