import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomerService, updateQrCodeService } from "../services/services";
import { showLoader, hideLoder } from "../helpers";
export default function EditQrCode() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  useEffect(() => {
    showLoader();
    getCustomerService(customerId)
      .catch((err) => {})
      .then(async (res) => {
        if (res !== undefined) {
          let data = await res.data;
          console.log("CALED", data);
          setName(data.name);
          setDate(data.dateReceived);
          setQuantity(data.quantityReceived);
        }
      })
      .finally(() => {
        hideLoder();
      });
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    let data = {
      name,
      date,
      quantity,
    };
    updateQrCodeService(customerId, data)
      .catch((err) => {})
      .then(async (res) => {
        if (res !== undefined) {
          toast.success("Customer data successfully Updated!");
          navigate("/");
        }
      });
  };

  return (
    <div className="mb-auto flex mt-6 justify-center ">
      <div className="w-[340px] gap-2 text-sm flex flex-col p-8 shadow-slate-400 shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-800">
          {" "}
          Generate QR Code{" "}
        </h1>
        <div className="mt-6">Name</div>
        <form method="POST" onSubmit={submit}>
          <select
            onChange={(e) => setName(e.target.value)}
            required
            name="customers"
            className="border border-gray-400 mb-3 w-full p-1 px-2"
            value={name}
          >
            <option hidden> Select (C1-C5) </option>
            <option value="C1"> C1 </option>
            <option value="C2"> C2 </option>
            <option value="C3"> C3 </option>
            <option value="C4"> C4 </option>
            <option value="C5"> C5 </option>
          </select>
          <div>Date</div>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="date"
            max="2025-12-28"
            type="date"
            required
            className="border border-gray-400 w-full mt-3 mb-3 p-1 px-2"
          />
          <div> Quantity </div>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-400 w-full mt-3 p-1 px-2"
            type="number"
            min="1"
            max="999999999999999"
          />
          <button
            type="submit"
            className="bg-blue-800 text-white mt-6 p-2 rounded w-full"
          >
            Generate QR Code
          </button>
        </form>
      </div>
    </div>
  );
}
