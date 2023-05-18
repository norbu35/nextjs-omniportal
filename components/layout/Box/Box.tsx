/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode, useState } from 'react';
import { Rnd } from 'react-rnd';
import styles from './Box.module.scss';
import { WidgetState } from '../types';

type Props = {
  heading: string;
  state: WidgetState;
  children: ReactNode;
  isUnlocked: boolean;
};

function Box({
  heading,
  state: initialState,
  isUnlocked,
  children,
}: Props): JSX.Element {
  const [state, setState] = useState<WidgetState>(initialState);

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
        minWidth={state.minWidth}
        minHeight={state.minHeight}
        onDragStop={(_e, d) => {
          setState((prevState) => ({
            ...prevState,
            position: {
              x: d.x,
              y: d.y,
            },
          }));
        }}
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
