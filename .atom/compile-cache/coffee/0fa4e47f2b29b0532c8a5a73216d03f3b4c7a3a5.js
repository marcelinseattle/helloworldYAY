(function() {
  var BrowserOpen;

  BrowserOpen = require("./browser-open");

  module.exports = {
    config: {
      saveFilesBeforeRefresh: {
        type: 'boolean',
        "default": false
      },
      chromeBackgroundRefresh: {
        type: 'boolean',
        "default": true
      },
      googleChromeCanary: {
        type: 'boolean',
        "default": false
      },
      googleChrome: {
        type: 'boolean',
        "default": true
      },
      firefox: {
        type: 'boolean',
        "default": false
      },
      safari: {
        type: 'boolean',
        "default": false
      },
      firefoxNightly: {
        type: 'boolean',
        "default": false
      },
      firefoxDeveloperEdition: {
        type: 'boolean',
        "default": false
      }
    },
    activate: function(state) {
      return atom.commands.add('atom-workspace', {
        'browser-refresh:open': function() {
          return BrowserOpen();
        }
      });
    },
    deactivate: function() {},
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL2Jyb3dzZXItcmVmcmVzaC9saWIvYnJvd3Nlci1yZWZyZXNoLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLHNCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtPQURGO0FBQUEsTUFHQSx1QkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FKRjtBQUFBLE1BTUEsa0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BUEY7QUFBQSxNQVNBLFlBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BVkY7QUFBQSxNQVlBLE9BQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BYkY7QUFBQSxNQWVBLE1BQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BaEJGO0FBQUEsTUFrQkEsY0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FuQkY7QUFBQSxNQXFCQSx1QkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0F0QkY7S0FERjtBQUFBLElBMEJBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7QUFBQSxRQUFBLHNCQUFBLEVBQXdCLFNBQUEsR0FBQTtpQkFDMUQsV0FBQSxDQUFBLEVBRDBEO1FBQUEsQ0FBeEI7T0FBcEMsRUFEUTtJQUFBLENBMUJWO0FBQUEsSUE4QkEsVUFBQSxFQUFZLFNBQUEsR0FBQSxDQTlCWjtBQUFBLElBZ0NBLFNBQUEsRUFBVyxTQUFBLEdBQUEsQ0FoQ1g7R0FIRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/marcelnogueira/.atom/packages/browser-refresh/lib/browser-refresh.coffee
