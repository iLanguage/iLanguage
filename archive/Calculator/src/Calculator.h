/*
 * Calculator.h
 *
 *  Created on: Jun 2, 2010
 *      Author: gina
 */
#include <string>
using namespace std;

#ifndef CALCULATOR_H_
#define CALCULATOR_H_


class Calculator {
private:
	const static bool trace = true;
	char* toCstring(string stringIn);
public:
	Calculator();
	virtual ~Calculator();


	void run();
	void runInteractively();
	void runTests();
	void printBackgroundInfo() const;
	void printSampleInteraction() const;
	void printMenu() const;
	void exit();



};

#endif /* CALCULATOR_H_ */
