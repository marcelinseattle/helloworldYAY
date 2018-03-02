(function() {
  var OpenInBrowsers, OpenInBrowsersView,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  OpenInBrowsersView = require('./open-in-browsers-view').OpenInBrowsersView;

  module.exports = OpenInBrowsers = {
    openInBrowsersView: null,
    subscriptions: null,
    config: {
      browsers: {
        title: 'List of Browsers',
        type: 'array',
        "default": ['IE', 'Edge', 'Chrome', 'Firefox', 'Opera', 'Safari', 'BrowserPlus']
      },
      defBrowser: {
        title: 'Default Browser',
        type: 'string',
        "default": ['Chrome']
      },
      fileTypes: {
        title: 'HTML File Types',
        type: 'array',
        "default": ['html', 'htm', 'xhtml']
      },
      IE: {
        title: 'IE',
        type: 'boolean',
        "default": true
      },
      Edge: {
        title: 'IE',
        type: 'boolean',
        "default": false
      },
      Chrome: {
        title: 'Chrome',
        type: 'boolean',
        "default": true
      },
      Firefox: {
        title: 'Firefox',
        type: 'boolean',
        "default": true
      },
      Opera: {
        title: 'Opera',
        type: 'boolean',
        "default": true
      },
      Safari: {
        title: 'Safari',
        type: 'boolean',
        "default": true
      },
      BrowserPlus: {
        title: 'Browser Plus',
        type: 'boolean',
        "default": true
      },
      LocalHost: {
        title: 'Switch LocalHost',
        type: 'boolean',
        "default": true
      },
      LocalHostURL: {
        title: 'LocalHost URL',
        type: 'string',
        "default": 'http://localhost:3000'
      }
    },
    consumeAddPreview: function(addPreview) {
      var requires;
      this.addPreview = addPreview;
      requires = {
        pkgName: 'open-in-browsers',
        fileTypes: (function() {
          var types;
          return types = atom.config.get('open-in-browsers.fileTypes');
        })(),
        browser: {
          noPreview: true,
          hyperLive: function() {
            if (atom.config.get('open-in-browsers.LocalHost')) {
              atom.notifications.addSuccess('Live Not Availble for LocalHost');
              return false;
            }
            return true;
          },
          quickPreview: true,
          viewClass: OpenInBrowsersView,
          viewArgs: ['BrowserPlus'],
          exe: function(src, options, data, fileName, quickPreview, hyperLive, editor, view) {
            var foldr, fpath, html, lines, pp, pub, url, _ref;
            if (!atom.packages.getActivePackage('browser-plus')) {
              atom.notifications.addSuccess('APM Install Browser-Plus to display in browser-plus');
              return;
            }
            pp = atom.packages.getLoadedPackage('pp');
            if (options.url) {
              pp.mainModule.bp.open(options.url);
              return false;
            } else {
              if (quickPreview || hyperLive) {
                lines = src.split('\n');
                src = lines.join('<br/>');
                html = "<pre style=\"word-wrap: break-word; white-space: pre-wrap;\">\n" + src + "\n</pre>";
                pp.mainModule.bp.open(null, html);
                return false;
              } else {
                if ((typeof target !== "undefined" && target !== null ? (_ref = target.dataset) != null ? _ref.path : void 0 : void 0) != null) {
                  fpath = target.dataset.path;
                } else {
                  if (atom.config.get('open-in-browsers.LocalHost')) {
                    url = atom.config.get('open-in-browsers.LocalHostURL');
                    pub = atom.config.get('open-in-browsers.PublicFolder');
                    foldr = atom.project.getPaths()[0];
                    if (pub && fileName.has(pub)) {
                      foldr = foldr + pub;
                    }
                    fpath = fileName.replace(foldr, url);
                  } else {
                    fpath = "file:///" + fileName;
                  }
                }
                pp.mainModule.bp.open(fpath);
                return false;
              }
            }
          }
        },
        browsers: {
          noPreview: true,
          hyperLive: true,
          quickPreview: false,
          viewClass: OpenInBrowsersView,
          exe: function(src, options, data, fileName, quickPreview, hyperLive, editor, view) {
            if (options['url']) {
              this.vw.htmlURL = options['url'];
            } else {
              this.vw.htmlURL = void 0;
            }
            return this.vw.open();
          }
        }
      };
      return this.ids = this.addPreview(requires);
    },
    activate: function(state) {
      var CompositeDisposable, browser, browsers, fileType, sel, submenu, _i, _j, _len, _len1, _ref;
      CompositeDisposable = require('atom').CompositeDisposable;
      this.openInBrowsersView = new OpenInBrowsersView();
      this.subscriptions = new CompositeDisposable;
      submenu = [];
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'open-in-browsers:toggle': (function(_this) {
          return function(target) {
            return _this.openInBrowsersView.openBrowser(null, target);
          };
        })(this)
      }));
      browsers = atom.config.get('open-in-browsers.browsers');
      for (_i = 0, _len = browsers.length; _i < _len; _i++) {
        browser = browsers[_i];
        if (atom.config.get("open-in-browsers." + browser)) {
          atom.commands.add('atom-workspace', "open-in-browsers:" + browser, (function(_this) {
            return function(browser) {
              return function(_arg) {
                var target;
                target = _arg.target;
                return _this.openInBrowsersView.openBrowser(null, target, browser);
              };
            };
          })(this)(browser));
          submenu.push({
            label: "Open in " + browser,
            command: "open-in-browsers:" + browser
          });
        }
      }
      _ref = atom.config.get('open-in-browsers.fileTypes');
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        fileType = _ref[_j];
        sel = {};
        sel['.tree-view .file .name[data-name$=".' + fileType + '"]'] = [
          {
            label: 'Open in Browsers',
            submenu: submenu
          }
        ];
        atom.contextMenu.add(sel);
      }
      return atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(activePane) {
          var pkgs, _;
          _ = require('lodash');
          pkgs = atom.packages.getAvailablePackageNames();
          if (!_.contains(pkgs, 'pp')) {
            _this.updateStatusBar(activePane);
            return activePane != null ? typeof activePane.onDidChangeTitle === "function" ? activePane.onDidChangeTitle(function() {
              return _this.updateStatusBar();
            }) : void 0 : void 0;
          }
        };
      })(this));
    },
    consumeStatusBar: function(statusBar) {
      var pkgs, _;
      this.statusBar = statusBar;
      _ = require('lodash');
      pkgs = atom.packages.getAvailablePackageNames();
      if (!_.contains(pkgs, 'pp')) {
        this.openInBrowsersView || (this.openInBrowsersView = new OpenInBrowsersView());
        return this.updateStatusBar();
      } else {
        return "</span>";
      }
    },
    updateStatusBar: function(editor) {
      var filePath, path, _ref, _ref1, _ref2, _ref3;
      if (editor == null) {
        editor = atom.workspace.getActivePaneItem();
      }
      path = require('path');
      filePath = editor != null ? (_ref = editor.buffer) != null ? (_ref1 = _ref.file) != null ? _ref1.path : void 0 : void 0 : void 0;
      if (filePath && (_ref2 = path.extname(filePath).substr(1), __indexOf.call(atom.config.get('open-in-browsers').fileTypes, _ref2) >= 0)) {
        return this.browserBar = this.statusBar.addLeftTile({
          item: this.openInBrowsersView,
          priority: 100
        });
      } else {
        return (_ref3 = this.browserBar) != null ? _ref3.destroy() : void 0;
      }
    },
    deactivate: function() {
      return this.openInBrowsersView.destroy();
    },
    serialize: function() {
      return {
        openInBrowsersViewState: this.openInBrowsersView.serialize()
      };
    },
    toggle: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3NlcnMvbGliL29wZW4taW4tYnJvd3NlcnMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtDQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQyxxQkFBc0IsT0FBQSxDQUFRLHlCQUFSLEVBQXRCLGtCQUFELENBQUE7O0FBQUEsRUFDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixjQUFBLEdBQ2Y7QUFBQSxJQUFBLGtCQUFBLEVBQW9CLElBQXBCO0FBQUEsSUFDQSxhQUFBLEVBQWUsSUFEZjtBQUFBLElBRUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxRQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxrQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLE9BRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxDQUFFLElBQUYsRUFBUSxNQUFSLEVBQWUsUUFBZixFQUF5QixTQUF6QixFQUFvQyxPQUFwQyxFQUE2QyxRQUE3QyxFQUFzRCxhQUF0RCxDQUZUO09BREY7QUFBQSxNQUtBLFVBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGlCQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsU0FBQSxFQUFTLENBQUMsUUFBRCxDQUZUO09BTkY7QUFBQSxNQVVBLFNBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGlCQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sT0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLENBQUMsTUFBRCxFQUFRLEtBQVIsRUFBYyxPQUFkLENBRlQ7T0FYRjtBQUFBLE1BY0EsRUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sSUFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxJ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

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browsers/lib/open-in-browsers.coffee
