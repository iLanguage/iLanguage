/*
 * DBManager.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "DBManager.h"
#include "Database.h"
#include <iostream>
using namespace std;

void DBManager::run(){
	cout<<"DBManager is turned on."<<endl;
	movieDB.buildYearIndex();
}

DBManager::DBManager(){
	Database movieDB;
}

DBManager::~DBManager() {
	// TODO Auto-generated destructor stub
}
