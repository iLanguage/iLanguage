/*
 * Query.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef QUERY_H_
#define QUERY_H_

#include "Database.h"

class Query {
protected:
	const Database* db;
	set<int> results;
	set<int> previousResults;

public:
	void setDB(const Database &databaseToQuery);
	void displayResults();
	void intersectResults(const set<int> &firstSet, const set<int> &secondSet);
	Query();
	virtual ~Query();
};

#endif /* QUERY_H_ */
