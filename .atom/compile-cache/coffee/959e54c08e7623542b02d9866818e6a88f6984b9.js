(function() {
  var OpenInBrowsersView, View, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  _ = require('lodash');

  OpenInBrowsersView = (function(_super) {
    __extends(OpenInBrowsersView, _super);

    function OpenInBrowsersView() {
      return OpenInBrowsersView.__super__.constructor.apply(this, arguments);
    }

    OpenInBrowsersView.prototype.initialize = function() {
      var pkgs;
      this.browsers = require('./config.coffee').browser[process.platform];
      pkgs = atom.packages.getAvailablePackageNames();
      this.pp = _.contains(pkgs, 'pp');
      return atom.config.onDidChange('open-in-browsers.LocalHost', (function(_this) {
        return function(obj) {
          if (obj.newValue) {
            return _this.children('sup').removeClass('hide');
          } else {
            return _this.children('sup').addClass('hide');
          }
        };
      })(this));
    };

    OpenInBrowsersView.content = function(browsers) {
      var browserClass, localhost, pkgs;
      if (browsers == null) {
        browsers = atom.config.get('open-in-browsers.browsers');
      }
      localhost = "localhost";
      browserClass = '';
      if (!atom.config.get('open-in-browsers.LocalHost')) {
        localhost += " hide ";
      }
      pkgs = atom.packages.getAvailablePackageNames();
      this.pp = _.contains(pkgs, 'pp');
      return this.span({
        "class": 'open-in-browsers'
      }, (function(_this) {
        return function() {
          var browser, _i, _len;
          for (_i = 0, _len = browsers.length; _i < _len; _i++) {
            browser = browsers[_i];
            if (atom.config.get("open-in-browsers." + browser)) {
              if (browser === 'BrowserPlus' && _this.pp && browsers.length > 1) {
                continue;
              }
              if (browser === 'BrowserPlus') {
                browserClass = "mega-octicon octicon-browser";
              } else {
                browserClass = "fa " + browser;
              }
              if (_this.curBrowser === browser) {
                browserClass = +" selected ";
              }
              if (atom.config.get("open-in-browsers." + browser + "Path") === '') {
                browserClass += " hide ";
              }
              _this.span({
                "class": browserClass,
                'data-browser': "" + browser,
                mousedown: 'openBrowser'
              });
            }
          }
          return _this.sup({
            "class": localhost
          }, "L");
        };
      })(this));
    };

    OpenInBrowsersView.prototype.openBrowser = function(evt, target, browser) {
      var _ref;
      if (browser) {
        this.currBrowser = browser;
      } else {
        if (target != null ? typeof target.data === "function" ? target.data('browser') : void 0 : void 0) {
          this.currBrowser = target.data('browser');
        }
      }
      if (!this.currBrowser) {
        this.currBrowser = atom.config.get('open-in-browsers.defBrowser') || 'Chrome';
      }
      this.curBrowserCmd = (_ref = this.browsers["" + this.currBrowser]) != null ? _ref.cmd : void 0;
      if (typeof this.children === "function") {
        this.children().removeClass("selected");
      }
      if (typeof this.children === "function") {
        this.children("." + this.currBrowser).addClass('selected');
      }
      if (!this.pp) {
        this.open(this.curBrowserCmd, evt, target);
        return;
      }
      if (!evt) {
        this.open(this.curBrowserCmd, evt, target);
      }
    };

    OpenInBrowsersView.prototype.getFilePath = function(target) {
      var editor, foldr, fpath, pub, url, _ref;
      if (this.htmlURL) {
        return this.htmlURL;
      }
      if (target != null ? (_ref = target.dataset) != null ? _ref.path : void 0 : void 0) {
        fpath = target.dataset.path;
      } else {
        editor = atom.workspace.getActiveTextEditor();
        if (!editor) {
          return;
        }
        fpath = editor.getPath();
      }
      if (atom.config.get('open-in-browsers.LocalHost')) {
        url = atom.config.get('open-in-browsers.LocalHostURL');
        pub = atom.config.get('open-in-browsers.PublicFolder');
        foldr = atom.project.getPaths()[0];
        if (pub && fpath.has(pub)) {
          foldr = foldr + pub;
        }
        fpath = fpath.replace(foldr, url);
      } else {
        fpath = "file:///" + fpath;
      }
      return fpath.replace(/\\/g, '/');
    };

    OpenInBrowsersView.prototype.open = function(cmd, evt, target) {
      var bp, exec, fpath, _ref;
      if (cmd == null) {
        cmd = this.curBrowserCmd;
      }
      exec = require('child_process').exec;
      if (this.currBrowser === 'BrowserPlus') {
        fpath = this.getFilePath();
        bp = atom.packages.getLoadedPackage('browser-plus');
        bp.mainModule.open(fpath);
        return false;
      }
      if (!cmd) {
        this.openBrowser();
        return false;
      }
      fpath = this.getFilePath(target);
      cmd = "" + cmd + "\"" + fpath + "\"";
      if (fpath) {
        exec(cmd);
      }
      if ((_ref = this.selectList) != null) {
        _ref.cancel();
      }
      return false;
    };

    OpenInBrowsersView.prototype.serialize = function() {};

    OpenInBrowsersView.prototype.destroy = function() {};

    OpenInBrowsersView.prototype.getElement = function() {};

    return OpenInBrowsersView;

  })(View);

  module.exports = {
    OpenInBrowsersView: OpenInBrowsersView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3NlcnMvbGliL29wZW4taW4tYnJvd3NlcnMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkJBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBREosQ0FBQTs7QUFBQSxFQUdNO0FBQ0oseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksT0FBQSxDQUFRLGlCQUFSLENBQTBCLENBQUMsT0FBUSxDQUFBLE9BQU8sQ0FBQyxRQUFSLENBQS9DLENBQUE7QUFBQSxNQUNBLElBQUEsR0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFkLENBQUEsQ0FEUCxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBWCxFQUFnQixJQUFoQixDQUZOLENBQUE7YUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsNEJBQXhCLEVBQXFELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsR0FBQTtBQUNuRCxVQUFBLElBQUcsR0FBRyxDQUFDLFFBQVA7bUJBQ0UsS0FBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBQWdCLENBQUMsV0FBakIsQ0FBNkIsTUFBN0IsRUFERjtXQUFBLE1BQUE7bUJBR0UsS0FBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBQWdCLENBQUMsUUFBakIsQ0FBMEIsTUFBMUIsRUFIRjtXQURtRDtR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

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browsers/lib/open-in-browsers-view.coffee
