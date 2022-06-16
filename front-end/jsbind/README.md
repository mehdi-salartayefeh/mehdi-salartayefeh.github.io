jsBind is created by Mehdi Salartayefeh, it is similar to Angular but very easy and with small footprint.
We can bind any property of element using <code>jsbind</code> property.
<br>
For example if we have an input box with id <code>Input1</code> like this <br>
```html
<input id="Input1">
```
Input 1: <input id="Input1">
<br>
<br>
Now we have another input element and we want it's value be bonded to <code>Input1</code> value using <b>jsbind</b> attribute.
```html
<input readonly jsbind="value:Input1">
```
Input 2: <input readonly jsbind="value:Input1">

<a href="#">See Demo</a>
