define(["backbone"], function(Backbone) {
  var ReportBot = Backbone.Model.extend(
  /** @lends ReportBot.prototype */
  {
    /**
     * TODO redo description
     * @class A bot is a type of user. It has the same information as a user, except it isnt a human, its a "bot."
     *        It crawls around the database and cleans it, or does other handy tasks. It also has
     *        permissions about the level of access to the data (read only,
     *        add/edit).
     *
     * @param {Function} map The CouchDB map function to run.
     * @param {Function} reduce The CouchDB reduce funtion to run, if 
     * there is one.
     * @param {String} location The location where the functions are
     * run, valid values are "local" and "server".
     * @param {String} crontab When the Bot is to run, in cron format.
     * If undefined, runs immediately. 
     *
     * @extends User.Model
     * @constructs
     */
    initialize : function() {
    },

    // Internal models: used by the parse function
    model : {
    },
    
    changeCorpus : function(corpusname, callback) {
      if (this.pouch == undefined) {
        this.pouch = Backbone.sync.pouch(Utils.androidApp() ? Utils.touchUrl + corpusname : Utils.pouchUrl + corpusname);
      }
      if (typeof callback == "function") {
        callback();
      }
    },
    
    /**
     * Schedule the bot to run the given MapReduce functions at the
     * given location on the given crontab schedule.
     */
    schedule : function() {
      // Store map function in globally
      window.validCouchViews = window.validCouchViews || [];
      window.validCouchViews.push(this.get("map"));
      if (this.get("reduce")) {
        window.validCouchViews.push(this.get("reduce"));
      }
      
      // Create my view document
      var view = {
         "_id" : "_design/something",
         "language": "javascript",
         "views": {
             "play": {
                 "map": this.get("map").toString()
             }
         }
      };
      if (this.get("reduce")) {
        view.views.play.reduce = this.get("reduce").toString();
      }
      
      // Store view on CouchDB
      var self = this;
      this.changeCorpus(this.get("corpusname"), function() {
        self.pouch(function(err, db) {
          db.post(view, function(error, response) {
            console.log("error: ", error, " response: ", response);
          })
        })
      });
    }
  });

  return ReportBot;
});
