(function() {
  var BrowserOpen, BufferedProcess, Commands, MacChromeActivation, MacChromeCanaryCmd, MacChromeCmd, MacFirefoxCmd, MacFirefoxDeveloperEditionCmd, MacFirefoxNightlyCmd, MacSafariCmd, OS, OpenPanel, RunCmd, RunLinuxCmd, RunMacCmd, StatusView;

  BufferedProcess = require('atom').BufferedProcess;

  OS = require('os');

  StatusView = require('./status-view');

  MacChromeActivation = atom.config.get('browser-refresh.chromeBackgroundRefresh');

  if (MacChromeActivation === false) {
    MacChromeActivation = "activate";
  } else {
    MacChromeActivation = "";
  }

  MacChromeCmd = "tell application \"Google Chrome\"\n  " + MacChromeActivation + "\n  \"chrome\"\n  set winref to a reference to (first window whose title does not start with \"Developer Tools - \")\n  set winref's index to 1\n  reload active tab of winref\nend tell";

  MacChromeCanaryCmd = "tell application \"Google Chrome Canary\"\n  " + MacChromeActivation + "\n  \"chrome canary\"\n  set winref to a reference to (first window whose title does not start with \"Developer Tools - \")\n  set winref's index to 1\n  reload active tab of winref\nend tell";

  MacFirefoxCmd = "set a to path to frontmost application as text\ntell application \"Firefox\"\n	activate\n	tell application \"System Events\" to keystroke \"r\" using command down\nend tell\ndelay 0.2\nactivate application a";

  MacFirefoxNightlyCmd = "set a to path to frontmost application as text\ntell application \"FirefoxNightly\"\n	activate\n	tell application \"System Events\" to keystroke \"r\" using command down\nend tell\ndelay 0.2\nactivate application a";

  MacFirefoxDeveloperEditionCmd = "set a to path to frontmost application as text\ntell application \"FirefoxDeveloperEdition\"\n	activate\n	tell application \"System Events\" to keystroke \"r\" using command down\nend tell\ndelay 0.2\nactivate application a";

  MacSafariCmd = "tell application \"Safari\"\n  activate\n  tell its first document\n    set its URL to (get its URL)\n  end tell\nend tell";

  Commands = {
    darwin: {
      firefox: MacFirefoxCmd,
      firefoxNightly: MacFirefoxNightlyCmd,
      firefoxDeveloperEdition: MacFirefoxDeveloperEditionCmd,
      chrome: MacChromeCmd,
      chromeCanary: MacChromeCanaryCmd,
      safari: MacSafariCmd
    },
    linux: {
      firefox: ['search', '--sync', '--onlyvisible', '--class', 'firefox', 'key', 'F5', 'windowactivate'],
      chrome: ['search', '--sync', '--onlyvisible', '--class', 'chrome', 'key', 'F5', 'windowactivate']
    }
  };

  OpenPanel = function(params) {
    var statusPanel, statusView;
    statusView = new StatusView(params);
    statusPanel = atom.workspace.addBottomPanel({
      item: statusView
    });
    return setTimeout(function() {
      if (statusView != null) {
        statusView.destroy();
      }
      statusView = null;
      if (statusPanel != null) {
        statusPanel.destroy();
      }
      return statusPanel = null;
    }, 2000);
  };

  RunMacCmd = function(BrowserCmd) {
    return new BufferedProcess({
      command: 'osascript',
      args: ['-e', BrowserCmd],
      stderr: function(data) {
        return OpenPanel({
          type: 'alert',
          message: data.toString()
        });
      }
    });
  };

  RunLinuxCmd = function(BrowserArgs) {
    return new BufferedProcess({
      command: 'xdotool',
      args: BrowserArgs,
      stderr: function(data) {
        return OpenPanel({
          type: 'alert',
          message: data.toString()
        });
      }
    });
  };

  RunCmd = function(browser) {
    if (OS.platform() === 'darwin') {
      return RunMacCmd(Commands['darwin'][browser]);
    } else if (OS.platform() === 'linux' && browser !== 'safari') {
      return RunLinuxCmd(Commands['linux'][browser]);
    } else {
      return OpenPanel({
        type: 'alert',
        message: 'Unsupported platform'
      });
    }
  };

  BrowserOpen = function() {
    if (atom.config.get('browser-refresh.saveCurrentFileBeforeRefresh')) {
      atom.workspace.getActiveEditor().save();
    }
    if (atom.config.get('browser-refresh.saveFilesBeforeRefresh')) {
      atom.workspace.saveAll();
    }
    if (atom.config.get('browser-refresh.firefox')) {
      RunCmd('firefox');
    }
    if (atom.config.get('browser-refresh.firefoxNightly')) {
      RunCmd('firefoxNightly');
    }
    if (atom.config.get('browser-refresh.firefoxDeveloperEdition')) {
      RunCmd('firefoxDeveloperEdition');
    }
    if (atom.config.get('browser-refresh.googleChrome')) {
      RunCmd('chrome');
    }
    if (atom.config.get('browser-refresh.googleChromeCanary')) {
      RunCmd('chromeCanary');
    }
    if (atom.config.get('browser-refresh.safari')) {
      return RunCmd('safari');
    }
  };

  module.exports = BrowserOpen;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcmVmcmVzaC9saWIvYnJvd3Nlci1vcGVuLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwT0FBQTs7QUFBQSxFQUFDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQUFELENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUlBLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5Q0FBaEIsQ0FKdEIsQ0FBQTs7QUFLQSxFQUFBLElBQUksbUJBQUEsS0FBdUIsS0FBM0I7QUFDRSxJQUFBLG1CQUFBLEdBQXNCLFVBQXRCLENBREY7R0FBQSxNQUFBO0FBR0UsSUFBQSxtQkFBQSxHQUFzQixFQUF0QixDQUhGO0dBTEE7O0FBQUEsRUFVQSxZQUFBLEdBQ0Esd0NBQUEsR0FDSSxtQkFESixHQUN3QiwwTEFaeEIsQ0FBQTs7QUFBQSxFQW1CQSxrQkFBQSxHQUNBLCtDQUFBLEdBQ0ksbUJBREosR0FDd0IsaU1BckJ4QixDQUFBOztBQUFBLEVBNkJBLGFBQUEsR0FBZ0IsaU5BN0JoQixDQUFBOztBQUFBLEVBdUNBLG9CQUFBLEdBQXVCLHdOQXZDdkIsQ0FBQTs7QUFBQSxFQWlEQSw2QkFBQSxHQUFnQyxpT0FqRGhDLENBQUE7O0FBQUEsRUEyREEsWUFBQSxHQUFlLDRIQTNEZixDQUFBOztBQUFBLEVBb0VBLFFBQUEsR0FBVztBQUFBLElBQ1QsTUFBQSxFQUFRO0FBQUEsTUFDTixPQUFBLEVBQWUsYUFEVDtBQUFBLE1BRU4sY0FBQSxFQUFpQixvQkFGWDtBQUFBLE1BR04sdUJB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

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-refresh/lib/browser-open.coffee
