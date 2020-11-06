Sticky Attribution
==================

> Insert attribution next to the copied text.

![Sticky Attribution](https://cloud.githubusercontent.com/assets/1669261/26535009/d7db0a80-4453-11e7-8aa5-0f541149d381.gif)

Tested on Mozilla Firefox 53.0.3, Google Chrome 58.0.3029.110 and Internet Explorer 11.0.9600.16663.

**Demo:** <https://taufik-nurrohman.github.io/sticky-attribution>

Usage
-----

~~~ .html
<!DOCTYPE html>
<html dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Demo</title>
  </head>
  <body>
    <p>Content goes here.</p>
    <script src="sticky-attribution.min.js"></script>
  </body>
</html>
~~~

> **Note:** This script will not add the attribution if you are copying text inside `<pre>`, `<code>` or any HTML container with class `no-attribution` in it.
