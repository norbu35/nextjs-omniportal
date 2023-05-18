/* eslint-disable import/no-extraneous-dependencies */
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import styles from './Box.module.scss';
import { WidgetState, WidgetStates } from '../types';

type Props = {
  name: string
  state: WidgetStates;
  setStates: Dispatch<SetStateAction<WidgetStates>>
  children: ReactNode;
  isUnlocked: boolean;
};

function Box({
  name,
  state: initialState,
  setStates,
  isUnlocked,
  children,
}: Props): JSX.Element {
  const [state, setState] = useState<WidgetState>(initialState[name]);

  useEffect(() => setStates((prevState) => ({
    ...prevState,
    [name]: state,
  })), [state, setStates, name]);

  const heading = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className={styles.container}>
      <Rnd
        position={{
          x: state.position.x,
          y: state.position.y,
        }}
        size={{
          width: state.size.width,
          height: state.size.height,
        }}
        maxWidth={state.maxWidth}
        minWidth={state.minWidth}
        maxHeight={state.maxHeight}
        minHeight={state.minHeight}
        disableDragging={isUnlocked ? false : true}
        onDragStop={(_e, d) => {
          setState((prevState) => ({
            ...prevState,
            position: {
              x: d.x,
              y: d.y,
            },
          }));
        }}
        enableResizing={isUnlocked ? true : false}
        onResizeStop={(_e, _direction, ref, _delta, _position) => {
          setState((prevState) => ({
            ...prevState,
            size: {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
            },
          }));
        }}
        bounds={'section'}
      >
        {isUnlocked && <div className={styles.titleBar}>{heading}</div>}
        {children}
      </Rnd>
    </div>
  );
}

export { Box };
export default Box;
