async function executeScript()
{
    getCurrentTab(function(tabId) {
        chrome.scripting.executeScript({
            target : {
                tabId : tabId
            },
            files : [ "jquery/jquery-3.7.1.min.js", "jquery/jquery-ui.min.js", "select-window/select-window.js" ]
            //function: test
        })
        .then(() => console.log("script injected in all frames"));
    });
}

function test()
{
    console.log("test");
}

async function getCurrentTab(callback) {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let tabs = await chrome.tabs.query(queryOptions);
    callback(tabs[0]["id"]);
}

document.addEventListener('DOMContentLoaded', function () { 
    var btn = document.getElementById("execute");
    btn.addEventListener("click", executeScript);
});