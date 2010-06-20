/*
 * Shape.h
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#ifndef SHAPE_H_
#define SHAPE_H_
#include <string>

using namespace std;

class Shape {
protected:
	int id;
	string name;
	int height;
	int width;
private:
	static int autoIncrement;
public:
	/* Functions to be implemented by derived classes */
	string toStringInfo() const;
	virtual string toStringFilled(char forground = '*', char background = ' ') const=0;
	virtual string toStringHollow(char forground = '*', char background = ' ') const=0;
	/* Geometric functions */
	virtual double geoArea() const=0;
	virtual int scrArea() const=0;
	virtual double geoPerimeter() const=0;
	virtual int scrPerimeter() const=0;

	/* Tracing the flow of the application*/
	static void setTrace(bool newValue);
	static bool trace;

	/* Accessors */
	int getID() const;
	string getName() const;
	int getHeight() const;
	int getWidth() const;
	/* Constructors and assignment operator */
	Shape(const Shape& source);
	Shape& operator=(const Shape & source);
	Shape();
	virtual ~Shape();
};

#endif /* SHAPE_H_ */
