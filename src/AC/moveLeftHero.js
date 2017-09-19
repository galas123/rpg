import React, {
  Component
} from 'react';
import {MOVE_LEFT_HERO} from '../constants';

export const moveLeftHero = () => {
  return {
    type   : MOVE_LEFT_HERO
  };
}