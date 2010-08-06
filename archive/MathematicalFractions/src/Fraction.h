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
	void operator-();

	void operator-=();
	void operator*=();
	void operator/=();
	void operator<();
	void operator!=();
	void operator<=();
	void operator>();
	void operator>=();
	void operator++();
	void operator--();

	void operator>>();
	*/


	Fraction& operator*=(const Fraction& f);
	Fraction& operator+=(const Fraction& f);

	friend const Fraction operator*(const Fraction& f, const Fraction& g);
	friend const Fraction operator+(const Fraction& f, const Fraction& g);
	friend const Fraction operator-(const Fraction& f, const Fraction& g);
	friend const Fraction operator/(const Fraction& f, const Fraction& g);
	const Fraction operator-() const;
	const Fraction operator+() const;

	friend bool operator==(const Fraction& f, const Fraction& g);

	int& operator[](int n);
	const int& operator[](int n) const;
	int operator()();
	Fraction& operator=(const Fraction& otherFraction);

	friend ostream& operator<<(ostream& sout, const Fraction& f);

	int gcd(int a, int b);
	Fraction& reciprocal();
	void normalize();
	void standardize();
	void reduce();

	Fraction();
	Fraction(int a, int b);
	Fraction(int a);
	virtual ~Fraction();
};

#endif /* FRACTION_H_ */
