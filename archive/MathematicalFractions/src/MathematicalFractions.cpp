//============================================================================
// Name        : MathematicalFractions.cpp
// Author      : gina
// Version     :
// Copyright   : 
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <iostream>
#include "Fraction.h"
using namespace std;

int main() {
	cout << "It runs." << endl;
// prints It runs.


	Fraction f(-18, -24);
	cout << "the reciprocal of "<< f<< " is "<< f.reciprocal() << endl;
	cout << "\ngcd(" << f[0] << ", " << f[1] << ") = "<< f() <<endl;

	f[0] *= 10;
	f[1] *= 10;
	cout << "\n" << f << " in normalized form is " ;
	f.normalize();
	cout << f << endl;
/*	assert( f == Fraction(3,4));

	Fraction f1 = f * f;
	cout << "\nf1 = " << f1 << endl;
	assert( f1 == Fraction(9,16));

	Fraction f2 = f1 / f / f;
	cout << "\nf2 = " << f2 << endl;
	assert( f2 == Fraction(1));

	Fraction f3 = f2 / 2;
	cout << "\nf3 = " << f3 << endl;
	assert( f3 == Fraction(1, 2));

	Fraction f4;
	f4 += f2 + f3;
	cout << "\nf4 = " << f4 << endl;
	assert( f4 == Fraction(3, 2));

	f4.normalize();
	Fraction f5;
	f5 *= f4 * f;
	//continue from specs
	*/
	return 0;
}
