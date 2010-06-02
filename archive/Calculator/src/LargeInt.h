/*
 * LargeInt.h
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#ifndef LARGEINT_H_
#define LARGEINT_H_

#include "Sequence.h"

class LargeInt {
private:
	Sequence value;
public:
	LargeInt();
	LargeInt(char* characterInput);
	virtual ~LargeInt();
	char* toString();

};

#endif /* LARGEINT_H_ */
