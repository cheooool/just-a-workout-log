import moment, { Moment } from 'moment';
import { atom, selector } from 'recoil';

export const selectedDateState = atom<Moment>({
  key: 'selectedDateState',
  default: moment(),
});

export const selectFormattedDate = selector<string>({
  key: 'selectFormattedDate',
  get: ({ get }) => {
    return get(selectedDateState).format('YYYYMMDD');
  },
});
