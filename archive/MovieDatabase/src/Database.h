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
#include "MyTokenizer.h"

using namespace std;
typedef vector<string>::size_type vecSizeType;

class Database {
private:
	string databaseName;
	//store records in a vector
	vector<Record*>  movieDatabase;
	//create indexes on queriable items, using a map from string -> {set of vector indexes in teh db}
	map<string,set<int> > titleIndex;
	map<int,set<int> > yearIndex;
	map<int,set<int> > runningTimeIndex;
	map<string,set<int> > actorIndex;
	map<string,set<int> > ratingIndex;
	map<string,set<int> > genreIndex;

public:
	string getDatabaseName() const;
	void setDatabaseName(string newName);

	void findMatch(string stringToMatch, const map<string,set<int> > &indexToLookIn, set<int> &resultsToReturn) const;
	void findMatchInt(int intToMatch, const map<int,set<int> > &indexToLookIn, set<int> &resultsToReturn)const;


	static vecSizeType currentPosition;
	void first() const;
	void next() const;
	void previous() const;
	void last() const;
	void current() const;
	vecSizeType size() const;

	//queries will look in index and returns a set of hits of record positions in the DB's vector
	void queryTime(int runningTimeQuery, set<int> &resultSet)  const;
	void queryYear(int yearQuery, set<int> &resultSet) const;
	void queryActor(string actorQuery, set<int> &resultSet) const;
	void queryRating(string ratingQuery, set<int> &resultSet) const;
	void queryGenre(string genreQuery, set<int> &resultSet) const;

	void buildIndices();

	void importRecords(char* filename);
	void insertRecord(string& recordAsString);

	Record& operator[](int x);
	const Record& operator[](int x) const;

	Database();
	virtual ~Database();
};

#endif /* DATABASE_H_ */
