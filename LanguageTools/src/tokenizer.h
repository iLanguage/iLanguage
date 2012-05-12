#ifndef TOKENIZER_H
#define TOKENIZER_H
#include <QString>
#include <QStringList>
#include <vector>

using std::vector;
//creating an alias for the size of a vector, rather than an int
typedef int vecSizeType;


class Tokenizer
{
private:
        QString originalQString;

        QString delimitor;
        void tokenizeIt(const QString& line);

public:
        //vector<QString> tokens;
        QStringList tokens;
        /*
         * return the number of tokens found
         */
        vecSizeType size()const{return tokens.count();}
        /*
         * return the kth element in the tokens
         */
        QString& operator[](vecSizeType k);
        //returns a const for use as read only version of subscript operator
        const QString& operator[](vecSizeType k) const;


        /*
         * Constructor: accept a QString by reference to avoid copying, as well as a delimiting character
         * 	by default the delimiter is spaces.
         */
        Tokenizer();
        Tokenizer(const QString& line, QString delimitorIn=" ");
        virtual ~Tokenizer();
};

#endif // TOKENIZER_H
