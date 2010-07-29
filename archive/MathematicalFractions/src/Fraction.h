/*
 * Fraction.h
 *
 *  Created on: Jul 29, 2010
 *      Author: gina
 */

#ifndef FRACTION_H_
#define FRACTION_H_

class Fraction {
public:

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
	void operator[]();
	void operator()();
	void operator<<();
	void operator>>();

	void gcd();
	void reciprocal();

	void normalize();
	void standardize();
	void reduce();

	Fraction();
	virtual ~Fraction();
};

#endif /* FRACTION_H_ */
