import { lazy, Suspense, useState } from "react";

import "./App.css";
const Stepper = lazy(() => import("./components/Stepper"));

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2 className="headline">Checkout</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Stepper stepperConfig={CHECKOUT_STEPS} />
      </Suspense>
    </>
  );
}

export default App;
