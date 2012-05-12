CC=g++
CFLAGS=-I

all: MyTokenizer.o Query.o GenreYearQuery.o RatingTimeQuery.o TitleActorQuery.o Record.o Database.o  DBManager.o  MovieDatabaseDriver.o
	$(CC) -o MovieDatabase MyTokenizer.o Query.o GenreYearQuery.o RatingTimeQuery.o TitleActorQuery.o Record.o Database.o  DBManager.o  MovieDatabaseDriver.o  -I.
