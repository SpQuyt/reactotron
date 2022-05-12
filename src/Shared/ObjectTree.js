import React from 'react'
import PropTypes from 'prop-types'
import JSONTree from 'react-json-tree'
import Colors from '../Theme/Colors'

const theme = { ...Colors.theme }

const Styles = {
  container: {},
  theme: {
    tree: { backgroundColor: 'transparent', marginTop: -3 },
    ...theme
  },
  muted: {}
}

const ObjectTree = props => {
  const { object, level = 1 } = props
  return (
    <div style={Styles.container}>
      <JSONTree
        data={object}
        hideRoot
        shouldExpandNode={(keyName, data, minLevel) => minLevel <= level}
        theme={Styles.theme}
        invertTheme={Colors.invertTheme}
        getItemString={(type, data, itemType, itemString) => {
          if (type === 'Object') {
            const childrenKeys = Object.keys(data).map(dataItem => {
              const suitableType = ['string', 'number'];
              if (suitableType.includes(typeof data[dataItem])) {
                return `${dataItem}: ${data[dataItem]}`
              }
              if (typeof data[dataItem] === 'array') {
                return `${dataItem}: ${data[dataItem]}(${data[dataItem]?.length})`
              }
              if (typeof data[dataItem] === 'object') {
                return `${dataItem}: ${typeof data[dataItem]}{}`
              }
              return `${dataItem}: ${typeof data[dataItem]}`
            }).join(', ')
            return <span style={Styles.muted}>
              {{
                ...itemType,
                props: {
                  ...itemType.props,
                  children: `{ ${childrenKeys} }`
                }
              }}
            </span>
          }
          return (
            <span style={Styles.muted}>
              {itemType} {itemString}
            </span>
          )
        }}
        valueRenderer={(transformed, untransformed) => {
          return `${untransformed || transformed}`
        }}
      />
    </div>
  )
}

ObjectTree.propTypes = {
  object: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  level: PropTypes.number
}

export default ObjectTree
