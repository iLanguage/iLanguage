/*
 * Calculator.cpp
 *
 *  Created on: Jun 2, 2010
 *      Author: gina
 */

#include "Calculator.h"
#include <iostream>
#include <string>
#include <cstring>
#include "LargeInt.h"

using namespace std;


Calculator::Calculator() {
	cout << "The Calculator is turned on."<<endl;

}

Calculator::~Calculator() {
	// nothing to destruct
}



void Calculator::run(){


	Calculator::printBackgroundInfo();
	Calculator::printSampleInteraction();
	Calculator::printMenu();

	//initalize the trace boolians
	Sequence::setTrace(true);
	//LargeInt::setTrace =true;

	runTests();
	runInteractively();

	exit();
}



void Calculator::printBackgroundInfo() const{
	cout <<"==========Welcome to the Calculator=================\n"
			"Advanced Programming\nAssignment 1 : Calculator\nDescription: A calculator demonstrating\n\t"
			"*the use of classes and objects in C++\n\t"
			"*manipulation of pointers\n\t"
			"*understanding of cstring and ascii table representation of characters\n\t"
			"*algorithm for manipulating arbitrarily large integers in any base system (decimal, binary, hexidecimal etc) \n\t"
			"*dynamic memory allocation and destruction \n"
			"==================================================="<<endl;

}


void Calculator::printSampleInteraction() const{
	cout<<"-------Sample interaction (as specified in the assignment requirements):--------\n"
			"Accumulator: +0\t\t\tCalculator starts with 0 value\n"
			"Enter input: +2\t\t\tUser inputs an operation (+,-,*,/,%) and an arbitrarily large integer (2)\n\n"
			"Accumulator: +2\t\t\tCalculator performs (0+2)\n"
			"Enter input: -3\t\t\tUser inputs a value (-3)\n\n"
			"Accumulator: -1\t\t\tCalculator performs (2-3)\n"
			"Enter input: \t\t\tCalculator waits for user input"<<endl;

}

void Calculator::printMenu() const{
	cout<<"---------Operations menu:----------\n"
			"\t+<input> Add <input>\n"
			"\t-<input> Subtract <input>\n"
			"\t*<input> Multiplication by <input> \n"
			"\t/<input> Division by <input>\n"
			"\t%<input> Modulus by <input>\n"
			"\t=<input> Reset to <input>\n\n"
			"\tn        Negate \n"
			"\tc        Clear (reset) to zero\n"
			"\tq        Quit\n"
			"\th        Help\n\n"

			"\tt        Run tests\n\n"

			"\ts        Trace Sequence class. Use this to trace how the data structure works (for TA to grade)\n"
			"\tl        Trace LargeInt class. Use this to trace how the arithmetic works (for the TA to grade)\n"
			"\to        Trace off\n"<<endl;
}


void Calculator::runInteractively(){

	bool keepCalculating=true;
	int resultTest = 0;

	string userInputString;

	LargeInt accumulator("0"); //declare outside the while loop to retain the value


	while(keepCalculating){



		cout<<"Accumulator: "<<accumulator.getAsStringy()<<//<resultTest<<
			"\nEnter input: ";
		getline(cin,userInputString);
		//cerr<<"\t\tUserInput: "<<userInputString<<endl;

		char operation = userInputString[0];
		userInputString[0]='0';
		//cerr<<"\tOperation: "<<operation<<endl;

		//my function from string to cstring
		char* userInputCstring= toCstring(userInputString);

		//builtin function from string to cstring, requires constant casting
		const char* userInputCstringConst = userInputString.c_str();
		userInputCstring = const_cast <char*>(userInputCstringConst);

		LargeInt userInput(userInputCstring);
		LargeInt result("0");

		switch (operation){
			case 'q' :
				keepCalculating=false;
				break;
			case 'h':
				printSampleInteraction();
				printMenu();
				break;
			case 'n':
				//accumulator.Negate();
				break;
			case 'c':
				accumulator.setValue("0");
				break;
			case '=':
				accumulator.setValue(userInputCstring);
				break;
			case '+':
				accumulator.Add(userInput);
				resultTest = 5;
				break;
			case '-':
				cout<<"Subtraction is not implemented"<<endl;
				resultTest = 6;
				break;
			case '*':
				cout<<"Multiplication is not implemented"<<endl;
				resultTest = 7;
				break;
			case '/':
				cout<<"Division is not implemented"<<endl;
				resultTest = 8;
				break;
			case '%':
				cout<<"Modulus is not implemented"<<endl;
				resultTest = 9;
				break;
			case 't' :
				runTests();
				break;
			case 's':
				Sequence::setTrace(true);
				cout<<"Problem setting the trace static data member, please do it manually in the headers."<<endl;
				break;
			case 'l':
				//LargeInt::setTrace(true);
				cout<<"Problem setting the trace static data member, please do it manually in the headers."<<endl;
				break;
			case 'o':
				Sequence::setTrace(false);
				//LargeInt::setTrace(false);
				cout<<"Problem setting the trace static data member, please do it manually in the headers."<<endl;
				break;
			default:
				cout<<"Please try again (something is wrong with your input)."<<endl;
		}
	}//end while keepcalculating
	return;

}

void Calculator::exit(){
	cout<<"---------Thanks for using the calculator.----------\n"
			" The calculator has now powered down."<<endl;
}


void Calculator::runTests(){
	cout<<"====+++=====Running Tests======++++====="<<endl;


	cout<<endl<<"Creating some largeints."<<endl;
	 LargeInt x("1123");
	 cout<<"\t x is "<<x.getOriginalString()<<" should match: "<<x.getAsStringy()<<endl;
	 LargeInt y("0064");
	 cout<<"\t y is "<<y.getOriginalString()<<" should match: "<<y.getAsStringy()<<endl;
	 LargeInt z("-2032");
	 cout<<"\t z is "<<z.getOriginalString()<<" should match: "<<z.getAsStringy()<<endl;
	 LargeInt w("27");
	 cout<<"\t w is "<<w.getOriginalString()<<" should match: "<<w.getAsStringy()<<endl;

	 cout<<endl<<"Testing the copy constructor\n\tCopying a LargeInt to a new one"<<endl;
	 LargeInt p(z);
	 cout<<"\t p is copied from z "<<p.getOriginalString()<<" should match: "<<p.getAsStringy()<<endl;

	 LargeInt x2("11123");
	 cout<<endl<<"Testing the assignment overloading =\n\tOverwriting what was in x "<<x.getOriginalString()<<" with what's in x2 "<<x2.getOriginalString()<<endl;
	 x=x2;
	 cout<<"\t x is "<<x.getOriginalString()<<" should match: "<<x.getAsStringy()<<endl;



	 cout<<endl<<"Testing mathematic operations."<<endl;

	 LargeInt accumulator2 = x;//the value that gets returned into this accumulator is screwed up. so isntead, i put the result value into the callers value
	 accumulator2.Add(y);
	 cout<<"This is the result: "<<accumulator2.getAsStringy()<<endl;//TBD interesting values printed here


	 accumulator2.Add(w);
	 cout<<"This is the result: "<<accumulator2.getAsStringy()<<endl;//TBD interesting values printed here


	 LargeInt carryAlot("999");
	 LargeInt q("3");
	 carryAlot.Add(q);
	 cout<<"This is the result: "<<carryAlot.getAsStringy()<<endl;//TBD interesting values printed here


	 LargeInt carryMore("9879");
	 LargeInt g("89878");
	 carryMore.Add(g);
	 cout<<"This is the result: "<<carryMore.getAsStringy()<<endl;//TBD interesting values printed here


	cout<<"====+++=====Tests Completed====++++====="<<endl;
}

char* Calculator::toCstring(string stringIn){
/*
	  // Convert to a char*
	    const size_t newsize = 100;
	    char nstring[newsize];
	    strcpy_s(nstring, orig.c_str());
	    strcat_s(nstring, " (char *)");
	    cout << nstring << endl;
	    */
	int stringSize = stringIn.length();
	char* temp;
	temp = new char[stringSize];

	temp[0] = '4';
	return temp;
}
