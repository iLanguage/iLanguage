//============================================================================
// Name        : Calculator Project
// Author      : gina
// Version     :
// Copyright   : CalculatorAndDataStructure
// Description : Advanced Programming Project
/*
 * Goals: 	Create a command line user interface
 * 			Demonstrate understanding of destructors in C++
 * 			Demonstrate understanding of pointers and pointer manipulation in C++
 *
 * Included Files:
 * 	CalculatorProject.cpp - User Interface and Presentation Logic
 * 	LargeInt.cpp and .h - Class for arithmetic operations for use by the Calculator user interface
 *  Sequence.cpp and .h - Class for dynamically allocating an arbitrarily large integer for use by the LargeInt class
 */
//============================================================================

#include <iostream>
#include <string>
#include "LargeInt.h"
#include "Calculator.h"
using namespace std;



void runInteractively();
void runTests();

void exit();


int main() {
	Calculator c; //Create a calculator
	c.run(); //turn it on
	return 0; //turn it off
}

