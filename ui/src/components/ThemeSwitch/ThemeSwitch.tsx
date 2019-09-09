import React, { useCallback } from 'react';

import './ThemeSwitch.scss'

interface Props {
  isDark: boolean;
  onChange?: (isDark: boolean) => void;
}

function ThemeSwitch(props: Props) {
  const {
    isDark,
    onChange,
  } = props;

  const onSwitchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked);
  }, []);

  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        checked={isDark}
        onChange={onSwitchChange}
      />
      <span className="switch__slider" />
    </label>
  );
}

export default React.memo(ThemeSwitch);