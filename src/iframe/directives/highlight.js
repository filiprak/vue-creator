import Vue from 'vue'
import store from '../store'
import {SET_HIGHLIGHT_COMPONENT} from '../../store/mutations';


const HIGHLIGHT_DATA_KEY = 'vc-highlight-data'

let stack = [];

function onMouseOver(event) {
  //this.style.outline = '1px solid red'

  if (stack.indexOf(this) === -1) {
    stack.push(this)
  }

  store.commit(SET_HIGHLIGHT_COMPONENT, this[HIGHLIGHT_DATA_KEY])
}

function onMouseOut(event) {
  this.removeAttribute('style')

  stack.pop()

  if (stack.length > 0) {
    const el = stack[stack.length - 1]
    store.commit(SET_HIGHLIGHT_COMPONENT, el[HIGHLIGHT_DATA_KEY])
  } else {
    store.commit(SET_HIGHLIGHT_COMPONENT, null)
  }
}


Vue.directive('highlight', {
  inserted(el, binding, vnode) {
    el[HIGHLIGHT_DATA_KEY] = binding.value

    el.addEventListener('mouseenter', onMouseOver)
    el.addEventListener('mouseleave', onMouseOut)
  },
  unbind(el, binding, vnode) {
    el.removeEventListener('mouseenter', onMouseOver)
    el.removeEventListener('mouseleave', onMouseOut)

    stack = stack.filter(i => i !== el)

    delete el[HIGHLIGHT_DATA_KEY]
  },
})
