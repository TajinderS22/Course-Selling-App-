import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home/Home";
import Authentication from "./components/Authentication/Authentication";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./app/User/Dashboard";
import AuthenticationCreator from "./app/Creator/AuthenticationCreator";
import CreatorDashBoard from "./app/Creator/CreatorDashBoard";
import CreateCourse from "./app/Creator/CreateCourse";
import BuyCourse from "./components/BuyCourse";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import Error from "./pages/Error";
import CourseInfo from "./pages/CourseInfo";
import EditCourse from "./pages/creator/EditCourse";
import CourseInfoCreator from "./app/Creator/CourseInfoCreator";
import SettingsPage from "./app/User/SettingsPage";
import CreatorSettingsPage from "./app/Creator/CreatorSettingsPage";
import UploadContent from "./app/Creator/UploadContent";
import Learn from "./components/Learning/Learn";
import UserManagement from "./app/Creator/UserManagement/UserManagement";
import CourseUsersInfo from "./app/Creator/UserManagement/CourseUsersInfo";
import Revenue from "./app/Creator/revenue/Revenue";
import Purchases from "./app/User/purchases/Purchases";
import TermsAndConditions from "./components/FooterLinks/TermsAndConditions";
import Contact from "./components/FooterLinks/Contact";
import FAQs from "./components/FooterLinks/FAQs";
import PrivacyPolicy from "./components/FooterLinks/PrivacyPolicy";

const FOOTER_PAGES = [
  "/",
  "/authentication",
  "/courses",
  "/buyCourse",
  "/Aboutus",
  "/course",
  "/creator/authentication",
  "/terms",
  "/contact",
  "/faqs",
  "/privacy",
];

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/authentication",
      element: <Authentication />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/creator/authentication",
      element: <AuthenticationCreator />,
    },
    {
      path: "/creator/dashboard",
      element: <CreatorDashBoard />,
    },
    {
      path: "/creator/create-course",
      element: <CreateCourse />,
    },
    {
      path: "/courses",
      element: <BuyCourse />,
    },
    {
      path: "/buyCourse",
      element: <BuyCourse />,
    },
    {
      path: "/Aboutus",
      element: <AboutUs />,
    },
    {
      path: "/course/:id",
      element: <CourseInfo />,
    },
    {
      path: "/creator/edit/course/:id",
      element: <EditCourse />,
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/creator/course/:id",
      element: <CourseInfoCreator />,
    },
    {
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "/creator/settings",
      element: <CreatorSettingsPage />,
    },
    {
      path: "/creator/course/:id/upload-content",
      element:<UploadContent/>
    },{
      path:"/learn/:id",
      element:<Learn/>
    },{
      path:"/creator/user-management",
      element:<UserManagement/>
    },{
      path:"creator/user-management/:id",
      element:<CourseUsersInfo/>
    },{
      path:"/creator/revenue",
      element:<Revenue/>
    },{
      path:"/user/purchases",
      element:<Purchases/>
    },
    {
      path: "/terms",
      element: <TermsAndConditions />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/faqs",
      element: <FAQs />,
    },
    {
      path: "/privacy",
      element: <PrivacyPolicy />,
    }
  ]);
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const showFooter = FOOTER_PAGES.some(
    (p) => pathname === p || (p.includes("/course") && pathname.startsWith(p))
  );
  return (
    <div className="bg-app text-ink mx-auto min-h-svh font-sans">
      <AppProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AppProvider>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
