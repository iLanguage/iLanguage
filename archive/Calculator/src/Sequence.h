/*
 * Sequence.h
 *
 *  Created on: Jun 1, 2010
 *      Author: gina
 */

#ifndef SEQUENCE_H_
#define SEQUENCE_H_

class Sequence {
	bool negative;
	int size;
	int* store;

public:
	void init(char* characterInput);
	Sequence();
	virtual ~Sequence();
};

#endif /* SEQUENCE_H_ */
