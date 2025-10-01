import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import QrScanner from 'qr-scanner';

const SpotQRScanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spot, parking } = location.state || {};

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
            toast.success(`Spot ${spot?.id} QR code successfully scanned!`);
            scannerRef.current?.stop();
          }
        },
        {
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current.start().catch(err => console.error(err));
    }

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
      scannerRef.current = null;
    };
  }, [scanned, spot]);

  const handleContinue = () => {
    navigate("/select-parking", { state: { spot, parking } });
  };

  const handleBack = () => {
    navigate("/spot-selection");
  };

  if (!spot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <p>No spot selected. Please go back and select a spot.</p>
          <Button onClick={handleBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

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
            Scan Spot QR Code
          </h1>
        </div>

        {/* Selected Spot Info */}
        <Card className="mb-6 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Selected Spot:</h3>
                <p className="text-blue-600">Spot {spot.id} - {spot.type}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">€{spot.price}/h</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                    Scan the QR code on spot {spot.id}
                  </h2>
                  <p className="text-gray-600">
                    Find the QR code at your selected parking spot and place it in the center
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  </div>
                  <h2 className="text-xl font-semibold text-green-700 mb-2">
                    Spot {spot.id} confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Great! Now select how long you want to park here.
                  </p>
                  <Button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 text-lg rounded-xl"
                    data-testid="continue-button"
                  >
                    Select Parking Duration
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
              📍 Spot Location:
            </h3>
            <div className="flex items-center text-blue-700 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{parking?.name || "Alexanderplatz Parking"} - Spot {spot.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpotQRScanner;