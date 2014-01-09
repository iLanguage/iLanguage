/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// WordCloud Model
	// ----------

	// Our basic **WordCloud** model has `text`, `order`, and `completed` attributes.
	app.WordCloud = Backbone.Model.extend({
		// Default attributes for the wordCloud
		// and ensure that each wordCloud created has `text` and `completed` keys.
		defaults: {
			text: '',
			stopWords: 'a the an of or',
			completed: false
		},

		// Toggle the `completed` state of this wordCloud item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}
	});
})();


/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// WordCloud Collection
	// ---------------

	// The collection of wordClouds is backed by *localStorage* instead of a remote
	// server.
	var WordClouds = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.WordCloud,

		// Save all of the wordCloud items under the `"wordClouds"` namespace.
		localStorage: new Backbone.LocalStorage('wordClouds-backbone'),

		// Filter down the list of all wordCloud items that are finished.
		completed: function () {
			return this.filter(function (wordCloud) {
				return wordCloud.get('completed');
			});
		},

		// Filter down the list to only wordCloud items that are still not finished.
		remaining: function () {
			return this.without.apply(this, this.completed());
		},

		// We keep the WordClouds in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// WordClouds are sorted by their original insertion order.
		comparator: function (wordCloud) {
			return wordCloud.get('order');
		}
	});

	// Create our global collection of **WordClouds**.
	app.wordClouds = new WordClouds();
})();

/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// WordCloud Item View
	// --------------

	// The DOM element for a wordCloud item...
	app.WordCloudView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},

		// The WordCloudView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **WordCloud** and a **WordCloudView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the texts of the wordCloud item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			// This sample shows a few TO DOs to make the loadCloud more useful:
			// * not be global
			// * something is wrong with the width detection, TODO remove timeout
			// * accept an object which
			//  * contains the text
			//  * contains an optional double click function etc
			var self = this;
			window.setTimeout(function(){
				self.$el.find('.word-cloud').html('');
        WordCloud({
          element: self.$el.find('.word-cloud')[0],
          text: self.model.get("text")
        }).render();
			}, 100);
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return (// hidden cases only
				(!isCompleted && app.WordCloudFilter === 'completed') ||
				(isCompleted && app.WordCloudFilter === 'active')
			);
		},

		// Toggle the `"completed"` state of the model.
		toggleCompleted: function () {
			this.model.toggle();
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// Close the `"editing"` mode, saving changes to the wordCloud.
		close: function () {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			if (trimmedValue) {
				this.model.save({ text: trimmedValue });

				if (value !== trimmedValue) {
					// Model values changes consisting of whitespaces only are not causing change to be triggered
					// Therefore we've to compare untrimmed version with a trimmed one to chech whether anything changed
					// And if yes, we've to trigger change event ourselves
					this.model.trigger('change');
				}
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
				this.close();
			}
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}
	});
})(jQuery);

/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#wordCloudapp',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-wordCloud': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		// At initialization we bind to the relevant events on the `WordClouds`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting wordClouds that might be saved in *localStorage*.
		initialize: function () {
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-wordCloud');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

			this.listenTo(app.wordClouds, 'add', this.addOne);
			this.listenTo(app.wordClouds, 'reset', this.addAll);
			this.listenTo(app.wordClouds, 'change:completed', this.filterOne);
			this.listenTo(app.wordClouds, 'filter', this.filterAll);
			this.listenTo(app.wordClouds, 'all', this.render);

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			app.wordClouds.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var completed = app.wordClouds.completed().length;
			var remaining = app.wordClouds.remaining().length;

			if (app.wordClouds.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.WordCloudFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single wordCloud item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (wordCloud) {
			var view = new app.WordCloudView({ model: wordCloud });
			$('#wordCloud-list').append(view.render().el);
		},

		// Add all items in the **WordClouds** collection at once.
		addAll: function () {
			this.$('#wordCloud-list').html('');
			app.wordClouds.each(this.addOne, this);
		},

		filterOne: function (wordCloud) {
			wordCloud.trigger('visible');
		},

		filterAll: function () {
			app.wordClouds.each(this.filterOne, this);
		},

		// Generate the attributes for a new WordCloud item.
		newAttributes: function () {
			return {
				text: this.$input.val().trim(),
				order: app.wordClouds.nextOrder(),
				completed: false
			};
		},

		// If you hit return in the main input field, create new **WordCloud** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {
			if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
				return;
			}

			app.wordClouds.create(this.newAttributes());
			this.$input.val('');
		},

		// Clear all completed wordCloud items, destroying their models.
		clearCompleted: function () {
			_.invoke(app.wordClouds.completed(), 'destroy');
			return false;
		},

		toggleAllComplete: function () {
			var completed = this.allCheckbox.checked;

			app.wordClouds.each(function (wordCloud) {
				wordCloud.save({
					'completed': completed
				});
			});
		}
	});
})(jQuery);

/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// WordCloud Router
	// ----------
	var WordCloudRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.WordCloudFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of WordCloud view items
			app.wordClouds.trigger('filter');
		}
	});

	app.WordCloudRouter = new WordCloudRouter();
	Backbone.history.start();
})();


/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;

$(function() {
	'use strict';

	// kick things off by creating the `App`
	new app.AppView();

	/*
	Add some sample clouds
	 */
	window.setTimeout(function() {
		if (app.wordClouds.length == 0) {
			app.wordClouds.create({
				text: "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)",
				stopWords: "and or is",
				order: app.wordClouds.nextOrder(),
				completed: false
			});
			app.wordClouds.create({
				text: "Cloud computing, or the cloud, is a colloquial expression used to describe a variety of different types of computing concepts that involve a large number of computers connected through a real-time communication network such as the Internet.[1] Cloud computing is a term without a commonly accepted unequivocal scientific or technical definition. In science, cloud computing is a synonym for distributed computing over a network and means the ability to run a program on many connected computers at the same time. The phrase is also, more commonly used to refer to network-based services which appear to be provided by real server hardware, which in fact are served up by virtual hardware, simulated by software running on one or more real machines. Such virtual servers do not physically exist and can therefore be moved around and scaled up (or down) on the fly without affecting the end user - arguably, rather like a cloud. The popularity of the term can be attributed to its use in marketing to sell hosted services in the sense of application service provisioning that run client server software on a remote location. Advantages Cloud computing relies on sharing of resources to achieve coherence and economies of scale similar to a utility (like the electricity grid) over a network.[2] At the foundation of cloud computing is the broader concept of converged infrastructure and shared services. The cloud also focuses on maximizing the effectiveness of the shared resources. Cloud resources are usually not only shared by multiple users but are also dynamically re-allocated per demand. This can work for allocating resources to users. For example, a cloud computer facility, which serves European users during European business hours with a specific application (e.g. email) while the same resources are getting reallocated and serve North American users during North America's business hours with another application (e.g. web server). This approach should maximize the use of computing powers thus reducing environmental damage as well since less power, air conditioning, rackspace, etc. is required for a variety of functions. The term 'moving to cloud' also refers to an organization moving away from a traditional CAPEX model (buy the dedicated hardware and depreciate it over a period of time) to theOPEX model (use a shared cloud infrastructure and pay as you use it). Proponents claim that cloud computing allows companies to avoid upfront infrastructure costs, and focus on projects that differentiate their businesses instead of infrastructure.[3]Proponents also claim that cloud computing allows enterprises to get their applications up and running faster, with improved manageability and less maintenance, and enables IT to more rapidly adjust resources to meet fluctuating and unpredictable business demand.[3][4][5] Hosted services In marketing, cloud computing is mostly used to sell hosted services in the sense of application service provisioning that run client server software at a remote location. Such services are given popular acronyms like 'SaaS' (Software as a Service), 'PaaS' (Platform as a Service), 'IaaS' (Infrastructure as a Service), 'HaaS' (Hardware as a Service) and finally 'EaaS' (Everything as a Service). End users access cloud-based applications through a web browser, thin client or mobile app while the business software and user's data are stored on servers at a remote location. History The 1950s The underlying concept of cloud computing dates back to the 1950s, when large-scale mainframe computers became available in academia and corporations, accessible via thin clients/terminal computers, often referred to as 'dumb terminals', because they were used for communications but had no internal processing capacities. To make more efficient use of costly mainframes, a practice evolved that allowed multiple users to share both the physical access to the computer from multiple terminals as well as to share the CPU time. This eliminated periods of inactivity on the mainframe and allowed for a greater return on the investment. The practice of sharing CPU time on a mainframe became known in the industry as time-sharing.[6] The 1960s–1990s John McCarthy opined in the 1960s that 'computation may someday be organized as a public utility.'[7] Almost all the modern-day characteristics of cloud computing (elastic provision, provided as a utility, online, illusion of infinite supply), the comparison to the electricity industry and the use of public, private, government, and community forms, were thoroughly explored in Douglas Parkhill's 1966 book, The Challenge of the Computer Utility. Other scholars have shown that cloud computing's roots go all the way back to the 1950s when scientist Herb Grosch (the author of Grosch's law) postulated that the entire world would operate on dumb terminals powered by about 15 large data centers.[8] Due to the expense of these powerful computers, many corporations and other entities could avail themselves of computing capability through time sharing and several organizations, such as GE's GEISCO, IBM subsidiary The Service Bureau Corporation (SBC, founded in 1957), Tymshare (founded in 1966), National CSS (founded in 1967 and bought by Dun & Bradstreet in 1979), Dial Data (bought by Tymshare in 1968), and Bolt, Beranek and Newman (BBN) marketed time sharing as a commercial venture. The 1990s In the 1990s, telecommunications companies,who previously offered",
				stopWords: "and or is a",
				order: app.wordClouds.nextOrder(),
				completed: false
			});
		}
	}, 1000);

});
