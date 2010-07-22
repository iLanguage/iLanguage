/*
 * GenreYearQuery.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef GENREYEARQUERY_H_
#define GENREYEARQUERY_H_

#include "Query.h"
#include <string>
using std::string;

class GenreYearQuery: public Query {
private:
	string genreUserQuery;
	int yearUserQuery;
	//Database db;

public:
	void setDB(const Database &databaseToQuery);
	void query();
	GenreYearQuery();
	virtual ~GenreYearQuery();
};

#endif /* GENREYEARQUERY_H_ */
