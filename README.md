# Stop Next Video
Stop autoplay-next video on Facebook.

This extension will cancel Facebook's next-video-autoplay for you.
The extension monitors the page and clicks the 'cancel' button when the video ends. You won't even see the small 'next' window since the extension hides it.
You can always switch the extension on or off and it will instantly apply to all open tabs.

The extension is available for Firefox and Chrome:
* [Chrome link](https://chrome.google.com/webstore/detail/ijlabhomiokbhcefphgokachaencmglf)

# Performance and How the extensoin works
In short, the extension isn't supposed to affect performance at all. If you're really obssessed with performance and/or a geek keep reading.

At length - the operations that the extension does aren't performance costly in the first place, but since this extension doesn't do anything significant - I made some efforts to minimize it even more.
This is how the extension works: the extension runs only in FB pages. Once in 4 seconds the extension checks if the page URL was changed to a video url, if it did - it attempts to find a video in the page and add an event listener to when the video ended. When the video ended the callback fires and searches for the 'cancel' button (a span element actually).
Running a function with a few dozens of operations once in a few seconds is neglectable, considering that nowdays CPUs do billions of operations per second. Adding an event listener and the callback itself - query-selecting to find the element and clicking it - aren't supposed to cost much too, not more than the user himself clicking it anyway.
I could've run a background page with a 'chrome.tabs.onUpdated' event listener in order to save polling the page every 4 seconds, but that would mean there would be a background page that would run a callback for each change in any page (not just FB's). I don't think that would really be more economical. 

The extension also has a background script that runs for 5 seconds and sets the icon to the 'off icon' in case the user turned it off. After those five seconds the background script closes (at least on Chrome, Firefox doesn't have a task-manager so I can't confirm) itself.

Anyways, I did also some tests to confirm that, if you came to a different conclusion let me know.
