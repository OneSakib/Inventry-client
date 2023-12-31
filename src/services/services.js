import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export function loginService(data) {
  if (data !== undefined) {
    return axios.post("/login", data);
  } else {
    console.log("ERRO");
  }
}
export function registerService(data) {
  if (data !== undefined) {
    return axios.post("/register", data);
  } else {
    console.log("ERRO");
  }
}

export function fetchCustomers() {
  return axios.get("/getcustomers");
}

export function deleteCustomer(id) {
  if (id !== undefined) {
    return axios.delete("/delete/" + id);
  } else {
    console.log("id not found");
  }
}
export function generateQrCode(data) {
  if (data !== undefined) {
    return axios.post("/generateqrcode", data);
  } else {
    console.log("ERRO");
  }
}
export function updateQrCodeService(id, data) {
  if (data !== undefined) {
    return axios.put("/updatecustomer/" + id, data);
  } else {
    console.log("ERRO");
  }
}
export function getCustomerService(id) {
  if (id !== undefined) {
    return axios.get("/getcustomer/" + id);
  } else {
    console.log("ERRO");
  }
}
export function dispatchCustomerService(id) {
  if (id !== undefined) {
    return axios.post("/dispatch_customer/" + id);
  } else {
    console.log("ERRO");
  }
}
export function userLoggedIn() {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      resolve(token);
    } else {
      reject("No Token");
    }
  });
}

export function removeToken() {
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
export function setToken(token) {
  return new Promise((resolve, reject) => {
    if (token != undefined) {
      localStorage.setItem("token", token);
      resolve("Set Token");
    } else {
      reject("No Token");
    }
  });
}
