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
  ]);
  return (
    <div className="max-w-[1920px] bg-slate-300 mx-auto">
      <AppProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AppProvider>
      <Footer />
    </div>
  );
}

export default App;
