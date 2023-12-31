import axios from "axios";

axios.defaults.baseURL = "https://inventry-server-a3qn.onrender.com/api";

// Auth
export function loginService(data) {
  return axios.post("/login", data);
}
export function registerService(data) {
  return axios.post("/register", data);
}
export function userLoggedInService() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      resolve(token);
    } else {
      reject("No Token");
    }
  });
}

export function removeTokenService() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      resolve("Removed");
    } else {
      reject("No Token");
    }
  });
}
export function setTokenService(token) {
  return new Promise((resolve, reject) => {
    if (token !== undefined) {
      localStorage.setItem("token", token);
      resolve("Set Token");
    } else {
      reject("No Token");
    }
  });
}

// Crud Inventry

export function fetchCustomersService() {
  return axios.get("/getcustomers");
}

export function deleteCustomerService(id) {
  return axios.delete("/delete/" + id);
}
export function generateQrCodeService(data) {
  return axios.post("/generateqrcode", data);
}
export function updateQrCodeService(id, data) {
  return axios.put("/updatecustomer/" + id, data);
}
export function getCustomerService(id) {
  return axios.get("/getcustomer/" + id);
}
export function dispatchCustomerService(id) {
  return axios.post("/dispatch_customer/" + id);
}
