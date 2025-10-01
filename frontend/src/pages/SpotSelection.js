import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { ArrowLeft, MapPin, Car } from "lucide-react";

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
    if (spot.status === 'occupied') return 'bg-red-900/50 border-red-700 text-red-400';
    if (spot.status === 'reserved') return 'bg-yellow-900/50 border-yellow-700 text-yellow-400';
    if (selectedSpot?.id === spot.id) return 'bg-purple-500/80 border-purple-400 text-white';
    return 'bg-secondary border-muted-foreground/50 text-foreground hover:bg-accent cursor-pointer';
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
    <div className="min-h-screen bg-background px-4 py-8">
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
          <h1 className="text-2xl font-bold text-foreground">
            Select Parking Spot
          </h1>
        </div>

        {/* Parking Info Card */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  {parkingInfo.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {parkingInfo.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spot Grid */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
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
                    <Badge className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-600 text-white text-xs">
                      Taken
                    </Badge>
                  )}
                  {spot.status === 'reserved' && (
                    <Badge className="absolute -top-1 -right-1 bg-yellow-500 hover:bg-yellow-500 text-white text-xs">
                      Reserved
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-muted-foreground/50 rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-700 rounded mr-2"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-700 rounded mr-2"></div>
                <span>Reserved</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-400 rounded mr-2"></div>
                <span>Selected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Spot Info */}
        {selectedSpot && (
          <Card className="mb-6 shadow-xl bg-purple-900/30 border-purple-400/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-300 mb-2">Selected Spot:</h3>
              <div className="flex justify-between items-center text-foreground">
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
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition hover:scale-105"
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