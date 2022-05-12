import { Provider, observer } from "mobx-react"
import React, { Component } from "react"
import { ipcRenderer } from "electron"
import config from "../Lib/config"
import FilterTimelineDialog from "../Dialogs/FilterTimelineDialog"
import ExportTimelineDialog from "../Dialogs/ExportTimelineDialog"
import RenameStateDialog from "../Dialogs/RenameStateDialog"
import SendCustomDialog from "../Dialogs/SendCustomDialog"
import StateDispatchDialog from "../Dialogs/StateDispatchDialog"
import StateKeysAndValuesDialog from "../Dialogs/StateKeysAndValuesDialog"
import StateWatchDialog from "../Dialogs/StateWatchDialog"
import Home from "../Home/Home"
import Help from "../Help/Help"
import Native from "../Native/Native"
import State from "../State/State"
import SessionStore from "../Stores/SessionStore"
import AppStyles from "../Theme/AppStyles"
import Colors from "../Theme/Colors"
import Timeline from "../Timeline/Timeline"
import Sidebar from "./Sidebar"
import StatusBar from "./StatusBar"
import CustomCommandsList from "../CustomCommands/CustomCommandsList"
import ReactotronTerminal from "./ReactotronTerminal"
import ColorsLight from "../Theme/ColorsLight"
import AppStylesLight from "../Theme/AppStylesLight"
import appSettingsStore from "../Stores/AppSettingsStore.js"
import { ModeType } from "../constants.js"

const session = new SessionStore(config.get("server.port", 9090))

const Styles = {
  container: { ...AppStyles.Layout.vbox },
  content: {
    ...AppStyles.Layout.vbox,
    backgroundColor: Colors.background,
    color: Colors.foreground,
    height: "100vh",
    scroll: "hidden",
  },
  body: { ...AppStyles.Layout.hbox },
  app: { ...AppStyles.Layout.vbox, scroll: "none", overflow: "hidden" },
  page: { ...AppStyles.Layout.vbox, flex: 1 },
  pageHidden: { flex: 0, height: 0, visibility: "hidden" },
}

const StylesLightMode = {
  container: { ...AppStylesLight.Layout.vbox },
  content: {
    ...AppStylesLight.Layout.vbox,
    backgroundColor: ColorsLight.background,
    color: ColorsLight.foreground,
    height: "100vh",
    scroll: "hidden",
  },
  body: { ...AppStylesLight.Layout.hbox },
  app: { ...AppStylesLight.Layout.vbox, scroll: "none", overflow: "hidden" },
  page: { ...AppStylesLight.Layout.vbox, flex: 1 },
  pageHidden: { flex: 0, height: 0, visibility: "hidden" },
}

@observer
export default class App extends Component {
  componentDidMount() {
    ipcRenderer.on("toggle-side-menu", this.handleSideMenuToggle)
  }

  handleSideMenuToggle() {
    session.ui.toggleSidebar()
  }

  render() {
    const { ui } = session
    const showHome = ui.tab === "home"
    const showTimeline = ui.tab === "timeline"
    const showHelp = ui.tab === "help"
    const showSettings = ui.tab === "settings"
    const showNative = ui.tab === "native"
    const showState = ui.tab === "state"
    const showCustomCommands = ui.tab === "customCommands"
    const currentStyle = appSettingsStore.mode === ModeType.LIGHT ? StylesLightMode : Styles;

    return (
      <Provider session={session}>
        <div style={currentStyle.container}>
          <div style={currentStyle.content}>
            {!ui.inTerminal && (
              <div style={currentStyle.body}>
                <Sidebar />
                <div style={currentStyle.app}>
                  <div style={showHome ? currentStyle.page : currentStyle.pageHidden}>
                    <Home />
                  </div>
                  <div style={showTimeline ? currentStyle.page : currentStyle.pageHidden}>
                    <Timeline />
                  </div>
                  <div style={showState ? currentStyle.page : currentStyle.pageHidden}>
                    <State />
                  </div>
                  <div style={showHelp ? currentStyle.page : currentStyle.pageHidden}>
                    <Help />
                  </div>
                  <div style={showNative ? currentStyle.page : currentStyle.pageHidden}>
                    <Native />
                  </div>
                  <div style={showCustomCommands ? currentStyle.page : currentStyle.pageHidden}>
                    <CustomCommandsList />
                  </div>
                  <div style={showSettings ? currentStyle.page : currentStyle.pageHidden}>
                    <h1>Settings</h1>
                  </div>
                </div>
              </div>
            )}
            {ui.inTerminal && (
              <div style={currentStyle.body}>
                <div style={currentStyle.app}>
                  <div style={currentStyle.page}>
                    <ReactotronTerminal />
                  </div>
                </div>
              </div>
            )}
            <StatusBar />
          </div>
          <StateKeysAndValuesDialog />
          <StateDispatchDialog />
          <StateWatchDialog />
          <RenameStateDialog />
          <FilterTimelineDialog />
          <ExportTimelineDialog />
          <SendCustomDialog />
        </div>
      </Provider>
    )
  }
}
