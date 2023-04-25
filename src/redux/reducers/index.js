import { combineReducers } from 'redux';
import {
  COUNTDOWN,
  DISABLE_ANSWERS,
  ENABLE_ANSWERS,
  PLAYER, SAVE_PERSONAL_URL, SUM_SCORE } from '../actions';

const INITIAL_STATE_PLAYER = {
  gravatarEmail: '',
  gravatarImage: '',
  name: '',
  score: 0,
  assertions: 0,
};

const INITIAL_STATE_GAME = {
  personalUrl: '',
  isAnswersDisabled: true,
  timeRemaining: '0',
};

const player = (state = INITIAL_STATE_PLAYER, action) => {
  const { score } = state;
  const { type, payload } = action;
  switch (type) {
  case PLAYER:
    return {
      ...state,
      gravatarImage: payload.image,
      gravatarEmail: payload.email,
      name: payload.name,
      score: 0,
    };
  case SUM_SCORE:
    return {
      ...state,
      score: (Number(score) + payload),
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

const game = (state = INITIAL_STATE_GAME, action) => {
  const { type, payload } = action;
  switch (type) {
  case ENABLE_ANSWERS:
    return {
      ...state,
      isAnswersDisabled: false,
      timeRemaining: '30',
    };
  case DISABLE_ANSWERS:
    return {
      ...state,
      isAnswersDisabled: true,
      timeRemaining: 'Acabou o tempo!',
    };
  case COUNTDOWN:
    return {
      ...state,
      timeRemaining: payload,
    };
  case SAVE_PERSONAL_URL:
    return {
      ...state,
      personalUrl: payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player, game });

export default rootReducer;
