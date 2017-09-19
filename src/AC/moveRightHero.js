import React, {
  Component
} from 'react';
import {MOVE_RIGHT_HERO} from '../constants';

export const moveRightHero = () => {
  return {
    type   : MOVE_RIGHT_HERO
  };
}