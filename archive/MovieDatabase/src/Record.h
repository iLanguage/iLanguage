/*
 * Record.h
 *
 *  Created on: Jul 14, 2010
 *      Author: gina
 */

#ifndef RECORD_H_
#define RECORD_H_
#include <string>
#include <vector>
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

	void vectorToRecord(const vector<string>& tokenized);

public:
	int getId()const ;
	string getTitle()const;
	string getGenre()const;
	int getYear()const;
	string getPlot()const;
	int getRunningTime()const;
	string getRating()const;
	string getActors()const;

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
	friend ostream& operator<<(ostream& sout, Record& r) ;

	Record(string& stringRecord);
	Record();
	virtual ~Record();
};

#endif /* RECORD_H_ */
