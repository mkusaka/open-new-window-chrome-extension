(() => {
  // background.ts
  chrome.commands.onCommand.addListener(function(command) {
    if (command == "handle_key_event") {
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
})();
