(function() {
  var Shell, exec;

  exec = require('child_process').exec;

  Shell = require('shell');

  module.exports = {
    activate: function(state) {
      atom.commands.add('atom-text-editor', {
        'open-in-browser:open': (function(_this) {
          return function() {
            return _this.open();
          };
        })(this)
      });
      return atom.commands.add('atom-panel', {
        'open-in-browser:open-tree-view': (function(_this) {
          return function() {
            return _this.openTreeView();
          };
        })(this)
      });
    },
    openPath: function(filePath) {
      var process_architecture;
      process_architecture = process.platform;
      switch (process_architecture) {
        case 'darwin':
          return exec('open "' + filePath + '"');
        case 'linux':
          return exec('xdg-open "' + filePath + '"');
        case 'win32':
          return Shell.openExternal('file:///' + filePath);
      }
    },
    open: function() {
      var editor, file, filePath;
      editor = atom.workspace.getActivePaneItem();
      file = editor != null ? editor.buffer.file : void 0;
      filePath = file != null ? file.path : void 0;
      return this.openPath(filePath);
    },
    openTreeView: function() {
      var nuclideFileTree, packageObj, path, treeView, _ref;
      packageObj = null;
      if (atom.packages.isPackageLoaded('nuclide-file-tree') === true) {
        nuclideFileTree = atom.packages.getLoadedPackage('nuclide-file-tree');
        path = (_ref = nuclideFileTree.contextMenuManager.activeElement) != null ? _ref.getAttribute('data-path') : void 0;
        packageObj = {
          selectedPath: path
        };
      }
      if (atom.packages.isPackageLoaded('tree-view') === true) {
        treeView = atom.packages.getLoadedPackage('tree-view');
        treeView = require(treeView.mainModulePath);
        packageObj = treeView.serialize();
      }
      if (typeof packageObj !== 'undefined' && packageObj !== null) {
        if (packageObj.selectedPath) {
          return this.openPath(packageObj.selectedPath);
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3Nlci9saWIvb3Blbi1pbi1icm93c2VyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsZUFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUVBLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUixDQUZSLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixrQkFBbEIsRUFBc0M7QUFBQSxRQUFBLHNCQUFBLEVBQXdCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxJQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhCO09BQXRDLENBQUEsQ0FBQTthQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixZQUFsQixFQUFnQztBQUFBLFFBQUEsZ0NBQUEsRUFBbUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLFlBQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkM7T0FBaEMsRUFGUTtJQUFBLENBQVY7QUFBQSxJQUlBLFFBQUEsRUFBVSxTQUFDLFFBQUQsR0FBQTtBQUNSLFVBQUEsb0JBQUE7QUFBQSxNQUFBLG9CQUFBLEdBQXVCLE9BQU8sQ0FBQyxRQUEvQixDQUFBO0FBQ0EsY0FBTyxvQkFBUDtBQUFBLGFBQ08sUUFEUDtpQkFDcUIsSUFBQSxDQUFNLFFBQUEsR0FBUyxRQUFULEdBQWtCLEdBQXhCLEVBRHJCO0FBQUEsYUFFTyxPQUZQO2lCQUVvQixJQUFBLENBQU0sWUFBQSxHQUFhLFFBQWIsR0FBc0IsR0FBNUIsRUFGcEI7QUFBQSxhQUdPLE9BSFA7aUJBR29CLEtBQUssQ0FBQyxZQUFOLENBQW1CLFVBQUEsR0FBVyxRQUE5QixFQUhwQjtBQUFBLE9BRlE7SUFBQSxDQUpWO0FBQUEsSUFXQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxzQkFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWYsQ0FBQSxDQUFULENBQUE7QUFBQSxNQUNBLElBQUEsb0JBQU8sTUFBTSxDQUFFLE1BQU0sQ0FBQyxhQUR0QixDQUFBO0FBQUEsTUFFQSxRQUFBLGtCQUFXLElBQUksQ0FBRSxhQUZqQixDQUFBO2FBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxRQUFWLEVBSkk7SUFBQSxDQVhOO0FBQUEsSUFpQkEsWUFBQSxFQUFjLFNBQUEsR0FBQTtBQUNaLFVBQUEsaURBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxJQUFiLENBQUE7QUFDQSxNQUFBLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixDQUFBLEtBQXNELElBQXpEO0FBQ0UsUUFBQSxlQUFBLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsbUJBQS9CLENBQWxCLENBQUE7QUFBQSxRQUNBLElBQUEsMkVBQXVELENBQUUsWUFBbEQsQ0FBK0QsV0FBL0QsVUFEUCxDQUFBO0FBQUEsUUFFQSxVQUFBLEdBQWE7QUFBQSxVQUFBLFlBQUEsRUFBYSxJQUFiO1NBRmIsQ0FERjtPQURBO0FBS0EsTUFBQSxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixXQUE5QixDQUFBLEtBQThDLElBQWpEO0FBQ0UsUUFBQSxRQUFBLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixXQUEvQixDQUFYLENBQUE7QUFBQSxRQUNBLFFBQUEsR0FBVyxPQUFBLENBQVEsUUFBUSxDQUFDLGNBQWpCLENBRFgsQ0FBQTtBQUFBLFFBRUEsVUFBQSxHQUFhLFFBQVEsQ0FBQyxTQUFULENBQUEsQ0FGYixDQURGO09BTEE7QUFTQSxNQUFBLElBQUcsTUFBQSxDQUFBLFVBQUEsS0FBcUIsV0FBckIsSUFBb0MsVUFBQSxLQUFjLElBQXJEO0FBQ0UsUUFBQSxJQUFHLFVBQVUsQ0FBQyxZQUFkO2lCQUNFLElBQUMsQ0FBQSxRQUFELENBQVUsVUFBVSxDQUFDLFlBQXJCLEVBREY7U0FERjtPQVZZO0lBQUEsQ0FqQmQ7R0FORixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browser/lib/open-in-browser.coffee
