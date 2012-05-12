/*
 * TimeActorQuery.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef TITLEACTORQUERY_H_
#define TITLEACTORQUERY_H_

#include "Query.h"

class TitleActorQuery: public Query {
private:
	std::string actorUserQuery;
	string titleUserQuery;

public:
	void query();
	TitleActorQuery();
	virtual ~TitleActorQuery();
};

#endif /* TIMEACTORQUERY_H_ */
