#include "testqstring.h"
	//#include <QtTest>
	//include the .moc if the delcaration and implementation are in one .cpp file



	void TestQString::toUpper()
	{
	    QString str = "Hello";\
	    //VERIFY() macro evaluates the expression passed as its argument. If the expression evaluates to true, the execution of the test function continues. Otherwise, a message describing the failure is appended to the test log, and the test function stops executing.
	    //QVERIFY(str.toUpper() == "HELLO");
	    //the COMPARE macro has more verbose output so you can see the differences between asserted and actual
	    //QCOMPARE(str.toUpper(), QString("HELLO"));
	}


	//QTTEST_MAIN() macro expands to a simple main taht runs all the test functions

