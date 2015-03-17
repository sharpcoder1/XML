XML.js
===
XML Object (Notation) for Javascript

XML -> Javascript Object -> Manipulate -> Back to XML

Usage
---
You need to know only Two methods -
```javascript
XML.parse('<doc>sdfsd</doc>');
```
and
```javascript
XML.stringify(object);
```

Example
---

```javascript
var sample = "<?xml version='1.0'?><root><name>John</name><age>24</age></root>";
var obj = XML.parse(sample);
obj.root.name = "David";
console.log(XML.stringify(obj, ' '));
// <root> <name>David</name> <age>24</age></root>
```
