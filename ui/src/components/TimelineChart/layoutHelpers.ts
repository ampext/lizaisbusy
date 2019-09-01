import { axisHeight, rowHeight } from './constants';

export function getRowOffset(row: number): number {
  return axisHeight + row * (rowHeight + 1);
}

export  function getViewHeight(rowsCount: number) {
  return axisHeight + rowsCount * (rowHeight + 1);
}