import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, MapPin, Clock, Shield } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  const handleScanQR = () => {
    navigate("/scan-qr");
  };

  const handleMapClick = () => {
    navigate("/spot-selection")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-4 shadow-lg">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-full h-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            PARK LOCAL
          </h1>
          <p className="text-gray-600 text-lg">
            Smart parking across Germany
          </p>
        </div>

        <Card className="mb-8 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-2 h-[250px]">
            <img src="/map_with_pins.png" className="w-full h-full block rounded object-cover cursor-pointer" onClick={handleMapClick} />
          </CardContent>
        </Card>

        {/* Main Action Button */}
        <Card className="mb-8 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Ready to Park?
              </h2>
              <p className="text-gray-600">
                Find the QR code at the parking entrance and scan it
              </p>
            </div>

            <Button
              onClick={handleScanQR}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition hover:scale-105"
              data-testid="scan-qr-button"
            >
              <QrCode className="h-6 w-6 mr-2" />
              Scan Parking QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-sm opacity-90">Parking Lots</div>
              </div>
              <div>
                <div className="text-2xl font-bold">35,892</div>
                <div className="text-sm opacity-90">Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9⭐</div>
                <div className="text-sm opacity-90">Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;