(function() {
  module.exports = {
    browser: {
      title: 'Browser',
      type: 'boolean',
      "default": true,
      win32: {
        IE: {
          cmd: 'start iexplore '
        },
        Edge: {
          cmd: 'start microsoft-edge:'
        },
        Chrome: {
          cmd: 'start chrome '
        },
        ChromePortable: {
          cmd: 'start ' + atom.config.get('open-in-browsers.ChromePortablePath') + ' '
        },
        Firefox: {
          cmd: 'start firefox '
        },
        FirefoxPortable: {
          cmd: 'start ' + atom.config.get('open-in-browsers.FirefoxPortablePath') + ' '
        },
        Opera: {
          cmd: 'start opera '
        },
        Safari: {
          cmd: 'start safari '
        },
        SafariPortable: {
          cmd: 'start ' + atom.config.get('open-in-browsers.SafariPortablePath') + ' '
        }
      },
      win64: {
        Edge: {
          cmd: 'start microsoft-edge:'
        },
        IE: {
          cmd: 'start iexplore '
        },
        Chrome: {
          cmd: 'start chrome '
        },
        ChromePortable: {
          cmd: 'start ' + atom.config.get('open-in-browsers.ChromePortablePath') + ' '
        },
        Firefox: {
          cmd: 'start firefox '
        },
        FirefoxPortable: {
          cmd: 'start ' + atom.config.get('open-in-browsers.FirefoxPortablePath') + ' '
        },
        Opera: {
          cmd: 'start opera '
        },
        Safari: {
          cmd: 'start safari '
        },
        SafariPortable: {
          cmd: 'start ' + atom.config.get('open-in-browsers.SafariPortablePath') + ' '
        }
      },
      darwin: {
        Chrome: {
          cmd: 'open -a "Google Chrome" '
        },
        Firefox: {
          cmd: 'open -a "Firefox" '
        },
        Safari: {
          cmd: 'open -a "Safari" '
        },
        Opera: {
          cmd: 'open -a "Opera" '
        }
      },
      linux: {
        Chrome: {
          cmd: 'google-chrome '
        },
        Firefox: {
          cmd: 'firefox '
        },
        Safari: {
          cmd: 'safari '
        },
        Opera: {
          cmd: 'opera '
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3NlcnMvbGliL2NvbmZpZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDSTtBQUFBLElBQUEsT0FBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQU8sU0FBUDtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxJQUZUO0FBQUEsTUFHQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLEVBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGlCQUFMO1NBREY7QUFBQSxRQUVBLElBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLHVCQUFMO1NBSEY7QUFBQSxRQUlBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFNLGVBQU47U0FMRjtBQUFBLFFBTUEsY0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQU0sUUFBQSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQ0FBaEIsQ0FBWCxHQUFvRSxHQUExRTtTQVBGO0FBQUEsUUFRQSxPQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBTSxnQkFBTjtTQVRGO0FBQUEsUUFVQSxlQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBTSxRQUFBLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHNDQUFoQixDQUFYLEdBQXFFLEdBQTNFO1NBWEY7QUFBQSxRQVlBLEtBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGNBQUw7U0FiRjtBQUFBLFFBY0EsTUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssZUFBTDtTQWZGO0FBQUEsUUFnQkEsY0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQU0sUUFBQSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQ0FBaEIsQ0FBWCxHQUFvRSxHQUExRTtTQWpCRjtPQUpGO0FBQUEsTUFzQkEsS0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyx1QkFBTDtTQURGO0FBQUEsUUFFQSxFQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyxpQkFBTDtTQUhGO0FBQUEsUUFJQSxNQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBTSxlQUFOO1NBTEY7QUFBQSxRQU1BLGNBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFNLFFBQUEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IscUNBQWhCLENBQVgsR0FBb0UsR0FBMUU7U0FQRjtBQUFBLFFBUUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQU0sZ0JBQU47U0FURjtBQUFBLFFBVUEsZUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQU0sUUFBQSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixzQ0FBaEIsQ0FBWCxHQUFxRSxHQUEzRTtTQVhGO0FBQUEsUUFZQSxLQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyxjQUFMO1NBYkY7QUFBQSxRQWNBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGVBQUw7U0FmRjtBQUFBLFFBZ0JBLGNBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFNLFFBQUEsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IscUNBQWhCLENBQVgsR0FBb0UsR0FBMUU7U0FqQkY7T0F2QkY7QUFBQSxNQTBDQSxNQUFBLEVBQ0U7QUFBQSxRQUFBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLDBCQUFMO1NBREY7QUFBQSxRQUVBLE9BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLG9CQUFMO1NBSEY7QUFBQSxRQUlBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLG1CQUFMO1NBTEY7QUFBQSxRQU1BLEtBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGtCQUFMO1NBUEY7T0EzQ0Y7QUFBQSxNQW9EQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGdCQUFMO1NBREY7QUFBQSxRQUVBLE9BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLFVBQUw7U0FIRjtBQUFBLFFBSUEsTUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssU0FBTDtTQUxGO0FBQUEsUUFNQSxLQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyxRQUFMO1NBUEY7T0FyREY7S0FERjtHQURKLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browsers/lib/config.coffee
