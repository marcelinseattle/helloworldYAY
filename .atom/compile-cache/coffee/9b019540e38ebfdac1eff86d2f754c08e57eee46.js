(function() {
  var Disposable, Emitter, HTMLEditor, Model, path, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Disposable = _ref.Disposable, Emitter = _ref.Emitter;

  Model = require('theorist').Model;

  path = require('path');

  module.exports = HTMLEditor = (function(_super) {
    __extends(HTMLEditor, _super);

    atom.deserializers.add(HTMLEditor);

    function HTMLEditor(obj) {
      this.browserPlus = obj.browserPlus;
      this.src = obj.src;
      this.realURL = obj.realURL;
      this.uri = obj.uri;
      this.disposable = new Disposable();
      this.emitter = new Emitter;
    }

    HTMLEditor.prototype.getViewClass = function() {
      return require('./browser-plus-view');
    };

    HTMLEditor.prototype.setText = function(text) {
      return this.view.setSrc(text);
    };

    HTMLEditor.prototype.refresh = function() {
      return this.view.refreshPage();
    };

    HTMLEditor.prototype.destroyed = function() {
      return this.emitter.emit('did-destroy');
    };

    HTMLEditor.prototype.onDidDestroy = function(cb) {
      return this.emitter.on('did-destroy', cb);
    };

    HTMLEditor.prototype.getTitle = function() {
      var _ref1;
      if (((_ref1 = this.title) != null ? _ref1.length : void 0) > 20) {
        this.title = this.title.slice(0, 20) + '...';
      }
      return this.title || path.basename(this.uri);
    };

    HTMLEditor.prototype.getIconName = function() {
      return this.iconName;
    };

    HTMLEditor.prototype.getURI = function() {
      var match, regex, _ref1;
      if ((_ref1 = this.src) != null ? _ref1.startsWith('data:text/html,') : void 0) {
        if (this.uri) {
          return this.uri = "browser-plus://preview~" + this.uri;
        } else {
          regex = /<meta\s?\S*?\s?bp-uri=['"](.*?)['"]\S*\/>/;
          match = this.src.match(regex);
          if (match != null ? match[1] : void 0) {
            return this.uri = "browser-plus://preview~" + match[1];
          } else {
            return this.uri = "browser-plus://preview~" + (new Date().getTime()) + ".html";
          }
        }
      } else {
        return this.uri;
      }
    };

    HTMLEditor.prototype.getGrammar = function() {};

    HTMLEditor.prototype.setTitle = function(title) {
      this.title = title;
      return this.emit('title-changed');
    };

    HTMLEditor.prototype.updateIcon = function() {
      return this.emit('icon-changed');
    };

    HTMLEditor.prototype.serialize = function() {
      return {
        data: {
          browserPlus: this.browserPlus,
          uri: this.uri,
          src: this.src,
          iconName: this.iconName,
          title: this.title
        },
        deserializer: 'HTMLEditor'
      };
    };

    HTMLEditor.deserialize = function(_arg) {
      var data;
      data = _arg.data;
      return new HTMLEditor(data);
    };

    HTMLEditor.checkUrl = function(url) {
      var pattern, uri, _i, _len, _ref1;
      _ref1 = atom.config.get('browser-plus.blockUri');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        uri = _ref1[_i];
        pattern = RegExp("" + uri, "i");
        if (url.match(pattern) || ((this.checkBlockUrl != null) && this.checkBlockUrl(url))) {
          if (atom.config.get('browser-plus.alert')) {
            atom.notifications.addSuccess("" + url + " Blocked~~Maintain Blocked URL in Browser-Plus Settings");
          } else {
            console.log("" + url + " Blocked~~Maintain Blocked URL in Browser-Plus Settings");
          }
          return false;
        }
        return true;
      }
    };

    return HTMLEditor;

  })(Model);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcGx1cy9saWIvYnJvd3Nlci1wbHVzLW1vZGVsLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxrREFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUEsT0FBdUIsT0FBQSxDQUFRLE1BQVIsQ0FBdkIsRUFBQyxrQkFBQSxVQUFELEVBQVksZUFBQSxPQUFaLENBQUE7O0FBQUEsRUFDQyxRQUFTLE9BQUEsQ0FBUSxVQUFSLEVBQVQsS0FERCxDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBSFAsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ1E7QUFDSixpQ0FBQSxDQUFBOztBQUFBLElBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUF1QixVQUF2QixDQUFBLENBQUE7O0FBQ2EsSUFBQSxvQkFBQyxHQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBRyxDQUFDLFdBQW5CLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxHQUFELEdBQU8sR0FBRyxDQUFDLEdBRFgsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxHQUFHLENBQUMsT0FGZixDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsR0FBRCxHQUFPLEdBQUcsQ0FBQyxHQU5YLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsVUFBQSxDQUFBLENBUGxCLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxPQUFELEdBQVcsR0FBQSxDQUFBLE9BUlgsQ0FEVztJQUFBLENBRGI7O0FBQUEseUJBWUEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUNaLE9BQUEsQ0FBUSxxQkFBUixFQURZO0lBQUEs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

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-plus/lib/browser-plus-model.coffee
