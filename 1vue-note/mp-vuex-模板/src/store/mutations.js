import {
  INDEX,
  INDEX1
} from './mutation-types.js'

export default {
  [INDEX] (state, v) {
    console.log(v,'V')
    state.indexData = v
  },
  [INDEX1] (state, v) {
    state.indexData1 = v
    console.log(state.indexData1, 'state.indexData1')
    
  }
}
