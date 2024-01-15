/* eslint-disable prettier/prettier */
import browser from "webextension-polyfill";

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
    // Log statement if request.popupMounted is true
    // NOTE: this request is sent in `popup/component.tsx`
    if (request.popupMounted) {
        console.log("backgroundPage notified that Popup.tsx has mounted.");
    }
});

const oneHourAgo = new Date().getTime() - (60 * 60 * 1000);

type BookMarkTreeNode = {
    id: string;
    index?: number;
    parentId: string;
    title: string;
    url?: string;
    children?: BookMarkTreeNode[];
};

type item = {
    history: object[];
    bookmarks: object[];
}


// need a function to filter for just the bookmarks bar
/*
// background.js
chrome.runtime.onStartup.addListener(function () {
    chrome.history.search(
        { text: "", startTime: 0, maxResults: 1000000 },
        function (historyItems) {
            chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
                const data = {
                    history: historyItems,
                    bookmarks: bookmarkTreeNodes[0].children[0].children,
                };
                console.log(data);
                fetch("http://localhost:3000/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            });
        },
    );
});*/

chrome.runtime.onInstalled.addListener(function () {
    chrome.history.search(
        { text: "", startTime: 0, maxResults: 1000000 },
        function (historyItems) {
            chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
                const data = {
                    history: historyItems,
                    bookmarks: bookmarkTreeNodes,
                };
                console.log(data);
                fetch("http://localhost:3000/sync", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            });
        },
    );
});


chrome.history.onVisited.addListener(SyncHistoryVisited);

function SyncHistoryVisited(entry: any) {
    const data = {
        op: 'append',
        history: { 'entry': entry },
        bookmarks: {}
    };
    post(data);
}


function SyncBookmarkRemove(id: string, removeInfo: any) {

    const data = {
        op: 'remove',
        history: {},
        bookmarks: { 'id': id, 'removeInfo': removeInfo }
    };

    post(data);
}

function SyncBookmarkCreate(id: string, bookmark: any) {

    const data = {
        op: 'insert',
        history: {},
        bookmarks: { 'id': id, 'bookmark': bookmark }
    };

    post(data);
}

function SyncBookmarkMove(id: string, moveInfo: any) {

    const data = {
        op: 'move',
        history: {},
        bookmarks: { 'id': id, 'moveInfo': moveInfo }
    }; // server will have to get

    post(data);
}

chrome.bookmarks.onCreated.addListener(SyncBookmarkCreate);

chrome.bookmarks.onRemoved.addListener(SyncBookmarkRemove);



function post(data: any) {
    fetch("http://localhost:3000/sync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

const ws = new WebSocket('ws://localhost:3001');

ws.onopen = (event) => {
    console.log('websocket open');
    ws.send('hello');
};
ws.onmessage = (event) => {
    console.log('received: %s', event.data);
};

