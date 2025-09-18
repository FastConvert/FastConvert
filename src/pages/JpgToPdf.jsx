import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

function JpgToPdf() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Resmi compress eden yardımcı fonksiyon (canvas)
  const compressImage = (file) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 1600;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(img.src); // bellek temizliği
            resolve(blob);
          },
          "image/jpeg",
          0.7 // kalite
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);

    // limit kontrolü (10 resim)
    if (files.length > 10) {
      setError("Max 10 resim yükleyebilirsiniz.");
      return;
    }
    if (files.some((f) => f.size > 10 * 1024 * 1024)) {
      setError("Her resim en fazla 10MB olabilir.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const compressedBlob = await compressImage(file);
        const arrayBuffer = await compressedBlob.arrayBuffer();
        const img = await pdfDoc.embedJpg(arrayBuffer);

        const page = pdfDoc.addPage([img.width, img.height]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: img.width,
          height: img.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
      a.click();
      URL.revokeObjectURL(url); // PDF linki serbest bırak
    } catch (err) {
      console.error(err);
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 text-center">
      <h2 className="text-2xl font-semibold mb-4">Convert JPG to PDF</h2>
      <p className="text-gray-700 mb-6">
        Upload your JPG files (max 10, each ≤10MB). Files will be compressed
        before PDF export.
      </p>

      <input
        type="file"
        accept="image/jpeg"
        multiple
        onChange={handleFiles}
        className="hidden"
        id="jpgInput"
      />
      <label
        htmlFor="jpgInput"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        {loading ? "Processing..." : "Select JPG Files"}
      </label>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

export default JpgToPdf;
