import React from "react";
import { TicketProvider } from "./context/TicketContext";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <div className="App min-h-screen bg-[#F7F8FD]">
      <Header />
      <TicketProvider>
        <Main />
      </TicketProvider>
    </div>
  );
};

export default App;
