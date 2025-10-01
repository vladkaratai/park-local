import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Badge from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Shield, AlertTriangle, MapPin } from "lucide-react";
import { toast } from "sonner";

const PenaltyPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration, parking, spot } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const penaltyAmount = 25.00;
  const originalAmount = duration?.price || 2.50;

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: "💳" },
    { id: "google", name: "Google Pay", icon: "🌐" },
    { id: "paypal", name: "PayPal", icon: "💙" },
    { id: "crypto", name: "Crypto", icon: "₿" },
    { id: "binance", name: "Binance Pay", icon: "🔶" }
  ];

  const handlePayment = () => {
    setLoading(true);
    const toastId = toast.loading("Processing penalty payment...");

    setTimeout(() => {
      setLoading(false);
      toast.success("Penalty successfully paid! Vehicle is unblocked.", {
        id: toastId,
      });
      navigate("/exit-timer", { state: { duration, parking, spot } });
    }, 2500);
  };

  const handleBack = () => {
    navigate("/penalty", { state: { duration, parking, spot } });
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
            Pay Penalty
          </h1>
        </div>

        {/* Penalty Alert */}
        <Card className="mb-8 shadow-xl bg-red-900/30 border-red-500/50">
          <CardContent className="p-6">
            <div className="flex items-center text-red-400 mb-3">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">Penalty Payment</span>
            </div>
            <p className="text-red-400/80 mb-4">
              Your vehicle is blocked. After successful penalty payment, automatic unblocking will occur.
            </p>
            <Badge className="bg-red-500 text-white">
              Urgent payment required
            </Badge>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              Violation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="font-semibold text-foreground mb-1">
                {parking?.name || "Alexanderplatz Parking"}
              </div>
              <div className="text-muted-foreground text-sm mb-2">
                {parking?.address || "Alexanderplatz 1, 10178 Berlin, Germany"} • Spot {spot?.id || "A1"}
              </div>
              <div className="text-red-500 text-sm font-medium">
                Parking time exceeded
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Paid earlier:</span>
                <span className="font-medium">€{originalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Penalty:</span>
                <span className="font-medium text-red-500">€{penaltyAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Additional payment:</span>
                <div className="flex items-center text-red-500">
                  €{penaltyAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Payment Method Selection */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${paymentMethod === method.id
                    ? "border-blue-500 bg-blue-900/30"
                    : "border-border hover:border-muted-foreground/50"
                    }`}
                  data-testid={`penalty-payment-method-${method.id}`}
                >
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {method.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="mt-2"
                    defaultValue="1234 5678 9012 3456"
                    data-testid="penalty-card-number-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="mt-2"
                      defaultValue="12/25"
                      data-testid="penalty-expiry-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="mt-2"
                      defaultValue="123"
                      data-testid="penalty-cvv-input"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder name</Label>
                  <Input
                    id="cardName"
                    placeholder="JOHN MUELLER"
                    className="mt-2"
                    defaultValue="JOHN MUELLER"
                    data-testid="penalty-card-name-input"
                  />
                </div>
              </div>
            )}

            {/* Other payment method placeholders */}
            {paymentMethod !== "card" && (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Connect with {paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                <p className="text-sm mt-2">This will redirect to the payment provider</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="mb-8 bg-purple-900/20 border-purple-400/30">
          <CardContent className="p-4">
            <div className="flex items-center text-purple-300">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-medium">Secure payment</span>
            </div>
            <p className="text-purple-400 text-sm mt-2">
              Your data is protected with 256-bit SSL encryption
            </p>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-70"
          data-testid="pay-penalty-final-button"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Unblocking...
            </div>
          ) : (
            <>Pay Penalty €{penaltyAmount.toFixed(2)}</>
          )}
        </Button>

        {/* Warning */}
        <Card className="mt-4 bg-red-900/20 border-red-400/30">
          <CardContent className="p-4">
            <p className="text-red-400 text-sm">
              ⚡ <strong>Notice:</strong> After successful payment, vehicle will be unblocked within 2-3 minutes
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PenaltyPayment;