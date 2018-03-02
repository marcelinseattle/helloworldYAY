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
        return fpath = fpath.replace(foldr, url);
      } else {
        return fpath = "file:///" + fpath;
      }
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
      cmd = "" + cmd + " \"" + fpath + "\"";
      cmd = cmd.replace('\\', '/');
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3NlcnMvbGliL29wZW4taW4tYnJvd3NlcnMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkJBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBREosQ0FBQTs7QUFBQSxFQUdNO0FBQ0oseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixVQUFBLElBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksT0FBQSxDQUFRLGlCQUFSLENBQTBCLENBQUMsT0FBUSxDQUFBLE9BQU8sQ0FBQyxRQUFSLENBQS9DLENBQUE7QUFBQSxNQUNBLElBQUEsR0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFkLENBQUEsQ0FEUCxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBWCxFQUFnQixJQUFoQixDQUZOLENBQUE7YUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsNEJBQXhCLEVBQXFELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEdBQUQsR0FBQTtBQUNuRCxVQUFBLElBQUcsR0FBRyxDQUFDLFFBQVA7bUJBQ0UsS0FBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBQWdCLENBQUMsV0FBakIsQ0FBNkIsTUFBN0IsRUFERjtXQUFBLE1BQUE7bUJBR0UsS0FBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBQWdCLENBQUMsUUFBakIsQ0FBMEIsTUFBMUIsRUFIRjtXQURtRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJELEVBSlU7SUFBQSxDQUFaLENBQUE7O0FBQUEsSUFVQSxrQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLFFBQUQsR0FBQTtBQUNSLFVBQUEsNkJBQUE7O1FBRFMsV0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMkJBQWhCO09BQ3BCO0FBQUEsTUFBQSxTQUFBLEdBQVksV0FBWixDQUFBO0FBQUEsTUFDQSxZQUFBLEdBQWUsRUFEZixDQUFBO0FBRUEsTUFBQSxJQUFBLENBQUEsSUFBVyxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDRCQUFoQixDQUFQO0FBQ0UsUUFBQSxTQUFBLElBQWEsUUFBYixDQURGO09BRkE7QUFBQSxNQUlBLElBQUEsR0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFkLENBQUEsQ0FKUCxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsRUFBRCxHQUFNLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBWCxFQUFnQixJQUFoQixDQUxOLENBQUE7YUFPQSxJQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsUUFBQSxPQUFBLEVBQU8sa0JBQVA7T0FBTixFQUFpQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQy9CLGNBQUEsaUJBQUE7QUFBQSxlQUFBLCtDQUFBO21DQUFBO0FBQ0UsWUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFpQixtQkFBQSxHQUFtQixPQUFwQyxDQUFIO0FBQ0UsY0FBQSxJQUFZLE9BQUEsS0FBVyxhQUFYLElBQTZCLEtBQUMsQ0FBQSxFQUE5QixJQUFxQyxRQUFRLENBQUMsTUFBVCxHQUFrQixDQUFuRTtBQUFBLHlCQUFBO2VBQUE7QUFDQSxjQUFBLElBQUcsT0FBQSxLQUFXLGFBQWQ7QUFDRSxnQkFBQSxZQUFBLEdBQWUsOEJBQWYsQ0FERjtlQUFBLE1BQUE7QUFHRSxnQkFBQSxZQUFBLEdBQWdCLEtBQUEsR0FBSyxPQUFyQixDQUhGO2VBREE7QUFLQSxjQUFBLElBQUcsS0FBQyxDQUFBLFVBQUQsS0FBZSxPQUFsQjtBQUNFLGdCQUFBLFlBQUEsR0FBZSxDQUFBLFlBQWYsQ0FERjtlQUxBO0FBQUEsY0FRQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsZ0JBQUEsT0FBQSxFQUFNLFlBQU47QUFBQSxnQkFBbUIsY0FBQSxFQUFlLEVBQUEsR0FBRyxPQUFyQztBQUFBLGdCQUFnRCxTQUFBLEVBQVUsYUFBMUQ7ZUFBTixDQVJBLENBREY7YUFERjtBQUFBLFdBQUE7aUJBV0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFNLFNBQU47V0FBTCxFQUFzQixHQUF0QixFQVorQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpDLEVBUlE7SUFBQSxDQVZWLENBQUE7O0FBQUEsaUNBZ0NBLFdBQUEsR0FBYSxTQUFDLEdBQUQsRUFBSyxNQUFMLEVBQVksT0FBWixHQUFBO0FBQ1gsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFHLE9BQUg7QUFDRSxRQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsT0FBZixDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEseURBQXlDLE1BQU0sQ0FBRSxLQUFNLDRCQUF2RDtBQUFBLFVBQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVosQ0FBZixDQUFBO1NBSEY7T0FBQTtBQUtBLE1BQUEsSUFBQSxDQUFBLElBQVEsQ0FBQSxXQUFSO0FBQ0UsUUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw2QkFBaEIsQ0FBQSxJQUFrRCxRQUFqRSxDQURGO09BTEE7QUFBQSxNQVFBLElBQUMsQ0FBQSxhQUFELCtEQUE2QyxDQUFFLFlBUi9DLENBQUE7O1FBVUEsSUFBQyxDQUFBLFVBQVcsQ0FBQyxXQUFiLENBQXlCLFVBQXpCO09BVkE7O1FBV0EsSUFBQyxDQUFBLFNBQVcsR0FBQSxHQUFHLElBQUMsQ0FBQSxZQUFjLENBQUMsUUFBL0IsQ0FBd0MsVUFBeEM7T0FYQTtBQVlBLE1BQUEsSUFBQSxDQUFBLElBQVEsQ0FBQSxFQUFSO0FBQ0UsUUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLElBQUMsQ0FBQSxhQUFQLEVBQXFCLEdBQXJCLEVBQXlCLE1BQXpCLENBQUEsQ0FBQTtBQUNBLGNBQUEsQ0FGRjtPQVpBO0FBZUEsTUFBQSxJQUFBLENBQUEsR0FBQTtRQUNFLElBQUMsQ0FBQSxJQUFELENBQU0sSUFBQyxDQUFBLGFBQVAsRUFBcUIsR0FBckIsRUFBeUIsTUFBekIsRUFERjtPQWhCVztJQUFBLENBaENiLENBQUE7O0FBQUEsaUNBb0RBLFdBQUEsR0FBYSxTQUFDLE1BQUQsR0FBQTtBQUNYLFVBQUEsb0NBQUE7QUFBQSxNQUFBLElBQW1CLElBQUMsQ0FBQSxPQUFwQjtBQUFBLGVBQU8sSUFBQyxDQUFBLE9BQVIsQ0FBQTtPQUFBO0FBQ0EsTUFBQSwyREFBa0IsQ0FBRSxzQkFBcEI7QUFDRyxRQUFBLEtBQUEsR0FBUSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXZCLENBREg7T0FBQSxNQUFBO0FBR0UsUUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTtBQUNBLFFBQUEsSUFBQSxDQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBO1NBREE7QUFBQSxRQUVBLEtBQUEsR0FBUSxNQUFNLENBQUMsT0FBUCxDQUFBLENBRlIsQ0FIRjtPQURBO0FBT0EsTUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw0QkFBaEIsQ0FBSDtBQUNFLFFBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwrQkFBaEIsQ0FBTixDQUFBO0FBQUEsUUFDQSxHQUFBLEdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLCtCQUFoQixDQUROLENBQUE7QUFBQSxRQUVBLEtBQUEsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBQSxDQUF3QixDQUFBLENBQUEsQ0FGaEMsQ0FBQTtBQUdBLFFBQUEsSUFBRyxHQUFBLElBQVEsS0FBSyxDQUFDLEdBQU4sQ0FBVSxHQUFWLENBQVg7QUFDRSxVQUFBLEtBQUEsR0FBUSxLQUFBLEdBQVEsR0FBaEIsQ0FERjtTQUhBO2VBS0EsS0FBQSxHQUFRLEtBQUssQ0FBQyxPQUFOLENBQWMsS0FBZCxFQUFvQixHQUFwQixFQU5WO09BQUEsTUFBQTtlQVFFLEtBQUEsR0FBUyxVQUFBLEdBQVUsTUFSckI7T0FSVztJQUFBLENBcERiLENBQUE7O0FBQUEsaUNBc0VBLElBQUEsR0FBTSxTQUFDLEdBQUQsRUFBc0IsR0FBdEIsRUFBMEIsTUFBMUIsR0FBQTtBQUNKLFVBQUEscUJBQUE7O1FBREssTUFBTSxJQUFDLENBQUE7T0FDWjtBQUFBLE1BQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQXdCLENBQUMsSUFBaEMsQ0FBQTtBQUNBLE1BQUEsSUFBRyxJQUFDLENBQUEsV0FBRCxLQUFnQixhQUFuQjtBQUNFLFFBQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxXQUFELENBQUEsQ0FBUixDQUFBO0FBQUEsUUFDQSxFQUFBLEdBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixjQUEvQixDQURMLENBQUE7QUFBQSxRQUVBLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBZCxDQUFtQixLQUFuQixDQUZBLENBQUE7QUFHQSxlQUFPLEtBQVAsQ0FKRjtPQURBO0FBTUEsTUFBQSxJQUFBLENBQUEsR0FBQTtBQUNFLFFBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUFBLENBQUE7QUFDQSxlQUFPLEtBQVAsQ0FGRjtPQU5BO0FBQUEsTUFTQSxLQUFBLEdBQVEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiLENBVFIsQ0FBQTtBQUFBLE1BVUEsR0FBQSxHQUFNLEVBQUEsR0FBRyxHQUFILEdBQU8sS0FBUCxHQUFZLEtBQVosR0FBa0IsSUFWeEIsQ0FBQTtBQUFBLE1BV0EsR0FBQSxHQUFNLEdBQUcsQ0FBQyxPQUFKLENBQVksSUFBWixFQUFrQixHQUFsQixDQVhOLENBQUE7QUFZQSxNQUFBLElBQWEsS0FBYjtBQUFBLFFBQUEsSUFBQSxDQUFNLEdBQU4sQ0FBQSxDQUFBO09BWkE7O1lBYVcsQ0FBRSxNQUFiLENBQUE7T0FiQTtBQWVBLGFBQU8sS0FBUCxDQWhCSTtJQUFBLENBdEVOLENBQUE7O0FBQUEsaUNBeUZBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0F6RlgsQ0FBQTs7QUFBQSxpQ0E0RkEsT0FBQSxHQUFTLFNBQUEsR0FBQSxDQTVGVCxDQUFBOztBQUFBLGlDQStGQSxVQUFBLEdBQVksU0FBQSxHQUFBLENBL0ZaLENBQUE7OzhCQUFBOztLQUQrQixLQUhqQyxDQUFBOztBQUFBLEVBc0dBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBQUEsSUFBRSxvQkFBQSxrQkFBRjtHQXRHakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browsers/lib/open-in-browsers-view.coffee
