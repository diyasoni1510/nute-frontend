// const url = "https://link.merchant.nute.io/api";
const url = "http://localhost:5009/api";
const controller = new AbortController();
const signal = controller.signal;

export function sendEmailOtp(email, password) {
  return fetch(`${url}/register-user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function verifyOTP(email, mobile, otp) {
  return fetch(`${url}/verify-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email, mobile, otp }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function verifyAuthOTP(email, mobile, otp, otp1, otp2) {
  return fetch(`${url}/verify-auth-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email, mobile, otp: otp, otp1: otp1, otp2: otp2 }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function sendEmail(email) {
  return fetch(`${url}/sendEmail`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function verifyForgetOtp(email, otp) {
  return fetch(`${url}/verify-email-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email, otp }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function loginUser(email, mobile, password) {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      mobile: mobile,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function loginGoogle(email) {
  return fetch(`${url}/loginGoogle`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function loginEmail(email, password) {
  return fetch(`${url}/loginWithEmail`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function userProfile(email, phoneNumber) {
  return fetch(`${url}/get-profile-info`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email, phoneNumber }),
    signal: signal,
  })
    .then((d) => {
      return d.json();
    })
    .catch((e) => e);
}

export function panVerify(pan_no, name, type, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/kyc/verify-pan`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({
      pan_no,
      name,
      type,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function panBVerify(pan_no, type, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/kyc/verify-bpan`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({
      pan_no,
      type,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function sendAADHAROTPMobile(aadhar_no, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/kyc/send-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({
      aadhar_no,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function verifyAADHAROTPMobile(client_id, otp, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/kyc/verify-adhar`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({ client_id, otp }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function updateAssetsUser(data, action, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/update-user-assets`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({ data: data, action: action }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getAssetsUser(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-user-assets`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getHistory(data, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/history`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify(data),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getTotal(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-total-deposit`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function userAddress(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-address`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function addWallet(token, symbol) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/add-wallet`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({ symbol: symbol }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function updateUserAddress(wallet_address, chainId, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/update-user-address`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({ wallet_address: wallet_address, chainId: chainId }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function deleteUserAddress(wallet_address, otp, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/delete-user-address`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({ wallet_address: wallet_address, otp: otp }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function updateDomain(data, domain_provider, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/update-domain`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({
      domain: data.domain,
      name: data.ownerName,
      value: data.verificationCode,
      domain_provider: domain_provider,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function deleteDomain(token, domain) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/delete-domain`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({
      domain: domain,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getAssets() {
  return fetch(`${url}/get-assests`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getAdminAssets() {
  return fetch(`${url}/get-invoice-assets`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function accountDetails(account_number, ifsc_code, token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/account-verification`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    body: JSON.stringify({
      account_number,
      ifsc_code,
    }),
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function createApiKey(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/create-api-key`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getProfile(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-profile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getwallet(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-wallet-data`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getKeysData(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-api-key`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getDomainData(token) {
  let auth_token = "Baerer " + token;
  return fetch(`${url}/get-domain`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Authorization: auth_token,
    },
    signal: signal,
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function socialLogin(access_token) {
  return fetch(`${url}/login-social`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      access_token: access_token,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function setGoogleAuth(token) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/set-google-authentication`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function sendOTP(token, email, action = "") {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/sendOTP`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      email: email,
      action: action,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function verifyOTPEmail(token, status, otp, action = "") {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/verifyOTPEmail`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      status: status,
      otp: otp,
      action: action,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function setGoogleAuthOTP(token, state, otp, action) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/set-google-authentication-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      status: state,
      otp,
      action,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function setNewPassword(token, password, confirm_password) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/set-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      password,
      confirm_password,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function updateNewPassword(email, password, confirm_password) {
  return fetch(`${url}/update-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
      confirm_password,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function loginhistory(token) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/login-history`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function transerWallet(token, wallet_address, transfer_data) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/withdrawal-coin`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      wallet_address: wallet_address,
      transfer_data: transfer_data,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function withdrawWallet(token, symbol, wallet_address, otp, amount) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/withdraw`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      symbol: symbol,
      wallet_address: wallet_address,
      otp: otp,
      doller_amount: amount,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function transerWalletWeb3(
  token,
  wallet_address,
  hash,
  symbol,
  transfer_data
) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/transfer-web3`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify({
      wallet_address: wallet_address,
      hash: hash,
      symbol: symbol,
      transfer_data: transfer_data,
    }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function createInvoice(token, data) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/invoice`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    body: JSON.stringify(data),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getInvoiceOrder(order_id, symbol) {
  return fetch(`${url}/get-invoice`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ order_id, symbol }),
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function checkInvoicePayment(token) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/update-payment`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function logout(cb) {
  localStorage.removeItem("nute-token");
  localStorage.removeItem("islogin");
  cb();
}

export function payAmount(token, user_id, amount) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/pay-amount?user_id=${user_id}&amount=${amount}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getUserAccess(token, user_id) {
  let auth_token = "Bearer " + token;
  return fetch(`${url}/get-user-access?user_id=${user_id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      authorization: auth_token,
    },
    signal: signal,
  })
    .then((res) => res.json())
    .catch((e) => e);
}

// export function getWalletAddress(keys, symbol, order_id) {
//   return fetch(
//     `${url}/fetch-address?keys=${keys}&symbol=${symbol}&order_id=${order_id}`
//   )
//     .then((res) => res.json())
//     .catch((e) => e);
// }

export async function getWalletAddress(keys, symbol, order_id,network) {
  const origin = window.location.href;
  
  const currenntIp = await getCurrentIP();

  return fetch(
    `${url}/fetch-address?keys=${keys}&symbol=${symbol}&order_id=${order_id}&network=${network}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Origin": origin,
        "IP": currenntIp.ip, 
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => e);
}

async function getCurrentIP() {
  const response = await fetch("https://api64.ipify.org?format=json");
  return response.json();
}



export function checkTransaction(wallet_address, order_id, slug) {
  return fetch(
    `${url}/check-transaction?wallet_address=${wallet_address}&order_id=${order_id}&slug=${slug}`
  )
    .then((res) => res.json())
    .catch((e) => e);
}
