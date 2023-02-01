import Home from "./pages/home/home";

export default class App{
  home:Home;
  body:HTMLElement;
  constructor(){
    this.home = new Home();
    this.body = document.body;
    this.body.append(this.home.main);
  }

  start(){
  }

}