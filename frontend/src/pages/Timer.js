import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Progress from "@/components/ui/progress";
import { Clock, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Timer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duration, parking, spot } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(20);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isExpired) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsExpired(true);
      setTimeout(() => {
        navigate("/penalty", { state: { duration, parking, spot } });
      }, 2000);
    }
  }, [timeLeft, isExpired, navigate, duration, parking, spot]);

  const handleExtendTime = () => {
    navigate("/select-parking", { state: { spot, parking } });
  };

  const handleEndSession = () => {
    toast.success("Parking session ended successfully. Thank you!");
    navigate("/");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((20 - timeLeft) / 20) * 100;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Active Parking Session
          </h1>
          <p className="text-muted-foreground">
            Your parking time is running out
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className={`timer-pulse bg-gradient-to-br ${timeLeft > 5 ? 'from-blue-500 to-purple-600' : 'from-red-500 to-pink-600'
                } rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center`}>
                <Clock className="h-16 w-16 text-white" />
              </div>

              {!isExpired ? (
                <>
                  <div className="text-5xl font-bold mb-2 text-foreground">
                    {formatTime(timeLeft)}
                  </div>
                  <p className={`text-lg ${timeLeft > 5 ? 'text-purple-400' : 'text-red-400'}`}>
                    {timeLeft > 5 ? 'Parking time expiring' : 'Warning! Little time left'}
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

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress
                value={progressPercentage}
                className="h-3 bg-muted"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Start</span>
                <span>{progressPercentage.toFixed(0)}%</span>
                <span>End</span>
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
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-semibold">{parking?.name || "Alexanderplatz Parking"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Spot number:</span>
              <span className="font-semibold">{spot?.id || "A1"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Session started:</span>
              <span className="font-semibold">
                {new Date().toLocaleTimeString('en-DE', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status:</span>
              <div className="flex items-center">
                {!isExpired ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-1" />
                    <span className="text-purple-400 font-semibold">Active</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500 font-semibold">Expired</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!isExpired && (
          <div className="space-y-4">
            <Button
              onClick={handleExtendTime}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl"
              data-testid="extend-time-button"
            >
              Extend Time
            </Button>
            <Button
              onClick={handleEndSession}
              variant="outline"
              className="w-full border-border text-foreground py-3 rounded-xl"
              data-testid="end-session-button"
            >
              End Session
            </Button>
          </div>
        )}

        {/* Warning */}
        <Card className={`mt-4 ${isExpired ? 'bg-red-900/30 border-red-400/50' : 'bg-red-900/20 border-red-400/30'}`}>
          <CardContent className="p-4">
            <p className={`${isExpired ? 'text-red-300' : 'text-red-400'} text-sm`}>
              {isExpired ? (
                <>🚨 <strong>Penalty!</strong> Parking time has expired. You will be redirected to pay the penalty fee.</>
              ) : (
                <>⚠️ <strong>Notice:</strong> After time expires, a €25.00 penalty will be charged</>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timer;