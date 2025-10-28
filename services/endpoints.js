// Keep one place to swap between local/prod like your web version did
const ORIGIN = "http://localhost"; // change for device testing to your LAN IP
const ROOT = "/digital-wallet-plateform";
const BASE = `${ORIGIN}${ROOT}/wallet-server/user/v1`;

export default {
  login: `${BASE}/auth/login.php`,
  register: `${BASE}/auth/register.php`,
  google: `${BASE}/auth/oauth_google.php`,        // if you add mobile google later
  getProfile: `${BASE}/get_profile.php`,
  updateProfile: `${BASE}/update_profile.php`,
  getBalance: `${BASE}/get_balance.php`,          // legacy
  getBalances: `${BASE}/get_balances.php`,        // map
  getLimits: `${BASE}/get_limits_usage.php`,
  getVerification: `${BASE}/get_verification_status.php`,
  verifyUpload: `${BASE}/verification.php`,
  deposit: `${BASE}/deposit.php`,
  withdraw: `${BASE}/withdraw.php`,
  transfer: `${BASE}/transfer.php`,
  transactions: `${BASE}/get_transactions.php`,
  liveChat: `${BASE}/live_chat.php`,
  qr: `${ORIGIN}${ROOT}/wallet-server/utils/generate_qr.php`,
  // Assets / Exchange proxies
  coinsProxy: `${BASE}/coins_proxy.php`,
  priceProxy: `${BASE}/price_proxy.php`,
  exchangeProcessor: `${BASE}/exchange_processor.php`,
  wallets: `${BASE}/get_wallets.php`,
  // Password reset
  forgot: `${BASE}/request_password_reset.php`,
  reset: `${BASE}/reset_password.php`
};
