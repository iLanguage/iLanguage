/*
 * Fraction.h
 *
 *  Created on: Jul 29, 2010
 *      Author: gina
 */

#ifndef FRACTION_H_
#define FRACTION_H_

#include <iostream>
using namespace std;
class Fraction {
private:
	int denominator;
	int numerator;
public:

	/*
	void operator+();
	void operator+();
	void operator-();
	void operator-();
	void operator*();
	void operator/();
	void operator+=();
	void operator-=();
	void operator*=();
	void operator/=();
	void operator==();
	void operator<();
	void operator!=();
	void operator<=();
	void operator>();
	void operator>=();
	void operator++();
	void operator--();

	void operator()();
	void operator<<();
	void operator>>();
	*/
	int& operator[](int n);
	const int& operator[](int n);
	int operator()();
	Fraction& operator=(Fraction& otherFraction);

	int gcd(int a, int b);
	Fraction& reciprocal();

	void normalize();
	void standardize();
	void reduce();

	friend ostream& operator<<(ostream& sout, Fraction& f);

	Fraction();
	Fraction(int a, int b);
	virtual ~Fraction();
};

#endif /* FRACTION_H_ */
