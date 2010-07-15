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
#include "Record.h"

using namespace std;
class Database {
private:
	//store records in a vector
	vector<Record*>  moveieDatabase;
	//create indexes on queryable items, using a map from string -> {set of vector indexes in teh db}
	/*timeIndex;
	yearIndex;
	actorIndex;
	ratingIndex;
	genreIndex;*/

public:
	void first();
	void next();
	void previous();
	void last();
	void current();

	//queryies will look in index for the vector index and returns a set of hits
	void queryTime();
	void queryYear();
	void queryActor();
	void queryRating();
	void queryGenre();

	void buildYearIndex();

	Database();
	virtual ~Database();
};

#endif /* DATABASE_H_ */
