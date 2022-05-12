const { action, observable, makeObservable } = require("mobx");
const { ModeType, ThemeType } = require("../constants.js");

class AppSettingsStore {
  @observable
  mode = ModeType.DARK;
  @observable
  theme =  ThemeType.RAILSCASTS;

  @action
  updateMode(newMode) {
    this.mode = newMode;
  }

  get storeDetails () {
    return `mode: ${this.mode} && theme: ${this.theme}`;
  }

  logStoreDetails() {
    console.log(this.storeDetails);
  }

  // constructor () {
  //   makeObservable(this, {
  //     mode: observable,
  //     theme: observable,
  //     updateMode: action
  //   });
  // }

}

const appSettingsStore = new AppSettingsStore();

export default appSettingsStore;