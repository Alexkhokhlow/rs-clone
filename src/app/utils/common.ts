export default class Common {
  public static createDomNode(element: string, classes: string[], text?: string) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    if (text) {
      node.innerText = text;
    }

    return node;
  }

  public static createDomNodeLink(classes: string[], attr: string, text?: string) {
    const node = document.createElement('a');
    node.classList.add(...classes);
    node.setAttribute('href', attr);
    if (text) {
      node.innerText = text;
    }

    return node;
  }

  public static createDomNodeImg(classes: string[], attr: string) {
    const node = document.createElement('img');
    node.classList.add(...classes);
    node.setAttribute('src', attr);

    return node;
  }

  public static createDomNodeInput(placeholder: string, id: string, classes: string[], type?: string) {
    const node = document.createElement('input');
    node.placeholder = placeholder;
    node.id = id;
    node.classList.add(...classes);
    if (type) {
      node.type = type;
    }

    return node;
  }

  public static createDomNodeLabel(forAtt: string, text: string, classes: string[]) {
    const node = document.createElement('label');
    node.setAttribute('for', forAtt);
    node.textContent = text;
    node.classList.add(...classes);

    return node;
  }

  public static createDomNodeButton(classes: string[], text: string, type?: string) {
    const node = document.createElement('button');
    node.classList.add(...classes);
    node.innerText = text;
    if (type) {
      node.type = type;
    }

    return node;
  }
}
