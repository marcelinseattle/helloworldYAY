(function() {
  var hasCommand, mainModule;

  mainModule = require('../lib/main');

  hasCommand = require('./spec-helper').hasCommand;

  describe("OpenHtmlInBrowser", function() {
    var activationPromise, editor, editorElement, otherEditor, otherEditorElement, _ref;
    _ref = [], editor = _ref[0], editorElement = _ref[1], otherEditor = _ref[2], otherEditorElement = _ref[3], activationPromise = _ref[4];
    beforeEach(function() {
      var workspaceElement;
      workspaceElement = atom.views.getView(atom.workspace);
      activationPromise = atom.packages.activatePackage('open-html-in-browser');
      spyOn(mainModule, 'open');
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-html');
      });
      waitsForPromise(function() {
        return atom.workspace.open('test.coffee').then(function(_editor) {
          otherEditor = _editor;
          return otherEditorElement = atom.views.getView(otherEditor);
        });
      });
      return waitsForPromise(function() {
        return atom.workspace.open('test.html').then(function(_editor) {
          editor = _editor;
          return editorElement = atom.views.getView(editor);
        });
      });
    });
    return describe("when the open-html-in-browser:open event is triggered", function() {
      it("open browser", function() {
        atom.commands.dispatch(editorElement, 'open-html-in-browser:open');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(mainModule.open).toHaveBeenCalled();
          return expect(mainModule.open).toHaveBeenCalledWith(editor.getPath());
        });
      });
      return it('creates the commands', function() {
        expect(hasCommand(editorElement, 'open-html-in-browser:open')).toBeTruthy();
        expect(hasCommand(otherEditorElement, 'open-html-in-browser:open')).toBeFalsy();
        atom.commands.dispatch(editorElement, 'open-html-in-browser:open');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(hasCommand(editorElement, 'open-html-in-browser:open')).toBeTruthy();
          return expect(hasCommand(otherEditorElement, 'open-html-in-browser:open')).toBeFalsy();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taHRtbC1pbi1icm93c2VyL3NwZWMvb3Blbi1odG1sLWluLWJyb3dzZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0JBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGFBQVIsQ0FBYixDQUFBOztBQUFBLEVBQ0MsYUFBYyxPQUFBLENBQVEsZUFBUixFQUFkLFVBREQsQ0FBQTs7QUFBQSxFQUdBLFFBQUEsQ0FBUyxtQkFBVCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsUUFBQSwrRUFBQTtBQUFBLElBQUEsT0FBOEUsRUFBOUUsRUFBQyxnQkFBRCxFQUFTLHVCQUFULEVBQXdCLHFCQUF4QixFQUFxQyw0QkFBckMsRUFBeUQsMkJBQXpELENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLGdCQUFBO0FBQUEsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7QUFBQSxNQUNBLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixzQkFBOUIsQ0FEcEIsQ0FBQTtBQUFBLE1BRUEsS0FBQSxDQUFNLFVBQU4sRUFBa0IsTUFBbEIsQ0FGQSxDQUFBO0FBQUEsTUFJQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixlQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FKQSxDQUFBO0FBQUEsTUFPQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixhQUFwQixDQUFrQyxDQUFDLElBQW5DLENBQXdDLFNBQUMsT0FBRCxHQUFBO0FBQ3RDLFVBQUEsV0FBQSxHQUFjLE9BQWQsQ0FBQTtpQkFDQSxrQkFBQSxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsV0FBbkIsRUFGaUI7UUFBQSxDQUF4QyxFQURjO01BQUEsQ0FBaEIsQ0FQQSxDQUFBO2FBYUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsV0FBcEIsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxTQUFDLE9BQUQsR0FBQTtBQUNwQyxVQUFBLE1BQUEsR0FBUyxPQUFULENBQUE7aUJBQ0EsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsRUFGb0I7UUFBQSxDQUF0QyxFQURjO01BQUEsQ0FBaEIsRUFkUztJQUFBLENBQVgsQ0FGQSxDQUFBO1dBc0JBLFFBQUEsQ0FBUyx1REFBVCxFQUFrRSxTQUFBLEdBQUE7QUFDaEUsTUFBQSxFQUFBLENBQUcsY0FBSCxFQUFtQixTQUFBLEdBQUE7QUFDakIsUUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0MsMkJBQXRDLENBQUEsQ0FBQTtBQUFBLFFBRUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQUZBLENBQUE7ZUFLQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxNQUFBLENBQU8sVUFBVSxDQUFDLElBQWxCLENBQXVCLENBQUMsZ0JBQXhCLENBQUEsQ0FBQSxDQUFBO2lCQUNBLE1BQUEsQ0FBTyxVQUFVLENBQUMsSUFBbEIsQ0FBdUIsQ0FBQyxvQkFBeEIsQ0FBNkMsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUE3QyxFQUZHO1FBQUEsQ0FBTCxFQU5pQjtNQUFBLENBQW5CLENBQUEsQ0FBQTthQVVBLEVBQUEsQ0FBRyxzQkFBSCxFQUEyQixTQUFBLEdBQUE7QUFDekIsUUFBQSxNQUFBLENBQU8sVUFBQSxDQUFXLGFBQVgsRUFBMEIsMkJBQTFCLENBQVAsQ0FBOEQsQ0FBQyxVQUEvRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFPLFVBQUEsQ0FBVyxrQkFBWCxFQUErQiwyQkFBL0IsQ0FBUCxDQUFtRSxDQUFDLFNBQXBFLENBQUEsQ0FEQSxDQUFBO0FBQUEsUUFHQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsYUFBdkIsRUFBc0MsMkJBQXRDLENBSEEsQ0FBQTtBQUFBLFFBS0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQUxBLENBQUE7ZUFRQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxNQUFBLENBQU8sVUFBQSxDQUFXLGFBQVgsRUFBMEIsMkJBQTFCLENBQVAsQ0FBOEQsQ0FBQyxVQUEvRCxDQUFBLENBQUEsQ0FBQTtpQkFDQSxNQUFBLENBQU8sVUFBQSxDQUFXLGtCQUFYLEVBQStCLDJCQUEvQixDQUFQLENBQW1FLENBQUMsU0FBcEUsQ0FBQSxFQUZHO1FBQUEsQ0FBTCxFQVR5QjtNQUFBLENBQTNCLEVBWGdFO0lBQUEsQ0FBbEUsRUF2QjRCO0VBQUEsQ0FBOUIsQ0FIQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-html-in-browser/spec/open-html-in-browser-spec.coffee
