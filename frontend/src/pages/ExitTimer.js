import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Progress from "@/components/ui/progress";
import { Clock, MapPin, CheckCircle, ShieldCheck, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ExitTimer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration, parking, spot } = location.state || {};
  const GRACE_PERIOD_SECONDS = 10;
  const [timeLeft, setTimeLeft] = useState(GRACE_PERIOD_SECONDS);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!isExpired) {
      setIsExpired(true);
      toast.error("Exit time has expired. A new penalty has been issued.");

      setTimeout(() => {
        navigate("/penalty", { state: { duration, parking, spot } });
      }, 2000);
    }
  }, [timeLeft, isExpired, navigate, duration, parking, spot]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((GRACE_PERIOD_SECONDS - timeLeft) / GRACE_PERIOD_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`${!isExpired ? 'bg-purple-500' : 'bg-red-500'} rounded-full p-4 w-20 h-20 mx-auto mb-4 shadow-lg`}>
            {!isExpired ? <ShieldCheck className="h-12 w-12 text-white" /> : <AlertTriangle className="h-12 w-12 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {!isExpired ? "Penalty Paid" : "Exit Time Expired!"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {!isExpired ? "Your vehicle is unblocked." : "A new penalty will be issued."}
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className={`bg-gradient-to-br ${!isExpired ? 'from-blue-500 to-purple-600' : 'from-red-500 to-pink-600'} rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center`}>
                <Clock className="h-16 w-16 text-white" />
              </div>

              {!isExpired ? (
                <>
                  <div className="text-5xl font-bold mb-2 text-foreground">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-lg text-purple-400">
                    Time to exit the parking lot
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl font-bold mb-2 text-red-500">
                    00:00
                  </div>
                  <div className="flex items-center justify-center text-red-500 text-lg">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Time expired!
                  </div>
                </>
              )}
            </div>
            <Progress value={progressPercentage} className={`h-3 ${!isExpired ? '' : 'bg-red-200'}`} />
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
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-semibold">{parking?.name || "Alexanderplatz Parking"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Spot number:</span>
              <span className="font-semibold">{spot?.id || "A1"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status:</span>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-purple-400 mr-1" />
                <span className="text-purple-400 font-semibold">Unblocked</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full border-border text-foreground py-3 rounded-xl"
        >
          Back to Home Page
        </Button>
      </div>
    </div>
  );
};

export default ExitTimer;