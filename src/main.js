import { importAll } from "./assets/js/functions.js"
import './assets/styles/main.scss'


class Welcome {
    constructor(name) {
       this.name = name;
    }

    hi() {
        console.log(`Hi ${this.name}`)
    }
}

new Welcome("Pyatak").hi();

importAll(require.context('./components', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));
importAll(require.context('./pages', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));