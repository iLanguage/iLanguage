//============================================================================
// Name        : MathematicalFractions.cpp
// Author      : gina
// Version     :
// Copyright   : 
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <iostream>
#include "Fraction.h"
#include <assert.h>
//#define NDEBUG
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
	assert(f == Fraction(3,4));

	Fraction f1 = f * f;
	cout << "\nf1 = " << f1 << endl;
	assert( f1 == Fraction(9,16));

	Fraction f2 = f1 / f / f;
	cout << "\nf2 = " << f2 << endl;
	assert( f2 == Fraction(1) );

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
	cout << "\nf5 = " << f5 << endl;
	assert( f5 == Fraction());

	f3 -= f;
	cout << "\nf3 = " << f3 << endl;
	assert( f3 == Fraction(-1,4));

	f3 /= f;
	cout << "\nf3 = " << f3 << endl;
	assert( f3 == Fraction(1,-3));

	Fraction f6;
	cin >> f6;
	cout << "\nf6 = " << f6 << endl;

	cout << "\nf6 + 1 = " << (f6 + 1) << endl;
	assert( f6 <= f6 + 1);

	cout << "\n1 + f6 = " << (1 + f6) << endl;
	assert( f6 < 1 + f6);

	cout << "\nf6 - 1 = " << (f6 - 1) << endl;
	assert( f6 >= f6 - 1);

	cout << "\n-1 + f6 = " << (-1 + f6) << endl;
	assert( f6 > -1 + f6);

	cout << "\nf6 = " << f6 << endl;
	assert( f6 <= f6 + 1);

	cout << "\n-f6 = " << -f6 << endl;
	assert( f6 != -f6);
	assert( f6 == +f6);

	Fraction f7 = ++++f3;
	cout << "\nf3 = " << f3 << endl;
	cout << "\nf7 = " << f7 << endl;
	assert( f3 == Fraction(5,3));

	Fraction f8 = f7--;
	cout << "\nf8 = " << f8 << endl;
	cout << "\nf7 = " << f7 << endl;
	assert( f8 - 1 == f7);

	Fraction f9 = 2 + 1 / ( 1 + 1 / (3 + Fraction(1,4)));
	cout << "\nf9 = " << f9 << endl;
	assert( f9 == Fraction(47,17));

	cout << "\nSuccess at last!" << endl;
	return 0;
}


































