(function() {
  var BrowserPlus;

  BrowserPlus = require('../lib/browser-plus');

  describe("BrowserPlus", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('browser-plus');
    });
    return describe("when the browser-plus:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.browser-plus')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'browser-plus:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var browserPlusElement, browserPlusPanel;
          expect(workspaceElement.querySelector('.browser-plus')).toExist();
          browserPlusElement = workspaceElement.querySelector('.browser-plus');
          expect(browserPlusElement).toExist();
          browserPlusPanel = atom.workspace.panelForItem(browserPlusElement);
          expect(browserPlusPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'browser-plus:toggle');
          return expect(browserPlusPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.browser-plus')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'browser-plus:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var browserPlusElement;
          browserPlusElement = workspaceElement.querySelector('.browser-plus');
          expect(browserPlusElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'browser-plus:toggle');
          return expect(browserPlusElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcGx1cy9zcGVjL2Jyb3dzZXItcGx1cy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQUFkLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsYUFBVCxFQUF3QixTQUFBLEdBQUE7QUFDdEIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGNBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyxpREFBVCxFQUE0RCxTQUFBLEdBQUE7QUFDMUQsTUFBQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBR3BDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGVBQS9CLENBQVAsQ0FBdUQsQ0FBQyxHQUFHLENBQUMsT0FBNUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMscUJBQXpDLENBSkEsQ0FBQTtBQUFBLFFBTUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQU5BLENBQUE7ZUFTQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsY0FBQSxvQ0FBQTtBQUFBLFVBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGVBQS9CLENBQVAsQ0FBdUQsQ0FBQyxPQUF4RCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsa0JBQUEsR0FBcUIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsZUFBL0IsQ0FGckIsQ0FBQTtBQUFBLFVBR0EsTUFBQSxDQUFPLGtCQUFQLENBQTBCLENBQUMsT0FBM0IsQ0FBQSxDQUhBLENBQUE7QUFBQSxVQUtBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBZixDQUE0QixrQkFBNUIsQ0FMbkIsQ0FBQTtBQUFBLFVBTUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLFNBQWpCLENBQUEsQ0FBUCxDQUFvQyxDQUFDLElBQXJDLENBQTBDLElBQTFDLENBTkEsQ0FBQTtBQUFBLFVBT0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxxQkFBekMsQ0FQQSxDQUFBO2lCQVFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxTQUFqQixDQUFBLENBQVAsQ0FBb0MsQ0FBQyxJQUFyQyxDQUEwQyxLQUExQyxFQVRHO1FBQUEsQ0FBTCxFQVpvQztNQUFBLENBQXRDLENBQUEsQ0FBQTthQXVCQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQSxHQUFBO0FBTzdCLFFBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBQUEsQ0FBQTtBQUFBLFFBRUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLGVBQS9CLENBQVAsQ0FBdUQsQ0FBQyxHQUFHLENBQUMsT0FBNUQsQ0FBQSxDQUZBLENBQUE7QUFBQSxRQU1BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMscUJBQXpDLENBTkEsQ0FBQTtBQUFBLFFBUUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQVJBLENBQUE7ZUFXQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBRUgsY0FBQSxrQkFBQTtBQUFBLFVBQUEsa0JBQUEsR0FBcUIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsZUFBL0IsQ0FBckIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLGtCQUFQLENBQTBCLENBQUMsV0FBM0IsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMscUJBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sa0JBQVAsQ0FBMEIsQ0FBQyxHQUFHLENBQUMsV0FBL0IsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCMEQ7SUFBQSxDQUE1RCxFQVBzQjtFQUFBLENBQXhCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-plus/spec/browser-plus-spec.coffee
