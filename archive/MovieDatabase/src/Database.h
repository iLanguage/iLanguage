/*
 * Database.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef DATABASE_H_
#define DATABASE_H_
#include <vector>
#include <map>
#include <set>
#include <string>
#include "Record.h"

using namespace std;
typedef vector<string>::size_type vecSizeType;

class Database {
private:
	//store records in a vector
	vector<Record*>  movieDatabase;
	//create indexes on queryable items, using a map from string -> {set of vector indexes in teh db}
	map<int,set<int> > yearIndex;
	map<int, set<int> >::iterator yearIterator;
	/*timeIndex;
	actorIndex;
	ratingIndex;
	genreIndex;*/

public:
	void first();
	void next();
	void previous();
	void last();
	void current();
	vecSizeType size();

	//queries will look in index for the vector index and returns a set of hits
	void queryTime();
	void queryYear();
	void queryActor();
	void queryRating();
	void queryGenre();

	void buildYearIndex();

	void importRecords(char* filename);
	void insertRecord(string& recordAsString);

	Database();
	virtual ~Database();
};

#endif /* DATABASE_H_ */
