import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Car, Clock, Star } from "lucide-react";

const SpotSelection = () => {
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);

  const parkingInfo = {
    name: "Alexanderplatz Parking",
    address: "Alexanderplatz 1, 10178 Berlin, Germany",
    distance: "50 meters from you",
    rating: 4.7,
    reviews: 247,
    available: 8
  };

  const spots = [
    { id: "A1", type: "Standard", status: "available", price: 2.5 },
    { id: "A2", type: "Standard", status: "occupied", price: 2.5 },
    { id: "A3", type: "Electric", status: "available", price: 3.0 },
    { id: "A4", type: "Standard", status: "available", price: 2.5 },
    { id: "A5", type: "Disabled", status: "reserved", price: 2.0 },
    { id: "A6", type: "Standard", status: "available", price: 2.5 },
    { id: "B1", type: "Large", status: "available", price: 3.5 },
    { id: "B2", type: "Standard", status: "occupied", price: 2.5 },
    { id: "B3", type: "Electric", status: "available", price: 3.0 },
    { id: "B4", type: "Standard", status: "available", price: 2.5 },
    { id: "B5", type: "Standard", status: "available", price: 2.5 },
    { id: "B6", type: "Large", status: "occupied", price: 3.5 }
  ];

  const handleSelectSpot = (spot) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot);
    }
  };

  const handleContinue = () => {
    if (selectedSpot) {
      navigate("/spot-qr-scanner", { state: { spot: selectedSpot, parking: parkingInfo } });
    }
  };

  const handleBack = () => {
    navigate("/scan-qr");
  };

  const getSpotColor = (spot) => {
    if (spot.status === 'occupied') return 'bg-red-200 border-red-300 text-red-700';
    if (spot.status === 'reserved') return 'bg-yellow-200 border-yellow-300 text-yellow-700';
    if (selectedSpot?.id === spot.id) return 'bg-blue-200 border-blue-500 text-blue-700';
    return 'bg-green-200 border-green-300 text-green-700 hover:bg-green-300 cursor-pointer';
  };

  const getSpotIcon = (type) => {
    switch (type) {
      case 'Electric': return '⚡';
      case 'Disabled': return '♿';
      case 'Large': return '🚛';
      default: return '🚗';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="mr-4"
            data-testid="back-button"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            Select Parking Spot
          </h1>
        </div>

        {/* Parking Info Card */}
        <Card className="mb-8 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {parkingInfo.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {parkingInfo.address}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{parkingInfo.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({parkingInfo.reviews})</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {parkingInfo.available} spots available
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spot Grid */}
        <Card className="mb-8 shadow-xl bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <Car className="h-5 w-5 mr-2" />
              Available Parking Spots
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-3 gap-3">
              {spots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => handleSelectSpot(spot)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-center ${getSpotColor(spot)}`}
                  data-testid={`spot-${spot.id}`}
                >
                  <div className="text-xl mb-1">
                    {getSpotIcon(spot.type)}
                  </div>
                  <div className="font-bold text-sm">
                    {spot.id}
                  </div>
                  <div className="text-xs">
                    {spot.type}
                  </div>
                  <div className="text-xs font-medium mt-1">
                    €{spot.price}/h
                  </div>
                  {spot.status === 'occupied' && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                      Taken
                    </Badge>
                  )}
                  {spot.status === 'reserved' && (
                    <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs">
                      Reserved
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-200 rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-200 rounded mr-2"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-200 rounded mr-2"></div>
                <span>Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-200 rounded mr-2"></div>
                <span>Selected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Spot Info */}
        {selectedSpot && (
          <Card className="mb-6 shadow-xl bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Selected Spot:</h3>
              <div className="flex justify-between items-center">
                <span>Spot {selectedSpot.id} - {selectedSpot.type}</span>
                <span className="font-bold">€{selectedSpot.price}/hour</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        {selectedSpot && (
          <Button 
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition hover:scale-105"
            data-testid="continue-to-spot-qr-button"
          >
            Scan Spot QR Code • {selectedSpot.id}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpotSelection;