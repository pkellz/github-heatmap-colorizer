// Activate plugin on every tab update
chrome.tabs.onUpdated.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: 'content.js' });
    });    
})