import "./App.css";
import "./pages/style.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./Dashboard/Dashboard";
import Kyc from "./Dashboard/Kyc";
import Addassets from "./Dashboard/Addassets";
import Transction from "./Dashboard/Transction";
import AddAddress from "./Dashboard/Add-Address";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Domainverification from "./Dashboard/Domainverification";
import Key from "./Dashboard/Key";
import Summary from "./Dashboard/Summary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile, logout } from "./pages/utils/api_functions";
import Myinformation from "./Dashboard/ManageAccountDashboard/Myinformation";
import FAauthentication from "./Dashboard/ManageAccountDashboard/2FA-authentication";
import LoginHIstory from "./Dashboard/ManageAccountDashboard/LoginHIstory";
import Myassets from "./Dashboard/Myassets";
import Transfer from "./Dashboard/Transfer";
import Invoice from "./Dashboard/Invoice";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import {
  bsc,
  mainnet,
  optimism,
  fantom,
  polygon,
  avalanche,
  arbitrum,
  bscTestnet,
} from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { authLogout, setprofile } from "./pages/redux/reducers/authReducer";
import Transactionfee from "./Dashboard/Transactionfee";
import CreateInvoice from "./Dashboard/Create_Invoice";
import Forgetpassword from "./pages/Forgetpassword";
import Convert from "./Dashboard/Convert";
import Onchainfee from "./Dashboard/Onchainfee";
import Withdrawal from "./Dashboard/Withdrawal";
import AddFunds from "./pages/AddFunds";
import Pay from "./pages/Pay";
import IpWhitelist from "./pages/IpWhitelist";
function Router() {
  const { islogin, token } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (islogin) {
      getProfile(token).then((res) => {
        if (res.status == 200) {
          dispatch(setprofile({ data: res.profile }));
        } else if (res.status == 404) {
          dispatch(authLogout());
          navigate("../login", { replace: true });
        }
      });
    }
  }, [islogin]);

  var mbscTestnet = {
    id: 97,
    name: "Binance Smart Chain Testnet",
    network: "bsc-testnet",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "tBNB",
    },
    rpcUrls: {
      public: { http: ["https://bsc-testnet.publicnode.com"] },
      default: { http: ["https://bsc-testnet.publicnode.com"] },
    },
    blockExplorers: {
      etherscan: { name: "BscScan", url: "https://testnet.bscscan.com" },
      default: { name: "BscScan", url: "https://testnet.bscscan.com" },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 17422483,
      },
    },
    testnet: true,
  };
  const { chains, publicClient } = configureChains(
    [bsc, mainnet, optimism, fantom, polygon, avalanche, arbitrum, mbscTestnet],

    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({
          projectId: "46c67b1c9a0e0c884eebdff6a7e0ecb3",
          chains,
        }),
        trustWallet({ projectId: "46c67b1c9a0e0c884eebdff6a7e0ecb3", chains }),
        coinbaseWallet({ chains, appName: "My RainbowKit App" }),
        rainbowWallet({
          projectId: "46c67b1c9a0e0c884eebdff6a7e0ecb3",
          chains,
        }),
        walletConnectWallet({
          projectId: "46c67b1c9a0e0c884eebdff6a7e0ecb3",
          chains,
        }),
      ],
    },
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <>
      {/* <Header/> */}

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <Routes>
            <Route exact path="/Invoice-id" element={<CreateInvoice />}></Route>
            <Route
              exact
              path="/CreateAccount"
              element={!islogin ? <CreateAccount /> : <Navigate to="/" />}
            ></Route>
            <Route
              exact
              path="/login"
              element={!islogin ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              exact
              path="/ForgetPassword"
              element={<Forgetpassword />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={!islogin ? <Signup /> : <Navigate to="/" />}
            ></Route>
            <Route
              exact
              path="/"
              element={islogin ? <Dashboard /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/kyc"
              element={islogin ? <Kyc /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/Crypto-gateway"
              element={islogin ? <Addassets /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/Transcations"
              element={islogin ? <Transction /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/wallet"
              element={islogin ? <AddAddress /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/key"
              element={islogin ? <Key /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/summary"
              element={islogin ? <Summary /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/my-information"
              element={islogin ? <Myinformation /> : <Navigate to="/login" />}
            ></Route>

            <Route
              exact
              path="/2FA-authentication"
              element={
                islogin ? <FAauthentication /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              exact
              path="/Login-history"
              element={islogin ? <LoginHIstory /> : <Navigate to="/login" />}
            ></Route>

            <Route
              exact
              path="/Domain-verification"
              element={
                islogin ? <Domainverification /> : <Navigate to="/login" />
              }
            ></Route>
            <Route
              exact
              path="/my-assets"
              element={islogin ? <Myassets /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/Transfer"
              element={islogin ? <Transfer /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/Withdrawal"
              element={islogin ? <Withdrawal /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/invoice"
              element={islogin ? <Invoice /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/TransactionFee"
              element={islogin ? <Transactionfee /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/OnchainFee"
              element={islogin ? <Onchainfee /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/Convert"
              element={islogin ? <Convert /> : <Navigate to="/login" />}
            ></Route>

            <Route
              exact
              path="/addfunds"
              element={islogin ? <AddFunds /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/ip-whitelisting"
              element={islogin ? <IpWhitelist /> : <Navigate to="/login" />}
            ></Route>
            <Route
              exact
              path="/pay/:order_id"
              element={islogin ? <Pay /> : <Navigate to="/login" />}
            ></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default Router;
