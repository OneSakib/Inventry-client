import React, { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { showLoader, hideLoder } from "../helpers";
import {
  fetchCustomers,
  deleteCustomer,
  userLoggedIn,
} from "../services/services";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  function fetchEntries() {
    showLoader();
    fetchCustomers()
      .catch((err) => {})
      .then(async (res) => {
        if (res !== undefined) {
          setUser(await res.data);
        }
      })
      .finally(() => {
        hideLoder();
      });
  }
  useEffect(() => {
    fetchEntries();
  }, []);
  function confirmDelteCustomer(id) {
    userLoggedIn()
      .then((res) => {
        confirmAlert({
          title: "Confirm to delete?",
          message: "Are you sure to delete this Customer?",
          closeOnEscape: true,
          closeOnClickOutside: true,
          keyCodeForClose: [8, 32],
          buttons: [
            {
              label: "Yes",
              onClick: () => handledeleteCustomer(id),
            },
            {
              label: "No",
            },
          ],
        });
      })
      .catch((er) => {
        toast.error("Please login before Delete!");
        navigate("/login");
      });
  }
  const handledeleteCustomer = async (id) => {
    if (id !== undefined) {
      deleteCustomer(id)
        .catch((err) => {})
        .then(async (res) => {
          toast.success("Customer has been deleted!");
          fetchEntries();
        });
    }
  };
  const qrCodeDownload = (id) => {
    const svg = document.getElementById(id);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = id;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  function handleEdit(id) {
    userLoggedIn()
      .then((res) => {
        navigate("/editqrcode/" + id);
      })
      .catch((er) => {
        toast.error("Please login before Edit!");
        navigate("/login");
      });
  }
  return (
    <div className="border rounded-md border-[#11009E] p-10 px-14 mx-8 mb-auto">
      <table className="w-[1300px]">
        <thead>
          <tr className="flex flex-row text-[#11009E] justify-between items-center mb-6">
            <th>Name</th>
            <th>Date Received/Quantity</th>
            <th>Date Dispatched/Quantity</th>
            <th>Pending Items</th>
            <th>Status</th>
            <th>QR Code(Click to download) </th>
            <th>Admin Panel </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={index}
                className="flex flex-row justify-between items-center mb-6"
              >
                <td>{user.name} </td>
                <td>
                  {user.dateReceived}/{user.quantityReceived}
                </td>
                <td>
                  {user.dateDispatched && user.quantityDispatched
                    ? user.dateDispatched + "/" + user.quantityDispatched
                    : "-----------------------------"}
                </td>
                <td>{user.pendingItems}</td>
                <td>{user.status ? "Compelete" : "Pending"}</td>
                <td onClick={() => qrCodeDownload(user._id)}>
                  <QRCode
                    id={user._id}
                    value={JSON.stringify({
                      id: user._id,
                      name: user.name,
                      date: { received_date: user.dateReceived },
                      quantity: {
                        received_quantity: user.quantityReceived,
                      },
                    })}
                    size={120}
                  />
                </td>
                <td className="flex gap-4 cursor-pointer">
                  <Pencil
                    onClick={() => handleEdit(user._id)}
                    strokeWidth={3}
                  />
                  <Trash
                    onClick={(e) => confirmDelteCustomer(user._id)}
                    strokeWidth={3}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
