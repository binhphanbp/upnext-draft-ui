import { useEffect, useState } from "react";
import { AppShell } from "./components/layout";
import { normalizePath } from "./routes";
import { AuthPage } from "./pages/AuthPage";
import { CandidateHomePage } from "./pages/candidate/CandidateHomePage";
import {
  EmployerAnalyticsPage,
  EmployerCandidatesPage,
  EmployerCompanyPage,
  EmployerDashboardPage,
  EmployerInterviewsPage,
  EmployerJobsPage,
  EmployerPipelinePage,
  EmployerTalentPoolPage,
  EmployerTeamPage,
} from "./pages/employer/EmployerPages";
import { EmployerCheckoutPage } from "./pages/employer/EmployerCheckoutPage";
import {
  AdminAuditPage,
  AdminDashboardPage,
  AdminModerationPage,
  AdminRolesPage,
  AdminSalesPage,
  AdminSeoPage,
  AdminUsersFinancePage,
} from "./pages/admin/AdminPages";

export function App() {
  const [path, setPath] = useState(() => {
    const legacyPage = new URLSearchParams(window.location.search).get("page");
    const legacyMap: Record<string, string> = {
      "candidate-explore": "/candidate",
      "candidate-profile": "/candidate/profile",
      "candidate-applications": "/candidate/applications",
      "candidate-ai": "/candidate/ai",
      "candidate-saved": "/candidate/saved",
      "candidate-companies": "/candidate/companies",
      "candidate-salary": "/candidate/salary",
      "candidate-messages": "/candidate/messages",
      "candidate-settings": "/candidate/settings",
      "employer-dashboard": "/employer",
      "employer-jobs": "/employer/jobs",
      "employer-candidates": "/employer/candidates",
      "employer-talent-pool": "/employer/talent-pool",
      "employer-pipeline": "/employer/pipeline",
      "employer-interviews": "/employer/interviews",
      "employer-team": "/employer/team",
      "employer-analytics": "/employer/analytics",
      "employer-company": "/employer/company",
      "admin-dashboard": "/admin",
      "admin-moderation": "/admin/moderation",
      "admin-users-finance": "/admin/users-finance",
      "admin-roles": "/admin/roles",
      "admin-seo": "/admin/seo",
      "admin-sales": "/admin/sales",
      "admin-audit": "/admin/audit",
      gateway: "/login",
    };
    return normalizePath(legacyPage ? legacyMap[legacyPage] ?? window.location.pathname : window.location.pathname);
  });

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(nextPath: string) {
    const normalized = normalizePath(nextPath);
    window.history.pushState({}, "", normalized);
    setPath(normalized);
  }

  if (path === "/login" || path === "/register" || path === "/auth") {
    return <AuthPage initialMode={path === "/register" ? "register" : "login"} navigate={navigate} />;
  }

  if (path.startsWith("/candidate") || path === "/") {
    return <CandidateHomePage path={path} navigate={navigate} />;
  }

  return (
    <AppShell path={path} navigate={navigate}>
      <RouteSwitch path={path} navigate={navigate} />
    </AppShell>
  );
}

function RouteSwitch({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  if (path.startsWith("/employer/checkout")) {
    return <EmployerCheckoutPage path={path} navigate={navigate} />;
  }

  switch (path) {
    case "/candidate":
      return <CandidateHomePage path={path} navigate={navigate} />;
    case "/candidate/profile":
    case "/candidate/applications":
    case "/candidate/saved":
    case "/candidate/companies":
    case "/candidate/salary":
    case "/candidate/messages":
    case "/candidate/ai":
    case "/candidate/settings":
      return <CandidateHomePage path={path} navigate={navigate} />;
    case "/employer":
      return <EmployerDashboardPage />;
    case "/employer/jobs":
      return <EmployerJobsPage />;
    case "/employer/candidates":
      return <EmployerCandidatesPage />;
    case "/employer/talent-pool":
      return <EmployerTalentPoolPage />;
    case "/employer/pipeline":
      return <EmployerPipelinePage />;
    case "/employer/interviews":
      return <EmployerInterviewsPage />;
    case "/employer/team":
      return <EmployerTeamPage />;
    case "/employer/analytics":
      return <EmployerAnalyticsPage />;
    case "/employer/company":
      return <EmployerCompanyPage />;
    case "/admin":
      return <AdminDashboardPage />;
    case "/admin/moderation":
      return <AdminModerationPage />;
    case "/admin/users-finance":
      return <AdminUsersFinancePage />;
    case "/admin/roles":
      return <AdminRolesPage />;
    case "/admin/seo":
      return <AdminSeoPage />;
    case "/admin/sales":
      return <AdminSalesPage />;
    case "/admin/audit":
      return <AdminAuditPage />;
    default:
      return <CandidateHomePage path={path} navigate={navigate} />;
  }
}
