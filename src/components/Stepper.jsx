import React, { useRef, useState, useEffect } from "react";

const Stepper = ({ stepperConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepperConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepperConfig.length]);

  if (!stepperConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prev) => {
      if (prev === stepperConfig.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };
  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepperConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepperConfig[currentStep - 1]?.Component;
  return (
    <>
      <div className="stepper">
        {stepperConfig.map((step, idx) => {
          return (
            <div
              ref={(el) => (stepRef.current[idx] = el)}
              key={step.name}
              className={`step ${
                currentStep > idx + 1 || isComplete ? "complete" : ""
              } ${currentStep === idx + 1 ? "active" : ""}`}
            >
              <div className="step-number">{idx + 1}</div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <div style={{textAlign:'center'}}>
        <ActiveComponent />
      </div>

      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === stepperConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Stepper;
