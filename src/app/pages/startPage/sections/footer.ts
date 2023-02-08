import Common from '../../../utils/common';
import { github } from '../constants/constants';

const gitIcon = require('../../../../assets/github.svg') as string;
const iconRss = require('../../../../assets/rs_school_js.svg') as string;
const trello = require('../../../../assets/startPage/svg/trello.svg') as string;

export default class StartPageFooter {
  footer: HTMLElement;

  wrapper: HTMLElement;

  icons: HTMLElement;

  rssLink: HTMLAnchorElement;

  rssIcon: HTMLImageElement;

  trello: HTMLImageElement;

  constructor() {
    this.footer = Common.createDomNode('footer', ['start__footer']);
    this.wrapper = Common.createDomNode('div', ['wrapper', 'footer__wrapper']);
    this.icons = Common.createDomNode('div', ['icons__wrapper']);
    this.rssLink = Common.createDomNodeLink(['rss'], 'https://rs.school/');
    this.rssIcon = Common.createDomNodeImg(['rss__icon'], iconRss);
    this.trello = Common.createDomNodeImg(['trello__footer'], trello);

    github.forEach((link) => {
      const linkGit = Common.createDomNodeLink(['github'], link);
      const iconGit = Common.createDomNodeImg(['git__icon'], gitIcon);
      linkGit.append(iconGit);
      this.icons.append(linkGit);
    });
  }

  public append() {
    this.rssLink.append(this.rssIcon);
    this.icons.append(this.rssLink);
    this.wrapper.append(this.trello, this.icons);
    this.footer.append(this.wrapper);

    return this.footer;
  }
}
