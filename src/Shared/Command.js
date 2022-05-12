import { observer } from "mobx-react"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  MdLabel as DisplayIcon,
  MdExpandLess as IconOpen,
  MdExpandMore as IconClosed
} from "react-icons/md"
import { ModeType } from "../constants.js"
import Timestamp from "../Shared/Timestamp"
import appSettingsStore from "../Stores/AppSettingsStore.js"
import AppStyles from "../Theme/AppStyles"
import Colors from "../Theme/Colors"
import ColorsLight from "../Theme/ColorsLight"
import CommandToolbar from "./CommandToolbar"

const Styles = {
  container: {
    ...AppStyles.Layout.hbox,
    marginTop: 0,
    alignItems: "flex-start",
    borderBottom: `1px solid ${Colors.line}`,
  },
  containerOpen: {
    backgroundColor: Colors.backgroundSubtleLight,
  },
  icon: {
    color: Colors.backgroundHighlight,
  },
  body: {
    ...AppStyles.Layout.vbox,
    marginLeft: 0,
  },
  topRow: {
    ...AppStyles.Layout.hbox,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "15px 20px",
    cursor: "pointer",
  },
  title: {
    textAlign: "left",
    width: 168,
  },
  titleText: {
    color: Colors.tag,
  },
  titleTextInverse: {
    backgroundColor: Colors.tag,
    color: Colors.tagComplement,
    borderRadius: 4,
    padding: "4px 8px",
  },
  displayIcon: {
    marginRight: 4,
  },
  displayIconSize: 16,
  preview: {
    textAlign: "left",
    paddingRight: 16,
    overflow: "hidden",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    flex: 1,
    wordBreak: "break-all",
  },
  duration: {
    color: Colors.foregroundDark,
    paddingRight: 10,
  },
  timestamp: {
    color: Colors.foregroundDark,
    paddingRight: 10,
  },
  spacer: {
    flex: 1,
  },
  children: {
    overflow: "hidden",
    animation: "fade-up 0.25s",
    willChange: "transform opacity",
    padding: "0 40px 30px 40px",
  },
}

const StylesLightMode = {
  container: {
    ...AppStyles.Layout.hbox,
    marginTop: 0,
    alignItems: "flex-start",
    borderBottom: `1px solid ${ColorsLight.line}`,
  },
  containerOpen: {
    backgroundColor: ColorsLight.backgroundSubtleLight,
  },
  icon: {
    color: ColorsLight.backgroundHighlight,
  },
  body: {
    ...AppStyles.Layout.vbox,
    marginLeft: 0,
  },
  topRow: {
    ...AppStyles.Layout.hbox,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "15px 20px",
    cursor: "pointer",
  },
  title: {
    textAlign: "left",
    width: 168,
  },
  titleText: {
    color: ColorsLight.tag,
  },
  titleTextInverse: {
    backgroundColor: ColorsLight.tag,
    color: ColorsLight.tagComplement,
    borderRadius: 4,
    padding: "4px 8px",
  },
  displayIcon: {
    marginRight: 4,
  },
  displayIconSize: 16,
  preview: {
    textAlign: "left",
    paddingRight: 16,
    overflow: "hidden",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    flex: 1,
    wordBreak: "break-all",
  },
  duration: {
    color: ColorsLight.foregroundDark,
    paddingRight: 10,
  },
  timestamp: {
    color: ColorsLight.foregroundDark,
    paddingRight: 10,
  },
  spacer: {
    flex: 1,
  },
  children: {
    overflow: "hidden",
    animation: "fade-up 0.25s",
    willChange: "transform opacity",
    padding: "0 40px 30px 40px",
  },
}

@observer
class Command extends Component {
  static propTypes = {
    command: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string,
    subtitle: PropTypes.string,
    duration: PropTypes.number,
  }

  state = {
    isOpen: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: props.startsOpen || false,
    }
    this.handleToggleOpen = this.handleToggleOpen.bind(this)
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return !(equals(nextProps, this.props) && equals(this.state, nextState))
  // }

  handleToggleOpen() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isOpen } = this.state
    const { command, children, title, preview, deltaTime } = this.props
    const { important, type } = command
    const isDisplay = type === "display"
    const { date } = command
    const currentStyle = appSettingsStore.mode === ModeType.LIGHT ? StylesLightMode : Styles;
    const topRowStyle = currentStyle.topRow
    const timestampStyle = currentStyle.timestamp
    const Icon = isOpen ? IconOpen : IconClosed
    const containerStyles = { ...currentStyle.container, ...(isOpen && currentStyle.containerOpen) }
    let tagStyle;
    switch (title) {
      case 'API RESPONSE': {
        tagStyle = { color: Colors.bold };
        break;
      }
      case 'ACTION': {
        tagStyle = { color: Colors.string };
        break;
      }
      default: {
        tagStyle = { color: Colors.tag }
        break;
      }
    }
    const titleTextStyle = { ...currentStyle.titleText, ...(important && currentStyle.titleTextInverse), ...tagStyle }

    return (
      <div style={containerStyles}>
        <div style={currentStyle.body}>
          <div style={topRowStyle} onClick={this.handleToggleOpen}>
            <Timestamp date={date} style={timestampStyle} deltaTime={deltaTime} />
            <div style={currentStyle.title}>
              <span style={titleTextStyle}>
                {isDisplay && (
                  <DisplayIcon size={currentStyle.displayIconSize} style={currentStyle.displayIcon} />
                )}
                {title}
              </span>
            </div>
            {!isOpen && <span style={{ ...currentStyle.preview}}>{preview}</span>}
            {isOpen && <CommandToolbar command={command} />}
            {isOpen && <span style={currentStyle.spacer} />}
            <Icon size={20} style={currentStyle.icon} />
          </div>
          {isOpen && <div style={currentStyle.children}>{children}</div>}
        </div>
      </div>
    )
  }
}

export default Command
