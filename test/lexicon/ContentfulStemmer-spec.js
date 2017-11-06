'use strict';

var LexemeFrequency = LexemeFrequency || require('../../js/lexicon/LexemeFrequency').LexemeFrequency;
var NonContentWords = NonContentWords || require('../../js/lexicon/NonContentWords').NonContentWords;

var sampleTexts = {
	shortText: "A cloud is a visible mass of H20.",
	cloud1: "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)",
	cloud2: "Cloud computing, or the cloud, is a colloquial expression used to describe a variety of different types of computing concepts that involve a large number of computers connected through a real-time communication network such as the Internet.[1] Cloud computing is a term without a commonly accepted unequivocal scientific or technical definition. In science, cloud computing is a synonym for distributed computing over a network and means the ability to run a program on many connected computers at the same time. The phrase is also, more commonly used to refer to network-based services which appear to be provided by real server hardware, which in fact are served up by virtual hardware, simulated by software running on one or more real machines. Such virtual servers do not physically exist and can therefore be moved around and scaled up (or down) on the fly without affecting the end user - arguably, rather like a cloud. The popularity of the term can be attributed to its use in marketing to sell hosted services in the sense of application service provisioning that run client server software on a remote location. Advantages Cloud computing relies on sharing of resources to achieve coherence and economies of scale similar to a utility (like the electricity grid) over a network.[2] At the foundation of cloud computing is the broader concept of converged infrastructure and shared services. The cloud also focuses on maximizing the effectiveness of the shared resources. Cloud resources are usually not only shared by multiple users but are also dynamically re-allocated per demand. This can work for allocating resources to users. For example, a cloud computer facility, which serves European users during European business hours with a specific application (e.g. email) while the same resources are getting reallocated and serve North American users during North America's business hours with another application (e.g. web server). This approach should maximize the use of computing powers thus reducing environmental damage as well since less power, air conditioning, rackspace, etc. is required for a variety of functions. The term 'moving to cloud' also refers to an organization moving away from a traditional CAPEX model (buy the dedicated hardware and depreciate it over a period of time) to theOPEX model (use a shared cloud infrastructure and pay as you use it). Proponents claim that cloud computing allows companies to avoid upfront infrastructure costs, and focus on projects that differentiate their businesses instead of infrastructure.[3]Proponents also claim that cloud computing allows enterprises to get their applications up and running faster, with improved manageability and less maintenance, and enables IT to more rapidly adjust resources to meet fluctuating and unpredictable business demand.[3][4][5] Hosted services In marketing, cloud computing is mostly used to sell hosted services in the sense of application service provisioning that run client server software at a remote location. Such services are given popular acronyms like 'SaaS' (Software as a Service), 'PaaS' (Platform as a Service), 'IaaS' (Infrastructure as a Service), 'HaaS' (Hardware as a Service) and finally 'EaaS' (Everything as a Service). End users access cloud-based applications through a web browser, thin client or mobile app while the business software and user's data are stored on servers at a remote location. History The 1950s The underlying concept of cloud computing dates back to the 1950s, when large-scale mainframe computers became available in academia and corporations, accessible via thin clients/terminal computers, often referred to as 'dumb terminals', because they were used for communications but had no internal processing capacities. To make more efficient use of costly mainframes, a practice evolved that allowed multiple users to share both the physical access to the computer from multiple terminals as well as to share the CPU time. This eliminated periods of inactivity on the mainframe and allowed for a greater return on the investment. The practice of sharing CPU time on a mainframe became known in the industry as time-sharing.[6] The 1960s–1990s John McCarthy opined in the 1960s that 'computation may someday be organized as a public utility.'[7] Almost all the modern-day characteristics of cloud computing (elastic provision, provided as a utility, online, illusion of infinite supply), the comparison to the electricity industry and the use of public, private, government, and community forms, were thoroughly explored in Douglas Parkhill's 1966 book, The Challenge of the Computer Utility. Other scholars have shown that cloud computing's roots go all the way back to the 1950s when scientist Herb Grosch (the author of Grosch's law) postulated that the entire world would operate on dumb terminals powered by about 15 large data centers.[8] Due to the expense of these powerful computers, many corporations and other entities could avail themselves of computing capability through time sharing and several organizations, such as GE's GEISCO, IBM subsidiary The Service Bureau Corporation (SBC, founded in 1957), Tymshare (founded in 1966), National CSS (founded in 1967 and bought by Dun & Bradstreet in 1979), Dial Data (bought by Tymshare in 1968), and Bolt, Beranek and Newman (BBN) marketed time sharing as a commercial venture. The 1990s In the 1990s, telecommunications companies,who previously offered",
	french: "En météorologie, un nuage est une masse visible constituée initialement d'une grande quantité de gouttelettes d’eau (parfois de cristaux de glace associés à des aérosols chimiques ou des minéraux) en suspension dans l’atmosphère au-dessus de la surface d'une planète. L’aspect d'un nuage dépend de la lumière qu’il reçoit, de la nature, de la dimension, du nombre et de la répartition des particules qui le constituent. Les gouttelettes d’eau d’un nuage proviennent de la condensation de la vapeur d’eau contenue dans l’air. La quantité maximale de vapeur d’eau (gaz invisible) qui peut être contenue dans une masse d'air est fonction de la température : plus l’air est chaud, plus il peut contenir de vapeur d’eau. (Voir les articles Pression de vapeur saturante et Formule de Clapeyron) Sommaire  [masquer]  1 Histoire des représentations des nuages 2 Formation des nuages 3 Dissipation des nuages 4 Types de nuages 5 Classification troposphérique 5.1 Nuages élevés (Famille A) 5.2 Moyens (Famille B) 5.3 Bas (Famille C) 5.4 Moyen développement vertical (Famille D1) 5.5 Grand développement vertical (Famille D2) 5.6 Ambiguïtés liées au mode de formation des nuages 6 Au-dessus de la troposphère 6.1 Nuages stratosphériques 6.2 Nuages mésosphériques 7 Nébulosité et opacité 8 Couleurs des nuages 9 Nuages extraterrestres 10 Notes et références 11 Bibliographie 12 Voir aussi 12.1 Articles connexes 12.2 Liens externes Histoire des représentations des nuages[modifier | modifier le code]    Le Voyageur contemplant une mer de nuages de Caspar David Friedrich, 1818 L'histoire des représentations des nuages présente les différentes perceptions des nuages au cours des siècles. La majorité des philosophes de l'Antiquité considèrent que les nuages sont issus des exhalaisons humides que dégagent la mer et les cours d'eau1. Au Moyen Âge, le nuage appelé nue est perçu dans une perspective théologique comme la « nuée mystique », c'est-à-dire le voile de Dieu (allant jusqu'à dévoiler le paradis lors d'un éclair) ou selon une perspective plus naturelle (classification selon les couleurs2 en nuages noirs apportant la pluie selon la métaphore des nimborum naves, « navires de pluie », nuages lumineux et blancs s'étant vidé de leur eau, éventuellement en nuages rouges de l'aurore et du crépuscule) mais sa nature fait débat3. La renaissance du xiie siècle voit la diffusion des ouvrages d'Aristote, notamment les Météorologiques dans lesquels il décrit les nuages sans parvenir à expliquer pourquoi ces particules restent en suspension dans l'atmosphère4 : à partir du xiiie siècle, les scolastiques et les encyclopédistes envisagent alors le nuage non plus simplement comme un objet dans le ciel mais comme une matière faite d'air, d'eau, voire de feu selon la théorie aristotélicienne des Quatre éléments, tel Barthélemy l'Anglais dans son Livre des propriétés des choses5. À la fin du Moyen Âge, la littérature qui a jusque-là du mal à saisir le caractère éphémère et mobile du nuage, développe ce thème qui correspond encore plus aux inspirations des siècles suivants (période baroque et romantisme, notamment le Sturm und Drang allemand)6. Néanmoins, le nuage représenté dans les arts reste essentiellement du domaine du sacré jusqu'au xixe siècle (hiérophanie de l'ascension du Christ, visions mystiques)7. À partir du xixe siècle et jusqu'à aujourd'hui, les artistes comme Claude Monet, John Constable ou Olafur Eliasson utilisent les observations scientifiques des nuages (notamment à partir de montées en ballons) dans leurs œuvres8. Avant le xixe siècle, les nuages sont donc avant tout des objets esthétiques. Les savants tentent de les décrire subjectivement mais leur nature trop diverse, complexe et leur fugacité est un obstacle à leur catégorisation bien qu'il y ait eu quelques tentatives pour les utiliser dans les prévisions météorologiques. Jean-Baptiste de Lamarck propose en 1802 la première classification scientifique des nuages9 par une liste de termes descriptifs10 en français, mais c'est le système de Luke Howard, utilisant le latin universel de la classification binomiale de Carl von Linné, qui connaît le succès dès sa parution en 1803 et dont la terminologie est toujours utilisée aujourd'hui11. En 1855, Émilien Renou proposa l’ajout des genres Altocumulus et Altostratus. En septembre 1896, cette version élargie de la classification originelle de Howard fut officiellement adoptée et publiée dans le premier Atlas international des nuages de 1896. L’édition actuelle publiée par l’Organisation météorologique mondiale date de 1956 pour le volume I et de 1987 pour le volume II. C’est elle qui fait foi dans les différents services météorologiques nationaux.  Formation des nuages[modifier | modifier le code]  Article détaillé : Physique des nuages.   Un nuage d'orage en formation.   Épaisseur optique des nuages en avril 2001 La formation de nuages résulte du refroidissement d’un volume d’air jusqu’à la condensation d’une partie de sa vapeur d’eau. Si le processus de refroidissement se produit au sol (par contact avec une surface froide, par exemple), on assiste à la formation de brouillard. Dans l’atmosphère libre, le refroidissement se produit généralement par soulèvement, en vertu du comportement des gaz parfaits dans une atmosphère hydrostatique, selon lequel un gaz se refroidit spontanément lorsque la pression baisse. Les nuages peuvent aussi perdre une partie de leur masse sous forme de précipitations, par exemple sous forme de pluie, grêle ou neige. La condensation de la vapeur d’eau, en eau liquide ou en glace, se produit initialement autour de certains types de microparticules de matière solide (aérosols), qu’on appelle des noyaux de condensation ou de congélation. La congélation spontanée de l’eau liquide en glace, dans une atmosphère très pure, ne se produit pas au-dessus de -40 °C. Entre 0 et -40 °C, les gouttes d’eau restent dans un état métastable (surfusion), qui cesse dès qu’elles rentrent en contact avec un noyau de condensation (poussière, cristal de glace, obstacle). Lorsque ce phénomène se produit au sol, on assiste à des brouillards givrants. Juste après la condensation ou la congélation, les particules sont encore très petites. Pour des particules de cette taille, les collisions et l’agrégation ne peuvent pas être les facteurs principaux de croissance. Il se produit plutôt un phénomène connu sous le nom de « effet Bergeron ». Ce mécanisme repose sur le fait que la pression partielle de saturation de la glace est inférieure à celle de l’eau liquide. Ceci signifie que, dans un milieu où coexistent des cristaux de glace et des gouttelettes d’eau surfondue, la vapeur d’eau ambiante se condensera en glace sur les cristaux de glace déjà existants, et que les gouttelettes d’eau s’évaporeront d’autant. On voit ainsi que le soulèvement est doublement important dans la formation de nuages et de précipitation : en premier lieu comme mécanisme de refroidissement, et ensuite comme porteur de gouttelettes d’eau liquide jusqu’au niveau où elles deviennent surfondues. Le soulèvement peut être dû à la convection, à la présence de terrains montagneux faisant obstacle à l’écoulement de l’air ou à des facteurs de la dynamique atmosphérique, comme les ondes baroclines (aussi appelées « ondes frontales »). ",
	inuktitut: "ᐅᔨᔭᐅᖁᕙᕋ ᖃᓄᖅ ᐊᔪᕐᓇᖅᑎᒋᔫᔮᓚᐅᕐᓂᖓᓂᒃ ᓈᒻᒪᑦᑎᐊᖅᑐᒃᑯᑦ ᐅᖃᓪᓚᐅᓯᖃᕆᐊᒥᒃ ᐊᔪᕆᖖᒋᑦᑎᐊᖅᑐᒍ ᐃᓕᓴᐃᔨᐅᔫᓚᐅᕐᓂᖓᓂᒃ, ᑐᑭᓯᐅᕆᔨᐅᔫᓂᖓᓄᑦ ᖃᐅᔨᒪᓂᕐᒥᓄᑦ, ᐃᓕᓐᓂᐊᕐᓂᓕᕆᔨᐅᔫᓚᐅᕐᓂᖓᓄᑦ ᐊᒻᒪᓗ ᐃᓚᒋᔭᒥᓂᒃ ᑲᒪᑦᑎᐊᖅᑑᓚᐅᕐᓂᖓᓄᑦ. ᐅᑭᐅᓪᓗᐊᖖᒍᑲᐅᑎᒋᓂᐊᓕᕐᐳᖅ ᑕᐃᒪ ᐊᓂᕐᓂᖏᓚᐅᖅᓯᒪᓂᖓᓂᑦ ᐅᑭᐊᒃᓵᖓᓂ 2012 ᐅᑭᐅᖃᓕᖅᑐᓂ 93- ᓂᒃ, ᐊᒻᒪᓗ ᐃᔾᔪᑎᒋᓪᓗᒍ ᐃᓕᑕᕆᓯᒪᓕᕈᑎᒋᓂᐊᓚᐅᕋᓗᐊᕋᒃᑯᑦ ᐃᓕᓐᓂᐊᕈᑎᒋᓯᒪᔭᓐᓄᑦ ᓘᑦᑖᖑᓂᕐᒧᑦ ᖃᐅᔨᓴᕈᑎᒋᔭᓐᓂ ᖃᐅᔨᓴᕐᓂᐊᖅᑐᒋᑦ ᐃᓕᓐᓂᐊᖅᑎᑦᑎᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᑦ, ᐊᔪᓕᓪᓚᑦᑖᑲᓴᓚᐅᕋᒃᑯ ᐃᓗᕕᖅᑕᐅᑎᓪᓗᒍ ᐃᖅᑲᐅᒪᔾᔪᑎᒋᔭᓂᒃ ᐅᖃᐅᓯᐅᓂᐊᖅᑐᓂᒃ ᑎᑎᕋᖅᓯᒪᔪᓕᐅᕆᐊᒥᒃ. ᓇᖕᒥᓂᖅᑕᐅᖅ ᐊᑖᑕᒐ ᑐᖁᓵᖅᓯᒪᓚᐅᕐᒪᑦ — ᐱᖃᑎᐊᓗᒋᓚᐅᕐᒪᒍ ᐊᑖᑕᒪ ᐊᐅᐱᓛᕐᔫᑉ ᓄᑲᕆᓚᐅᖅᓯᒪᔭᖓ ᑲᑭᐊᕐᓂᐅᑦ. ᑕᒪᓐᓇᓗ ᐱᔾᔪᑎᖏᓪᓗᒍ ᐅᕙᓐᓂᒃ ᖃᐅᔨᓯᒪᓕᕋᒪ ᑕᒪᑐᒪᓂ, ᑎᒍᒥᐊᖅᑎᐅᒋᐊᖃᕐᓂᓐᓂᒃ ᐃᓄᑐᖃᕆᔭᑦᑕ ᐅᓂᒃᑲᐅᓯᕆᕙᒃᓯᒪᔭᖏᓂᒃ, ᐅᓪᓗᒥᐅᓕᖅᑐᒥᓗ ᓯᕗᓂᕕᓂᕆᔭᕆᓕᖅᑕᑦᑎᓐᓄᑦ. ᑎᑎᕋᖅᓯᒪᔪᑎᒍᑦ ᐃᓕᑕᕆᓯᒪᔪᓐᓇᖅᐸᕗᑦ ᐊᒻᒪᓗ ᖃᓄᖅ ᐃᓅᓯᒥᓐᓄᑦ ᐊᒃᑐᐃᓯᒪᓂᕆᓚᐅᖅᑕᖏᓂᒃ ᐅᕙᑦᑎᓐᓄᑦ ᓇᖕᒥᓂᖅ, ᐃᓕᑉᐸᓪᓕᐊᑎᑦᑐᓂᑎᒍ, ᐃᑲᔪᖅᑐᕐᓯᒪᓪᓗᓂᑎᒍᑦ ᐊᒻᒪᓗ ᐱᐅᓯᒋᐊᖅᑎᓐᓇᓱᒃᑐᒋᑦ ᖃᐅᔨᒪᓂᕆᓕᕈᒫᖅᑕᖏᑕ ᑭᖑᕚᕆᓕᕐᓂᐊᕐᒥᔭᑦᑕᑦᑕᐅᖅ. ᖃᓄᐃᒋᔮᖖᒋᑕᕋ ᐅᓂᒃᑲᐅᓯᖃᕆᐊᒥᒃ ᐃᓅᓯᕆᓚᐅᖅᑕᖓᓄᑦ ᐃᓕᓴᐃᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᓄᓪᓗ ᐱᔾᔪᑎᖃᖅᑐᓂᒃ ᐱᔾᔪᑎᒋᓪᓗᒍ ᑎᑎᕋᓚᐅᕋᒃᑭᑦ ᐃᓄᒃᑎᑑᖅᓯᒪᓪᓗᒋᑦ ᐊᒻᒪᓗ ᕿᒥᕐᕈᓚᐅᖅᓯᒪᒻᒪᒋᑦ ᓈᒻᒪᒋᓯᒪᓕᓚᐅᖅᑐᒋᓪᓗ ᐃᓕᓐᓂᐊᕈᑎᒋᓯᒪᔭᓐᓄᑦ ᑎᑎᕋᖅᓯᒪᔪᓕᐅᕐᓂᐊᓵᖅᑎᓪᓗᖓ ᑎᓯᐱᕆ 2011- ᖑᑎᓪᓗᒍ. ᑖᒃᑯᐊ ᑎᑎᕋᖅᓯᒪᔭᒃᑲ ᐋᖅᑭᒃᓱᐊᕆᓕᓚᐅᕐᒥᒐᒃᑭᑦ ᓴᐃᒻᒪᖅᑎᑕᐅᓯᒪᓪᓗᖓ ᐊᒻᒪᓗ ᓈᒻᒪᒋᔭᐅᓯᒪᑎᓪᓗᒋᑦ ᐃᕐᓂᕆᔭᖓᓂᑦ ᑭᖑᕚᕆᔭᖓᓂᓪᓗ ᐱᐊᕆᒥᑦ. ᐊᐅᐱᓛᕐᔪᒃ ᐊᒥᓱᓂᑦ ᐅᐱᒋᔭᐅᑦᑎᐊᖅᑐᓂ ᐃᓄᑐᖃᕆᔭᐅᓚᐅᕐᒪᑦ"
};

describe('Basic NLP tasks', function() {

	it('should load', function() {
		expect(LexemeFrequency).toBeDefined();
	});

	it('should generate a word frequency list', function() {
		var result = LexemeFrequency.calculateWordFrequencies({
			orthography: sampleTexts.shortText
		});
		expect(result.wordFrequencies)
			.toEqual([{
				orthography: 'A',
				count: 2,
				alternates: {
					A: 1,
					a: 1
				}
			}, {
				orthography: 'cloud',
				count: 1
			}, {
				orthography: 'is',
				count: 1
			}, {
				orthography: 'visible',
				count: 1
			}, {
				orthography: 'mass',
				count: 1
			}, {
				orthography: 'of',
				count: 1
			}, {
				orthography: 'H20',
				count: 1
			}]);
	});

	it('should guess a list of non content words using zipfs law', function() {
		var result = LexemeFrequency.calculateNonContentWords({
			orthography: sampleTexts.shortText,
			caseSensitivity: 'lower'
		});
		expect(result.nonContentWordsArray)
			.toEqual(['a', 'is', 'of']);
	});


	it('should guess be case smart by defualt', function() {
		var result = LexemeFrequency.calculateNonContentWords({
			orthography: sampleTexts.shortText
		});
		expect(result.nonContentWordsArray)
			.toEqual(['A', 'is', 'of']);
	});

	it('should produce an order word frequency list', function() {
		var result = LexemeFrequency.calculateNonContentWords({
			orthography: "bbbbbb cccccc aaaaa aaaaa zzzzz zzzzz zzzzz bbbbbb"
		});
		expect(result.wordFrequencies)
			.toEqual([{
				orthography: 'zzzzz',
				count: 3,
				rank: 0.75,
				normalizedCount: 1,
				categories: ['functionalWord']
			}, {
				orthography: 'bbbbbb',
				count: 2,
				rank: 0.5,
				normalizedCount: 0.6666666666666666,
				categories: ['buzzWord']
			}, {
				orthography: 'aaaaa',
				count: 2,
				rank: 0.5,
				normalizedCount: 0.6666666666666666,
				categories: ['functionalWord']
			}, {
				orthography: 'cccccc',
				count: 1,
				rank: 0.25,
				normalizedCount: 0.3333333333333333,
				categories: ['buzzWord']
			}]);
	});

});

describe('Stop Words', function() {

	it('should load', function() {
		expect(NonContentWords).toBeDefined();
	});

	it('should accept a space seperated list', function() {
		var spaceSeparatedList = 'a an the he she    it  we go    be';
		var result = NonContentWords.processNonContentWords({
			orthography: '',
			nonContentWordsArray: spaceSeparatedList,
			userSpecifiedNonContentWords: true
		});
		expect(result.nonContentWordsArray)
			.toEqual(['a', 'an', 'the', 'he', 'she', 'it', 'we', 'go', 'be']);
	});

	it('should accept a comma seperated list', function() {
		var commaSeparatedList = 'a, an, the, he, she,    it,  we, go,    be';
		var result = NonContentWords.processNonContentWords({
			nonContentWordsArray: commaSeparatedList,
			userSpecifiedNonContentWords: true
		});
		expect(result.nonContentWordsArray)
			.toEqual(['a', 'an', 'the', 'he', 'she', 'it', 'we', 'go', 'be']);
	});

	it('should accept a regular expression', function() {
		var regexpSeparatedList = /^(a|an|the|he|she|it|we|go|be)$/;
		var result = NonContentWords.processNonContentWords({
			nonContentWordsArray: regexpSeparatedList,
			userSpecifiedNonContentWords: true
		});
		expect(result.nonContentWordsArray)
			.toEqual(['a', 'an', 'the', 'he', 'she', 'it', 'we', 'go', 'be']);
	});

	it('should throw an error if an invalid regex is provided', function() {
		var regexpSeparatedList = 'a|an|the|he|she|it|we|go|be';
		var e = 'Invalid RegExp a|an|the|he|she|it|we|go|be';

		expect(function() {
			NonContentWords.processNonContentWords({
				nonContentWordsArray: regexpSeparatedList,
				userSpecifiedNonContentWords: true
			});
		}).toThrow(e);

	});
});

xdescribe('Language Independant', function() {

	it('should accept a (test English 1) text', function() {
		var textToTest = {
			orthography: sampleTexts.cloud1
				// cutoff: 0.2
		};
		var result = LexemeFrequency.calculateNonContentWords(textToTest);
		expect(result.nonContentWordsArray)
			.toEqual(['1', '2', '3', '4', '42', '5', '6', '7', 'Cloud', 'EP', 'Fu', 'Music', 'Other', 'PC', 'See', 'St', 'UK', 'Wan', 'White', 'Zach', 'a', 'album', 'also', 'an', 'and', 'as', 'band', 'be', 'by', 'comic', 'film', 'from', 'game', 'group', 'in', 'indie', 'is', 'mass', 'of', 'on', 'open', 'or', 'play', 'rock', 's', 'song', 'that', 'the', 'to', 'used', 'uses', 'will']);
		expect(result.buzzWordsArray)
			.toEqual(['British', 'Clouds', 'Electron', 'Fiction', 'Information', 'Interstellar', 'Literature', 'Science', 'Sobiech', 'Technology', 'between', 'character', 'computer', 'computing', 'describe', 'disambiguation', 'experimental', 'operating', 'software', 'source', 'storage', 'system', 'writer']);
	});

	it('should accept a (test English 2) text', function() {
		var textToTest = {
			orthography: sampleTexts.cloud2
		};
		var result = LexemeFrequency.calculateNonContentWords(textToTest);
		expect(result.nonContentWordsArray)
			.toEqual(['1', '15', '1950s', '1990s', '2', '3', '4', '5', '6', '7', '8', 'GE', 'This', 'a', 'also', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'cloud', 'data', 'do', 'e', 'for', 'g', 'go', 'in', 'is', 'it', 'like', 'more', 'no', 'of', 'on', 'or', 'over', 'run', 's', 'such', 'term', 'that', 'the', 'time', 'to', 'up', 'use', 'used', 'users', 'which', 'with']);
		expect(result.buzzWordsArray)
			.toEqual(['Service', 'application', 'business', 'client', 'computer', 'computers', 'computing', 'founded', 'hardware', 'hosted', 'infrastructure', 'location', 'mainframe', 'multiple', 'network', 'remote', 'resources', 'server', 'services', 'shared', 'sharing', 'software', 'terminals', 'through', 'utility']);
	});

	it('should accept a (test French) text', function() {
		var textToTest = {
			orthography: sampleTexts.french
		};
		var result = LexemeFrequency.calculateNonContentWords(textToTest);
		expect(result.nonContentWordsArray)
			.toEqual(['0', '1', '10', '11', '12', '2', '3', '4', '40', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D1', 'D2', 'I', 'II', 'Si', 'air', 'au', 'ce', 'comme', 'd', 'dans', 'de', 'des', 'du', 'dû', 'eau', 'en', 'est', 'et', 'eu', 'glace', 'il', 'jusqu', 'l', 'la', 'le', 'les', 'leur', 'mais', 'ne', 'nuage', 'on', 'ou', 'où', 'par', 'plus', 'pour', 'qu', 'que', 'qui', 's', 'sa', 'se', 'selon', 'un', 'une', 'y', '«', '°C', '»', 'à']);
		expect(result.buzzWordsArray)
			.toEqual(['Famille', 'atmosphère', 'classification', 'condensation', 'formation', 'gouttelettes', 'liquide', 'modifier', 'nuages', 'particules', 'produit', 'refroidissement', 'siècle', 'vapeur']);
	});

	it('should accept a text and a weight', function() {
		var textToTest = {
			orthography: sampleTexts.cloud1,
			cutoff: 0.0001
		};
		var result = LexemeFrequency.calculateNonContentWords(textToTest);
		expect(result.nonContentWordsArray)
			.toEqual(['1', '1797', '1960s', '1969', '1977', '1980s', '1990s', '1992', '1997', '2', '2000', '2005', '3', '4', '42', '5', '522', '560', '6', '60s', '7', 'Arntz', 'Bou', 'Cake', 'Chaka', 'Cloud', 'Cut', 'Don', 'EP', 'Final', 'Fire', 'Frayn', 'Fu', 'Fung', 'Hong', 'Joni', 'Keng', 'Khan', 'King', 'Kings', 'Kong', 'Kung', 'Lee', 'Level', 'Milky', 'Music', 'Nine', 'Other', 'PC', 'Paris', 'Point', 'Red', 'Rise', 'Saint', 'See', 'St', 'Tag', 'This', 'UK', 'VII', 'Wan', 'Way', 'White', 'Zach', 'a', 'after', 'album', 'also', 'an', 'and', 'as', 'b-boy', 'band', 'based', 'be', 'book', 'by', 'com', 'comic', 'dense', 'dwarf', 'early', 'film', 'from', 'gOS', 'game', 'group', 'hide', 'in', 'indie', 'is', 'known', 'late', 'mass', 'may', 'media', 'model', 'near', 'of', 'on', 'open', 'or', 'our', 'play', 'pop', 'rays', 'refer', 'rock', 's', 'set', 'sites', 'son', 'song', 'sound', 'stars', 'tags', 'text', 'than', 'that', 'the', 'to', 'use', 'used', 'uses', 'video', 'web', 'will']);
		expect(result.buzzWordsArray)
			.toEqual(['Aristophanes', 'Australia', 'Australian', 'Average', 'British', 'California', 'Captain', 'Chlodomer', 'Clodoald', 'CloudStack', 'Cloudbase', 'Clouds', 'Cloudy', 'Contents', 'County', 'Cumberland', 'Electron', 'Fantasy', 'Fiction', 'Florida', 'France', 'Information', 'Internet-based', 'Interstellar', 'Literature', 'Magellanic', 'Marvel', 'McCloud', 'Michael', 'Mitchell', 'Molecular', 'Mysterons', 'Naughty', 'Nosound', 'Orleans', 'Ranaldo', 'Retroglide', 'Richard', 'Saint-Cloud', 'Scarlet', 'Science', 'Scottish', 'Sobiech', 'Spectrum', 'Spires', 'Strife', 'Sunset', 'Sydney', 'Technology', 'Thompson', 'Tiamat', 'Unknowing', 'analogy', 'around', 'atmosphere', 'better', 'between', 'browser-based', 'chamber', 'character', 'client', 'comedic', 'comedy', 'comics', 'commune', 'company', 'computer', 'computers', 'computing', 'condensed', 'consisting', 'containing', 'content', 'coordinate', 'cosmic', 'crystals', 'dancer', 'depiction', 'describe', 'development', 'develops', 'device', 'directed', 'director', 'disambiguation', 'droplets', 'experimental', 'facility', 'fictional', 'former', 'frozen', 'galactic', 'galaxies', 'galaxy', 'headquarters', 'instantly', 'investigate', 'irregular', 'makers', 'mathematics', 'medieval', 'microphysics', 'microsounds', 'molecules', 'mystical', 'networked', 'nucleus', 'online', 'operated', 'operating', 'orbits', 'orchestration', 'particle', 'philosophical', 'physics', 'playwright', 'produced', 'puzzle', 'rather', 'region', 'series', 'servers', 'settlement', 'skyborne', 'software', 'source', 'statistical', 'storage', 'stored', 'studies', 'suburbs', 'surname', 'suspended', 'system', 'television', 'third-person', 'three-dimensional', 'turning', 'typically', 'usable', 'user-generated', 'vertices', 'visible', 'visual', 'western', 'writer', 'written']);
	});

	it('should produce a filtered text for stop words', function() {
		var textToTest = {
			orthography: "this will not have any stop words",
			userSpecifiedNonContentWords: true,
			nonContentWordsArray: "not any"
		};
		NonContentWords.processNonContentWords(textToTest);
		expect(NonContentWords.filterText(textToTest).filteredText).toEqual('this will  have  stop words');
	});

	it('should produce a filtered text for stop words and morphemes', function() {
		var textToTest = {
			orthography: "this will not have any stop words or morphemes",
			nonContentWordsArray: "not any",
			userSpecifiedNonContentWords: true,
			// morphemes: /(^un|^pre|s$|ed$|ing$)/,
			morphemesArray: ["un-", " pre-", " -s", " -ed", " -ing"]
		};
		NonContentWords.processNonContentWords(textToTest);
		expect(NonContentWords.filterText(textToTest).filteredText).toEqual('thi will  have  stop word or morpheme');
	});

	it('should produce a filtered text for stop words, vulgar words and unrepresentative words and morphemes', function() {
		var textToTest = {
			orthography: "this will not have any stop words or morphemes, vulgar words or unrepresentative words like banana",
			nonContentWordsArray: "not any",
			userSpecifiedNonContentWords: true,
			userRemovedWordsForThisDocumentArray: ['banana'],
			userRemovedWordsForAllDocumentsArray: ['vulgar'],
			// morphemes: /(^un|^pre|s$|ed$|ing$)/,
			morphemesArray: ["un-", " pre-", " -s", " -ed", " -ing"]
		};
		NonContentWords.processNonContentWords(textToTest);
		expect(NonContentWords.filterText(textToTest).filteredText).toEqual('thi will  have  stop word or morpheme  word or representative word like ');
	});

	it('should produce a weighted list of words (rather than 0/1 stop vs content', function() {
		expect(true).toBeTruthy();
	});

	it('should work with agglutinative languages', function() {
		var textToTest = {
			orthography: sampleTexts.inuktitut
		};
		var result = LexemeFrequency.calculateNonContentWords(textToTest);
		expect(result.nonContentWordsArray)
			.toEqual(['2011', '2012', '93', 'ᐅᕙᓐᓂᒃ', 'ᐊᑖᑕᒐ', 'ᐊᑖᑕᒪ', 'ᐊᒥᓱᓂᑦ', 'ᐊᒻᒪᓗ', 'ᐱᐊᕆᒥᑦ', 'ᑎᓯᐱᕆ', 'ᑕᐃᒪ', 'ᑕᒪᑐᒪᓂ', 'ᑕᒪᓐᓇᓗ', 'ᑖᒃᑯᐊ', 'ᓂᒃ', 'ᓇᖕᒥᓂᖅ', 'ᖃᓄᖅ', 'ᖑᑎᓪᓗᒍ']);
		expect(result.buzzWordsArray)
			.toEqual(['ᐃᑲᔪᖅᑐᕐᓯᒪᓪᓗᓂᑎᒍᑦ', 'ᐃᓄᑐᖃᕆᔭᐅᓚᐅᕐᒪᑦ', 'ᐃᓄᑐᖃᕆᔭᑦᑕ', 'ᐃᓄᒃᑎᑑᖅᓯᒪᓪᓗᒋᑦ', 'ᐃᓅᓯᒥᓐᓄᑦ', 'ᐃᓅᓯᕆᓚᐅᖅᑕᖓᓄᑦ', 'ᐃᓕᑉᐸᓪᓕᐊᑎᑦᑐᓂᑎᒍ', 'ᐃᓕᑕᕆᓯᒪᓕᕈᑎᒋᓂᐊᓚᐅᕋᓗᐊᕋᒃᑯᑦ', 'ᐃᓕᑕᕆᓯᒪᔪᓐᓇᖅᐸᕗᑦ', 'ᐃᓕᓐᓂᐊᕈᑎᒋᓯᒪᔭᓐᓄᑦ', 'ᐃᓕᓐᓂᐊᕐᓂᓕᕆᔨᐅᔫᓚᐅᕐᓂᖓᓄᑦ', 'ᐃᓕᓐᓂᐊᖅᑎᑦᑎᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᑦ', 'ᐃᓕᓴᐃᔨᐅᔫᓚᐅᕐᓂᖓᓂᒃ', 'ᐃᓕᓴᐃᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᓄᓪᓗ', 'ᐃᓗᕕᖅᑕᐅᑎᓪᓗᒍ', 'ᐃᓚᒋᔭᒥᓂᒃ', 'ᐃᔾᔪᑎᒋᓪᓗᒍ', 'ᐃᕐᓂᕆᔭᖓᓂᑦ', 'ᐃᖅᑲᐅᒪᔾᔪᑎᒋᔭᓂᒃ', 'ᐅᐱᒋᔭᐅᑦᑎᐊᖅᑐᓂ', 'ᐅᑭᐅᓪᓗᐊᖖᒍᑲᐅᑎᒋᓂᐊᓕᕐᐳᖅ', 'ᐅᑭᐅᖃᓕᖅᑐᓂ', 'ᐅᑭᐊᒃᓵᖓᓂ', 'ᐅᓂᒃᑲᐅᓯᕆᕙᒃᓯᒪᔭᖏᓂᒃ', 'ᐅᓂᒃᑲᐅᓯᖃᕆᐊᒥᒃ', 'ᐅᓪᓗᒥᐅᓕᖅᑐᒥᓗ', 'ᐅᔨᔭᐅᖁᕙᕋ', 'ᐅᕙᑦᑎᓐᓄᑦ', 'ᐅᖃᐅᓯᐅᓂᐊᖅᑐᓂᒃ', 'ᐅᖃᓪᓚᐅᓯᖃᕆᐊᒥᒃ', 'ᐊᐅᐱᓛᕐᔪᒃ', 'ᐊᐅᐱᓛᕐᔫᑉ', 'ᐊᒃᑐᐃᓯᒪᓂᕆᓚᐅᖅᑕᖏᓂᒃ', 'ᐊᓂᕐᓂᖏᓚᐅᖅᓯᒪᓂᖓᓂᑦ', 'ᐊᔪᓕᓪᓚᑦᑖᑲᓴᓚᐅᕋᒃᑯ', 'ᐊᔪᕆᖖᒋᑦᑎᐊᖅᑐᒍ', 'ᐊᔪᕐᓇᖅᑎᒋᔫᔮᓚᐅᕐᓂᖓᓂᒃ', 'ᐋᖅᑭᒃᓱᐊᕆᓕᓚᐅᕐᒥᒐᒃᑭᑦ', 'ᐱᐅᓯᒋᐊᖅᑎᓐᓇᓱᒃᑐᒋᑦ', 'ᐱᔾᔪᑎᒋᓪᓗᒍ', 'ᐱᔾᔪᑎᖃᖅᑐᓂᒃ', 'ᐱᔾᔪᑎᖏᓪᓗᒍ', 'ᐱᖃᑎᐊᓗᒋᓚᐅᕐᒪᒍ', 'ᑎᑎᕋᓚᐅᕋᒃᑭᑦ', 'ᑎᑎᕋᖅᓯᒪᔪᑎᒍᑦ', 'ᑎᑎᕋᖅᓯᒪᔪᓕᐅᕆᐊᒥᒃ', 'ᑎᑎᕋᖅᓯᒪᔪᓕᐅᕐᓂᐊᓵᖅᑎᓪᓗᖓ', 'ᑎᑎᕋᖅᓯᒪᔭᒃᑲ', 'ᑎᒍᒥᐊᖅᑎᐅᒋᐊᖃᕐᓂᓐᓂᒃ', 'ᑐᑭᓯᐅᕆᔨᐅᔫᓂᖓᓄᑦ', 'ᑐᖁᓵᖅᓯᒪᓚᐅᕐᒪᑦ', 'ᑭᖑᕚᕆᓕᕐᓂᐊᕐᒥᔭᑦᑕᑦᑕᐅᖅ', 'ᑭᖑᕚᕆᔭᖓᓂᓪᓗ', 'ᑲᑭᐊᕐᓂᐅᑦ', 'ᑲᒪᑦᑎᐊᖅᑑᓚᐅᕐᓂᖓᓄᑦ', 'ᓄᑲᕆᓚᐅᖅᓯᒪᔭᖓ', 'ᓇᖕᒥᓂᖅᑕᐅᖅ', 'ᓈᒻᒪᑦᑎᐊᖅᑐᒃᑯᑦ', 'ᓈᒻᒪᒋᓯᒪᓕᓚᐅᖅᑐᒋᓪᓗ', 'ᓈᒻᒪᒋᔭᐅᓯᒪᑎᓪᓗᒋᑦ', 'ᓘᑦᑖᖑᓂᕐᒧᑦ', 'ᓯᕗᓂᕕᓂᕆᔭᕆᓕᖅᑕᑦᑎᓐᓄᑦ', 'ᓴᐃᒻᒪᖅᑎᑕᐅᓯᒪᓪᓗᖓ', 'ᕿᒥᕐᕈᓚᐅᖅᓯᒪᒻᒪᒋᑦ', 'ᖃᐅᔨᒪᓂᕆᓕᕈᒫᖅᑕᖏᑕ', 'ᖃᐅᔨᒪᓂᕐᒥᓄᑦ', 'ᖃᐅᔨᓯᒪᓕᕋᒪ', 'ᖃᐅᔨᓴᕈᑎᒋᔭᓐᓂ', 'ᖃᐅᔨᓴᕐᓂᐊᖅᑐᒋᑦ', 'ᖃᓄᐃᒋᔮᖖᒋᑕᕋ']);
	});

});
