/*
 * ShapeView.h
 * A class, named ShapeView, that wraps the string representation of a shape object into a string representation with bounding borders.
 *
 *  Created on: Jun 10, 2010
 *      Author: gina
 */

#ifndef SHAPEVIEW_H_
#define SHAPEVIEW_H_

#include <string>
#include "Shape.h"
#include "Rectangle.h"

class ShapeView {
public:
	enum {FILLED, HALLOW, INFO};

	std::string drawBorders();

	/*
	 * Mutators
	 */
	void setFillType();
	void setForground(char fg);
	void setBackground(char bg);


	/*
	 * Accesors
	 */

	//overload << to get this usage: (?)
	//cout << sv << endl;	// display the ShapeView object

	/*
	 * Constructors
	 */
	//The ShapeView class should have two constructors and should store a const pointer to the shape object it receives;
	void setShape(Rectangle shapeToDraw);
	ShapeView(Rectangle shapeToDraw);
	virtual ~ShapeView();
private:
	std::string fillType;
	char forground;
	char background;
	//?std::string framedShape;
};

#endif /* SHAPEVIEW_H_ */
