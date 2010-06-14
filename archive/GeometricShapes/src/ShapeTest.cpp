#include "cute/cute.h"
#include "cute/ide_listener.h"
#include "cute/cute_runner.h"
#include "ShapeTest.h"

void ShapeTest::thisIsATest() {
	ASSERTM("start writing tests", false);	
}



void ShapeTest::ginasTest(){
	ASSERTM("start writing tests", false);
}



cute::suite ShapeTest::make_suite_ShapeTest(){
	cute::suite s;
	//s.push_back(CUTE(ShapeTest::thisIsATest));
	//s.push_back(CUTE(ShapeTest::ginasTest));
	return s;
}


void ShapeTest::runSuite() {
	cute::suite s;
	//TODO add your test here
	//s.push_back(CUTE(ShapeTest::thisIsATest));//error: no matching function for call to 'boost::detail::function::basic_vtable0<void>::assign_to(void (ShapeTest::*&)(),
	cute::ide_listener lis;
	cute::makeRunner(lis)(s, "The Suite");
}

