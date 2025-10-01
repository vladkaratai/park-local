import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import QrScanner from 'qr-scanner';

const QRScanner = () => {
  const navigate = useNavigate();
  const [scanned, setScanned] = useState(false);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !scannerRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          if (!scanned) {
            setScanned(true);
            toast.success("Parking lot QR code successfully scanned!");
            scannerRef.current?.stop();
          }
        },
        {
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current.start().catch(err => {
        console.error("Failed to start camera", err);
      });
    }

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
      scannerRef.current = null;
    };
  }, [scanned]);

  const handleContinue = () => {
    navigate("/spot-selection");
  };

  const handleBack = () => {
    navigate("/");
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
            Scanning Parking QR
          </h1>
        </div>

        {/* Scanner Card */}
        <Card className="mb-8 shadow-xl bg-secondary/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              {!scanned ? (
                <>
                  <div className="qr-scanner-box mb-6">
                    <video ref={videoRef} className="qr-video" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Point camera at QR code
                  </h2>
                  <p className="text-muted-foreground">
                    Find the QR code at the parking entrance and scan it.
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-purple-500/10 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-purple-400 mx-auto" />
                  </div>
                  <h2 className="text-xl font-semibold text-purple-400 mb-2">
                    Parking lot found!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Select your parking spot from available spaces.
                  </p>
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 text-lg rounded-xl"
                    data-testid="continue-button"
                  >
                    Select Parking Spot
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">
              💡 How to scan QR code:
            </h3>
            <ul className="text-muted-foreground text-sm space-y-2">
              <li>• Grant camera access if prompted</li>
              <li>• Center the QR code in the frame</li>
              <li>• Wait for automatic recognition</li>
              <li>• Ensure good lighting conditions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;