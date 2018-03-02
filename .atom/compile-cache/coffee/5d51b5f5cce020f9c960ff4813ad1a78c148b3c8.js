(function() {
  var CompositeDisposable, OpenInBrowsers, OpenInBrowsersView,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CompositeDisposable = require('atom').CompositeDisposable;

  OpenInBrowsersView = require('./open-in-browsers-view').OpenInBrowsersView;

  module.exports = OpenInBrowsers = {
    openInBrowsersView: null,
    subscriptions: null,
    config: {
      browsers: {
        title: 'List of Browsers',
        type: 'array',
        "default": ['IE', 'Edge', 'Chrome', 'ChromePortable', 'Firefox', 'FirefoxPortable', 'Opera', 'Safari', 'SafariPortable', 'BrowserPlus']
      },
      defBrowser: {
        title: 'Default Browser',
        type: 'string',
        "default": 'Chrome',
        "enum": ['IE', 'Edge', 'Chrome', 'ChromePortable', 'Firefox', 'FirefoxPortable', 'Opera', 'Safari', 'SafariPortable', 'BrowserPlus']
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
        title: 'Edge',
        type: 'boolean',
        "default": false
      },
      Chrome: {
        title: 'Chrome',
        type: 'boolean',
        "default": true
      },
      ChromePortable: {
        title: 'Chrome Portable',
        type: 'boolean',
        "default": false
      },
      ChromePortablePath: {
        title: 'Chrome Portable Path',
        type: 'string',
        "default": ''
      },
      Firefox: {
        title: 'Firefox',
        type: 'boolean',
        "default": true
      },
      FirefoxPortable: {
        title: 'Firefox Portable',
        type: 'boolean',
        "default": false
      },
      FirefoxPortablePath: {
        title: 'Firefox Portable Path',
        type: 'string',
        "default": ''
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
      SafariPortable: {
        title: 'Safari Portable',
        type: 'boolean',
        "default": false
      },
      SafariPortable: {
        title: 'Safari Portable Path',
        type: 'string',
        "default": ''
      },
      BrowserPlus: {
        title: 'Browser Plus',
        type: 'boolean',
        "default": true
      },
      LocalHost: {
        title: 'Switch to LocalHost',
        type: 'boolean',
        "default": false
      },
      LocalHostURL: {
        title: 'LocalHost URL',
        type: 'string',
        "default": 'http://localhost:3000'
      },
      project: {
        title: 'Project/Local Host Combination Config File',
        type: 'string',
        "default": '../project'
      }
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
            var fpath, pp, split, _ref, _ref1, _ref2, _ref3, _ref4;
            if (!atom.packages.getActivePackage('browser-plus')) {
              atom.notifications.addSuccess('APM Install Browser-Plus to display in browser-plus');
              return;
            }
            if (!(pp = atom.packages.getLoadedPackage('pp'))) {
              atom.notifications.addSuccess('APM Install PP(Preview-Plus) to display in browser-plus');
              return;
            }
            split = module.exports.getPosition();
            if (options.url) {
              atom.workspace.open(options.url, {
                searchAllPanes: true,
                split: split
              });
              return false;
            } else {
              fpath = OpenInBrowsersView.getFilePath(fileName);
              editor = (_ref = atom.workspace.paneForURI(fpath)) != null ? (_ref1 = _ref.getItems()) != null ? _ref1.find(function(pane) {
                return pane.getURI() === fpath;
              }) : void 0 : void 0;
              if (!editor) {
                fpath = fpath.replace(/\\/g, "/");
                editor = (_ref2 = atom.workspace.paneForURI(fpath)) != null ? (_ref3 = _ref2.getItems()) != null ? _ref3.find(function(pane) {
                  return pane.getURI() === fpath;
                }) : void 0 : void 0;
              }
              if (quickPreview || hyperLive || fileName.indexOf("~pp~")) {
                if (editor) {
                  editor.setText(src);
                } else {
                  atom.workspace.open(fpath, {
                    src: src,
                    split: split
                  });
                }
              } else {
                if ((typeof target !== "undefined" && target !== null ? (_ref4 = target.dataset) != null ? _ref4.path : void 0 : void 0) != null) {
                  fpath = target.dataset.path;
                }
                if (editor) {
                  editor.setText('');
                  editor.refresh();
                } else {
                  atom.workspace.open(fpath, {
                    split: split
                  });
                }
              }
              return false;
            }
          }
        },
        browsers: {
          noPreview: true,
          hyperLive: false,
          quickPreview: false,
          viewClass: OpenInBrowsersView,
          exe: function(src, options, data, fileName, quickPreview, hyperLive, editor, view) {
            if (options['url']) {
              this.vw.htmlURL = options['url'];
            } else {
              this.vw.htmlURL = void 0;
            }
            this.vw.fileName = fileName;
            return this.vw.open();
          }
        }
      };
      return this.ids = this.addPreview(requires);
    },
    activate: function(state) {
      var browser, browsers, fileType, sel, submenu, _i, _j, _len, _len1, _ref;
      this.openInBrowsersView = new OpenInBrowsersView();
      this.subscriptions = new CompositeDisposable;
      submenu = [];
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'open-in-browsers:addBrowser': (function(_this) {
          return function(target) {};
        })(this)
      }));
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3NlcnMvbGliL29wZW4taW4tYnJvd3NlcnMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVEQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNDLHFCQUFzQixPQUFBLENBQVEseUJBQVIsRUFBdEIsa0JBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGNBQUEsR0FDZjtBQUFBLElBQUEsa0JBQUEsRUFBb0IsSUFBcEI7QUFBQSxJQUNBLGFBQUEsRUFBZSxJQURmO0FBQUEsSUFFQSxNQUFBLEVBRUU7QUFBQSxNQUFBLFFBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGtCQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sT0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLENBQUUsSUFBRixFQUFRLE1BQVIsRUFBZ0IsUUFBaEIsRUFBMEIsZ0JBQTFCLEVBQTRDLFNBQTVDLEVBQXVELGlCQUF2RCxFQUEwRSxPQUExRSxFQUFtRixRQUFuRixFQUE2RixnQkFBN0YsRUFBK0csYUFBL0csQ0FGVDtPQURGO0FBQUEsTUFLQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxpQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxRQUZUO0FBQUEsUUFHQSxNQUFBLEVBQU0sQ0FBRSxJQUFGLEVBQVEsTUFBUixFQUFnQixRQUFoQixFQUEwQixnQkFBMUIsRUFBNEMsU0FBNUMsRUFBdUQsaUJBQXZELEVBQTBFLE9BQTFFLEVBQW1GLFFBQW5GLEVBQTZGLGdCQUE3RixFQUErRyxhQUEvRyxDQUhOO09B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

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browsers/lib/open-in-browsers.coffee
