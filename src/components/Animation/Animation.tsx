import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Animation.module.scss";

function Animation({ in: inProp, children }: { in: boolean; children?: any }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={inProp}
      nodeRef={ref}
      unmountOnExit
      appear
      timeout={1000}
      classNames={styles}
    >
      <div ref={ref}>{children}</div>
    </CSSTransition>
  );
}

export default Animation;
