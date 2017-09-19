import React, {
  Component
} from 'react';
import {MOVE_UP_HERO} from '../constants';

export const moveUpHero = () => {
  console.log('AC moveUpHero');
  return {
    type   : MOVE_UP_HERO
  };
}
