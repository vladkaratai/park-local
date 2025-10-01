import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
            Scanning Parking QR
          </h1>
        </div>

        {/* Scanner Card */}
        <Card className="mb-8 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              {!scanned ? (
                <>
                  <div className="qr-scanner-box mb-6">
                    <video ref={videoRef} className="qr-video" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Point camera at QR code
                  </h2>
                  <p className="text-gray-600">
                    Find the QR code at the parking entrance and scan it.
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  </div>
                  <h2 className="text-xl font-semibold text-green-700 mb-2">
                    Parking lot found!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Select your parking spot from available spaces.
                  </p>
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 text-lg rounded-xl"
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
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-800 mb-3">
              💡 How to scan QR code:
            </h3>
            <ul className="text-blue-700 text-sm space-y-2">
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