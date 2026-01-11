
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";

// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PersistGate
//       loading={<div>Loading...</div>}   // 🔥 wait till rehydration
//       persistor={persistor}
//     >
//       <App />
//       <ToastContainer position="top-right" autoClose={3000} />
//     </PersistGate>
//   </Provider>
// );

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔥 TEMPORARY – clear old persisted redux data
// persistor.purge();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate
      loading={<div>Loading...</div>}
      persistor={persistor}
    >
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </PersistGate>
  </Provider>
);
