/*
 * Language.h
 *
 *  Created on: Jul 3, 2010
 *      Author: gina
 */

#ifndef LANGUAGE_H_
#define LANGUAGE_H_
#include <string>
class Language{
private:
	std::string name; 				//ex: 	English
	std::string morphologyType;		//ex: 	Aggultinative (Turkish),
								//		Compounding (German),
								//		Fusional (Most European),
								//		Isolative (Chinese)
	std::string phonologyType;		//ex:	VowelHarmony (Turksih)
								//		Ablauting (Germain, Arabic)
								//		Tone (Chinese, Bantu)
								//		UnpredicatbleStress (English)
								//		PredictableStress (Spanish)
	std::string orthographyType; 	//ex:	oldOrthography (English, French)
								//		newOrthography (Spanish, Turkish)
	std::string syntacticType;		//ex:	collocational (English, Chinese)
								//		rule (French)
	std::string discourseType;		//ex:	topicFocus (Korean, Japanese)
								//		varyByRegister (Spanish)
								//		fixedOrder (English)
	std::string representativeWords;
								//ex:	the you it (English, du le c'est (French)
	std::string representativeCharacterSequences;
								//ex:	ng#, th, sh, (English)

public:
	Language();
	virtual ~Language();
};

#endif /* LANGUAGE_H_ */
