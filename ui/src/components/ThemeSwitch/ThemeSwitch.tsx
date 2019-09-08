import React, { useCallback } from 'react';

import './ThemeSwitch.scss'

export type ThemeType = 'light' | 'dark';

interface Props {
  theme: ThemeType;
  onChange?: (theme: ThemeType) => void;
}

function ThemeSwitch(props: Props) {
  const {
    theme,
    onChange,
  } = props;

  const onSwitchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked ? 'dark' : 'light');
  }, []);

  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        checked={theme === 'dark'}
        onChange={onSwitchChange}
      />
      <span className="switch__slider" />
    </label>
  );
}

export default React.memo(ThemeSwitch);