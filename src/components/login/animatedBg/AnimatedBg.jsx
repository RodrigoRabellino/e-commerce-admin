import "./animatedBg.css";

const AnimatedBg = ({ children }) => {
  return (
    <div className="animated__bg" style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
};

export default AnimatedBg;
