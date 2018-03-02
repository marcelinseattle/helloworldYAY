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
          cmd: 'start microsoft-edge: '
        },
        Chrome: {
          cmd: 'start chrome '
        },
        Firefox: {
          cmd: 'start firefox '
        },
        Opera: {
          cmd: 'start opera '
        },
        Safari: {
          cmd: 'start safari '
        }
      },
      win64: {
        Edge: {
          cmd: 'start microsoft-edge '
        },
        IE: {
          cmd: 'start iexplore '
        },
        Chrome: {
          cmd: 'start chrome '
        },
        Firefox: {
          cmd: 'start firefox '
        },
        Opera: {
          cmd: 'start opera '
        },
        Safari: {
          cmd: 'start safari '
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL21hcmNlbG5vZ3VlaXJhLy5hdG9tL3BhY2thZ2VzL29wZW4taW4tYnJvd3NlcnMvbGliL2NvbmZpZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDSTtBQUFBLElBQUEsT0FBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQU8sU0FBUDtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxJQUZUO0FBQUEsTUFHQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLEVBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGlCQUFMO1NBREY7QUFBQSxRQUVBLElBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLHdCQUFMO1NBSEY7QUFBQSxRQUlBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFNLGVBQU47U0FMRjtBQUFBLFFBTUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQU0sZ0JBQU47U0FQRjtBQUFBLFFBUUEsS0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssY0FBTDtTQVRGO0FBQUEsUUFVQSxNQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyxlQUFMO1NBWEY7T0FKRjtBQUFBLE1BZ0JBLEtBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssdUJBQUw7U0FERjtBQUFBLFFBRUEsRUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssaUJBQUw7U0FIRjtBQUFBLFFBSUEsTUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQU0sZUFBTjtTQUxGO0FBQUEsUUFNQSxPQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBTSxnQkFBTjtTQVBGO0FBQUEsUUFRQSxLQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyxjQUFMO1NBVEY7QUFBQSxRQVVBLE1BQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLGVBQUw7U0FYRjtPQWpCRjtBQUFBLE1BOEJBLE1BQUEsRUFDRTtBQUFBLFFBQUEsTUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssMEJBQUw7U0FERjtBQUFBLFFBRUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssb0JBQUw7U0FIRjtBQUFBLFFBSUEsTUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssbUJBQUw7U0FMRjtBQUFBLFFBTUEsS0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssa0JBQUw7U0FQRjtPQS9CRjtBQUFBLE1Bd0NBLEtBQUEsRUFDRTtBQUFBLFFBQUEsTUFBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssZ0JBQUw7U0FERjtBQUFBLFFBRUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssVUFBTDtTQUhGO0FBQUEsUUFJQSxNQUFBLEVBQ0U7QUFBQSxVQUFBLEdBQUEsRUFBSyxTQUFMO1NBTEY7QUFBQSxRQU1BLEtBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLFFBQUw7U0FQRjtPQXpDRjtLQURGO0dBREosQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/marcelnogueira/.atom/packages/open-in-browsers/lib/config.coffee
