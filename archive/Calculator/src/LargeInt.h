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
	const static int baseSystem =10;
	const static bool trace = true;

public:
	//LargeInt();
	LargeInt(char* characterInput);
	void setValue(char* characterInput);//like a copy constructor, but takes only a cstring to reset the value of an existing object
	explicit LargeInt (int n=10);
	LargeInt(const LargeInt& source);//copy constructor
	LargeInt& operator=(const LargeInt& source); //assignment operator overload

	virtual ~LargeInt();
	char* toString();

	LargeInt& Add(LargeInt &input);
	//LargeInt& Subtract(LargeInt &input);

	int getSize();
	char* getOriginalString();
	char* getAsStringy();
};

#endif /* LARGEINT_H_ */
