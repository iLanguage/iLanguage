/*
 * TimeActorQuery.cpp
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#include "TitleActorQuery.h"

void TitleActorQuery::query(){
	actorUserQuery=" ";
	titleUserQuery=" ";

	cout<<"Enter movie title (ex:da vinci, \" \" for all results) ";
	getline(cin, titleUserQuery);

	cout<<"Enter an actor or part of an actor's name (ex: tom, \" \" for all results) ";
	getline(cin,actorUserQuery);

	set<int> actorResults;
	db->queryActor(actorUserQuery,actorResults);

	set<int> titleResults;
	db->queryTitle(titleUserQuery, titleResults);

	intersectResults(actorResults, titleResults);
}

TitleActorQuery::TitleActorQuery() {
}

TitleActorQuery::~TitleActorQuery() {
	// TODO Auto-generated destructor stub
}
