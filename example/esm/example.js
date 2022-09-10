import express from "express";
import { JSDOM } from "jsdom";
import { createElement } from "@tbtk-site/tbtk-create-element";
const app = express();

app.get("/", (req, res) => {
  global.document = new JSDOM(
    `<!DOCTYPE html><html><body></body></html>`
  ).window.document;

  createElement(document.body, "table")
    .child("thead", (thead) =>
      thead.child("tr", (tr) =>
        tr
          .child("th", (th) => (th.ref.innerHTML = "header 1"))
          .child("th", (th) => (th.ref.innerHTML = "header 2"))
          .child("th", (th) => (th.ref.innerHTML = "header 3"))
      )
    )
    .child("tbody", (tbody) =>
      tbody.child("tr", (tr) =>
        tr
          .child("td", (td) => (td.ref.innerHTML = "col 1"))
          .child("td", (td) => (td.ref.innerHTML = "col 2"))
          .child("td", (td) => (td.ref.innerHTML = "col 3"))
      )
    );

  res.send(document.body.innerHTML);
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
