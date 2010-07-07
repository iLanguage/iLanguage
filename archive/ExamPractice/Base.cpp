#include "Base.h"
#include <iostream>
using namespace std;

void Base::run(){
cout<<"In the base.\n";
}

int Base::getX(){
	return 2;
}


Base::Base(){
	cout<<"In the Base's default constructor\n";
}
Base::~Base(){
	cout<< "In the Base' destructor\n";
}

