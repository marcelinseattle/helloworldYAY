(function() {
  var URIView, jQ, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  jQ = require('../node_modules/jquery/dist/jquery.js');

  require('jquery-ui/autocomplete');

  _ = require('lodash');

  module.exports = URIView = (function(_super) {
    __extends(URIView, _super);

    function URIView() {
      return URIView.__super__.constructor.apply(this, arguments);
    }

    URIView.content = function(params) {
      return this.div({
        "class": 'uri'
      }, (function(_this) {
        return function() {
          return _this.input({
            "class": "native-key-bindings",
            type: 'text',
            id: 'search',
            outlet: 'search'
          });
        };
      })(this));
    };

    URIView.prototype.initialize = function() {
      var select, src;
      src = (function(_this) {
        return function(req, res) {
          var fav, hist, histDate, history, hists, key, pattern, searchUrl, title, uris, _i, _j, _len, _len1, _ref;
          pattern = RegExp("" + req.term, "i");
          history = [];
          fav = _.filter(_this.model.browserPlus.fav, function(fav) {
            return fav.uri.match(pattern) || fav.title.match(pattern);
          });
          _ref = _this.model.browserPlus.history;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            histDate = _ref[_i];
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
                  var dat, search, _k, _len2, _ref1;
                  uris = uris.slice(0, 11);
                  search = "http://www.google.com/search?as_q=";
                  _ref1 = data[1].slice(0, 11);
                  for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                    dat = _ref1[_k];
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
      return jQ(this.uri).autocomplete({
        source: src,
        minLength: 2,
        select: select
      });
    };

    return URIView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcGx1cy9saWIvdXJpLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGNBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsdUNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxDQUFRLHdCQUFSLENBREEsQ0FBQTs7QUFBQSxFQUVBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosOEJBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsT0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLE1BQUQsR0FBQTthQUNOLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTSxLQUFOO09BQUwsRUFBa0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDaEIsS0FBQyxDQUFBLEtBQUQsQ0FBTztBQUFBLFlBQUEsT0FBQSxFQUFNLHFCQUFOO0FBQUEsWUFBNkIsSUFBQSxFQUFLLE1BQWxDO0FBQUEsWUFBeUMsRUFBQSxFQUFHLFFBQTVDO0FBQUEsWUFBcUQsTUFBQSxFQUFPLFFBQTVEO1dBQVAsRUFEZ0I7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsQixFQURNO0lBQUEsQ0FBVixDQUFBOztBQUFBLHNCQUlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDUixVQUFBLFdBQUE7QUFBQSxNQUFBLEdBQUEsR0FBTSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxHQUFELEVBQUssR0FBTCxHQUFBO0FBRUosY0FBQSxvR0FBQTtBQUFBLFVBQUEsT0FBQSxHQUFVLE1BQUEsQ0FBQSxFQUFBLEdBQ0ksR0FBRyxDQUFDLElBRFIsRUFFRyxHQUZILENBQVYsQ0FBQTtBQUFBLFVBR0EsT0FBQSxHQUFVLEVBSFYsQ0FBQTtBQUFBLFVBSUEsR0FBQSxHQUFNLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBQyxDQUFBLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBNUIsRUFBZ0MsU0FBQyxHQUFELEdBQUE7QUFDeEIsbUJBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFSLENBQWMsT0FBZCxDQUFBLElBQTBCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBVixDQUFnQixPQUFoQixDQUFqQyxDQUR3QjtVQUFBLENBQWhDLENBSk4sQ0FBQTtBQU1BO0FBQUEsZUFBQSwyQ0FBQTtnQ0FBQTtBQUNFLGlCQUFBLGVBQUE7b0NBQUE7QUFDRSxtQkFBQSw4Q0FBQTtpQ0FBQTtBQUNFLGdCQUFBLEtBQUEsR0FBUSxLQUFDLENBQUEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFNLENBQUEsSUFBSSxDQUFDLEdBQUwsQ0FBakMsQ0FBQTtBQUNBLGdCQUFBLElBQXlCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBVCxDQUFlLE9BQWYsQ0FBQSxxQkFBMkIsS0FBSyxDQUFFLEtBQVAsQ0FBYSxPQUFiLFdBQXBEO0FBQUEsa0JBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFJLENBQUMsR0FBbEIsQ0FBQSxDQUFBO2lCQUZGO0FBQUEsZUFERjtBQUFBLGFBREY7QUFBQSxXQU5BO0FBQUEsVUFXQSxJQUFBLEdBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxDQUFDLENBQUMsS0FBRixDQUFRLEdBQVIsRUFBWSxLQUFaLENBQVIsRUFBNEIsT0FBNUIsQ0FYUCxDQUFBO0FBQUEsVUFhQSxHQUFBLENBQUksSUFBSixDQWJBLENBQUE7QUFBQSxVQWVBLFNBQUEsR0FBWSxpQ0FmWixDQUFBO2lCQXlCRyxDQUFBLFNBQUEsR0FBQTttQkFDRCxFQUFFLENBQUMsSUFBSCxDQUNJO0FBQUEsY0FBQSxHQUFBLEVBQUssU0FBTDtBQUFBLGNBQ0EsUUFBQSxFQUFVLE1BRFY7QUFBQSxjQUVBLElBQUEsRUFBTTtBQUFBLGdCQUFDLEtBQUEsRUFBTSxHQUFHLENBQUMsSUFBWDtBQUFBLGdCQUFpQixXQUFBLEVBQWEsRUFBOUI7ZUFGTjtBQUFBLGNBR0EsT0FBQSxFQUFTLENBQUEsU0FBQSxLQUFBLEdBQUE7dUJBQUEsU0FBQyxJQUFELEdBQUE7QUFFUCxzQkFBQSw2QkFBQTtBQUFBLGtCQUFBLElBQUEsR0FBTyxJQUFLLGFBQVosQ0FBQTtBQUFBLGtCQUNBLE1BQUEsR0FBUyxvQ0FEVCxDQUFBO0FBRUE7QUFBQSx1QkFBQSw4Q0FBQTtvQ0FBQTtBQUNFLG9CQUFBLElBQUksQ0FBQyxJQUFMLENBQ007QUFBQSxzQkFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLHNCQUNBLEtBQUEsRUFBTyxNQUFBLEdBQU8sR0FEZDtxQkFETixDQUFBLENBREY7QUFBQSxtQkFGQTt5QkFNQSxHQUFBLENBQUksSUFBSixFQVJPO2dCQUFBLEVBQUE7Y0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSFQ7YUFESixFQURDO1VBQUEsQ0FBQSxDQUFILENBQUEsRUEzQkk7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFOLENBQUE7QUFBQSxNQTBDQSxNQUFBLEdBQVMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsS0FBRCxFQUFPLEVBQVAsR0FBQTtpQkFDUCxLQUFDLENBQUEsT0FBRCxDQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBakIsRUFETztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBMUNULENBQUE7YUE2Q0EsRUFBQSxDQUFHLElBQUMsQ0FBQSxHQUFKLENBQVEsQ0FBQyxZQUFULENBQ0k7QUFBQSxRQUFBLE1BQUEsRUFBUSxHQUFSO0FBQUEsUUFDQSxTQUFBLEVBQVcsQ0FEWDtBQUFBLFFBRUEsTUFBQSxFQUFRLE1BRlI7T0FESixFQTlDUTtJQUFBLENBSlosQ0FBQTs7bUJBQUE7O0tBRm9CLEtBSnRCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-plus/lib/uri-view.coffee
