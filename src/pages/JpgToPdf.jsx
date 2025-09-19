import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

function JpgToPdf() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Constants
  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
  const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100 MB

  // Friendly error strings
  const ERRORS = {
    TOO_MANY: "Oops, you can only upload up to 10 files at once.",
    TOO_BIG: "Oops, one of your files is too large (max 25 MB each).",
    TOTAL_TOO_BIG: "Oops, the total size of your files is too big (max 100 MB).",
    NO_FILES: "Oops, please choose at least one JPG file to continue.",
    WRONG_TYPE: "Oops, only JPG/JPEG images are supported right now.",
    GENERIC: "Oops, something went wrong. Please try again.",
  };

  // Compress helper
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
            URL.revokeObjectURL(img.src);
            resolve(blob);
          },
          "image/jpeg",
          0.7
        );
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) {
      setError(ERRORS.NO_FILES);
      return;
    }
    if (files.length > MAX_FILES) {
      setError(ERRORS.TOO_MANY);
      return;
    }
    if (files.some((f) => f.size > MAX_FILE_SIZE)) {
      setError(ERRORS.TOO_BIG);
      return;
    }
    const totalSize = files.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setError(ERRORS.TOTAL_TOO_BIG);
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
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(ERRORS.GENERIC);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 text-center">
      <h2 className="text-2xl font-semibold mb-4">Convert JPG to PDF</h2>
      <p className="text-gray-700 mb-6">
        Upload up to 10 files (total max 100MB). Each file ≤25MB. Files will be
        compressed automatically.
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
