import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { toast } from "react-toastify";
import { dispatchCustomerService } from "../services/services";
const ScanQrCode = () => {
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState("");
  const [webcam, setWebCam] = useState(false);
  function dataDispatch(id) {
    if (id !== undefined) {
      dispatchCustomerService(id)
        .catch((err) => {
          toast.error("Wrong QR code! try again!");
          setUploadImage("");
        })
        .then(async (res) => {
          if (res !== undefined) {
            toast.success("Inventory dispatched Successfully!");
            navigate("/");
          }
        });
    }
  }
  function onImageChange(event) {
    if (!event.target.files || !event.target.files[0]) return;
    const FR = new FileReader();
    FR.addEventListener("load", function (evt) {
      setUploadImage(evt.target.result);
      QrScanner.scanImage(evt.target.result)
        .then((res) => {
          if (res !== undefined) {
            const result = JSON.parse(res);
            dataDispatch(result.id);
          }
        })
        .catch((error) => {
          toast.error("No QR code found.");
        });
    });
    FR.readAsDataURL(event.target.files[0]);
  }
  function handleWebCam() {
    const video = document.getElementById("qr-video");
    QrScanner.hasCamera()
      .then((res) => {
        toast.success("Scanning start!");
        if (res) {
          const scanner = new QrScanner(
            video,
            (result) => {
              if (result !== undefined) {
                const resu = JSON.parse(result);
                dataDispatch(resu.id);
              }
            },
            (error) => {
              console.log("Errr", error);
            },
            {
              preferredCamera: "environment",
              highlightScanRegion: true,
              highlightCodeOutline: true,
            }
          );
          if (!webcam) {
            scanner.start();
            setWebCam(!webcam);
          } else {
            toast.success("Scanning stopped!");
            scanner.stop();
            setWebCam(!webcam);
          }
        }
      })
      .catch((err) => {
        toast.error("You don't have camera!");
      });
  }
  return (
    <div className="mb-auto w-full p-4">
      <div className="flex mt-6 justify-center gap-32 h-[80vh] flex-wrap">
        {/*Upload QR Code  */}
        <div className="w-[550px] gap-6 text-sm flex justify-center flex-col items-center p-8 shadow-slate-400 shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-blue-800">
            {" "}
            Upload QR Code{" "}
          </h1>
          <div className="w-[400px] h-[400px] border-2">
            {uploadImage ? (
              <img
                src={uploadImage}
                alt="qrimage"
                width="400px"
                height="400px"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <label
              htmlFor="upload-qr"
              className="bg-blue-800 text-white p-3 rounded px-36"
            >
              {" "}
              Upload QR Code{" "}
            </label>
            <input
              onChange={onImageChange}
              type="file"
              accept="image/*"
              className="hidden"
              id="upload-qr"
            />
          </div>
        </div>
        {/* Scan QR Code */}
        <div className="w-[550px] gap-6 text-sm flex justify-center flex-col items-center p-8 shadow-slate-400 shadow-lg pb-4">
          <h1 className="text-2xl font-semibold text-center text-blue-800">
            {" "}
            Scan QR Code{" "}
          </h1>
          <div className="w-[400px] h-[400px] border-2">
            <video id="qr-video"></video>
          </div>
          <div onClick={handleWebCam}>
            <label className="bg-blue-800 text-white p-3 rounded px-36">
              {webcam ? "Disable WebCam" : "Enable WebCam"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQrCode;
