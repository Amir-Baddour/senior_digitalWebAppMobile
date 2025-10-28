import axios from "axios";
import endpoints from "./endpoints";

// Create axios with optional JWT
export const makeClient = (jwt) => {
  const client = axios.create({
    headers: { "Content-Type": "application/json" }
  });
  client.interceptors.request.use((cfg) => {
    cfg.headers = cfg.headers || {};
    if (jwt) cfg.headers.Authorization = `Bearer ${jwt}`;
    return cfg;
  });
  return client;
};

// Convenience helpers (use inside screens with the token)
export const api = {
  login: (client, formData) => client.post(endpoints.login, formData),
  register: (client, formData) => client.post(endpoints.register, formData, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }),
  getProfile: (client) => client.get(endpoints.getProfile),
  updateProfile: (client, body) => client.post(endpoints.updateProfile, body),
  getBalancesMap: (client) => client.get(endpoints.getBalances),
  getBalanceLegacy: (client) => client.get(endpoints.getBalance),
  getLimits: (client) => client.get(endpoints.getLimits),
  getVerification: (client) => client.get(endpoints.getVerification),
  deposit: (client, body) => client.post(endpoints.deposit, body),
  withdraw: (client, body) => client.post(endpoints.withdraw, body),
  transfer: (client, body) => client.post(endpoints.transfer, body),
  transactions: (client, qs) => client.get(`${endpoints.transactions}?${qs}`),
  forgot: (client, body) => client.post(endpoints.forgot, body, { headers: { "Content-Type": "multipart/form-data" } }),
  reset: (client, body) => client.post(endpoints.reset, body, { headers: { "Content-Type": "multipart/form-data" } }),
  liveChat: (client, body) => client.post(endpoints.liveChat, body),

  // Assets/Exchange
  wallets: (client) => client.get(endpoints.wallets),
  coinsPage: (client, page) => client.get(`${endpoints.coinsProxy}?page=${page}`),
  priceFor: (client, id) => client.get(`${endpoints.priceProxy}?coin=${encodeURIComponent(id)}`),
  exchange: (client, form) =>
    client.post(endpoints.exchangeProcessor, form, { headers: { "Content-Type": "multipart/form-data" } }),
};
