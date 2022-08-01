# What is this?

If you do not use a framework, you may want to use "document.createElement" to construct an element, but using it normally requires a large number of temporary variables, which is redundant and cumbersome.

This library allows you to assemble elements using an arrow function expression without using temporary variables. This library  is lightweight, so it can be stored anywhere.

## install

```bash
# npm
npm install @tbtk-site/tbtk-create-element

# yarn
yarn add @tbtk-site/tbtk-create-element
```

Using jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/@tbtk-site/tbtk-create-element/dist/index.min.js"></script>
```

## How to use

### Example of creating a simple 1-element
```javascript
// Before
let p = document.createElement("p");
p.innerText = "hogehoge";
document.body.appendChild(p);

// After(CDN & Web Browser)
createElement(document.body, "p", (p) => p.ref.innerText = "hogehoge");

// After(Node & TypeScript)
import { createElement } from "@tbtk-site/tbtk-create-element";
createElement(document.body, "p", (p) => p.ref.innerText = "hogehoge");
```

### Example of creating a table
```javascript
// before
let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let headerTr = document.createElement("tr");
let headerTh1 = document.createElement("th");
headerTh1.innerHTML = "header 1";
headerTr.appendChild(headerTh1);
let headerTh2 = document.createElement("th");
headerTh2.innerHTML = "header 2";
headerTr.appendChild(headerTh2);
let headerTh3 = document.createElement("th");
headerTh3.innerHTML = "header 3";
headerTr.appendChild(headerTh3);
thead.appendChild(headerTr);

let bodyTr = document.createElement("tr");
let bodyTd1 = document.createElement("td");
bodyTd1.innerHTML = "col 1";
bodyTr.appendChild(bodyTd1);
let bodyTd2 = document.createElement("td");
bodyTd2.innerHTML = "col 2";
bodyTr.appendChild(bodyTd2);
let bodyTd3 = document.createElement("td");
bodyTd3.innerHTML = "col 3";
bodyTr.appendChild(bodyTd3);
tbody.appendChild(bodyTr);

table.appendChild(thead);
table.appendChild(tbody);
document.body.appendChild(table);

// after
createElement(document.body, "table")
  .child("thead", (thead) =>
    thead.child("tr", (tr) =>
          tr.child("th", (th) => (th.ref.innerHTML = "header 1"))
            .child("th", (th) => (th.ref.innerHTML = "header 2"))
            .child("th", (th) => (th.ref.innerHTML = "header 3"))
    )
  )
  .child("tbody", (tbody) =>
    tbody.child("tr", (tr) =>
          tr.child("td", (td) => (td.ref.innerHTML = "col 1"))
            .child("td", (td) => (td.ref.innerHTML = "col 2"))
            .child("td", (td) => (td.ref.innerHTML = "col 3"))
    )
  );
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

## TypeScript & Yarn3(PnP)

Please note that the test will not work properly due to PnP if the following steps are not taken.

[TypeScript + PnP quick start](https://yarnpkg.com/getting-started/recipes#typescript--pnp-quick-start)
