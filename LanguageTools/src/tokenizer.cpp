#include "tokenizer.h"
#include <lib/boost/boost/algorithm/string/trim.hpp>
#include <iostream>
#include <QString>
#include <vector>

using std::vector;
void Tokenizer::tokenizeIt(const QString& line)
{
        typedef int QStringSize;
        QStringSize pos=0,start=0;
        QString token;

        tokens = line.split(delimitor);

}
/*
 * Returns a reference to the QString in position k of the token list
 * Vector does range checking.
 */
QString&  Tokenizer::operator[](vecSizeType k){
        return tokens[k];
}
const QString&  Tokenizer::operator[](vecSizeType k)const{
        return tokens[k];
}
Tokenizer::Tokenizer(const QString& line, QString seperatorIn): delimitor(seperatorIn){
        tokenizeIt(line);
}

Tokenizer::~Tokenizer() {
        // TODO Auto-generated destructor stub
}
