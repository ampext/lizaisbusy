import React from 'react';

import './TimelineDate.css';

interface Props {
  date: Date,
  width: number,
  height: number,
}

function TimelineDate(props: Props) {
  const {
    width,
    height,
  } = props;

  return <rect x={0} y={0} width={width} height={height} />;
}


export default React.memo(TimelineDate);