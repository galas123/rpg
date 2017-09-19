import React, {
  Component
} from 'react';
import {MOVE_DOWN_HERO} from '../constants';

export const moveDownHero = () => {
  return {
    type   : MOVE_DOWN_HERO
  };
}