/*
 * Record.h
 *
 *  Created on: Jul 14, 2010
 *      Author: gina
 */

#ifndef RECORD_H_
#define RECORD_H_
#include <string>
#include <iostream>
using namespace std;

class Record {
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

	void readInFromStream();
	friend istream& operator>>(istream& sin, Record& r);

	Record();
	virtual ~Record();
};

#endif /* RECORD_H_ */
