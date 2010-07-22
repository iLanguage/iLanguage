/*
 * TimeActorQuery.h
 *
 *  Created on: Jul 15, 2010
 *      Author: gina
 */

#ifndef TIMEACTORQUERY_H_
#define TIMEACTORQUERY_H_

#include "Query.h"

class TimeActorQuery: public Query {
private:
	std::string actorUserQuery;
	int timeUserQuery;

public:
	void query();
	TimeActorQuery();
	virtual ~TimeActorQuery();
};

#endif /* TIMEACTORQUERY_H_ */
