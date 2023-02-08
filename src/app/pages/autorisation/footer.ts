import Common from '../../utils/common';

export default class Footer {
  render() {
    const content = `<div> <hr> <img class="rss-logo" src="https://rs.school/images/rs_school.svg" width="100"> </div><ul class="footer__list"> <li class="list__item"> <a href="https://github.com/Alexkhokhlow">Alexkhokhlow</a> </li> <li class="list__item"> <a href="https://github.com/MariDash">MariDash</a> </li> <li class="list__item"> <a href="https://github.com/JanaAhurtsova">JanaAhurtsova</a> </li> </ul>`;
    return Common.createDOMNode('section', ['footer'], content);
  }
}
