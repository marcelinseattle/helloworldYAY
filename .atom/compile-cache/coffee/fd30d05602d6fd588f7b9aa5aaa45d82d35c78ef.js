(function() {
  var $, BrowserPlusView, CompositeDisposable, View, jQ, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-space-pen-views'), View = _ref.View, $ = _ref.$;

  jQ = require('../node_modules/jquery/dist/jquery.js');

  require('jquery-ui/autocomplete');

  module.exports = BrowserPlusView = (function(_super) {
    __extends(BrowserPlusView, _super);

    function BrowserPlusView(model) {
      this.model = model;
      this.deActivateSelection = __bind(this.deActivateSelection, this);
      this.zoomFactor = 100;
      this.resources = "" + (atom.packages.getLoadedPackage('browser-plus').path) + "/resources/";
      this.subscriptions = new CompositeDisposable;
      this.model.view = this;
      this.model.onDidDestroy((function(_this) {
        return function() {
          _this.subscriptions.dispose();
          return jQ(_this.uri).autocomplete('destroy');
        };
      })(this));
      atom.notifications.onDidAddNotification(function(notification) {
        if (notification.type === 'info') {
          return setTimeout(function() {
            return notification.dismiss();
          }, 1000);
        }
      });
      BrowserPlusView.__super__.constructor.apply(this, arguments);
    }

    BrowserPlusView.content = function(params) {
      var src, srcdir, url;
      srcdir = atom.packages.getPackageDirPaths('browser-plus')[0] + '/browser-plus';
      if ((url = params.uri).indexOf('browser-plus://history') >= 0) {
        url = "file://" + this.resources + "history.html";
      }
      if (params.src) {
        src = params.src.replace(/"/g, '&quot;');
        if (src.startsWith("data:text/html,")) {
          url = src;
        } else {
          url = "data:text/html," + src;
        }
      }
      if (params.realURL) {
        url = params.realURL;
      }
      return this.div({
        "class": 'browser-plus'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'uri native-key-bindings'
          }, function() {
            _this.div({
              "class": 'nav-btns-left'
            }, function() {
              _this.span({
                id: 'back',
                "class": 'mega-octicon octicon-arrow-left',
                outlet: 'back'
              });
              _this.span({
                id: 'forward',
                "class": 'mega-octicon octicon-arrow-right',
                outlet: 'forward'
              });
              _this.span({
                id: 'refresh',
                "class": 'mega-octicon octicon-sync',
                outlet: 'refresh'
              });
              _this.span({
                id: 'select',
                "class": 'mega-octicon octicon-eye',
                outlet: 'select'
              });
              _this.span({
                id: 'history',
                "class": 'mega-octicon octicon-book',
                outlet: 'history'
              });
              _this.span({
                id: 'fav',
                "class": 'mega-octicon octicon-star',
                outlet: 'fav'
              });
              _this.span({
                id: 'favList',
                "class": 'octicon octicon-arrow-down',
                outlet: 'favList'
              });
              return _this.a({
                "class": "fa fa-spinner",
                outlet: 'spinner'
              });
            });
            _this.div({
              "class": 'nav-btns'
            }, function() {
              _this.div({
                "class": 'nav-btns-right'
              }, function() {
                _this.span({
                  id: 'print',
                  "class": 'icon-browser-pluss icon-print',
                  outlet: 'print'
                });
                _this.span({
                  id: 'thumbs',
                  "class": 'mega-octicon octicon-thumbsup',
                  outlet: 'thumbs'
                });
                _this.span({
                  id: 'live',
                  "class": 'mega-octicon octicon-zap',
                  outlet: 'live'
                });
                return _this.span({
                  id: 'devtool',
                  "class": 'mega-octicon octicon-tools',
                  outlet: 'devtool'
                });
              });
              return _this.div({
                "class": 'input-uri'
              }, function() {
                return _this.input({
                  "class": "native-key-bindings",
                  type: 'text',
                  id: 'uri',
                  outlet: 'uri',
                  value: "" + params.uri
                });
              });
            });
            return _this.input({
              id: 'find',
              "class": 'find find-hide',
              outlet: 'find'
            });
          });
          if (atom.config.get('browser-plus.node')) {
            return _this.tag('webview', {
              "class": "native-key-bindings",
              outlet: 'htmlv',
              nodeintegration: 'on',
              plugins: 'on',
              src: "" + url,
              disablewebsecurity: 'on',
              allowfileaccessfromfiles: 'on',
              allowPointerLock: 'on',
              preload: "file:///" + srcdir + "/resources/bp-client.js"
            });
          } else {
            return _this.tag('webview', {
              "class": "native-key-bindings",
              outlet: 'htmlv',
              preload: "file:///" + srcdir + "/resources/bp-client.js",
              plugins: 'on',
              src: "" + url,
              disablewebsecurity: 'on',
              allowfileaccessfromfiles: 'on',
              allowPointerLock: 'on'
            });
          }
        };
      })(this));
    };

    BrowserPlusView.prototype.initialize = function() {
      var select, src, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      src = (function(_this) {
        return function(req, res) {
          var fav, hist, histDate, history, hists, key, pattern, searchUrl, title, uris, _, _i, _j, _len, _len1, _ref1;
          _ = require('lodash');
          pattern = RegExp("" + req.term, "i");
          history = [];
          fav = _.filter(_this.model.browserPlus.fav, function(fav) {
            return fav.uri.match(pattern) || fav.title.match(pattern);
          });
          _ref1 = _this.model.browserPlus.history;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            histDate = _ref1[_i];
            for (key in histDate) {
              hists = histDate[key];
              for (_j = 0, _len1 = hists.length; _j < _len1; _j++) {
                hist = hists[_j];
                title = _this.model.browserPlus.title[hist.uri];
                if (hist.uri.match(pattern) || (title != null ? title.match(pattern) : void 0)) {
                  history.push(hist.uri);
                }
              }
            }
          }
          uris = _.union(_.pluck(fav, "uri"), history);
          res(uris);
          searchUrl = 'http://api.bing.com/osjson.aspx';
          return (function() {
            return jQ.ajax({
              url: searchUrl,
              dataType: 'json',
              data: {
                query: req.term,
                'web.count': 10
              },
              success: (function(_this) {
                return function(data) {
                  var dat, search, _k, _len2, _ref2;
                  uris = uris.slice(0, 11);
                  search = "http://www.google.com/search?as_q=";
                  _ref2 = data[1].slice(0, 11);
                  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                    dat = _ref2[_k];
                    uris.push({
                      label: dat,
                      value: search + dat
                    });
                  }
                  return res(uris);
                };
              })(this)
            });
          })();
        };
      })(this);
      select = (function(_this) {
        return function(event, ui) {
          return _this.goToUrl(ui.item.value);
        };
      })(this);
      jQ(this.uri).autocomplete({
        source: src,
        minLength: 2,
        select: select
      });
      this.subscriptions.add(atom.tooltips.add(this.back, {
        title: 'Back'
      }));
      this.subscriptions.add(atom.tooltips.add(this.forward, {
        title: 'Forward'
      }));
      this.subscriptions.add(atom.tooltips.add(this.refresh, {
        title: 'Refresh'
      }));
      this.subscriptions.add(atom.tooltips.add(this.select, {
        title: 'Select'
      }));
      this.subscriptions.add(atom.tooltips.add(this.history, {
        title: 'View Hist/ctrl+h'
      }));
      this.subscriptions.add(atom.tooltips.add(this.print, {
        title: 'Print'
      }));
      this.subscriptions.add(atom.tooltips.add(this.favList, {
        title: 'View Favorites'
      }));
      this.subscriptions.add(atom.tooltips.add(this.fav, {
        title: 'Favoritize'
      }));
      this.subscriptions.add(atom.tooltips.add(this.live, {
        title: 'Live'
      }));
      this.subscriptions.add(atom.tooltips.add(this.devtool, {
        title: 'Dev Tools-f12'
      }));
      this.subscriptions.add(atom.tooltips.add(this.spinner, {
        title: 'spinner'
      }));
      this.subscriptions.add(atom.tooltips.add(this.find, {
        title: 'find'
      }));
      this.subscriptions.add(atom.commands.add('.browser-plus webview', {
        'browser-plus-view:goBack': (function(_this) {
          return function() {
            return _this.goBack();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.browser-plus webview', {
        'browser-plus-view:goForward': (function(_this) {
          return function() {
            return _this.goForward();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.browser-plus', {
        'browser-plus-view:findOn': (function(_this) {
          return function() {
            return _this.findOn();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.browser-plus', {
        'browser-plus-view:findOff': (function(_this) {
          return function() {
            return _this.findOff();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.browser-plus', {
        'browser-plus-view:zoomIn': (function(_this) {
          return function() {
            return _this.zoom(10);
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.browser-plus', {
        'browser-plus-view:zoomOut': (function(_this) {
          return function() {
            return _this.zoom(-10);
          };
        })(this)
      }));
      this.liveOn = false;
      this.subscriptions.add(atom.tooltips.add(this.thumbs, {
        title: 'Preview'
      }));
      this.element.onkeydown = (function(_this) {
        return function() {
          return _this.showDevTool(arguments);
        };
      })(this);
      if (this.model.uri.indexOf('file:///') >= 0) {
        this.checkFav();
      }
      if (this.model.uri.indexOf('browser-plus://history') >= 0) {
        this.hist = true;
        this.model.browserPlus.histView = this;
      } else {
        Array.observe(this.model.browserPlus.fav, (function(_this) {
          return function(ele) {
            return _this.checkFav();
          };
        })(this));
      }
      if ((_ref1 = this.htmlv[0]) != null) {
        _ref1.addEventListener("permissionrequest", function(e) {
          return e.request.allow();
        });
      }
      if ((_ref2 = this.htmlv[0]) != null) {
        _ref2.addEventListener("console-message", (function(_this) {
          return function(e) {
            var BrowserPlusModel, MOMENT, data, date, delDate, his, hist, i, idx, indx, item, itm, itms, key, loophole, moment, obj, title, uri, _i, _j, _len, _len1, _ref3, _ref4, _ref5, _ref6;
            if (_this.model.uri === 'browser-plus://history') {
              if (e.message.includes('~browser-plus-hist-clear~')) {
                _this.model.browserPlus.history = [];
                if ((_ref3 = _this.htmlv[0]) != null) {
                  _ref3.executeJavaScript("riot.mount('hist',eval(" + data + ")); histTag = (riot.update())[0]");
                }
              }
              if (e.message.includes('~browser-plus-hist-del-date~')) {
                delDate = e.message.replace('~browser-plus-hist-del-date~', '');
                hist = _this.model.browserPlus.history;
                for (i = _i = 0, _len = hist.length; _i < _len; i = ++_i) {
                  key = hist[i];
                  for (date in key) {
                    obj = key[date];
                    if (date === delDate) {
                      hist.splice(i, 1);
                    }
                  }
                }
              }
              if (e.message.includes('~browser-plus-hist-delete~')) {
                item = e.message.replace('~browser-plus-hist-delete~', '');
                loophole = require('./eval');
                item = loophole.allowUnsafeEval(function() {
                  return eval("(" + item + ")");
                });
                MOMENT = require("../resources/moment.min.js");
                moment = MOMENT(item.date).format('YYYYMMDD');
                hist = _this.model.browserPlus.history;
                if (!(hist || hist.length === 0)) {
                  return;
                }
                for (_j = 0, _len1 = hist.length; _j < _len1; _j++) {
                  his = hist[_j];
                  for (date in his) {
                    itms = his[date];
                    if (date === moment) {
                      for (idx in itms) {
                        itm = itms[idx];
                        if (itm.date === item.date) {
                          itms.splice(idx, 1);
                        }
                      }
                    }
                  }
                }
              }
            }
            if (e.message.includes('~browser-plus-href~')) {
              if (_this.model.uri === 'browser-plus://history') {
                data = {
                  hist: _this.model.browserPlus.history,
                  fav: _this.model.browserPlus.fav,
                  title: _this.model.browserPlus.title,
                  favIcon: _this.model.browserPlus.favIcon
                };
                data = JSON.stringify(data);
                return (_ref4 = _this.htmlv[0]) != null ? _ref4.executeJavaScript("riot.mount('hist',eval(" + data + ")); histTag = (riot.update())[0]") : void 0;
              } else {
                data = e.message.replace('~browser-plus-href~', '');
                indx = data.indexOf(' ');
                uri = data.substr(0, indx);
                title = data.substr(indx + 1);
                BrowserPlusModel = require('./browser-plus-model');
                if (!BrowserPlusModel.checkUrl(uri)) {
                  uri = atom.config.get('browser-plus.homepage') || "http://www.google.com";
                  atom.notifications.addSuccess("Redirecting to " + uri);
                  if ((_ref5 = _this.htmlv[0]) != null) {
                    _ref5.executeJavaScript("location.href = '" + uri + "'");
                  }
                  return;
                }
                if (uri && uri !== _this.model.uri && !_this.model.realURL) {
                  _this.uri.val(uri);
                  _this.model.uri = uri;
                }
                if (title) {
                  _this.model.browserPlus.title[_this.model.uri] = title;
                  if (title !== _this.model.getTitle()) {
                    _this.model.setTitle(title);
                  }
                } else {
                  _this.model.browserPlus.title[_this.model.uri] = uri;
                  _this.model.setTitle(uri);
                }
                _this.select.removeClass('active');
                _this.deActivateSelection();
                _this.live.toggleClass('active', _this.liveOn);
                if (!_this.liveOn) {
                  if ((_ref6 = _this.liveSubscription) != null) {
                    _ref6.dispose();
                  }
                }
                _this.checkNav();
                _this.checkFav();
                _this.addHistory();
                if (atom.config.get('browser-plus.node')) {
                  return setTimeout(function() {
                    var _ref10, _ref7, _ref8, _ref9;
                    if ((_ref7 = _this.htmlv[0]) != null) {
                      _ref7.executeJavaScript(_this.model.browserPlus.CSSjs);
                    }
                    if ((_ref8 = _this.htmlv[0]) != null) {
                      _ref8.executeJavaScript(_this.model.browserPlus.Selectorjs);
                    }
                    if ((_ref9 = _this.htmlv[0]) != null) {
                      _ref9.executeJavaScript(_this.model.browserPlus.JQueryjs);
                    }
                    return (_ref10 = _this.htmlv[0]) != null ? _ref10.executeJavaScript(_this.model.browserPlus.js) : void 0;
                  }, 100);
                }
              }
            }
          };
        })(this));
      }
      if ((_ref3 = this.htmlv[0]) != null) {
        _ref3.addEventListener("page-favicon-updated", (function(_this) {
          return function(e) {
            var icon, style;
            _this.model.browserPlus.favIcon[_this.model.uri] = icon = e.favicons[0];
            _this.model.iconName = Math.floor(Math.random() * 10000);
            _this.model.updateIcon();
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = ".title.icon.icon-" + _this.model.iconName + " {\n  background-size: 16px 16px;\n  background-repeat: no-repeat;\n  padding-left: 20px;\n  background-image: url('" + icon + "');\n  background-position-y: 50%;\n}";
            document.getElementsByTagName('head')[0].appendChild(style);
            return _this.liveHistory();
          };
        })(this));
      }
      if ((_ref4 = this.htmlv[0]) != null) {
        _ref4.addEventListener("page-title-set", (function(_this) {
          return function(e) {
            _this.model.browserPlus.title[_this.model.uri] = e.title;
            _this.liveHistory();
            return _this.model.setTitle(e.title);
          };
        })(this));
      }
      if ((_ref5 = this.htmlv[0]) != null) {
        _ref5.addEventListener("ipc-message", (function(_this) {
          return function(evt) {
            var _ref6, _ref7;
            switch (evt.channel) {
              case 'selection':
                _this.htmlSrc = (_ref6 = evt.args[0]) != null ? _ref6.html : void 0;
                return _this.css = (_ref7 = evt.args[0]) != null ? _ref7.css : void 0;
            }
          };
        })(this));
      }
      this.devtool.on('click', (function(_this) {
        return function(evt) {
          return _this.toggleDevTool();
        };
      })(this));
      this.print.on('click', (function(_this) {
        return function(evt) {
          var _ref6;
          return (_ref6 = _this.htmlv[0]) != null ? _ref6.print() : void 0;
        };
      })(this));
      this.live.on('click', (function(_this) {
        return function(evt) {
          if (_this.model.uri === 'browser-plus://history') {
            return;
          }
          if (_this.model.src) {
            return;
          }
          _this.liveOn = !_this.liveOn;
          _this.live.toggleClass('active', _this.liveOn);
          if (_this.liveOn) {
            _this.refreshPage();
            _this.liveSubscription = new CompositeDisposable;
            _this.liveSubscription.add(atom.workspace.observeTextEditors(function(editor) {
              return _this.liveSubscription.add(editor.onDidSave(function() {
                var timeout;
                timeout = atom.config.get('browser-plus.live');
                return setTimeout(function() {
                  var _ref6, _ref7;
                  return (_ref6 = _this.htmlv) != null ? (_ref7 = _ref6[0]) != null ? typeof _ref7.executeJavaScript === "function" ? _ref7.executeJavaScript("location.href = '" + _this.model.uri + "'") : void 0 : void 0 : void 0;
                }, timeout);
              }));
            }));
            return _this.model.onDidDestroy(function() {
              return _this.liveSubscription.dispose();
            });
          } else {
            return _this.liveSubscription.dispose();
          }
        };
      })(this));
      this.select.on('click', (function(_this) {
        return function(evt) {
          if (!atom.config.get('browser-plus.node')) {
            alert('change browser-plus config to allow node integeration');
            return;
          }
          _this.select.toggleClass('active');
          return _this.deActivateSelection();
        };
      })(this));
      this.thumbs.on('click', (function(_this) {
        return function(evt) {
          var className, cssText, html, key, styl, val, _ref6;
          if (!atom.config.get('browser-plus.node')) {
            alert('change browser-plus config to allow node integeration/ preview');
            return;
          }
          if (!_this.htmlSrc) {
            return;
          }
          cssText = "";
          _ref6 = _this.css;
          for (className in _ref6) {
            styl = _ref6[className];
            cssText += " ." + className + "{  ";
            for (key in styl) {
              val = styl[key];
              cssText += "" + key + ": " + val + ";  ";
            }
            cssText += " }  ";
          }
          html = "data:text/html,\n<html>\n  <head>\n    <meta bp-uri='browser-plus://preview'>\n    <base href='" + (_this.uri.val()) + "'>\n    <style type='text/css'>\n      " + cssText + "\n    </style>\n  </head>\n  <body>\n     " + (_this.htmlSrc.replace(/"/g, '\'')) + "\n  </body>\n</html>";
          return atom.workspace.open('browser-plus://preview', {
            split: 'left',
            searchAllPanes: true,
            src: html
          });
        };
      })(this));
      this.fav.on('click', (function(_this) {
        return function(evt) {
          var data, delCount, favs, _ref6, _ref7;
          if (_this.model.src) {
            return;
          }
          if ((_ref6 = _this.htmlv[0]) != null ? _ref6.getUrl().startsWith('data:text/html,') : void 0) {
            return;
          }
          if (_this.model.uri.startsWith('browser-plus:')) {
            return;
          }
          favs = _this.model.browserPlus.fav;
          if (_this.fav.hasClass('active')) {
            _this.removeFav(_this.model);
          } else {
            data = {
              uri: _this.model.uri,
              title: _this.model.browserPlus.title[_this.model.uri] || _this.model.uri,
              favIcon: _this.model.browserPlus.favIcon[_this.model.uri]
            };
            favs.push(data);
            delCount = favs.length - atom.config.get('browser-plus.fav');
            if (delCount > 0) {
              favs.splice(0, delCount);
            }
          }
          _this.fav.toggleClass('active');
          return (_ref7 = _this.model.browserPlus.histView) != null ? _ref7.htmlv[0].send('updFav', _this.model.browserPlus.fav) : void 0;
        };
      })(this));
      if ((_ref6 = this.htmlv[0]) != null) {
        _ref6.addEventListener('new-window', function(e) {
          return atom.workspace.open(e.url, {
            split: 'left',
            searchAllPanes: true
          });
        });
      }
      if ((_ref7 = this.htmlv[0]) != null) {
        _ref7.addEventListener("did-start-loading", (function(_this) {
          return function() {
            var _ref8;
            _this.spinner.removeClass('fa-custom');
            return (_ref8 = _this.htmlv[0]) != null ? _ref8.shadowRoot.firstChild.style.height = '95%' : void 0;
          };
        })(this));
      }
      if ((_ref8 = this.htmlv[0]) != null) {
        _ref8.addEventListener("did-stop-loading", (function(_this) {
          return function() {
            return _this.spinner.addClass('fa-custom');
          };
        })(this));
      }
      if ((_ref9 = this.htmlv[0]) != null) {
        _ref9.addEventListener("dom-ready", (function(_this) {
          return function() {
            var findCSS, findJS, fs;
            if (1 === 0) {
              fs = require('fs');
              findCSS = fs.readFileSync("" + _this.resources + "highlight.css", "utf-8");
              findJS = fs.readFileSync("" + _this.resources + "jquery.highlight.js", "utf-8");
              _this.htmlv[0].insertCSS(findCSS);
              return _this.htmlv[0].executeJavaScript(findJS);
            }
          };
        })(this));
      }
      this.history.on('click', (function(_this) {
        return function(evt) {
          return atom.workspace.open('browser-plus://history', {
            split: 'left',
            searchAllPanes: true
          });
        };
      })(this));
      this.back.on('click', (function(_this) {
        return function(evt) {
          var _ref10, _ref11;
          if (((_ref10 = _this.htmlv[0]) != null ? _ref10.canGoBack() : void 0) && $( this).hasClass('active')) {
            return (_ref11 = _this.htmlv[0]) != null ? _ref11.goBack() : void 0;
          }
        };
      })(this));
      this.favList.on('click', (function(_this) {
        return function(evt) {
          var favList;
          favList = require('./fav-view');
          return new favList(_this.model.browserPlus.fav);
        };
      })(this));
      this.forward.on('click', (function(_this) {
        return function(evt) {
          var _ref10, _ref11;
          if (((_ref10 = _this.htmlv[0]) != null ? _ref10.canGoForward() : void 0) && $( this).hasClass('active')) {
            return (_ref11 = _this.htmlv[0]) != null ? _ref11.goForward() : void 0;
          }
        };
      })(this));
      this.uri.on('click', (function(_this) {
        return function(evt) {
          return _this.uri.select();
        };
      })(this));
      this.find.on('keyup', (function(_this) {
        return function(evt) {
          var fs, highlightJS;
          fs = require('fs');
          if (evt.which === 13) {
            highlightJS = fs.readFileSync("" + _this.resources + "highlight.js", "utf-8");
            return _this.htmlv[0].executeJavaScript(highlightJS);
          } else {
            return _this.htmlv[0].executeJavaScript("jQuery('body').unhighlight();\njQuery('body').highlight('" + (_this.find.val()) + "');\njQuery('span').removeClass('browser-plus-find');\njQuery('span').removeClass('browser-plus-previous');\njQuery('.highlight:visible:first').addClass('browser-plus-find');");
          }
        };
      })(this));
      this.uri.on('keypress', (function(_this) {
        return function(evt) {
          var URL, localhostPattern, url, urls, _ref10;
          URL = require('url');
          if (evt.which === 13) {
            _this.uri.blur();
            urls = URL.parse( this.value);
            url =  this.value;
            if (url.indexOf(' ') >= 0) {
              url = "http://www.google.com/search?as_q=" + url;
            } else {
              localhostPattern = /^(http:\/\/)?localhost/i;
              if (url.search(localhostPattern) < 0 && url.indexOf('.') < 0) {
                url = "http://www.google.com/search?as_q=" + url;
              } else {
                if ((_ref10 = urls.protocol) === 'http' || _ref10 === 'https' || _ref10 === 'file:') {
                  if (urls.protocol === 'file:') {
                    url = url.replace(/\\/g, "/");
                  } else {
                    url = URL.format(urls);
                  }
                } else if (url.indexOf('localhost') !== -1) {
                  url = url.replace(localhostPattern, 'http://127.0.0.1');
                } else {
                  urls.protocol = 'http';
                  url = URL.format(urls);
                }
              }
            }
            return _this.goToUrl(url);
          }
        };
      })(this));
      return this.refresh.on('click', (function(_this) {
        return function(evt) {
          if (_this.model.uri === 'browser-plus://history') {
            return;
          }
          return _this.refreshPage();
        };
      })(this));
    };

    BrowserPlusView.prototype.refreshPage = function() {
      var htmlv, _ref1, _ref2;
      if (this.model.realURL) {
        htmlv = this.model.view.htmlv[0];
        return (_ref1 = this.htmlv[0]) != null ? _ref1.executeJavaScript("location.href = '" + (htmlv.getUrl()) + "'") : void 0;
      } else {
        return (_ref2 = this.htmlv[0]) != null ? _ref2.executeJavaScript("location.href = '" + this.model.uri + "'") : void 0;
      }
    };

    BrowserPlusView.prototype.goToUrl = function(url) {
      var BrowserPlusModel, _ref1;
      BrowserPlusModel = require('./browser-plus-model');
      if (!BrowserPlusModel.checkUrl(url)) {
        return;
      }
      jQ(this.uri).autocomplete("close");
      this.select.removeClass('active');
      this.deActivateSelection();
      this.liveOn = false;
      this.live.toggleClass('active', this.liveOn);
      if (!this.liveOn) {
        if ((_ref1 = this.liveSubscription) != null) {
          _ref1.dispose();
        }
      }
      this.uri.val(url);
      this.model.uri = url;
      this.htmlv.attr('src', url);
      return this.model.realURL = void 0;
    };

    BrowserPlusView.prototype.goBack = function() {
      return this.back.click();
    };

    BrowserPlusView.prototype.goForward = function() {
      return this.forward.click();
    };

    BrowserPlusView.prototype.zoom = function(factor) {
      var _ref1, _ref2;
      if ((20 <= (_ref1 = this.zoomFactor + factor) && _ref1 <= 500)) {
        this.zoomFactor += factor;
      }
      if ((_ref2 = atom.notifications.getNotifications()[0]) != null) {
        _ref2.dismiss();
      }
      atom.notifications.clear();
      atom.notifications.addInfo("zoom: " + this.zoomFactor + "%", {
        dismissable: true
      });
      return this.htmlv[0].executeJavaScript("jQ('body').css('zoom', '" + this.zoomFactor + "%')");
    };

    BrowserPlusView.prototype.findOn = function() {
      if (this.find.hasClass('find-hide')) {
        this.find.removeClass('find-hide');
        return this.find.focus();
      } else {
        return this.find.select();
      }
    };

    BrowserPlusView.prototype.findOff = function() {
      this.find.val('');
      this.find.addClass('find-hide');
      this.htmlv[0].focus();
      return this.htmlv[0].executeJavaScript("jQ('body').unhighlight();");
    };

    BrowserPlusView.prototype.showDevTool = function(evt) {
      if (evt[0].keyIdentifier === "F12") {
        return this.toggleDevTool();
      }
    };

    BrowserPlusView.prototype.deActivateSelection = function() {
      var _ref1, _ref2;
      if (this.select.hasClass('active')) {
        return (_ref1 = this.htmlv[0]) != null ? _ref1.send('select') : void 0;
      } else {
        return (_ref2 = this.htmlv[0]) != null ? _ref2.send('deselect') : void 0;
      }
    };

    BrowserPlusView.prototype.removeFav = function(favorite) {
      var favr, idx, _i, _len, _ref1;
      _ref1 = this.model.browserPlus.fav;
      for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
        favr = _ref1[idx];
        if (favr.uri === favorite.uri) {
          return this.model.browserPlus.fav.splice(idx, 1);
        }
      }
    };

    BrowserPlusView.prototype.setSrc = function(text) {
      var _ref1;
      return (_ref1 = this.htmlv[0]) != null ? _ref1.src = "data:text/html," + text : void 0;
    };

    BrowserPlusView.prototype.checkFav = function() {
      var favr, _i, _len, _ref1, _results;
      this.fav.removeClass('active');
      _ref1 = this.model.browserPlus.fav;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        favr = _ref1[_i];
        if (favr.uri === this.model.uri) {
          _results.push(this.fav.addClass('active'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    BrowserPlusView.prototype.toggleDevTool = function() {
      var open, _ref1, _ref2, _ref3;
      open = (_ref1 = this.htmlv[0]) != null ? _ref1.isDevToolsOpened() : void 0;
      if (open) {
        if ((_ref2 = this.htmlv[0]) != null) {
          _ref2.closeDevTools();
        }
      } else {
        if ((_ref3 = this.htmlv[0]) != null) {
          _ref3.openDevTools();
        }
      }
      return $(this.devtool).toggleClass('active', !open);
    };

    BrowserPlusView.prototype.checkNav = function() {
      var _ref1, _ref2, _ref3;
      $(this.forward).toggleClass('active', (_ref1 = this.htmlv[0]) != null ? _ref1.canGoForward() : void 0);
      $(this.back).toggleClass('active', (_ref2 = this.htmlv[0]) != null ? _ref2.canGoBack() : void 0);
      if ((_ref3 = this.htmlv[0]) != null ? _ref3.canGoForward() : void 0) {
        if (this.clearForward) {
          $(this.forward).toggleClass('active', false);
          return this.clearForward = false;
        } else {
          return $(this.forward).toggleClass('active', true);
        }
      }
    };

    BrowserPlusView.prototype.addHistory = function() {
      var histToday, history, obj, today, todays, url, yyyymmdd, _ref1;
      url = (_ref1 = this.htmlv[0]) != null ? _ref1.getUrl() : void 0;
      if (url.startsWith('browser-plus://') || url.startsWith('data:text/html,')) {
        return;
      }
      yyyymmdd = function() {
        var date, dd, mm, yyyy;
        date = new Date();
        yyyy = date.getFullYear().toString();
        mm = (date.getMonth() + 1).toString();
        dd = date.getDate().toString();
        return yyyy + (mm[1] ? mm : '0' + mm[0]) + (dd[1] ? dd : '0' + dd[0]);
      };
      today = yyyymmdd();
      history = this.model.browserPlus.history;
      if (!(history || (history.length = 0))) {
        return;
      }
      todays = history.filter(function(ele, idx, arr) {
        if (Object.keys(ele)[0] === today) {
          return true;
        }
      });
      if (todays.length === 0) {
        histToday = [];
        obj = {};
        obj[today] = histToday;
        history.unshift(obj);
      } else {
        histToday = todays[0][today];
      }
      histToday.unshift({
        date: new Date().toString(),
        uri: this.uri.val()
      });
      return this.liveHistory();
    };

    BrowserPlusView.prototype.getTitle = function() {
      return this.model.getTitle();
    };

    BrowserPlusView.prototype.liveHistory = function() {
      var favIconJSON, histJSON, titleJSON;
      histJSON = JSON.stringify(this.model.browserPlus.history);
      titleJSON = JSON.stringify(this.model.browserPlus.title);
      favIconJSON = JSON.stringify(this.model.browserPlus.favIcon);
      return setTimeout((function(_this) {
        return function() {
          var _ref1;
          return (_ref1 = _this.model.browserPlus.histView) != null ? _ref1.htmlv[0].executeJavaScript(" histTag.opts.hist = eval(" + histJSON + "); histTag.opts.title = eval(" + titleJSON + ");histTag.opts.favIcon = eval(" + favIconJSON + ");histTag.update();") : void 0;
        };
      })(this), 2000);
    };

    BrowserPlusView.prototype.serialize = function() {};

    BrowserPlusView.prototype.destroy = function() {
      return jQ(this.uri).autocomplete('destroy');
    };

    return BrowserPlusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcGx1cy9saWIvYnJvd3Nlci1wbHVzLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsc0JBQXdCLE9BQUEsQ0FBUSxNQUFSLEVBQXhCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxPQUFXLE9BQUEsQ0FBUSxzQkFBUixDQUFYLEVBQUMsWUFBQSxJQUFELEVBQU0sU0FBQSxDQUROLENBQUE7O0FBQUEsRUFLQSxFQUFBLEdBQUssT0FBQSxDQUFRLHVDQUFSLENBTEwsQ0FBQTs7QUFBQSxFQU1BLE9BQUEsQ0FBUSx3QkFBUixDQU5BLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osc0NBQUEsQ0FBQTs7QUFBYSxJQUFBLHlCQUFFLEtBQUYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFFBQUEsS0FDYixDQUFBO0FBQUEsdUVBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxHQUFkLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxTQUFELEdBQWEsRUFBQSxHQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixjQUEvQixDQUE4QyxDQUFDLElBQWhELENBQUYsR0FBdUQsYUFEcEUsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUZqQixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsR0FBYyxJQUhkLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxLQUFLLENBQUMsWUFBUCxDQUFvQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBRWxCLFVB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

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-plus/lib/browser-plus-view.coffee
