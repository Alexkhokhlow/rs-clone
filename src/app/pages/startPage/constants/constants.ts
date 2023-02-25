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
const calendar = require('../../../../assets/startPage/svg/slider/calendar.svg') as string;

const articles = [
  {
    icon: integrations,
    title: 'Integrations',
    description:
      'Connect the apps your team already uses into your Trello workflow or add a Power-Up to fine-tune your specific needs.',
  },
  {
    icon: gears,
    title: 'Butler Automation',
    description:
      'No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.',
  },
  {
    icon: search,
    title: 'Trello Enterprise',
    description: 'The productivity tool teams love, paired with the features and security needed for scale.',
  },
];

const cardsDescription = [
  {
    img: boards,
    title: 'Boards',
    description:
      'Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”',
  },
  {
    img: cards,
    title: 'Cards',
    description:
      'Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.',
  },
  {
    img: lists,
    title: 'Lists',
    description:
      "The different stages of a task. Start as simple as To Do, Doing or Done - or build a workflow custom fit to your team's needs. There's no wrong way to Trello.",
  },
];

const actions = [
  {
    color: 'rgb(255, 143, 115)',
    icon: projectManagement,
    title: 'Project Management',
    description: 'Keep tasks in order, deadlines on track, and team members aligned with Trello.',
  },
  {
    color: 'rgb(121, 226, 242)',
    icon: brainstorming,
    title: 'Brainstorming',
    description: "Unleash your team's creativity and keep ideas visible, collaborative, and actionable.",
  },
  {
    color: 'rgb(121, 242, 192)',
    icon: meetings,
    title: 'Meetings',
    description: 'Empower your team meetings to be more productive, empowering, and dare we say - fun.',
  },
  {
    color: 'rgb(255, 227, 128)',
    icon: taskManagement,
    title: 'Task Management',
    description:
      "Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team's projects a cohesive success every time.",
  },
  {
    color: 'rgb(0, 199, 229)',
    icon: crm,
    title: 'CRM',
    description:
      "Use Trello as your team's go-to command center for content curation, revisions, handoff, and publishing.",
  },
  {
    color: 'rgb(135, 119, 217)',
    icon: calendar,
    title: 'Editorial calendar',
    description:
      "Use Trello as your team's go-to command center for content curation, revisions, handoff, and publishing.",
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
