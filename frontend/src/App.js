import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

import HomePage from "./pages/HomePage";
import QRScanner from "./pages/QRScanner";
import SpotSelection from "./pages/SpotSelection";
import SpotQRScanner from "./pages/SpotQRScanner";
import ParkingSelection from "./pages/ParkingSelection";
import Payment from "./pages/Payment";
import Timer from "./pages/Timer";
import Penalty from "./pages/Penalty";
import PenaltyPayment from "./pages/PenaltyPayment";
import ExitTimer from "./pages/ExitTimer";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan-qr" element={<QRScanner />} />
          <Route path="/spot-selection" element={<SpotSelection />} />
          <Route path="/spot-qr-scanner" element={<SpotQRScanner />} />
          <Route path="/select-parking" element={<ParkingSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/penalty" element={<Penalty />} />
          <Route path="/penalty-payment" element={<PenaltyPayment />} />
          <Route path="/exit-timer" element={<ExitTimer />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;