import { axisHeight, rowHeight } from './constants';

export function getRowOffset(row: number): number {
  return row * (rowHeight + 1);
}

export  function getRowsTotalHeight(rowsCount: number) {
  return rowsCount * (rowHeight + 1);
}