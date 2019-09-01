export function getRowOffset(row: number, rowHeight: number): number {
  return row * (rowHeight + 1);
}

export  function getRowsTotalHeight(rowsCount: number, rowHeight: number) {
  return rowsCount * (rowHeight + 1);
}