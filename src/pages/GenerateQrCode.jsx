import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQrCodeService } from "../services/services";
import { toast } from "react-toastify";
const GenerateQrCode = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (      
      name.length > 0 &&
      date.length > 0 &&
      quantity.length > 0
    ) {
      let data = {
        name,
        date: changeDateFormat(date),
        quantity,
      };
      generateQrCodeService(data)
        .catch((err) => {})
        .then(async (res) => {
          toast.success("Customer data successfully added!");
          navigate("/");
        });
    } else {
      toast.error("Invalid Entry!");
    }
  };
  function changeDateFormat(date) {
    const updateDate = new Date(date);
    return `${updateDate.getDate()}-${
      updateDate.getMonth() + 1
    }-${updateDate.getFullYear()}`;
  }
  function getMaxDate() {
    return `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
  }
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
            <option disabled value="">
              Select (C1-C5)
            </option>
            <option value="C1"> C1 </option>
            <option value="C2"> C2 </option>
            <option value="C3"> C3 </option>
            <option value="C4"> C4 </option>
            <option value="C5"> C5 </option>
          </select>
          <div>Date</div>
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            name="date"
            max={getMaxDate()}
            type="date"
            required
            className="border border-gray-400 w-full mt-3 mb-3 p-1 px-2"
          />
          <div> Quantity </div>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-400 w-full mt-3 p-1 px-2"
            type="number"
            min="1"
            max="999999999999999"
            value={quantity}
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
};

export default GenerateQrCode;
