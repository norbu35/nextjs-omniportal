/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactNode, useRef, useState } from 'react';
import styles from './Box.module.css';
import {
  makeMoveable,
  DraggableProps,
  ResizableProps,
  Draggable,
  Resizable,
} from 'react-moveable';
import MoveableHelper from 'moveable-helper';

type Props = {
  children: ReactNode;
  heading: string;
};

const Moveable = makeMoveable<DraggableProps & ResizableProps>([
  Draggable,
  Resizable,
]);

function Box({ heading, children }: Props): JSX.Element {
  const [helper] = useState(() => {
    return new MoveableHelper();
  });
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={targetRef} className={styles.container}>
        <h1 className={styles.heading}>{heading}</h1>
        {children}
      </div>
      <Moveable
        target={targetRef}
        draggable={true}
        resizable={true}
        onDragStart={helper.onDragStart}
        onDrag={helper.onDrag}
        onResizeStart={helper.onResizeStart}
        onResize={helper.onResize}
      />
    </>
  );
}
export { Box };
export default Box;
