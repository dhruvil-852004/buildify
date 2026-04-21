import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import AboutSnippet from "./components/AboutSnippet";
import FAB from "./components/FAB";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Team from "./components/Team";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PartnerPage from "./pages/PartnerPage";
import PortfolioPage from "./pages/PortfolioPage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminServices from "./pages/admin/AdminServices";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminTeam from "./pages/admin/AdminTeam";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const };

function PageWrapper({ children }: { children: React.ReactNode }) {
  const routerState = useRouterState();
  const key = routerState.location.pathname;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Public Routes ────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <AboutSnippet />
          <Projects />
          <Team />
        </main>
        <Footer />
        <FAB />
      </div>
    </PageWrapper>
  );
}

function AboutRoute() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <AboutPage />
        <Footer />
      </div>
    </PageWrapper>
  );
}

function ContactRoute() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <ContactPage />
        <Footer />
      </div>
    </PageWrapper>
  );
}

function ServicesRoute() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <ServicesPage />
        <Footer />
      </div>
    </PageWrapper>
  );
}

function PartnerRoute() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <PartnerPage />
        <Footer />
      </div>
    </PageWrapper>
  );
}

function TeamRoute() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <TeamPage />
        <Footer />
      </div>
    </PageWrapper>
  );
}

function PortfolioRoute() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <PortfolioPage />
        <Footer />
      </div>
    </PageWrapper>
  );
}

// ─── Admin Routes ────────────────────────────────────────────────────────────

function AdminDashboardRoute() {
  return (
    <AdminLayout
      breadcrumb={[{ label: "Admin", path: "/admin" }, { label: "Dashboard" }]}
    >
      <AdminDashboard />
    </AdminLayout>
  );
}

function AdminProjectsRoute() {
  return (
    <AdminLayout
      breadcrumb={[{ label: "Admin", path: "/admin" }, { label: "Projects" }]}
    >
      <AdminProjects />
    </AdminLayout>
  );
}

function AdminServicesRoute() {
  return (
    <AdminLayout
      breadcrumb={[{ label: "Admin", path: "/admin" }, { label: "Services" }]}
    >
      <AdminServices />
    </AdminLayout>
  );
}

function AdminTeamRoute() {
  return (
    <AdminLayout
      breadcrumb={[{ label: "Admin", path: "/admin" }, { label: "Team" }]}
    >
      <AdminTeam />
    </AdminLayout>
  );
}

function AdminSubmissionsRoute() {
  return (
    <AdminLayout
      breadcrumb={[
        { label: "Admin", path: "/admin" },
        { label: "Submissions" },
      ]}
    >
      <AdminSubmissions />
    </AdminLayout>
  );
}

// ─── Route Tree ───────────────────────────────────────────────────────────────

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

const partnerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner",
  component: PartnerRoute,
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team",
  component: TeamRoute,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: PortfolioRoute,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboardRoute,
});

const adminProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/projects",
  component: AdminProjectsRoute,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/services",
  component: AdminServicesRoute,
});

const adminTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/team",
  component: AdminTeamRoute,
});

const adminSubmissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/submissions",
  component: AdminSubmissionsRoute,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  contactRoute,
  servicesRoute,
  partnerRoute,
  teamRoute,
  portfolioRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminProjectsRoute,
  adminServicesRoute,
  adminTeamRoute,
  adminSubmissionsRoute,
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
