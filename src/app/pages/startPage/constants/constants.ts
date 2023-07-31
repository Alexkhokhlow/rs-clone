import Lang from '../../../common/lang/lang';

const gears = require('../../../../assets/startPage/svg/more/Gears.svg') as string;
const integrations = require('../../../../assets/startPage/svg/more/integrations.svg') as string;
const search = require('../../../../assets/startPage/svg/more/search.svg') as string;
const boards = require('../../../../assets/startPage/carousel/boards.webp') as string;
const cards = require('../../../../assets/startPage/carousel/cards.webp') as string;
const lists = require('../../../../assets/startPage/carousel/lists.webp') as string;
const projectManagement = require('../../../../assets/startPage/svg/slider/ProjectManagement.svg') as string;
const brainstorming = require('../../../../assets/startPage/svg/slider/Brainstorming.svg') as string;
const meetings = require('../../../../assets/startPage/svg/slider/Meetings.svg') as string;
const taskManagement = require('../../../../assets/startPage/svg/slider/TaskManagement.svg') as string;
const crm = require('../../../../assets/startPage/svg/slider/id.svg') as string;

const text = new Lang();

const articles = [
  {
    icon: integrations,
    title: text.text.constants.articles.integrations.title,
    description: text.text.constants.articles.integrations.description,
  },
  {
    icon: gears,
    title: text.text.constants.articles.butler.title,
    description: text.text.constants.articles.butler.description,
  },
  {
    icon: search,
    title: text.text.constants.articles.trello.title,
    description: text.text.constants.articles.trello.description,
  },
];

const cardsDescription = [
  {
    img: boards,
    title: text.text.constants.cardsDescription.boards.title,
    description: text.text.constants.cardsDescription.boards.description,
  },
  {
    img: cards,
    title: text.text.constants.cardsDescription.cards.title,
    description: text.text.constants.cardsDescription.cards.description,
  },
  {
    img: lists,
    title: text.text.constants.cardsDescription.lists.title,
    description: text.text.constants.cardsDescription.lists.description,
  },
];

const actions = [
  {
    color: 'rgb(255, 143, 115)',
    icon: projectManagement,
    title: text.text.constants.actions.projectManagement.title,
    description: text.text.constants.actions.projectManagement.description,
  },
  {
    color: 'rgb(121, 226, 242)',
    icon: brainstorming,
    title: text.text.constants.actions.brainstorming.title,
    description: text.text.constants.actions.brainstorming.description,
  },
  {
    color: 'rgb(121, 242, 192)',
    icon: meetings,
    title: text.text.constants.actions.meetings.title,
    description: text.text.constants.actions.brainstorming.description,
  },
  {
    color: 'rgb(255, 227, 128)',
    icon: taskManagement,
    title: text.text.constants.actions.taskManagement.title,
    description: text.text.constants.actions.taskManagement.description,
  },
  {
    color: 'rgb(0, 199, 229)',
    icon: crm,
    title: text.text.constants.actions.crm.title,
    description: text.text.constants.actions.brainstorming.description,
  },
];

const backgrounds = [
  {
    title: 'Blue',
    color: 'rgb(0, 101, 255)',
  },
  {
    title: 'Orange',
    color: 'rgb(210, 144, 52)',
  },
  {
    title: 'Green',
    color: 'rgb(81, 152, 57)',
  },
  {
    title: 'Red',
    color: 'rgb(176, 70, 50)',
  },
  {
    title: 'Purple',
    color: 'rgb(137, 96, 158)',
  },
  {
    title: 'Pink',
    color: 'rgb(205, 90, 145)',
  },
  {
    title: 'Lime',
    color: 'rgb(75, 191, 107)',
  },
  {
    title: 'Sky',
    color: 'rgb(0, 174, 204)',
  },
  {
    title: 'Gray',
    color: 'rgb(131, 140, 145)',
  },
  {
    title: 'Yellow',
    color: 'rgb(209, 188, 2)',
  },
];

const github = ['https://github.com/MariDash', 'https://github.com/alexkhokhlow', 'https://github.com/janaahurtsova'];

export { articles, cardsDescription, actions, github, backgrounds };
