import {getPref, setPref} from './helper';

import {preferencesKeys} from '../preferences';

export const get = async () => {
  const token = await getPref(preferencesKeys.TOKEN);
  return token;
};

export const set = async (token: any) => {
  setPref(preferencesKeys.TOKEN, token);
};
