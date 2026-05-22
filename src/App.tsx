import { useEffect, useState } from "react";
import { AppShell } from "./components/layout";
import { normalizePath } from "./routes";
import { AuthPage } from "./pages/AuthPage";
import { CandidateHomePage } from "./pages/candidate/CandidateHomePage";
import { CandidateAiPage, CandidateApplicationsPage, CandidateProfilePage } from "./pages/candidate/CandidatePages";
import {
  EmployerCandidatesPage,
  EmployerCompanyPage,
  EmployerDashboardPage,
  EmployerJobsPage,
  EmployerPipelinePage,
} from "./pages/employer/EmployerPages";
import { AdminDashboardPage, AdminModerationPage, AdminUsersFinancePage } from "./pages/admin/AdminPages";

export function App() {
  const [path, setPath] = useState(() => {
    const legacyPage = new URLSearchParams(window.location.search).get("page");
    const legacyMap: Record<string, string> = {
      "candidate-explore": "/candidate",
      "candidate-profile": "/candidate/profile",
      "candidate-applications": "/candidate/applications",
      "candidate-ai": "/candidate/ai",
      "employer-dashboard": "/employer",
      "employer-jobs": "/employer/jobs",
      "employer-candidates": "/employer/candidates",
      "employer-pipeline": "/employer/pipeline",
      "employer-company": "/employer/company",
      "admin-dashboard": "/admin",
      "admin-moderation": "/admin/moderation",
      "admin-users-finance": "/admin/users-finance",
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

  return (
    <AppShell path={path} navigate={navigate}>
      <RouteSwitch path={path} navigate={navigate} />
    </AppShell>
  );
}

function RouteSwitch({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  switch (path) {
    case "/candidate":
      return <CandidateHomePage navigate={navigate} />;
    case "/candidate/profile":
      return <CandidateProfilePage />;
    case "/candidate/applications":
      return <CandidateApplicationsPage />;
    case "/candidate/ai":
      return <CandidateAiPage />;
    case "/employer":
      return <EmployerDashboardPage />;
    case "/employer/jobs":
      return <EmployerJobsPage />;
    case "/employer/candidates":
      return <EmployerCandidatesPage />;
    case "/employer/pipeline":
      return <EmployerPipelinePage />;
    case "/employer/company":
      return <EmployerCompanyPage />;
    case "/admin":
      return <AdminDashboardPage />;
    case "/admin/moderation":
      return <AdminModerationPage />;
    case "/admin/users-finance":
      return <AdminUsersFinancePage />;
    default:
      return <CandidateHomePage navigate={navigate} />;
  }
}
