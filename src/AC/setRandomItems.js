import React, {
  Component
} from 'react';
import {SET_RANDOM_ITEMS} from '../constants';

export const setRandomItems = (items) => ({
  type   : SET_RANDOM_ITEMS,
});