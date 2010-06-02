/*
 * Calculator.cpp
 *
 *  Created on: Jun 2, 2010
 *      Author: gina
 */

#include "Calculator.h"
#include <iostream>
#include <string>
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

	runTests();
	runInteractively();

	exit();
}



void Calculator::printBackgroundInfo() const{
	cout <<"==========Welcome to the Calculator================="
			"Advanced Programming\nAssignment 1 : Calculator\nDescription: A calculator demonstrating\n\t"
			"*the use of classes in C++\n\t"
			"*manipulation of pointers\n\t"
			"*algorithm for manipulating arbitrarily large integers in any base system (decimal, binary, hexidecimal etc) \n\t"
			"*dynamic memory allocation and destruction "
			"==================================================="<<endl;

}


void Calculator::printSampleInteraction() const{
	cout<<"-------Sample interaction (as specified in the assignment requirements):\n--------"
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
			"\th        Help" <<endl;
}


void Calculator::runInteractively(){

	bool keepCalculating=true;
	int result = 0;

	string userInput;

	while(keepCalculating){


		cout<<"Accumulator: "<<result<<
			"\nEnter input: ";
		getline(cin,userInput);
		cerr<<"\t\tUserInput: "<<userInput<<endl;

		char operation = userInput[0];
		cerr<<"\tOperation: "<<operation<<endl;

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
				//accumulator(0);
				break;
			case '+':
				//accumulator.Add(userInput);
				result = 5;
				break;
			case '-':
				result = 6;
				break;
			case '*':
				result = 7;
				break;
			case '/':
				result = 8;
				break;
			case '%':
				result = 9;
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

	//add 1123 to 25

	char* aNumber;
	char* anotherNumber;

	aNumber = "1123";

	 //LargeInt accumulator = new LargeInt(aNumber);

	cout<<"====+++=====Tests Completed====++++====="<<endl;
}


