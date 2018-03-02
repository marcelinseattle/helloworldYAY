(function() {
  var $, FavView, SelectListView, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), View = _ref.View, SelectListView = _ref.SelectListView;

  $ = require('jquery');

  FavView = (function(_super) {
    __extends(FavView, _super);

    function FavView() {
      return FavView.__super__.constructor.apply(this, arguments);
    }

    FavView.prototype.initialize = function(items) {
      this.items = items;
      FavView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.setItems(items);
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      return this.focusFilterEditor();
    };

    FavView.prototype.viewForItem = function(item) {
      var _ref1;
      return "<li><img src='" + item.favIcon + "'width='20' height='20' >&nbsp; &nbsp; " + ((_ref1 = item.title) != null ? _ref1.slice(0, 31) : void 0) + "</li>";
    };

    FavView.prototype.confirmed = function(item) {
      atom.workspace.open(item.uri, {
        split: 'left',
        searchAllPanes: true
      });
      return this.parent().remove();
    };

    FavView.prototype.cancelled = function() {
      return this.parent().remove();
    };

    FavView.prototype.getFilterKey = function() {
      return "title";
    };

    return FavView;

  })(SelectListView);

  module.exports = FavView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcGx1cy9saWIvZmF2LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QixPQUFBLENBQVEsc0JBQVIsQ0FBeEIsRUFBQyxZQUFBLElBQUQsRUFBTSxzQkFBQSxjQUFOLENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FGSixDQUFBOztBQUFBLEVBR007QUFDSiw4QkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsc0JBQUEsVUFBQSxHQUFZLFNBQUUsS0FBRixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsUUFBQSxLQUNaLENBQUE7QUFBQSxNQUFBLHlDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBRkEsQ0FBQTs7UUFHQSxJQUFDLENBQUEsUUFBUyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7QUFBQSxVQUFBLElBQUEsRUFBSyxJQUFMO1NBQTdCO09BSFY7QUFBQSxNQUlBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBLENBSkEsQ0FBQTthQUtBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBTlU7SUFBQSxDQUFaLENBQUE7O0FBQUEsc0JBUUEsV0FBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxLQUFBO2FBQUMsZ0JBQUEsR0FBZ0IsSUFBSSxDQUFDLE9BQXJCLEdBQTZCLHlDQUE3QixHQUFxRSxxQ0FBYSxzQkFBYixDQUFyRSxHQUF5RixRQURqRjtJQUFBLENBUmIsQ0FBQTs7QUFBQSxzQkFXQSxTQUFBLEdBQVcsU0FBQyxJQUFELEdBQUE7QUFDUCxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixJQUFJLENBQUMsR0FBekIsRUFBOEI7QUFBQSxRQUFDLEtBQUEsRUFBTSxNQUFQO0FBQUEsUUFBYyxjQUFBLEVBQWUsSUFBN0I7T0FBOUIsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFTLENBQUMsTUFBVixDQUFBLEVBRk87SUFBQSxDQVhYLENBQUE7O0FBQUEsc0JBZUEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBUyxDQUFDLE1BQVYsQ0FBQSxFQURTO0lBQUEsQ0FmWCxDQUFBOztBQUFBLHNCQWtCQSxZQUFBLEdBQWMsU0FBQSxHQUFBO2FBQ1osUUFEWTtJQUFBLENBbEJkLENBQUE7O21CQUFBOztLQURvQixlQUh0QixDQUFBOztBQUFBLEVBd0JBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BeEJqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-plus/lib/fav-view.coffee
