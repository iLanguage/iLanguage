/*
 * Fraction.cpp
 *
 *  Created on: Jul 29, 2010
 *      Author: gina
 */

#include "Fraction.h"
#include <iostream>

void Fraction::normalize(){
	standardize();
	reduce();
}
void Fraction::reduce(){
	int reduceBy=gcd(numerator,denominator);
	//cout<<"The Fraction will be divided by: "<<reduceBy<<endl;
	if (reduceBy!=0){
		numerator=numerator/reduceBy;
		denominator=denominator/reduceBy;
	}
}
/*
 * If the denominator is negative, transfer the negative to the numerator simply by negating the Numerator
 * 			If the numerator was positive it will become negative
 * 			If the numerator was negative it will be come positive
 */
void Fraction::standardize(){
	if(denominator <0){
		denominator=-denominator;
		numerator=-numerator;
	}
}

int Fraction::gcd(int a, int b){
	//cout << "A: "<<a<<" B: "<<b<<endl;
	if (b < 0){
		b=-b;
	}
	//cout << "A: "<<a<<" B: "<<b<<endl;
	int t;
	while (b != 0){
		t=a % b;
		a = b;
		b = t;
	}
	//cout << "A: "<<a<<" B: "<<b<<" T: "<<t<<endl;

	return a;
}
bool operator==(const Fraction& a, const Fraction& b){
	Fraction f = a;
	Fraction g = b;
	f.normalize();
	g.normalize();
	return (g.numerator==f.numerator && g.denominator==f.denominator);
}
int& Fraction::operator[](int n){
	if (n%2==1){
		return denominator;
	}else if(n%2==0){
		return numerator;
	}else {
		return denominator;
	}
}
const int& Fraction::operator[](int n)const{
	if (n%2==1){
		return denominator;
	}else if(n%2==0){
		return numerator;
	}else {
		return denominator;
	}
}
int Fraction::operator()(){
	return gcd(numerator, denominator);
}
Fraction& Fraction::operator*=(const Fraction& f){
	numerator=numerator*f.numerator;
	denominator=denominator*f.denominator;
	return *this;
}
Fraction& Fraction::operator+=(const Fraction& f){
	numerator=numerator*f.denominator+denominator*f.numerator;
	denominator=denominator*f.denominator;
	return *this;
}

const Fraction operator*(const Fraction& f, const Fraction& g){
	Fraction temp = Fraction(f.numerator*g.numerator,f.denominator*g.denominator);
	temp.normalize();
	return temp;
}
const Fraction operator/(const Fraction& f, const Fraction& g){
	Fraction temp = Fraction(f.numerator*g.denominator,f.denominator*g.numerator);
	temp.normalize();
	return temp;
}
const Fraction operator+(const Fraction& f, const Fraction& g){
	Fraction temp = Fraction(f.numerator*g.denominator+f.denominator*g.numerator,f.denominator*g.denominator);
	temp.normalize();
	return temp;
}
Fraction& Fraction::reciprocal(){
	Fraction *switched= new Fraction(denominator,numerator);
	return *switched;
}
ostream& operator<<(ostream& sout, const Fraction& f) {
		sout<<f.numerator <<"/"<<f.denominator;
		return sout;
}
Fraction& Fraction::operator=(const Fraction& otherFraction){
	denominator=otherFraction.denominator;
	numerator=otherFraction.numerator;
	return *this;
}
Fraction::Fraction(int a, int b){
	numerator=a;
	denominator=b;
	//cout<<"Set numerator: "<<a<<" and denominator "<<b<<endl;
}
Fraction::Fraction(int a){
	numerator=a;
	denominator=1;
	//cout<<"Set numerator: "<<a<<" and denominator "<<b<<endl;
}
Fraction::Fraction() {
	numerator=0;
	denominator=1;
}

Fraction::~Fraction() {
	// TODO Auto-generated destructor stub
}
