# jspage 
jspage a tiny library for easy page navigation in a SPA (Single Page Application)

In one page we can have several links to subpages and a div want to show all links into that.
This target element must have an attribute <b>jspage-target</b>
Links are any button or hyperlink or other elements containing <b>jspage</b> attribute. This attribute has the subpage url. See below example:

```html
<nav>
    <a jspage="/subpages/page1.html">Page 1</a>
    <a jspage="/subpages/page2.html">Page 2</a>
    <a jspage="/subpages/page3.html">Page 3</a>
</nav>
<div jspage-target>
    by clicking on each above links, it's url will be loaded 
    into this element using "JQuery.load(url)" function. 
</div>
```
* attribute <b>jspage</b>: each navigation has an attribute named <b>jspage</b> containing the target url.
* class <b>active</b>: by clicking a navigation link, "active" class will be added to it automatically and the element containing attribute <b>jspage-target</b> will be load the related url defined by <b>jspage</b> attribute..

### Auto load using "jspage-load"
If we want to one section of page loaded by one url automatically without clicking any nav element we can use <b>jspage-load</b> attr like:
```html
<div>...</div>
<aside jspage-load="/subpages/sidepage.html">
    Content of sidepage.html will be loaded here at first page load.
</aside>
```
  
### Loading json values
Suppose we want to load behind <b>json</b> value 
```json
{
    "firstname": "Mehdi",
    "lastname": "Salartayefeh"
}
```
into one variable from a url automatically. we can do like below example:
```html
<div jspage-load-json="/url-to-api-or-file-of-json" 
     jspage-load-json-var="json_var1"
     jspage-load-before="resetForm();"
     jspage-load-after="document.querySelector('#name').value=json_var1.firstname;"
>
    <input id="name">
    <input id="family">
</div>
```

* attribute <b>jspage-load-json</b> is url to load into a variable with name <b>jspage-load-json-var</b>.
* attribute <b>jspage-load-after</b> is a javascript expression which be run by eval() after loading.
* attribute <b>jspage-load-before</b> is a javascript which will be run before loading.


<a href="https://mehdi-salartayefeh.github.io/front-end/jsbind/">See Demo</a>
