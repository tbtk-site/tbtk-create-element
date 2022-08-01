import { createElement } from "../src/tbtk-create-element";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

test("コールバックを省略して1要素を作成することができる", (): void => {
    // 挿入場所のセットアップ
    document.body.innerHTML = `<div id="right"><p></p></div><div id="test"></div>`;

    // 要素を作って入れると、id=rightと同じ中身ができるはず
    createElement(document.getElementById("test")!, "p");

    // 確認(getByTestIdとかはどうやっても動かないので諦めた)
    expect(document.getElementById("test")!).toContainHTML(document.getElementById("right")!.innerHTML);
});

test("コールバックを利用して値をセットしつつ1要素を作成することができる", (): void => {
  // 挿入場所のセットアップ
  document.body.innerHTML = `<div id="right"><p class="fuga">hogehoge</p></div><div id="test"></div>`;

  // 要素を作って入れると、id=rightと同じ中身ができるはず
  createElement(document.getElementById("test")!, "p", (p) => {
    p.ref.innerHTML = "hogehoge";
    p.ref.className = "fuga";
  });

  // 確認
  expect(document.getElementById("test")!).toContainHTML(document.getElementById("right")!.innerHTML);
});

test("childメソッドで、子要素をチェインで作成できる。", (): void => {
  // 挿入場所のセットアップ
  document.body.innerHTML = `<div id="right"><div><p>a</p><p>b</p></div></div><div id="test"></div>`;

  // 要素を作って入れると、id=rightと同じ中身ができるはず
  createElement(document.getElementById("test")!, "div")
    .child("p", (p) => p.ref.innerHTML = "a")
    .child("p", (p) => p.ref.innerHTML = "b");

  // 確認
  expect(document.getElementById("test")!).toContainHTML(document.getElementById("right")!.innerHTML);
});

test("siblingメソッドで、兄弟要素をチェインで作成できる。", (): void => {
  // 挿入場所のセットアップ
  document.body.innerHTML = `<div id="right"><div></div><p>a</p><p>b</p></div><div id="test"></div>`;

  // 要素を作って入れると、id=rightと同じ中身ができるはず
  createElement(document.getElementById("test")!, "div")
    .sibling("p", (p) => p.ref.innerHTML = "a")
    .sibling("p", (p) => p.ref.innerHTML = "b");

  // 確認
  expect(document.getElementById("test")!).toContainHTML(document.getElementById("right")!.innerHTML);
});

test("ReadMeに書いてあるテーブルの例が正常動作すること", (): void => {
  // 挿入場所のセットアップ
  document.body.innerHTML = `<div id="right"></div><div id="test"></div>`;

  // CreateElementの例
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let headerTr = document.createElement("tr");
  let headerTh1 = document.createElement("th");
  headerTh1.innerHTML = "ヘッダー1";
  headerTr.appendChild(headerTh1);
  let headerTh2 = document.createElement("th");
  headerTh2.innerHTML = "ヘッダー2";
  headerTr.appendChild(headerTh2);
  let headerTh3 = document.createElement("th");
  headerTh3.innerHTML = "ヘッダー3";
  headerTr.appendChild(headerTh3);
  thead.appendChild(headerTr);

  let bodyTr = document.createElement("tr");
  let bodyTd1 = document.createElement("td");
  bodyTd1.innerHTML = "列1";
  bodyTr.appendChild(bodyTd1);
  let bodyTd2 = document.createElement("td");
  bodyTd2.innerHTML = "列2";
  bodyTr.appendChild(bodyTd2);
  let bodyTd3 = document.createElement("td");
  bodyTd3.innerHTML = "列3";
  bodyTr.appendChild(bodyTd3);
  tbody.appendChild(bodyTr);

  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById("right")!.appendChild(table);

  // tbtk-create-elementの例
  createElement(document.getElementById("test")!, "table")
    .child("thead", (thead) =>
      thead.child("tr", (tr) =>
            tr.child("th", (th) => (th.ref.innerHTML = "ヘッダー1"))
              .child("th", (th) => (th.ref.innerHTML = "ヘッダー2"))
              .child("th", (th) => (th.ref.innerHTML = "ヘッダー3"))
      )
    )
    .child("tbody", (tbody) =>
      tbody.child("tr", (tr) =>
            tr.child("td", (td) => (td.ref.innerHTML = "列1"))
              .child("td", (td) => (td.ref.innerHTML = "列2"))
              .child("td", (td) => (td.ref.innerHTML = "列3"))
      )
    );

  // 確認
  expect(document.getElementById("test")!).toContainHTML(document.getElementById("right")!.innerHTML);
});
