import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Shield } from "lucide-react";

const Penalty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration, parking, spot } = location.state || {};

  const handlePayPenalty = () => {
    navigate("/penalty-payment", { state: { duration, parking, spot } });
  };

  const penaltyAmount = 25.00;
  const originalAmount = duration?.price || 2.50;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-red-500 rounded-full p-4 w-20 h-20 mx-auto mb-4 shadow-lg">
            <AlertTriangle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-red-500 mb-2">
            VIOLATION!
          </h1>
          <p className="text-muted-foreground text-lg">
            Parking time has expired
          </p>
        </div>

        {/* Blocked Status */}
        <Card className="mb-8 shadow-xl bg-secondary border-red-500/50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-red-500 text-white text-lg px-4 py-2 mb-4">
                BLOCKED
              </Badge>
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                Your vehicle is blocked
              </h2>
              <p className="text-muted-foreground">
                To unblock, you need to pay the penalty fee
              </p>
            </div>

            {/* Violation Details */}
            <div className="bg-red-900/30 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Violation type:</span>
                <span className="font-semibold text-red-400">Time exceeded</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Violation time:</span>
                <span className="font-semibold">
                  {new Date().toLocaleString('en-DE')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Spot number:</span>
                <span className="font-semibold">{spot?.id || "A1"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parking Info */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              Parking Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="font-semibold text-foreground mb-1">
                {parking?.name || "Alexanderplatz Parking"}
              </div>
              <div className="text-muted-foreground text-sm">
                {parking?.address || "Alexanderplatz 1, 10178 Berlin, Germany"}
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-foreground">Paid time:</span>
              </div>
              <Badge variant="outline" className="text-purple-400">
                {duration?.time || "1 hour"} (expired)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="mb-8 shadow-xl bg-secondary border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Original payment:</span>
                <span className="font-medium">€{originalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Penalty for exceeding:</span>
                <span className="font-medium text-red-500">€{penaltyAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 border-border">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Additional payment:</span>
                  <div className="flex items-center text-red-500">
                    €{penaltyAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="mb-8 bg-red-900/30 border-red-400/50">
          <CardContent className="p-4">
            <div className="flex items-center text-red-300 mb-2">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">Important Information</span>
            </div>
            <ul className="text-red-400 text-sm space-y-1">
              <li>• Vehicle remains blocked until penalty payment</li>
              <li>• If not paid within 24 hours, penalty increases</li>
              <li>• After payment, unblocking happens automatically</li>
            </ul>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={handlePayPenalty}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition hover:scale-105"
          data-testid="pay-penalty-button"
        >
          Pay Penalty €{penaltyAmount.toFixed(2)}
        </Button>

        {/* Support Info */}
        <Card className="mt-4 bg-blue-900/30 border-blue-400/50">
          <CardContent className="p-4">
            <p className="text-blue-300 text-sm text-center">
              📞 <strong>Support:</strong> +49 30 123-456-78<br />
              Available 24/7
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Penalty;