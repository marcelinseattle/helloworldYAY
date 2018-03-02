(function() {
  var BrowserPlus, CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = BrowserPlus = {
    browserPlusView: null,
    subscriptions: null,
    config: {
      fav: {
        title: 'No of Favorites',
        type: 'number',
        "default": 10
      },
      history: {
        title: 'No of Days of History',
        type: 'number',
        "default": 5
      },
      homepage: {
        title: 'HomePage',
        type: 'string',
        "default": 'http://www.google.com'
      },
      live: {
        title: 'Live Refresh in ',
        type: 'number',
        "default": 500
      },
      node: {
        title: 'Node Integration ',
        type: 'boolean',
        "default": false
      },
      currentFile: {
        title: 'Show Current File',
        type: 'boolean',
        "default": true
      },
      blockUri: {
        title: 'Block URIs keywords',
        type: 'array',
        "default": ['youtube']
      },
      alert: {
        title: 'Alert message',
        type: 'boolean',
        "default": true
      }
    },
    activate: function(state) {
      var d, date, days, fs, oneDay, resources, today, val;
      if (!state.resetAgain) {
        state.history = [];
        state.favIcon = {};
        state.title = {};
        state.fav = [];
      }
      this.history = state.history || [];
      this.fav = state.fav || [];
      this.favIcon = state.favIcon || {};
      this.title = state.title || {};
      resources = "" + (atom.packages.getLoadedPackage('browser-plus').path) + "/resources/";
      if (atom.config.get('browser-plus.node')) {
        fs = require('fs');
        this.js = fs.readFileSync("" + resources + "browser-plus-client.js", 'utf-8');
        this.CSSjs = fs.readFileSync("" + resources + "CSSUtilities.js", 'utf-8');
        this.JQueryjs = fs.readFileSync("" + resources + "jquery-2.1.4.min.js", 'utf-8');
        this.Selectorjs = fs.readFileSync("" + resources + "selector.js", 'utf-8');
      }
      this.clientJS = "" + resources + "bp-client.js";
      atom.workspace.addOpener((function(_this) {
        return function(uri, opt) {
          var BrowserPlusModel, bp, localhostPattern, path;
          BrowserPlusModel = require('./browser-plus-model');
          path = require('path');
          if (path.extname(uri) === '.htmlp' || uri.indexOf('http:') === 0 || uri.indexOf('https:') === 0 || uri.indexOf('localhost') === 0 || uri.indexOf('file:') === 0 || uri.indexOf('browser-plus:') === 0) {
            localhostPattern = /^(http:\/\/)?localhost/i;
            if (!BrowserPlusModel.checkUrl(uri)) {
              return false;
            }
            uri = uri.replace(localhostPattern, 'http://127.0.0.1');
            bp = new BrowserPlusModel({
              browserPlus: _this,
              uri: uri,
              src: opt.src,
              realURL: opt.realURL
            });
            if (uri.indexOf('browser-plus://history') === 0) {
              bp.on('destroyed', function() {
                return _this.histView = void 0;
              });
            }
            return bp;
          }
        };
      })(this));
      oneDay = 24 * 60 * 60 * 1000;
      for (date in history) {
        val = history[date];
        d = new Date(date);
        today = new Date();
        days = Math.round(Math.abs((today.getTime() - d.getTime()) / oneDay));
        if (days > atom.config.get('browser-plus.history')) {
          delete history[date];
        }
      }
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'browser-plus:open': (function(_this) {
          return function() {
            return _this.open();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'browser-plus:openCurrent': (function(_this) {
          return function() {
            return _this.open(true);
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'browser-plus:history': (function(_this) {
          return function() {
            return _this.hist();
          };
        })(this)
      }));
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'browser-plus:fav': (function(_this) {
          return function() {
            return _this.favr();
          };
        })(this)
      }));
    },
    favr: function() {
      var favList;
      favList = require('./fav-view');
      return new favList(this.fav);
    },
    open: function(url, src, split, realURL) {
      var editor, uri, _ref;
      if (url && url !== true) {
        uri = url;
      } else {
        if (atom.config.get('browser-plus.currentFile') || url === true) {
          editor = atom.workspace.getActiveTextEditor();
          if (uri = editor != null ? (_ref = editor.buffer) != null ? _ref.getUri() : void 0 : void 0) {
            uri = "file:///" + uri;
          }
        }
        if (!uri) {
          uri = atom.config.get('browser-plus.homepage');
        }
      }
      if (!split) {
        split = this.getPosition();
      }
      if (src) {
        uri = "browser-plus://preview~" + uri;
      }
      return atom.workspace.open(uri, {
        split: split,
        src: src,
        realURL: realURL
      });
    },
    hist: function(uri, side) {
      if (uri == null) {
        uri = 'browser-plus://history';
      }
      if (side == null) {
        side = 'right';
      }
      return atom.workspace.open(uri, {
        split: side
      });
    },
    getPosition: function() {
      var activePane, orientation, paneAxis, paneIndex, _ref;
      activePane = atom.workspace.paneForItem(atom.workspace.getActiveTextEditor());
      if (!activePane) {
        return;
      }
      paneAxis = activePane.getParent();
      if (!paneAxis) {
        return;
      }
      paneIndex = paneAxis.getPanes().indexOf(activePane);
      orientation = (_ref = paneAxis.orientation) != null ? _ref : 'horizontal';
      if (orientation === 'horizontal') {
        if (paneIndex === 0) {
          return 'right';
        } else {
          return 'left';
        }
      } else {
        if (paneIndex === 0) {
          return 'down';
        } else {
          return 'up';
        }
      }
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    serialize: function() {
      return {
        history: this.history,
        fav: this.fav,
        favIcon: this.favIcon,
        title: this.title,
        resetAgain: true
      };
    },
    registerEvt: function(cb) {
      debugger;
    },
    provideService: function() {
      var BrowserPlusModel;
      BrowserPlusModel = require('./browser-plus-model');
      return {
        model: BrowserPlusModel,
        open: this.open.bind(this),
        evt: this.registerEvt.bind(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcGx1cy9saWIvYnJvd3Nlci1wbHVzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQ0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsV0FBQSxHQUNmO0FBQUEsSUFBQSxlQUFBLEVBQWlCLElBQWpCO0FBQUEsSUFDQSxhQUFBLEVBQWUsSUFEZjtBQUFBLElBRUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxHQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxpQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxFQUZUO09BREY7QUFBQSxNQUlBLE9BQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLHVCQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsU0FBQSxFQUFTLENBRlQ7T0FMRjtBQUFBLE1BUUEsUUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sVUFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyx1QkFGVDtPQVRGO0FBQUEsTUFZQSxJQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxrQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxHQUZUO09BYkY7QUFBQSxNQWdCQSxJQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxtQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BakJGO0FBQUEsTUFvQkEsV0FBQSxFQUNFO0FBQUEs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

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-plus/lib/browser-plus.coffee
