import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import FAB from "./components/FAB";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Team from "./components/Team";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";

// Main single page
function HomePage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Products />
        <Projects />
        <Team />
      </main>
      <Footer />
      <FAB />
    </div>
  );
}

// About page wrapper with shared layout
function AboutRoute() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <AboutPage />
      <Footer />
    </div>
  );
}

// Contact page wrapper with shared layout
function ContactRoute() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <ContactPage />
      <Footer />
    </div>
  );
}

// Services page wrapper with shared layout
function ServicesRoute() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <ServicesPage />
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutRoute,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactRoute,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesRoute,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  contactRoute,
  servicesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
