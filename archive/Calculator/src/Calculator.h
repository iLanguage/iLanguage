/*
 * Calculator.h
 *
 *  Created on: Jun 2, 2010
 *      Author: gina
 */

#ifndef CALCULATOR_H_
#define CALCULATOR_H_

class Calculator {
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
