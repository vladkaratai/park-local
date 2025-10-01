import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Star } from "lucide-react";

const ParkingSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spot, parking } = location.state || {};

  const [selectedDuration, setSelectedDuration] = useState(null);

  const parkingInfo = parking || {
    name: "Alexanderplatz Parking",
    address: "Alexanderplatz 1, 10178 Berlin, Germany",
    distance: "50 meters from you",
    rating: 4.7,
    reviews: 247,
    available: 8
  };

  const selectedSpot = spot || {
    id: "A1",
    type: "Standard",
    price: 2.5
  };

  const durations = [
    { id: 1, time: "30 minutes", price: 1.25, popular: false },
    { id: 2, time: "1 hour", price: 2.50, popular: true },
    { id: 3, time: "2 hours", price: 4.50, popular: false },
    { id: 4, time: "3 hours", price: 6.75, popular: false },
    { id: 5, time: "5 hours", price: 11.25, popular: false },
    { id: 6, time: "All day", price: 18.00, popular: false }
  ];

  const handleSelectDuration = (duration) => {
    setSelectedDuration(duration);
  };

  const handleContinue = () => {
    if (selectedDuration) {
      navigate("/payment", {
        state: {
          duration: selectedDuration,
          parking: parkingInfo,
          spot: selectedSpot
        }
      });
    }
  };

  const handleBack = () => {
    navigate("/spot-qr-scanner", { state: { spot: selectedSpot, parking: parkingInfo } });
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
            Select Duration
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
                <p className="text-muted-foreground text-sm mb-2">
                  {parkingInfo.address}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{parkingInfo.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({parkingInfo.reviews})</span>
                  </div>
                  <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                    Spot {selectedSpot.id} - {selectedSpot.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duration Selection */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Clock className="h-5 w-5 mr-2" />
              Select parking duration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-3">
              {durations.map((duration) => (
                <div
                  key={duration.id}
                  onClick={() => handleSelectDuration(duration)}
                  className={`parking-card relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDuration?.id === duration.id
                    ? "border-purple-500 bg-purple-900/30 shadow-md"
                    : "border-border bg-secondary hover:border-muted-foreground/50"
                    }`}
                  data-testid={`duration-${duration.id}`}
                >
                  {duration.popular && (
                    <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs">
                      Popular
                    </Badge>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {duration.time}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        until {new Date(Date.now() + 3600000).toLocaleTimeString('en-DE', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-foreground">
                        €{duration.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        €{selectedSpot.price}/hour
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        {selectedDuration && (
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition hover:scale-105"
            data-testid="continue-to-payment-button"
          >
            Proceed to Payment • €{selectedDuration.price.toFixed(2)}
          </Button>
        )}

        {/* Info */}
        <Card className="mt-4 bg-red-900/30 border-red-400/50">
          <CardContent className="p-4">
            <p className="text-red-300 text-sm">
              ⚠️ <strong>Notice:</strong> After parking time expires, a penalty fee of €25.00 will be charged
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParkingSelection;