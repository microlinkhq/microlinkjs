import React from 'react'
import ReactDOM from 'react-dom'
import MicrolinkHover from '@microlink/hover-react'

function parseJSON (value) {
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

function parseObject (obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    return Object.assign(acc, { [key]: parseJSON(obj[key]) })
  }, {})
}

function getDOMSelector (selector) {
  return typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : [].concat(selector).filter(Boolean)
}

function forEach (list, fn) {
  for (let i = 0; i < list.length; i++) fn(list[i])
}

function microlink (selector, opts, rootNode) {
  return forEach(getDOMSelector(selector), function (el) {
    ReactDOM.render(
      React.createElement(
        MicrolinkHover.withHover,
        Object.assign(
          {
            as: 'div',
            url: el.getAttribute('href'),
            className: el.className,
            children: el.text
          },
          opts,
          parseObject(el.dataset)
        )
      ),
      rootNode || el
    )
  })
}

microlink.version = '__VERSION__'

export default microlink
