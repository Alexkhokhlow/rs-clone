export default class Common {
  public static createDomNode(element: string, classes: string[], text?: string) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    if (text) {
      node.innerText = text;
    }

    return node;
  }

  // c innerHTML
  public static createDOMNode(element: string, classes: string[], text?: string) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    if (text) {
      node.innerHTML = text;
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

  // Input с типом
  public static createDOMNodeInput(id: string, classes: string[], type: string, placeholder?: string) {
    const node = document.createElement('input');
    if (placeholder) {
      node.placeholder = placeholder;
    }
    node.id = id;
    node.classList.add(...classes);
    node.setAttribute('type', type);

    return node;
  }

  public static createDomNodeLabel(forAtt: string, text: string, classes: string[]) {
    const node = document.createElement('label');
    node.setAttribute('for', forAtt);
    node.textContent = text;
    node.classList.add(...classes);

    return node;
  }

  public static createDomNodeButton(classes: string[], text?: string, type?: string) {
    const node = document.createElement('button');
    node.classList.add(...classes);
    if (text) {
      node.innerText = text;
    }
    if (type) {
      node.type = type;
    }

    return node;
  }

  public static setLocalEmail(button: HTMLButtonElement, input: HTMLInputElement) {
    button.addEventListener('click', () => {
      if (input.value) {
        localStorage.setItem('data', input.value);
        input.value = '';
      }
      window.location.href = '/signup';
    });
  }

  public static clickTitle(parent: HTMLElement, title: HTMLElement, input: HTMLInputElement) {
    parent.replaceChild(input, title);
    if (title.textContent) {
      input.value = title.textContent;
      input.focus();
    }
  }

  public static changeTitle(parent: HTMLElement, title: HTMLElement, input: HTMLInputElement) {
    title.innerText = input.value;
    parent.replaceChild(title, input);
  }

  public static languageSwitcher() {
    const language = document.createElement('select');
    language.classList.add('lang');
    const russian = document.createElement('option');
    russian.classList.add('option');
    russian.textContent = 'Русский';
    russian.setAttribute('value', 'rus');
    const english = document.createElement('option');
    english.classList.add('option');
    english.textContent = 'English';
    english.setAttribute('value', 'eng');
    language.append(english, russian);
    const data = localStorage.getItem('lang');
    if (data) {
      language.value = data;
    }

    language.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLOptionElement;
      localStorage.setItem('lang', target.value);
      window.location.reload();
    });

    return language;
  }

  public static createUserIcon(id: string, name: string, classEl: string, color?: string) {
    const abbreviation = Common.getAbbreviation(name);
    const user = Common.createDomNode('span', ['user__wrapper']);
    user.classList.add(classEl);
    user.id = id;
    user.textContent = abbreviation;
    if (color) {
      user.style.background = color;
    }
    return user;
  }

  public static getAbbreviation(name: string) {
    const nameArr = name.split(' ').filter((string) => string !== '');
    let abbreviation = '';
    if (nameArr.length > 1) {
      abbreviation = nameArr[0][0] + nameArr[1][0];
    } else {
      abbreviation = nameArr[0].slice(0, 1);
    }

    return abbreviation;
  }

  public static generateRandomColor() {
    const colors = [
      '#45a6cd',
      '#b755a5',
      '#492190',
      '#6fabb7',
      '#285d70',
      '#589146',
      '#68ad85',
      '#e39a50',
      '#3d7668',
      '#ac6e26',
      '#7b96ac',
    ];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }
}
