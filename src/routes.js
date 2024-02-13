
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import SettlementPage from "views/examples/SettlementPage.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Icons from "views/examples/Icons.js";
import DMT from "views/examples/DMT/Dmt";
import DmtRecipient from "views/examples/DMT/DmtRecipient"
import DmtFinal from "views/examples/DMT/DMTFinalSubmit"
import RegisterBank from "components/SubComponents/RegisterBank";
import CreditCardBillPaymentOptionOne from "components/Sidebar/CreditCardBillPaymentOptionOne";
import Recharge from "views/examples/Recharge/Recharge";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin", 
  },
  {
    path: "/dmt",
    name: "DMT",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/DMT_icon.png",
    component: <DMT/>,
    layout: "/admin",
  },
  {
    path: "/dmt-recipient",
    name: "DMT-RECIPIENT",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/DMT_icon.png",
    component: <DmtRecipient/>,
    layout: "/admin",
  },
  {
    path: "/dmt-submit",
    name: "DMT-FINAL",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/DMT_icon.png",
    component: <DmtFinal/>,
    layout: "/admin",
  },
  {
    name: "AEPS",
  },
  {
    path: "/mATM",
    name: "mATM",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/micro.png",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/bbps",
    name: "BBPS",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/ic_bbps.png",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/recharge",
    name: "RECHARGE",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Recharge />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/travel",
    name: "TRAVEL",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/DMT_icon.png",
    component: <Profile />,
    layout: "/admin",
  },

  {
    path: "/settlement",
    name: "SETTLEMENT",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/settlementnew.png",
    component: <SettlementPage />,
    layout: "/admin",
  },
  {
    path: "/offer",
    name: "OFFER",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/yes.png",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/insurance",
    name: "INSURANCE",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/ic_insurance.png",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/loans",
    name: "LOANS",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/cms",
    name: "CMS",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/cms.png",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "BILLING",
    icon: "ni ni-key-25 text-info",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/g2c",
    name: "G2C",
    icon: "ni ni-circle-08 text-pink",
    component: <Profile />,
    layout: "/auth",
  },
  {
    path: "/cms",
    name: "CMS",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/cms.png",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/irctc",
    name: "IRCTC",
    icon: "ni ni-key-25 text-info",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/cc",
    name: "CC PAYMENT",
    icon: "https://portal.bankit.in:9090/Demo/wl_icons/10002/ic_water.png",
    component: <CreditCardBillPaymentOptionOne />,
    layout: "/admin",
  },
  
];
export default routes;
