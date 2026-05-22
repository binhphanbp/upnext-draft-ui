import { useEffect, useState } from "react";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, Github, KeyRound, MailCheck, Sparkles, UserCheck } from "lucide-react";
import { upnextLogo } from "../brand";
import { roleHome } from "../routes";
import { AuthNotice } from "../components/ui";
import type { Role } from "../types";

type AuthMode = "login" | "register";
type AuthStage = "email" | "verify";

type PublicAuthRole = "candidate" | "employer";

const roleLabels: Record<PublicAuthRole, string> = {
  candidate: "Ứng viên",
  employer: "Nhà tuyển dụng",
};

const roleDescriptions: Record<PublicAuthRole, string> = {
  candidate: "Tìm việc, CV và lịch phỏng vấn",
  employer: "Đăng tin, lọc CV và pipeline",
};

const sampleEmails: Record<PublicAuthRole, string> = {
  candidate: "khoa.nguyen@email.com",
  employer: "talent@nexa.vn",
};

const roleIcons: Record<PublicAuthRole, React.ElementType> = {
  candidate: UserCheck,
  employer: BriefcaseBusiness,
};

const publicAuthRoles: PublicAuthRole[] = ["candidate", "employer"];

export function AuthPage({
  initialMode,
  navigate,
}: {
  initialMode: AuthMode;
  navigate: (path: string) => void;
}) {
  const [role, setRole] = useState<PublicAuthRole>(() => {
    const savedRole = localStorage.getItem("upnext-role") as Role | null;
    return savedRole === "employer" ? "employer" : "candidate";
  });
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [stage, setStage] = useState<AuthStage>("email");
  const [email, setEmail] = useState(sampleEmails[role]);
  const [otp, setOtp] = useState(["8", "4", "9", "2", "", ""]);

  useEffect(() => {
    setMode(initialMode);
    setStage("email");
  }, [initialMode]);

  useEffect(() => {
    localStorage.setItem("upnext-role", role);
    setEmail(sampleEmails[role]);
  }, [role]);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setStage("email");
    navigate(nextMode === "login" ? "/login" : "/register");
  }

  function submitAuth() {
    if (stage === "email") {
      setStage("verify");
      return;
    }
    navigate(roleHome[role]);
  }

  const RoleIcon = roleIcons[role];
  const isLogin = mode === "login";

  return (
    <main className="auth-screen">
      <section className="auth-brand-panel">
        <button className="auth-back" onClick={() => navigate("/candidate")}>
          <ArrowLeft size={16} />
          Back to jobs
        </button>

        <div className="auth-logo">
          <img src={upnextLogo.wordmark} alt="UpNext" />
        </div>

        <div className="auth-hero-copy">
          <span className="eyebrow">Passwordless IT recruitment</span>
          <h1>{isLogin ? "Đăng nhập nhanh bằng mã email" : "Tạo tài khoản tuyển dụng đáng tin cậy"}</h1>
          <p>
            {isLogin
              ? "UpNext dùng Email OTP một lần để xác thực. Không mật khẩu, toàn bộ xác thực ở cùng một màn hình và vào đúng workspace theo vai trò."
              : "Candidate có thể tạo hồ sơ tìm việc ngay. Nhà tuyển dụng cần email công ty và thông tin xác thực trước khi đăng tin."}
          </p>
        </div>

        <div className="auth-proof-grid">
          <div><strong>96%</strong><span>CV match cao nhất</span></div>
          <div><strong>1.2k</strong><span>CV trong talent bank</span></div>
          <div><strong>98%</strong><span>Email delivery ready</span></div>
        </div>

        <div className="auth-benefits">
          <p><CheckCircle2 size={15} /> Một phương thức chính: Email OTP 6 số</p>
          <p><CheckCircle2 size={15} /> Google/GitHub OAuth cho đăng nhập nhanh</p>
          <p><CheckCircle2 size={15} /> Candidate và Recruiter tách workspace sau xác thực</p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="auth-card">
          <div className="auth-card-head">
            <div>
              <span className="eyebrow">{isLogin ? "Login" : "Register"}</span>
              <h2>{isLogin ? "Chào mừng trở lại" : "Bắt đầu với UpNext"}</h2>
              <p>{isLogin ? "Nhập email để nhận mã xác thực 6 số." : "Chọn vai trò, điền thông tin cần thiết và xác thực email."}</p>
            </div>
            <div className="role-icon"><RoleIcon size={22} /></div>
          </div>

          <div className="segmented">
            {(["login", "register"] as const).map((item) => (
              <button className={mode === item ? "active" : ""} key={item} onClick={() => switchMode(item)}>
                {item === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          <div className="auth-role-picker">
            {publicAuthRoles.map((item) => {
              const Icon = roleIcons[item];
              return (
                <button className={role === item ? "active" : ""} key={item} onClick={() => setRole(item)}>
                  <Icon size={15} />
                  <span>{roleLabels[item]}</span>
                  <em>{roleDescriptions[item]}</em>
                </button>
              );
            })}
          </div>

          <div className="oauth-grid">
            <button className="oauth-button" onClick={() => navigate(roleHome[role])}>
              <GoogleMark />
              <span>Continue with Google</span>
            </button>
            <button className="oauth-button" onClick={() => navigate(roleHome[role])}>
              <Github size={17} strokeWidth={2.1} />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="divider"><span>or use email</span></div>

          <div className="login-flow">
            {stage === "email" ? (
              <>
                <label className="auth-input">
                  <span>Email</span>
                  <div>
                    <MailCheck size={17} />
                    <input value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                </label>

                {!isLogin && (
                  <div className="auth-register-stack">
                    <div className="form-grid auth-register-grid">
                      {role === "candidate" ? (
                        <>
                          <AuthMiniField label="Họ tên" value="Nguyen Minh Khoa" />
                          <AuthMiniField label="Vị trí mong muốn" value="Senior Frontend Engineer" />
                          <AuthMiniField label="Khu vực" value="Ho Chi Minh, Hybrid" />
                          <AuthMiniField label="CV mặc định" value="Frontend Lead CV.pdf" />
                        </>
                      ) : (
                        <>
                          <AuthMiniField label="Tên công ty" value="Nexa Fintech JSC" />
                          <AuthMiniField label="Mã số thuế" value="0318 884 209" />
                          <AuthMiniField label="Người đại diện" value="Tran Hoang Lan" />
                          <AuthMiniField label="Giấy phép" value="business-license.pdf" />
                        </>
                      )}
                    </div>
                  </div>
                )}

                <button className="primary-button auth-primary" onClick={submitAuth}>
                  {isLogin ? "Gửi mã OTP" : "Tạo tài khoản và gửi OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="otp-panel">
                  <div className="otp-panel-icon"><KeyRound size={19} /></div>
                  <div>
                    <strong>Nhập mã xác thực</strong>
                    <span>Mã 6 số đã được gửi tới {email}. Mã hết hạn sau 10 phút.</span>
                  </div>
                </div>

                <div className="otp-row">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      value={digit}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP ${index + 1}`}
                      onChange={(event) => {
                        const next = [...otp];
                        next[index] = event.target.value.replace(/\D/g, "").slice(0, 1);
                        setOtp(next);
                      }}
                    />
                  ))}
                </div>

                <button className="primary-button auth-primary" onClick={submitAuth}>
                  Xác thực và tiếp tục
                </button>
                <button className="auth-link-button" onClick={() => setStage("email")}>Đổi email</button>
              </>
            )}
          </div>

          <AuthNotice>
            {isLogin
              ? "UpNext chỉ dùng Email OTP cho passwordless login để giữ flow rõ ràng, dễ kiểm soát và phù hợp với web app."
              : role === "candidate"
                ? "Candidate có thể hoàn tất hồ sơ sau khi xác thực email."
                : "Recruiter cần xác thực email công ty trước khi đăng tin hoặc mua gói."}
          </AuthNotice>

          <div className="auth-footer-note">
            <Sparkles size={14} />
            <span>{isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}</span>
            <button onClick={() => switchMode(isLogin ? "register" : "login")}>
              {isLogin ? "Tạo tài khoản" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function AuthMiniField({ label, value }: { label: string; value: string }) {
  return (
    <label className="auth-mini-field">
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}

function GoogleMark() {
  return (
    <svg className="google-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.22h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.52Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.41 13.89A6 6 0 0 1 6.1 12c0-.65.11-1.29.31-1.89V7.52H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.48l3.35-2.59Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.79.51 3.83 1.5l2.86-2.86C16.95 3.01 14.69 2 12 2a10 10 0 0 0-8.94 5.52l3.35 2.59C7.2 7.75 9.4 5.99 12 5.99Z" />
    </svg>
  );
}
