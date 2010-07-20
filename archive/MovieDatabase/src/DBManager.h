/*
 * DBManager.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef DBMANAGER_H_
#define DBMANAGER_H_
#include "Database.h"
#include "GenreYearQuery.h"
using namespace std;

class DBManager {
private:
	Database movieDB;
	GenreYearQuery genreYearUserQuery;
public:



	void testNavigator();
	void testQuery();
	void run();
	DBManager();
	virtual ~DBManager();
};

#endif /* DBMANAGER_H_ */
