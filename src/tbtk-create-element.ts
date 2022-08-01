/**
 * 各種要素作成処理のコールバックに使われる関数の型
 *
 * @param p_element
 *    作成された要素を表す{@link CreateElement}が渡されます。
 *    実際のDOM要素は{@link CreateElement.ref()}を使うことで取得できるので
 *    それを用いてプロパティなどを設定して、細かい設定を組み立てていきます。
 */
export type CreateElementCallBack = (p_element: CreateElement) => void;

/**
 * tbtk-create-elementの本体
 */
export class CreateElement {
  /**
   * コンストラクタ
   *
   * 基本的には、自前で「new」はせずに{@link createElement}を呼び出して作成してください。
   *
   * @param p_parent_element
   *    構築した要素を挿入したい親要素
   * @param p_create_tag_name
   *    作りたい要素名。document.createElementにそのまま渡すので、そちらで使えるものを指定します。
   * @param [p_callback]
   *    {@link CreateElementCallBack}を指定します。
   *    なお、この引数は省略可能なので、ただ要素を作ればそれでいい場合は指定しないこともできます。
   */
  constructor(p_parent_element: Element, p_create_tag_name: string, p_callback?: CreateElementCallBack) {
    this.FParentElement = p_parent_element;
    this.FCurrentElement = document.createElement(p_create_tag_name);
    if (p_callback) {
      p_callback(this);
    }
    p_parent_element.appendChild(this.FCurrentElement);
  }

  /**
   * コンストラクタで作成した要素の子要素として新たな要素を作成します。
   * 作成した要素はそのまま挿入されます。
   *
   * @param p_create_tag_name
   *    作りたい要素名。document.createElementにそのまま渡すので、そちらで使えるものを指定します。
   * @param [p_callback]
   *    {@link CreateElementCallBack}を指定します。
   *    なお、この引数は省略可能なので、ただ要素を作ればそれでいい場合は指定しないこともできます。
   * @return
   *    this が戻ります。
   */
  child(p_create_tag_name: string, p_callback?: CreateElementCallBack) : CreateElement {
    new CreateElement(this.FCurrentElement, p_create_tag_name, p_callback);
    return this;
  }

  /**
   * コンストラクタで作成した要素の兄弟（同階層）に新たな要素を作成します。
   * 作成した要素はそのまま挿入まで行きます。
   *
   * @param p_create_tag_name
   *    作りたい要素名。document.createElementにそのまま渡すので、そちらで使えるものを指定します。
   * @param [p_callback]
   *    {@link CreateElementCallBack}を指定します。
   *    なお、この引数は省略可能なので、ただ要素を作ればそれでいい場合は指定しないこともできます。
   * @return
   *    this が戻ります。
   */
  sibling(p_create_tag_name: string, p_callback?: CreateElementCallBack) : CreateElement {
    new CreateElement(this.FParentElement, p_create_tag_name, p_callback);
    return this;
  }

  /**
   * このインスタンスで「document.createElement」したDOM要素を取得します。
   *
   * @return コンストラクタで「document.createElement」した要素
   */
	get ref(): Element {
		return this.FCurrentElement;
	}

  private FParentElement: Element;
  private FCurrentElement: Element;
}

/**
 * いちいち「new」で{@link CreateElement}を作るのも冗長なので、それを省略するための関数。
 * 基本的にこれを利用してインスタンスを作成します。
 *
 * @param p_parent_element
 *    構築した要素を挿入したい親要素
 * @param p_create_tag_name
 *    作りたい要素名。document.createElementにそのまま渡すので、そちらで使えるものを指定します。
 * @param [p_callback]
 *    {@link CreateElementCallBack}を指定します。
 *    なお、この引数は省略可能なので、ただ要素を作ればそれでいい場合は指定しないこともできます。
 * @returns
 *    作成された{@link CreateElement}のインスタンス
 */
export const createElement = (p_parent_element: Element, p_create_tag_name: string, p_callback?: CreateElementCallBack) => {
  return new CreateElement(p_parent_element, p_create_tag_name, p_callback);
}
