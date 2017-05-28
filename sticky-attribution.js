/*!
 * =======================================================
 *  STICKY ATTRIBUTION
 * =======================================================
 *
 *   Author: Taufik Nurrohman
 *   URL: https://github.com/tovic
 *   License: Public Domain
 *
 * -------------------------------------------------------
 *
 */

(function(win, doc) {
    var getSelection = 'getSelection',
        removeAllRanges = 'removeAllRanges',
        addRange = 'addRange',
        parentNode = 'parentNode',
        firstChild = 'firstChild',
        appendChild = 'appendChild',
        removeChild = 'removeChild',
        test = 'test',
        innerHTML = 'innerHTML';
    // does not have support for the selection API, skip!
    if (!win[getSelection]) return;
    var selection, target, clone, container, c, range;
    // listen to the “copy” event
    doc.addEventListener("copy", function(e) {
        // check whether the target is a `<pre>`, `<code>` or `<any class="no-attribution">` element
        target = e.target;
        // if the target is a text node, try to get the closest HTML element
        while (target.nodeType === 3) {
            target = target[parentNode];
        }
        // create a container
        container = doc.createElement('div');
        /*
        container.style.width = container.style.height = '1px';
        container.style.overflow = 'hidden';
        container.style.position = 'absolute';
        container.style.top = container.style.left = 0;
        */
        if (
            // make sure we have selection
            (selection = win[getSelection]()) &&
            // make sure we have selection range
            (selection.rangeCount) &&
            // get the first selection range
            (selection = selection.getRangeAt(0)) &&
            // clone the current selection range, then get the HTML contents of the selection
            (clone = selection.cloneRange(), selection = selection.cloneContents())
        ) {
            // append HTML contents of the selection to the container
            while (c = selection[firstChild]) {
                container[appendChild](c);
            }
            // insert the attribution to the end of the contents
            // only if the target element is not a `<pre>`, `<code>` and `<any class="no-attribution">`
            if (!/^(pre|code)$/i[test](target.nodeName || "") && !/(^|\s)no-attribution(\s|$)/i[test](target.className || "")) {
                var href = win.location.href;
                container[innerHTML] += '<br><br>&copy; ' + doc.title + '<br>Source: <a href="' + href + '">' + href + '</a>';
            }
            // create a new range
            range = doc.createRange();
            // append the container to the `<body>` section
            doc.body[appendChild](container);
            // move selection range to the container
            range.selectNodeContents(container);
            selection = win[getSelection]();
            selection[removeAllRanges]();
            selection[addRange](range);
            // there should be a short time there, we have copied the new selection…
            setTimeout(function() {
                // now remove the container…
                container[parentNode][removeChild](container);
                // then restore the previous selection!
                selection[removeAllRanges]();
                selection[addRange](clone);
            });
        }
    }, false);
})(window, document);