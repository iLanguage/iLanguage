#include <iostream>
#include "Base.h"
using namespace std;
//g++ -Wall main.cpp hello_fn.c -o newhello
//to compile the source code and link them together into an executable
//	note, the header file doesnt need to be compiled

void testInheritance();
void testConst();

int main (void)
{
	cout<<"Welcome to the exam practice code.\n";
	testConst();
	//testInheritance();	
	
	return 0;
}

void testConst(){
	cout<<"Testing const --------------------------\n";
	cout<<"    Creating x which is a variable, int x =2;\n";
	int x =2;
	cout<<"    Creating y which is a constant, int const y=4;\n";
	int const y = 4;
	cout<<"    Copying y into x, x=y;\n";
	x=y;

	cout<<"   Creating a constant pointer to a constant integer\n"<<endl;
}
void testInheritance(){
	cout<<"Testing Inheritance -------------------------\n";
	cout<<"   Creating an object Base object();\n";
   	Base  doesntCreateObject();
     cout<<"   Creating an object Base * object();\n";
     Base* mybase= new Base();
     cout<<"   Using a function on the object\n";
     cout <<mybase->getX();
}
