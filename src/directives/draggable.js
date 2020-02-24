import Vue from 'vue'
import store from '../store/store'
import {SET_DRAGGING} from '../store/mutations';

const DRAG_DATA_KEY = 'vc-drag-data'


function onDragStart(event) {
  store.commit(SET_DRAGGING, this[DRAG_DATA_KEY])
}

function onDragEnd(event) {
  store.commit(SET_DRAGGING, false)
}

window.addEventListener('mouseup', onDragEnd)

Vue.directive('draggable', {
  inserted(el, binding, vnode) {
    el[DRAG_DATA_KEY] = binding.value ? binding.value : null;

    el.addEventListener('mousedown', onDragStart)
  },
  unbind(el, binding, vnode) {
    el.removeEventListener('mousedown', onDragStart)

    el.removeAttribute('style')
    delete el[DRAG_DATA_KEY];
  },
})
