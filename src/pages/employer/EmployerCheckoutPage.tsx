import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Copy,
  CreditCard,
  Landmark,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { AuthNotice, PageHeader } from "../../components/ui";

type BillingCycle = "monthly" | "yearly";
type PaymentMethod = "sepay" | "stripe";
type CheckoutStatus = "idle" | "checking" | "success";

type CheckoutPlan = {
  key: "starter" | "growth" | "enterprise";
  name: string;
  description: string;
  monthlyPrice?: number;
  highlight?: string;
  features: string[];
};

const plans: Record<string, CheckoutPlan> = {
  starter: {
    key: "starter",
    name: "Khởi đầu",
    description: "Đăng tin, parse CV và vận hành đội tuyển dụng nhỏ.",
    monthlyPrice: 49,
    highlight: "Phù hợp startup đang tuyển đều",
    features: ["5 tin tuyển dụng đang chạy", "300 lượt parse CV", "3 thành viên", "10 bản ghi phỏng vấn AI"],
  },
  growth: {
    key: "growth",
    name: "Tăng trưởng",
    description: "Gói phù hợp nhất cho đội tuyển dụng IT đang scale.",
    monthlyPrice: 149,
    highlight: "Được chọn nhiều nhất",
    features: ["30 tin tuyển dụng đang chạy", "2.000 lượt AI match", "Tự động hóa Pipeline", "Đồng bộ lịch Google/Outlook"],
  },
  enterprise: {
    key: "enterprise",
    name: "Doanh nghiệp",
    description: "SLA, phân quyền nâng cao, SSO và điều khoản thanh toán riêng.",
    highlight: "Cần tư vấn trước khi thanh toán",
    features: ["Không giới hạn tin tuyển dụng", "Không giới hạn thành viên", "SSO và audit log", "SLA hỗ trợ riêng"],
  },
};

const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const vndFormatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const exchangeRate = 25400;

function parseCheckoutPath(path: string) {
  const [, , , planSlug, cycleSlug] = path.split("/");
  const plan = plans[planSlug] ?? plans.growth;
  const cycle: BillingCycle = cycleSlug === "yearly" ? "yearly" : "monthly";
  return { plan, cycle };
}

function getCheckoutPrice(plan: CheckoutPlan, cycle: BillingCycle) {
  if (!plan.monthlyPrice) return null;
  const monthlyTotal = plan.monthlyPrice;
  const yearlyTotal = Math.round(plan.monthlyPrice * 12 * 0.8);
  const totalUsd = cycle === "yearly" ? yearlyTotal : monthlyTotal;
  const effectiveMonthly = cycle === "yearly" ? Math.floor(plan.monthlyPrice * 0.8) : plan.monthlyPrice;
  const saving = cycle === "yearly" ? plan.monthlyPrice * 12 - yearlyTotal : 0;
  return {
    totalUsd,
    totalVnd: totalUsd * exchangeRate,
    effectiveMonthly,
    saving,
    label: cycle === "yearly" ? `${usdFormatter.format(totalUsd)}/năm` : `${usdFormatter.format(totalUsd)}/tháng`,
  };
}

export function EmployerCheckoutPage({ path, navigate }: { path: string; navigate: (path: string) => void }) {
  const parsed = useMemo(() => parseCheckoutPath(path), [path]);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(parsed.cycle);
  const [method, setMethod] = useState<PaymentMethod>("sepay");
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const price = getCheckoutPrice(parsed.plan, billingCycle);
  const isEnterprise = !price;
  const orderCode = `UPN-${parsed.plan.key.toUpperCase()}-${billingCycle === "yearly" ? "YEAR" : "MONTH"}-260528`;

  function submitPayment() {
    setStatus("checking");
    window.setTimeout(() => setStatus("success"), 850);
  }

  return (
    <>
      <PageHeader
        eyebrow="Thanh toán"
        title={isEnterprise ? "Yêu cầu tư vấn gói Doanh nghiệp" : `Thanh toán gói ${parsed.plan.name}`}
        description="Hoàn tất thanh toán để hệ thống cấp gói, cập nhật tài nguyên tuyển dụng và tạo hóa đơn cho workspace."
        actions={<button className="secondary-button" onClick={() => navigate("/employer/company")}><ArrowLeft size={15} /> Công ty & thanh toán</button>}
      />

      <div className="checkout-steps" aria-label="Tiến trình thanh toán">
        {["Chọn gói", "Thanh toán", "Kích hoạt"].map((step, index) => (
          <span className={index < (status === "success" ? 3 : 2) ? "active" : ""} key={step}>
            <i>{index + 1}</i>
            {step}
          </span>
        ))}
      </div>

      {isEnterprise ? (
        <EnterpriseCheckout plan={parsed.plan} navigate={navigate} />
      ) : (
        <>
          <section className="checkout-context-bar" aria-label="Thông tin thanh toán">
            <span><ShieldCheck size={15} /> Cấp gói sau khi thanh toán thành công</span>
            <span>Workspace: UpNext Demo Company</span>
            <span>Mã đơn: {orderCode}</span>
          </section>

          <div className="checkout-layout">
            <section className="panel checkout-main">
            <div className="checkout-plan-hero">
              <span><Sparkles size={18} /></span>
              <div>
                <p>{parsed.plan.highlight}</p>
                <h2>{parsed.plan.name}</h2>
                <em>{parsed.plan.description}</em>
              </div>
              <div className="checkout-plan-price">
                <strong>{price.label}</strong>
                {billingCycle === "yearly" && <small>≈ {usdFormatter.format(price.effectiveMonthly)}/tháng</small>}
              </div>
            </div>

            <div className="checkout-section">
              <div className="checkout-section-head">
                <div>
                  <span>Chu kỳ thanh toán</span>
                  <strong>Chọn cách tính phí trước khi thanh toán</strong>
                </div>
              </div>
              <div className="checkout-cycle-toggle">
                <button className={billingCycle === "monthly" ? "active" : ""} onClick={() => { setBillingCycle("monthly"); setStatus("idle"); }}>
                  Hàng tháng
                  <small>{usdFormatter.format(parsed.plan.monthlyPrice ?? 0)}/tháng</small>
                </button>
                <button className={billingCycle === "yearly" ? "active" : ""} onClick={() => { setBillingCycle("yearly"); setStatus("idle"); }}>
                  Hàng năm
                  <small>Tiết kiệm 20%</small>
                </button>
              </div>
            </div>

            <div className="checkout-section">
              <div className="checkout-section-head">
                <div>
                  <span>Phương thức thanh toán</span>
                  <strong>Gói được cấp sau khi cổng thanh toán xác nhận thành công</strong>
                </div>
              </div>
              <div className="payment-methods">
                <button className={method === "sepay" ? "active" : ""} onClick={() => { setMethod("sepay"); setStatus("idle"); }}>
                  <Landmark size={18} />
                  <span>SePay chuyển khoản</span>
                  <small>Tự động đối soát nội dung chuyển khoản</small>
                  <b>{method === "sepay" ? "Đang chọn" : "Chọn"}</b>
                </button>
                <button className={method === "stripe" ? "active" : ""} onClick={() => { setMethod("stripe"); setStatus("idle"); }}>
                  <CreditCard size={18} />
                  <span>Stripe thẻ quốc tế</span>
                  <small>Visa, Mastercard, Amex qua Stripe Checkout</small>
                  <b>{method === "stripe" ? "Đang chọn" : "Chọn"}</b>
                </button>
              </div>
            </div>

            {method === "sepay" ? <SePayBox orderCode={orderCode} price={price} status={status} onSubmit={submitPayment} /> : <StripeBox price={price} status={status} onSubmit={submitPayment} />}
            </section>

            <aside className="checkout-sidebar">
              <OrderSummary plan={parsed.plan} cycle={billingCycle} price={price} />
              <InvoicePanel />
            </aside>
          </div>
        </>
      )}
    </>
  );
}

function SePayBox({ orderCode, price, status, onSubmit }: { orderCode: string; price: NonNullable<ReturnType<typeof getCheckoutPrice>>; status: CheckoutStatus; onSubmit: () => void }) {
  return (
    <div className="checkout-payment-box sepay-box">
      <div className="transfer-card">
        <div className="payment-box-head">
          <div>
            <span>Thanh toán qua SePay</span>
            <strong>Chuyển khoản ngân hàng</strong>
          </div>
          <b>Tự động đối soát</b>
        </div>
        <div className="transfer-row"><span>Ngân hàng</span><strong>Techcombank</strong></div>
        <div className="transfer-row"><span>Chủ tài khoản</span><strong>UPNEXT TECHNOLOGY JSC</strong></div>
        <div className="transfer-row"><span>Số tiền</span><strong>{vndFormatter.format(price.totalVnd)}</strong></div>
        <div className="transfer-row copyable"><span>Nội dung</span><strong>{orderCode}</strong><button aria-label="Sao chép nội dung chuyển khoản" onClick={() => navigator.clipboard?.writeText(orderCode)}><Copy size={14} /></button></div>
        <AuthNotice>SePay tự đối soát theo nội dung chuyển khoản. Gói được kích hoạt sau khi giao dịch được xác nhận.</AuthNotice>
        <PaymentAction status={status} idleLabel="Kiểm tra giao dịch" onSubmit={onSubmit} />
      </div>
      <div className="qr-card" aria-label="Mã QR thanh toán SePay">
        <div className="qr-pattern"><i /></div>
        <strong>Quét QR để thanh toán</strong>
        <span>{vndFormatter.format(price.totalVnd)}</span>
      </div>
    </div>
  );
}

function StripeBox({ price, status, onSubmit }: { price: NonNullable<ReturnType<typeof getCheckoutPrice>>; status: CheckoutStatus; onSubmit: () => void }) {
  return (
    <div className="checkout-payment-box stripe-box">
      <div className="stripe-form">
        <div className="payment-box-head">
          <div>
            <span>Thanh toán qua Stripe</span>
            <strong>Thông tin thẻ</strong>
          </div>
          <b>SSL secure</b>
        </div>
        <label><span>Email nhận hóa đơn</span><input defaultValue="billing@upnext.vn" /></label>
        <label><span>Số thẻ</span><input defaultValue="4242 4242 4242 4242" /></label>
        <div className="checkout-form-row">
          <label><span>Hết hạn</span><input defaultValue="12/30" /></label>
          <label><span>CVC</span><input defaultValue="•••" /></label>
        </div>
        <PaymentAction status={status} idleLabel={`Thanh toán ${usdFormatter.format(price.totalUsd)}`} onSubmit={onSubmit} />
      </div>
      <div className="card-preview">
        <span><LockKeyhole size={16} /> Stripe secured</span>
        <strong>{usdFormatter.format(price.totalUsd)}</strong>
        <p>Không lưu thông tin thẻ trên UpNext.</p>
      </div>
    </div>
  );
}

function PaymentAction({ status, idleLabel, onSubmit }: { status: CheckoutStatus; idleLabel: string; onSubmit: () => void }) {
  if (status === "success") {
    return <div className="checkout-success"><CheckCircle2 size={17} /><span>Thanh toán thành công. Gói đang được kích hoạt cho workspace.</span></div>;
  }

  return (
    <button className="primary-button checkout-pay-button" onClick={onSubmit} disabled={status === "checking"}>
      {status === "checking" ? "Đang kiểm tra..." : idleLabel}
    </button>
  );
}

function OrderSummary({ plan, cycle, price }: { plan: CheckoutPlan; cycle: BillingCycle; price: NonNullable<ReturnType<typeof getCheckoutPrice>> }) {
  return (
    <section className="panel checkout-summary">
      <div className="checkout-summary-head">
        <span><ReceiptText size={17} /></span>
        <div><strong>Tóm tắt đơn hàng</strong><p>{plan.name} · {cycle === "yearly" ? "Hàng năm" : "Hàng tháng"}</p></div>
      </div>
      <div className="summary-price">
        <strong>{price.label}</strong>
        {cycle === "yearly" && <span>≈ {usdFormatter.format(price.effectiveMonthly)}/tháng · tiết kiệm {usdFormatter.format(price.saving)}/năm</span>}
      </div>
      <div className="summary-lines">
        <p><span>Số tiền thanh toán</span><b>{usdFormatter.format(price.totalUsd)}</b></p>
        <p><span>Quy đổi SePay</span><b>{vndFormatter.format(price.totalVnd)}</b></p>
        <p><span>Trạng thái cấp gói</span><b>Sau khi thanh toán thành công</b></p>
      </div>
      <div className="summary-features">
        {plan.features.map((feature) => <p key={feature}><CheckCircle2 size={14} /> {feature}</p>)}
      </div>
    </section>
  );
}

function InvoicePanel() {
  return (
    <section className="panel invoice-panel">
      <div className="checkout-summary-head">
        <span><Building2 size={17} /></span>
        <div><strong>Thông tin hóa đơn</strong><p>Dùng để xuất hóa đơn sau thanh toán</p></div>
      </div>
      <label><span>Công ty</span><input defaultValue="UpNext Demo Company" /></label>
      <label><span>Mã số thuế</span><input defaultValue="0318884209" /></label>
      <label><span>Email nhận hóa đơn</span><input defaultValue="billing@upnext.vn" /></label>
    </section>
  );
}

function EnterpriseCheckout({ plan, navigate }: { plan: CheckoutPlan; navigate: (path: string) => void }) {
  return (
    <div className="checkout-layout">
      <section className="panel checkout-main enterprise-checkout">
        <div className="checkout-plan-hero">
          <span><ShieldCheck size={18} /></span>
          <div>
            <p>{plan.highlight}</p>
            <h2>{plan.name}</h2>
            <em>{plan.description}</em>
          </div>
        </div>
        <div className="enterprise-form-grid">
          <label><span>Quy mô tuyển dụng</span><input defaultValue="50+ vị trí IT / năm" /></label>
          <label><span>Số thành viên cần dùng</span><input defaultValue="Không giới hạn" /></label>
          <label><span>Email liên hệ</span><input defaultValue="founder@upnext.vn" /></label>
          <label><span>Nhu cầu triển khai</span><textarea defaultValue="SSO, phân quyền nhiều đội, hóa đơn và SLA riêng." /></label>
        </div>
        <AuthNotice>Gói Doanh nghiệp cần xác nhận phạm vi sử dụng trước khi tạo thanh toán hoặc hợp đồng.</AuthNotice>
        <div className="checkout-actions">
          <button className="secondary-button" onClick={() => navigate("/employer/company")}>Quay lại</button>
          <button className="primary-button"><BadgeCheck size={15} /> Gửi yêu cầu tư vấn</button>
        </div>
      </section>
      <aside className="checkout-sidebar">
        <section className="panel checkout-summary">
          <div className="checkout-summary-head">
            <span><Zap size={17} /></span>
            <div><strong>Gói Doanh nghiệp</strong><p>Báo giá theo quy mô</p></div>
          </div>
          <div className="summary-features">
            {plan.features.map((feature) => <p key={feature}><CheckCircle2 size={14} /> {feature}</p>)}
          </div>
        </section>
      </aside>
    </div>
  );
}
