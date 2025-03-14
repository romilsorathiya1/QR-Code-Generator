import { useState } from "react";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://example.com");
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState("#000000");
  const [qrBackground, setQrBackground] = useState("#ffffff");
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    if (!url) return;

    setIsGenerating(true);

    try {
      const dataURL = await QRCode.toDataURL(url, {
        width: qrSize,
        margin: 1,
        color: {
          dark: qrColor,
          light: qrBackground,
        },
      });

      setQrCodeDataURL(dataURL);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL) return;

    const link = document.createElement("a");
    link.href = qrCodeDataURL;
    link.download = `${url}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">QR Code Generator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Settings Card */}
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">QR Code Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">URL or Text</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter URL or text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium">QR Code Size: {qrSize}px</label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  step="10"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">QR Color</label>
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>

                <div>
                  <label className="block font-medium">Background</label>
                  <input
                    type="color"
                    value={qrBackground}
                    onChange={(e) => setQrBackground(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </div>

              <button
                onClick={generateQRCode}
                className="w-full bg-blue-500 text-white py-2 rounded"
                disabled={isGenerating || !url}
              >
                {isGenerating ? "Generating..." : "Generate QR Code"}
              </button>
            </div>
          </div>

          {/* QR Code Preview Card */}
          <div className="p-6 border rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">QR Code Preview</h2>

            {qrCodeDataURL ? (
              <div className="flex flex-col items-center">
                <img src={qrCodeDataURL} alt="Generated QR Code" width={qrSize} height={qrSize} className="border p-2"/>
                <button
                  onClick={downloadQRCode}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                  disabled={!qrCodeDataURL}
                >
                  Download QR Code
                </button>
              </div>
            ) : (
              <p className="text-gray-500">QR code preview will appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
