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
#include "TitleActorQuery.h"
#include "RatingTimeQuery.h"
using namespace std;

class DBManager {
private:
	Database movieDB;
	GenreYearQuery genreYearUserQuery;
	RatingTimeQuery ratingTimeQuery;
	TitleActorQuery titleActorQuery;
public:

	void navigateUI();
	void queryUI();
	void mainUI();

	void testNavigator();
	void testQuery();
	void run();
	DBManager();
	virtual ~DBManager();
};

#endif /* DBMANAGER_H_ */
