import { combineReducers } from 'redux'
import dungeon from './dungeon'
import hero from './hero'

export default combineReducers({
  dungeon, hero
})