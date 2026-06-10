import { Routes, Route } from "react-router-dom";

import NotificationsPage from "./page/NotificationsPage";
import PriorityInboxPage from "./page/PriorityInboxPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<NotificationsPage />}
      />

      <Route
        path="/priority"
        element={<PriorityInboxPage />}
      />
    </Routes>
  );
}

export default App;