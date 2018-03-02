(function() {
  var CompositeDisposable, Shell, exec;

  exec = require('child_process').exec;

  Shell = require('shell');

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = {
    subscriptions: null,
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-text-editor[data-grammar~="html"]', {
        'open-html-in-browser:open': (function(_this) {
          return function(_arg) {
            var target;
            target = _arg.target;
            return _this.open(target.getModel().getPath());
          };
        })(this)
      }));
      return this.subscriptions.add(atom.commands.add('.tree-view', {
        'open-html-in-browser:selected-entry': (function(_this) {
          return function(_arg) {
            var entry, filePath, target;
            target = _arg.currentTarget;
            entry = target != null ? target.querySelector('.selected .name') : void 0;
            filePath = entry != null ? entry.dataset.path : void 0;
            if (!(filePath != null ? filePath.endsWith('.html') : void 0)) {
              return;
            }
            return _this.open(filePath);
          };
        })(this)
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    open: function(filePath) {
      switch (process.platform) {
        case 'darwin':
          return exec("open '" + filePath + "'");
        case 'linux':
          return exec("xdg-open '" + filePath + "'");
        case 'win32':
          return Shell.openExternal("file:///" + filePath);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taHRtbC1pbi1icm93c2VyL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQ0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLGVBQVIsRUFBUixJQUFELENBQUE7O0FBQUEsRUFDQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FEUixDQUFBOztBQUFBLEVBRUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUZELENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxhQUFBLEVBQWUsSUFBZjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLHdDQUFsQixFQUNqQjtBQUFBLFFBQUEsMkJBQUEsRUFBNkIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLElBQUQsR0FBQTtBQUMzQixnQkFBQSxNQUFBO0FBQUEsWUFENkIsU0FBRCxLQUFDLE1BQzdCLENBQUE7bUJBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsUUFBUCxDQUFBLENBQWlCLENBQUMsT0FBbEIsQ0FBQSxDQUFOLEVBRDJCO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBN0I7T0FEaUIsQ0FBbkIsQ0FEQSxDQUFBO2FBS0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixZQUFsQixFQUNqQjtBQUFBLFFBQUEscUNBQUEsRUFBdUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLElBQUQsR0FBQTtBQUNyQyxnQkFBQSx1QkFBQTtBQUFBLFlBRHNELFNBQWhCLEtBQUMsYUFDdkMsQ0FBQTtBQUFBLFlBQUEsS0FBQSxvQkFBUyxNQUFNLENBQUUsYUFBUixDQUFzQixpQkFBdEIsVUFBVCxDQUFBO0FBQUEsWUFDQSxRQUFBLG1CQUFXLEtBQUssQ0FBRSxPQUFPLENBQUMsYUFEMUIsQ0FBQTtBQUVBLFlBQUEsSUFBQSxDQUFBLG9CQUFjLFFBQVEsQ0FBRSxRQUFWLENBQW1CLE9BQW5CLFdBQWQ7QUFBQSxvQkFBQSxDQUFBO2FBRkE7bUJBR0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxRQUFOLEVBSnFDO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkM7T0FEaUIsQ0FBbkIsRUFOUTtJQUFBLENBRlY7QUFBQSxJQWdCQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUEsRUFEVTtJQUFBLENBaEJaO0FBQUEsSUFtQkEsSUFBQSxFQUFNLFNBQUMsUUFBRCxHQUFBO0FBQ0osY0FBTyxPQUFPLENBQUMsUUFBZjtBQUFBLGFBQ08sUUFEUDtpQkFFSSxJQUFBLENBQU0sUUFBQSxHQUFRLFFBQVIsR0FBaUIsR0FBdkIsRUFGSjtBQUFBLGFBR08sT0FIUDtpQkFJSSxJQUFBLENBQU0sWUFBQSxHQUFZLFFBQVosR0FBcUIsR0FBM0IsRUFKSjtBQUFBLGFBS08sT0FMUDtpQkFNSSxLQUFLLENBQUMsWUFBTixDQUFvQixVQUFBLEdBQVUsUUFBOUIsRUFOSjtBQUFBLE9BREk7SUFBQSxDQW5CTjtHQUxGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-html-in-browser/lib/main.coffee
