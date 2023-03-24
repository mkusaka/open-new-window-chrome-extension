chrome.commands.onCommand.addListener(function (command) {
    if (command == "handle_key_event") {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            // https://github.com/philc/vimium/blob/bb9ab6d0c6748c9a9794d3a0d99e0242a9ece2a4/background_scripts/main.js#L302-L309
            console.log({tabs});
            const tab = tabs[0]
            chrome.windows.create({tabId: tab.id, incognito: tab.incognito}, async (window) => {
                await chrome.tabs.move(
                    tabs.map((t) => t.id).filter((id): id is number => !!id),
                    {
                        windowId: window?.id,
                        index: -1,
                    }
                );
            });
        });
    }
});
