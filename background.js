(() => {
  // background.ts
  chrome.commands.onCommand.addListener(function(command) {
    if (command == "handle_key_event") {
      console.log({ command });
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        console.log({ tabs });
        const tab = tabs[0];
        chrome.windows.create({ tabId: tab.id, incognito: tab.incognito }, async (window) => {
          await chrome.tabs.move(tabs.map((t) => t.id).filter((id) => !!id), {
            windowId: window?.id,
            index: -1
          });
        });
      });
    }
  });
  chrome.runtime.onInstalled.addListener((reason) => {
    console.log({ reason });
    checkCommandShortcuts();
  });
  function checkCommandShortcuts() {
    chrome.commands.getAll((commands) => {
      let missingShortcuts = [];
      for (let { name, shortcut } of commands) {
        if (shortcut === "") {
          missingShortcuts.push(name);
        }
      }
      if (missingShortcuts.length > 0) {
        throw Error(`following keys are cannot be regsitered: ${missingShortcuts.join(", ")}`);
      }
    });
  }
})();
