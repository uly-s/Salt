// when a tab group is opened, move it to the right of the last tab group, but to the left of ungrouped tabs
chrome.tabGroups.onUpdated.addListener(function(group) {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        var lastGroupedTabIndex = -1;
        var lastGroupedTabGroupId = -1;
        var firstUnGroupedTabIndex = -1;
        
        // Find the index of the last tab in the last tab group
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].groupId !== -1) {
                lastGroupedTabIndex = i;
                lastGroupedTabGroupId = tabs[i].groupId;
            } else {
                firstUnGroupedTabIndex = i;
                break;
            }
        }
        
        // Move the tab group to the right of the last tab group
        chrome.tabGroups.move(group.groupId, { index: lastGroupedTabIndex + 1 });
    });
});

// var groups = [];

// function syncGroups() {
//     chrome.tabGroups.query({}, function(_groups) {
//         groups = _groups;
//     });
// }

// chrome.tabGroups.query({}, function(_groups) {
//     // Clear the original array
//     groups.length = 0;

//     // Push new items into it
//     Array.prototype.push.apply(groups, _groups);
// });

    // console.log(group);
    // chrome.tabs.query({ currentWindow: true }, function(tabs) {
    //     // Find the index of the last tab in the last tab group
    //     var lastGroupedTabIndex = -1;
    //     var lastGroupedTabGroupId = -1;
    //     var firstUnGroupedTabIndex = -1;
    //     for (var i = 0; i < tabs.length; i++) {
    //         if (tabs[i].groupId !== -1) {
    //             lastGroupedTabIndex = i;
    //             lastGroupedTabGroupId = tabs[i].groupId;
    //             console.log("Last Grouped Tab Index: " + lastGroupedTabIndex);
    //         }
    //         else {
    //             firstUnGroupedTabIndex = i;
    //             console.log("First Ungrouped Tab Index: " + firstUnGroupedTabIndex);
    //             break;
    //         }
    //     }
    
    //     // Move the tab group to the right of the last tab group
    //     chrome.tabGroups.move(lastGroupedTabGroupId, { index: firstUnGroupedTabIndex - 1});

// chrome.tabGroups.query({}, function(_groups) {
//     console.log("From Query")
//     console.log(_groups);
//     console.log("From Global")
//     console.log(groups);

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        // var selectedTabId = activeInfo.tabId;
        // var selectedGroupId = -1;

        // // Find the group ID of the selected tab
        // for (var i = 0; i < tabs.length; i++) {
        //     if (tabs[i].id === selectedTabId) {
        //         selectedGroupId = tabs[i].groupId;
        //         break;
        //     }
        // }

        // // Set selectedGroupId to 0 if it's still -1
        // if (selectedGroupId === -1) {
        //     selectedGroupId = 0;
        // }

        // // Collapse all tab groups besides the selected one
        // for (var i = 0; i < tabs.length; i++) {
        //     if (tabs[i].groupId !== selectedGroupId) {
        //         chrome.tabGroups.update(tabs[i].groupId, { collapsed: true });
        //     } else {
        //         chrome.tabGroups.update(tabs[i].groupId, { collapsed: false });
        //     }
        // }


    });
});