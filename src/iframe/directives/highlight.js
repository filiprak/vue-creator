import Vue from 'vue'
import store from '../store'
import {REMOVE_COMPONENT, SET_HIGHLIGHT_COMPONENT, SET_SELECTED_COMPONENT} from '../../store/mutations';


const ORIGINAL_STYLE_DATA_KEY = 'vc-original-style'
const HIGHLIGHT_DATA_KEY = 'vc-highlight-data'

let stack = [];

function setElementStyle(el) {
  el[ORIGINAL_STYLE_DATA_KEY] = el.style;
  el.style.outline = '2px solid red'
}

function restoreElementStyle(el) {
  el.style = el[ORIGINAL_STYLE_DATA_KEY]
}

function onMouseEnter(event) {

  stack = stack.map(el => {
    restoreElementStyle(el)
    return el
  })

  setElementStyle(this)

  if (stack.indexOf(this) === -1) {
    stack.push(this)
  }

  store.commit(SET_HIGHLIGHT_COMPONENT, this[HIGHLIGHT_DATA_KEY])
}

function onMouseLeave(event) {
  restoreElementStyle(this)

  stack.pop()

  if (stack.length > 0) {
    const el = stack[stack.length - 1]
    setElementStyle(el)
    store.commit(SET_HIGHLIGHT_COMPONENT, el[HIGHLIGHT_DATA_KEY])
  } else {
    store.commit(SET_HIGHLIGHT_COMPONENT, null)
  }
}

function onMouseDown(event) {
  if (event.button === 1) {
    store.commit(REMOVE_COMPONENT, this[HIGHLIGHT_DATA_KEY])
    event.preventDefault()
    event.stopPropagation()
  } else {
    store.commit(SET_SELECTED_COMPONENT, this[HIGHLIGHT_DATA_KEY])
    event.stopPropagation()
  }
}


Vue.directive('highlight', {
  inserted(el, binding, vnode) {
    el[HIGHLIGHT_DATA_KEY] = binding.value

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
  },
  unbind(el, binding, vnode) {
    el.removeEventListener('mouseenter', onMouseEnter)
    el.removeEventListener('mousedown', onMouseDown)
    el.removeEventListener('mouseleave', onMouseLeave)

    stack = stack.filter(i => i !== el)

    delete el[HIGHLIGHT_DATA_KEY]
  },
})
