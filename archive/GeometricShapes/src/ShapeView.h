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

	std::string drawBorders() const;
	static void getTextDimensions(int& h, int& w, string textIn);
	/*
	 * Mutators
	 */
	void setFillType(int ft);
	void setForground(char fg);
	void setBackground(char bg);


	/*
	 * Accessors
	 */

	/*
	 * Constructors
	 */
	//The ShapeView class should have two constructors and should store a const pointer to the shape object it receives;
	void setShape(const Rectangle &shapeToDraw);
	ShapeView(const Shape* shapeToDraw);
	virtual ~ShapeView();
private:
	int fillType;
	char forground;
	char background;
	const Shape* shapeRecieved;
};

#endif /* SHAPEVIEW_H_ */
