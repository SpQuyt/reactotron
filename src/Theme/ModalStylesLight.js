import ColorsLight from "./ColorsLight"
import Layout from "./LayoutStyles"

export default {
  overlay: {
    ...Layout.vbox,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    backgroundColor: ColorsLight.modalOverlay,
    padding: 40,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    position: "auto",
    top: "auto",
    bottom: "auto",
    borderRadius: 4,
    padding: 4,
    backgroundColor: ColorsLight.background,
    color: ColorsLight.foreground,
    borderColor: ColorsLight.backgroundLighter,
    width: 500,
  },
  container: {
    ...Layout.vbox,
    flex: 0,
  },
  example: {
    padding: 0,
    margin: "0 0 0 40px",
    color: ColorsLight.bold,
  },
  keystrokes: {
    ...Layout.hbox,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 20,
    fontSize: 13,
  },
  hotkey: {
    padding: "0 10px",
  },
  keystroke: {
    backgroundColor: ColorsLight.backgroundHighlight,
    color: ColorsLight.foreground,
    padding: "4px 8px",
    borderRadius: 4,
  },
  header: {
    ...Layout.vbox,
    padding: "1em 2em 0em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "left",
  },
  body: {
    ...Layout.vbox,
    padding: "1em 2em 4em",
  },
  title: {
    margin: 0,
    padding: 0,
    textAlign: "left",
    fontWeight: "normal",
    fontSize: 24,
    color: ColorsLight.heading,
  },
  subtitle: {
    color: ColorsLight.foreground,
    textAlign: "left",
    padding: 0,
    margin: 0,
  },
  fieldLabel: {
    color: ColorsLight.heading,
    fontSize: 13,
    textTransform: "uppercase",
  },
  textField: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: `1px solid ${ColorsLight.line}`,
    fontSize: 23,
    color: ColorsLight.foregroundLight,
    lineHeight: "40px",
    backgroundColor: "inherit",
  },
}
