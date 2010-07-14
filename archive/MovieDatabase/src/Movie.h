/*
 * Movie.h
 *
 *  Created on: Jul 14, 2010
 *      Author: gina
 */

#ifndef MOVIE_H_
#define MOVIE_H_
#include <string>

class Movie {
private:
	int id;
	string title;
	string genre;
	int year;
	string plot;
	int runningTime;
	string rating;
	string actors;

public:
	int getId();
	string getTitle();
	string getGenre();
	int getYear();
	string getPlot();
	int getRunningTime();
	string getRating();
	string getActors();

	void setId(int idIn);
	void setTitle(string titleIn);
	void setGenre(string genreIn);
	void setYear(int yearIn);
	void setPlot(string plotIn);
	void setRunningTime(int runningTimeIn);
	void setRating(string ratingIn);
	void setActors(string actorsIn);

	Movie();
	virtual ~Movie();
};

#endif /* MOVIE_H_ */
