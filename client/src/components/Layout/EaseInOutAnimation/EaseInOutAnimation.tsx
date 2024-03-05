import { ReactNode } from "react";
import { Transition } from "react-transition-group";
import "./EaseInOutAnimation.scss";

const EaseInOutAnimation = ({
  children,
  menuOpen,
}: {
  children: ReactNode;
  menuOpen: boolean;
}) => {
  const duration = 1000;

  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: "translateX(-100%)",
  };

  const transitionStyles = {
    entering: { transform: "translateX(0)" },
    entered: { transform: "translateX(0)" },
    exiting: { transform: "translateX(-300%)" },
    exited: { transform: "translateX(-300%)" },
  };

  return (
    <div className="transition-container">
      <Transition in={menuOpen} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className="rtg-transition"
          >
            {children}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default EaseInOutAnimation;
