import { axisHeight, rowHeight } from './constants';

export function getRowOffset(row: number): number {
  return row * (rowHeight + 1);
}

export  function getViewHeight(rowsCount: number) {
  return axisHeight + rowsCount * (rowHeight + 1);
}