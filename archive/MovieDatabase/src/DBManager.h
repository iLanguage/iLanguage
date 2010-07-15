/*
 * DBManager.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef DBMANAGER_H_
#define DBMANAGER_H_
#include "Database.h"
using namespace std;

class DBManager {
private:
	Database movieDB;
public:
	void run();
	DBManager();
	virtual ~DBManager();
};

#endif /* DBMANAGER_H_ */
