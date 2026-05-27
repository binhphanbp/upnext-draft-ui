import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  GripVertical,
  Heart,
  Mail,
  PenLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserCog,
  UsersRound,
  Video,
  WandSparkles,
} from "lucide-react";
import { applicantTrend, candidates, chartBars, pipelineSeed, posts } from "../../data";
import type { Candidate, PipelineColumn, PipelineItem } from "../../types";
import { AuthNotice, Avatar, ChartTooltip, Field, InsightCard, Metric, Modal, PageHeader, PanelHeader, ScoreRing } from "../../components/ui";

export function EmployerDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Báo cáo tuyển dụng"
        description="Trung tâm vận hành cho nhà tuyển dụng: nguồn ứng viên, ranking, interview, offer, điểm uy tín và hiệu quả AI."
        actions={<><button className="date-button">01/01/2026</button><button className="secondary-button">Xuất báo cáo</button></>}
      />
      <section className="panel hero-chart">
        <PanelHeader icon={<UsersRound size={17} />} title="Luồng ứng viên" action="Chi tiết" />
        <div className="hero-kpi"><strong>82</strong><span className="trend">↗ 12% <em>so với kỳ trước</em></span></div>
        <div className="bar-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartBars}>
              <CartesianGrid vertical={false} stroke="#ececf2" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#808497", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#808497", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="female" fill="#f59e0b" radius={[8, 8, 0, 0]} maxBarSize={14} />
              <Bar dataKey="male" fill="#3b82f6" radius={[8, 8, 0, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="hero-summary">
          <Metric title="Việc đang tuyển" value="36" detail="7 tin đang đẩy" />
          <Metric title="CV nhận được" value="1,284" detail="128 CV mới tuần này" />
          <Metric title="CV match cao" value="248" detail="Điểm 85+" />
          <Metric title="Phỏng vấn" value="18" detail="6 chờ phản hồi" />
          <Metric title="Offer" value="7" detail="3 đang đàm phán" />
          <Metric title="Điểm uy tín" value="86" detail="Nhà tuyển dụng tin cậy" />
        </div>
      </section>
      <div className="dashboard-grid">
        <ApplicationsPanel />
        <TrustPanel />
        <AiOperationsPanel />
      </div>
    </>
  );
}

export function EmployerJobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Tạo, đẩy tin và gia hạn tin tuyển dụng"
        description="Đăng tin với trình soạn nội dung, AI draft, quản lý trạng thái hoạt động/hết hạn/bị khóa và tài nguyên đẩy tin."
        actions={<><button className="secondary-button"><WandSparkles size={15} /> AI draft</button><button className="primary-button"><PenLine size={15} /> Tạo tin</button></>}
      />
      <div className="jobs-grid">
        <section className="panel editor-panel">
          <PanelHeader icon={<PenLine size={17} />} title="Trình soạn tin" action="Xem trước" />
          <Field label="Tên vị trí" value="Senior Frontend Engineer" />
          <div className="editor-box">
            <p><strong>Yêu cầu</strong></p>
            <p>5+ năm React, TypeScript, tối ưu performance, ownership design system và kinh nghiệm sản phẩm fintech.</p>
            <button className="ai-chip"><Sparkles size={14} /> Tạo bằng AI</button>
          </div>
          <div className="weight-grid">
            <Metric title="Trọng số kỹ năng" value="50%" detail="React, TS, kiến trúc FE" />
            <Metric title="Kinh nghiệm" value="30%" detail="5+ năm, domain" />
            <Metric title="Khác" value="20%" detail="Lương, ngôn ngữ, khu vực" />
          </div>
        </section>
        <section className="panel table-panel">
          <PanelHeader icon={<BriefcaseBusiness size={17} />} title="Danh sách tin" action="Thao tác hàng loạt" />
          {posts.map((post) => (
            <div className="post-row" key={post.title}>
              <div><strong>{post.title}</strong><span>{post.views} lượt xem • {post.cvs} CV</span></div>
              <span className={post.status === "Đã khóa" ? "status-pill red" : post.status === "Đang đẩy tin" ? "status-pill purple" : post.status === "Hết hạn" || post.status === "Chờ duyệt" ? "status-pill yellow" : "status-pill green"}>{post.status}</span>
              <span>{post.expiry}</span>
              <button className="secondary-button small">{post.status === "Hết hạn" ? "Gia hạn" : post.status === "Chờ duyệt" ? "Xử lý" : "Đẩy tin"}</button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export function EmployerCandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(candidates[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Bảng xếp hạng match và kho ứng viên"
        description="AI tự động chấm điểm theo JD/CV, giải thích lý do phù hợp và hỗ trợ đổi trạng thái hàng loạt."
        actions={<><button className="secondary-button"><Filter size={15} /> Kỹ năng / năm / việc</button><button className="primary-button"><Sparkles size={15} /> Chấm lại CV</button></>}
      />
      <div className="recruiter-summary-strip">
        <InsightCard title="Ứng tuyển mới" value="128" icon={UsersRound} color="#3b82f6" note="31 CV cần xem xét đầu tiên hôm nay" />
        <InsightCard title="CV match cao" value="46" icon={Sparkles} color="#574bf5" note="Điểm 85+ ở các tin đang tuyển" />
        <InsightCard title="Sẵn sàng phỏng vấn" value="18" icon={CalendarClock} color="#f59e0b" note="Cần xác nhận lịch" />
        <InsightCard title="Talent Pool" value="342" icon={Heart} color="#10a778" note="Đã lưu cho chiến dịch sau" />
      </div>
      <div className="candidate-rank-grid">
        <RankingPanel selectedName={selectedCandidate.name} onSelect={setSelectedCandidate} />
        <section className="panel cv-preview">
          <PanelHeader icon={<FileText size={17} />} title="Xem trước CV" action="Mở hồ sơ đầy đủ" onAction={() => setIsDetailOpen(true)} />
          <div className="candidate-head">
            <Avatar name={selectedCandidate.name} index={candidates.indexOf(selectedCandidate)} large />
            <div><h2>{selectedCandidate.name}</h2><span>{selectedCandidate.role} • {selectedCandidate.salary} • TP. Hồ Chí Minh</span></div>
            <ScoreRing label="Match" value={selectedCandidate.match} />
          </div>
          <div className="preview-actions">
            <button className="primary-button small"><CalendarClock size={14} /> Đặt lịch</button>
            <button className="secondary-button small"><Heart size={14} /> Talent Pool</button>
            <button className="secondary-button small"><Mail size={14} /> Nhắn tin</button>
          </div>
          <div className="reason-box"><strong>Lý do từ AI</strong><p>{selectedCandidate.reason}</p></div>
          <div className="match-reasons compact">
            <div><strong>Kỹ năng</strong><p>Trọng số 50%: {selectedCandidate.skills.join(", ")}</p></div>
            <div><strong>Kinh nghiệm</strong><p>Trọng số 30%: {selectedCandidate.exp}, có bằng chứng delivery sản phẩm.</p></div>
            <div><strong>Khác</strong><p>Trọng số 20%: lương, khu vực, ngôn ngữ và thời điểm sẵn sàng.</p></div>
          </div>
          <div className="resume-paper">
            <h3>Kinh nghiệm</h3><p>Dashboard B2B SaaS, biểu đồ, workflow phân quyền và giao tiếp sẵn sàng phỏng vấn.</p>
            <h3>Kỹ năng</h3><p>{selectedCandidate.skills.join(", ")}, system design, testing.</p>
          </div>
        </section>
      </div>
      {isDetailOpen && (
        <Modal title="Xem xét hồ sơ ứng viên" onClose={() => setIsDetailOpen(false)}>
          <div className="field-table">
            {[`Việc đã ứng tuyển: ${selectedCandidate.job}`, `Trạng thái hiện tại: ${selectedCandidate.stage}`, `Kỹ năng nổi bật: ${selectedCandidate.skills.join(", ")}`, `Lý do từ AI: ${selectedCandidate.reason}`].map((item) => <p key={item}>{item}</p>)}
          </div>
          <div className="modal-actions"><button className="secondary-button">Từ chối có lý do</button><button className="secondary-button">Chuyển vào shortlist</button><button className="primary-button">Đặt lịch phỏng vấn</button></div>
        </Modal>
      )}
    </>
  );
}

export function EmployerPipelinePage() {
  const [columns, setColumns] = useState<PipelineColumn[]>(pipelineSeed);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const activeCard = useMemo(() => {
    if (!activeId) return null;
    for (const column of columns) {
      const card = column.items.find((item) => item.id === activeId);
      if (card) return { card, column };
    }
    return null;
  }, [activeId, columns]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const overId = event.over?.id ? String(event.over.id) : null;
    if (overId && activeId && overId !== activeId) {
      setColumns((current) => movePipelineCard(current, activeId, overId));
    }
    setActiveId(null);
  }

  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Pipeline, vòng phỏng vấn và thông báo ứng viên"
        description="Kéo thả ứng viên giữa các cột; khi chuyển hẹn phỏng vấn, hệ thống bắt buộc nhập lịch và kiểm soát tối đa 2 vòng lặp."
        actions={<button className="primary-button" onClick={() => setScheduleOpen(true)}><CalendarClock size={15} /> Đặt lịch phỏng vấn</button>}
      />
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
        <div className="pipeline-board-wrap">
          <div className="pipeline-board" style={{ "--column-count": columns.length } as CSSProperties}>
            {columns.map((column) => (
              <PipelineColumnView column={column} key={column.id}>
                <SortableContext items={column.items.map((card) => card.id)} strategy={verticalListSortingStrategy}>
                  <div className="pipeline-list">
                    {column.items.map((card) => (
                      <SortablePipelineCard card={card} column={column} key={card.id} />
                    ))}
                    {!column.items.length && <div className="pipeline-empty">Chưa có ứng viên</div>}
                  </div>
                </SortableContext>
              </PipelineColumnView>
            ))}
          </div>
        </div>
        <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
          {activeCard ? <PipelineCardPreview card={activeCard.card} column={activeCard.column} /> : null}
        </DragOverlay>
      </DndContext>
      <section className="panel schedule-panel">
        <PanelHeader icon={<CalendarDays size={17} />} title="Logic đặt lịch phỏng vấn" action="Xem lịch" />
        <div className="schedule-grid">
          <Metric title="Giới hạn vòng" value="2" detail="NTD gửi -> ứng viên hẹn lại -> NTD gửi lại" />
          <Metric title="Chờ phản hồi" value="6" detail="Tự động nhắc email sau 24h" />
          <Metric title="Từ chối do SLA" value="3" detail="Không có chuyển động sau 7 ngày" />
          <Metric title="Đồng bộ lịch" value="98%" detail="Sẵn sàng Google/Outlook" />
        </div>
      </section>
      {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)} />}
    </>
  );
}

function PipelineColumnView({ column, children }: { column: PipelineColumn; children: ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id: column.id });

  return (
    <section
      className={isOver ? "pipeline-column is-over" : "pipeline-column"}
      ref={setNodeRef}
      style={{ "--column-color": column.color, "--column-bg": column.bg } as CSSProperties}
    >
      <div className="pipeline-head">
        <span>{column.title}</span>
        <b>{column.items.length}</b>
      </div>
      {children}
    </section>
  );
}

function SortablePipelineCard({ card, column }: { card: PipelineItem; column: PipelineColumn }) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const style = {
    "--column-color": column.color,
    "--column-bg": column.bg,
    opacity: isDragging ? 0.34 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  } as CSSProperties;

  return (
    <article className={isDragging ? "pipeline-card is-dragging" : "pipeline-card"} ref={setNodeRef} style={style}>
      <PipelineCardContent card={card} dragHandle={<button className="pipeline-drag-handle" aria-label={`Di chuyển ${card.title}`} {...attributes} {...listeners}><GripVertical size={14} /></button>} />
    </article>
  );
}

function PipelineCardPreview({ card, column }: { card: PipelineItem; column: PipelineColumn }) {
  return (
    <article className="pipeline-card pipeline-card-overlay" style={{ "--column-color": column.color, "--column-bg": column.bg } as CSSProperties}>
      <PipelineCardContent card={card} />
    </article>
  );
}

function PipelineCardContent({ card, dragHandle }: { card: PipelineItem; dragHandle?: ReactNode }) {
  return (
    <>
      <div className="pipeline-card-top">
        <div>
          <strong>{card.title}</strong>
          <p>{card.person}</p>
        </div>
        <b>{card.match}</b>
      </div>
      <div className="pipeline-card-meta">
        <span><Clock3 size={12} /> {card.sla}</span>
        <i>{card.tag}</i>
      </div>
      {dragHandle}
    </>
  );
}

function movePipelineCard(columns: PipelineColumn[], activeId: string, overId: string) {
  const source = findPipelineCard(columns, activeId);
  if (!source) return columns;

  const overColumnIndex = columns.findIndex((column) => column.id === overId);
  const overCard = findPipelineCard(columns, overId);
  const targetColumnIndex = overColumnIndex >= 0 ? overColumnIndex : overCard?.columnIndex;
  if (targetColumnIndex === undefined) return columns;

  if (source.columnIndex === targetColumnIndex) {
    if (!overCard || source.itemIndex === overCard.itemIndex) return columns;
    return columns.map((column, index) => (
      index === source.columnIndex
        ? { ...column, items: arrayMove(column.items, source.itemIndex, overCard.itemIndex) }
        : column
    ));
  }

  const movingCard = columns[source.columnIndex].items[source.itemIndex];
  const targetColumn = columns[targetColumnIndex];
  const insertIndex = overCard?.columnIndex === targetColumnIndex ? overCard.itemIndex : targetColumn.items.length;
  const updatedCard = {
    ...movingCard,
    sla: targetColumn.id === "interview" ? "Cần đặt lịch" : movingCard.sla,
    tag: targetColumn.id === "hired" ? "Onboarding" : movingCard.tag,
  };

  return columns.map((column, index) => {
    if (index === source.columnIndex) {
      return { ...column, items: column.items.filter((item) => item.id !== activeId) };
    }
    if (index === targetColumnIndex) {
      const nextItems = [...column.items];
      nextItems.splice(insertIndex, 0, updatedCard);
      return { ...column, items: nextItems };
    }
    return column;
  });
}

function findPipelineCard(columns: PipelineColumn[], itemId: string) {
  for (let columnIndex = 0; columnIndex < columns.length; columnIndex += 1) {
    const itemIndex = columns[columnIndex].items.findIndex((item) => item.id === itemId);
    if (itemIndex >= 0) return { columnIndex, itemIndex };
  }
  return null;
}

export function EmployerCompanyPage() {
  return (
    <>
      <PageHeader eyebrow="Nhà tuyển dụng" title="Hồ sơ công ty, điểm uy tín và gói dịch vụ" description="Bổ sung xác thực để tăng điểm uy tín, theo dõi gói dịch vụ, tài nguyên và hóa đơn." actions={<button className="primary-button"><BadgeCheck size={15} /> Xác thực công ty</button>} />
      <div className="company-grid"><TrustPanel wide /><section className="panel"><PanelHeader icon={<ShieldCheck size={17} />} title="Hồ sơ công ty" action="Sửa" /><div className="field-table">{["Giấy phép kinh doanh: Đã xác thực", "Mã số thuế: 0318 884 209", "Địa chỉ: 12 Nguyễn Huệ, Quận 1", "SLA phản hồi: 88% trong 24h"].map((item) => <p key={item}>{item}</p>)}</div></section></div>
    </>
  );
}

export function EmployerTalentPoolPage() {
  const pool = Array.from({ length: 20 }, (_, index) => candidates[index % candidates.length]);
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Talent Pool, ứng viên đã lưu và chiến dịch nurture"
        description="Lưu ứng viên tiềm năng theo tag, consent, lương, thời điểm sẵn sàng và chiến dịch email nurture cho đợt tuyển dụng sau."
        actions={<><button className="secondary-button"><Mail size={15} /> Chiến dịch nurture</button><button className="primary-button"><Heart size={15} /> Thêm vào pool</button></>}
      />
      <div className="recruiter-summary-strip">
        <InsightCard title="Ứng viên đã lưu" value="342" icon={Heart} color="#10a778" note="128 warm, 46 sẵn sàng ngay" />
        <InsightCard title="Đủ consent" value="91%" icon={ShieldCheck} color="#3b82f6" note="Có quyền liên hệ kiểu GDPR" />
        <InsightCard title="Kỹ năng hot" value="React, K8s" icon={Sparkles} color="#574bf5" note="Được yêu cầu nhiều nhất trong tin đang tuyển" />
        <InsightCard title="Phản hồi campaign" value="28%" icon={Mail} color="#f59e0b" note="Liên hệ 30 ngày gần nhất" />
      </div>
      <div className="two-column-layout">
        <section className="panel">
          <PanelHeader icon={<UsersRound size={17} />} title="Bảng Talent Pool" action="Gắn tag hàng loạt" />
          <div className="dense-list scroll-list">
            {pool.map((candidate, index) => (
              <div className="talent-row" key={`${candidate.name}-${index}`}>
                <Avatar name={candidate.name} index={index} />
                <div><strong>{candidate.name}</strong><span>{candidate.role} • {candidate.exp} • {candidate.salary}</span></div>
                <div className="skill-list">{candidate.skills.slice(0, 2).map((skill) => <i key={skill}>{skill}</i>)}</div>
                <span className={candidate.match > 90 ? "status-pill green" : "status-pill"}>{candidate.match} match</span>
                <button className="secondary-button small">Mở</button>
              </div>
            ))}
          </div>
        </section>
        <aside className="panel">
          <PanelHeader icon={<WandSparkles size={17} />} title="Tự động hóa nurture" action="Cấu hình" />
          {["Gửi cập nhật lương cho React pool", "Kích hoạt lại ứng viên hiring manager đã xem", "Mời ứng viên DevOps tham gia webinar", "Tự dừng sau 2 lần không phản hồi"].map((item) => (
            <div className="check-row" key={item}><CheckCircle2 size={15} /><span>{item}</span></div>
          ))}
        </aside>
      </div>
    </>
  );
}

export function EmployerInterviewsPage() {
  const slots = ["T2 09:00 - Backend system design", "T3 14:00 - Frontend architecture", "T4 10:30 - Culture fit", "T5 15:00 - Trao đổi Offer", "T6 09:00 - Vòng kỹ thuật 2"];
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Lịch phỏng vấn, vòng phỏng vấn và phản hồi ứng viên"
        description="Quản lý lịch phỏng vấn, giới hạn 2 vòng hẹn lại, trạng thái đồng bộ lịch, rubric đánh giá và email nhắc tự động."
        actions={<button className="primary-button"><CalendarClock size={15} /> Đặt lịch phỏng vấn</button>}
      />
      <div className="interview-board">
        <section className="panel">
          <PanelHeader icon={<CalendarDays size={17} />} title="Lịch tuần này" action="Xem lịch" />
          {slots.map((slot, index) => (
            <div className="interview-slot" key={slot}>
              <div className="date-chip"><span>{["T2", "T3", "T4", "T5", "T6"][index]}</span><b>{22 + index}</b></div>
              <div><strong>{slot}</strong><span>{candidates[index % candidates.length].name} • Vòng {index % 2 + 1}/2</span></div>
              <span className={index % 2 ? "status-pill yellow" : "status-pill green"}>{index % 2 ? "Chờ phản hồi" : "Đã xác nhận"}</span>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<Video size={17} />} title="Rubric đánh giá" action="Sửa" />
          <div className="resource-grid">
            <Metric title="Technical" value="40%" detail="Kiến trúc, độ sâu code" />
            <Metric title="Sản phẩm" value="25%" detail="Domain, impact" />
            <Metric title="Giao tiếp" value="20%" detail="Rõ ràng, biết trade-off" />
            <Metric title="Văn hóa" value="15%" detail="Phù hợp đội nhóm" />
          </div>
          <AuthNotice>Ứng viên chỉ được đề xuất lịch khác một lần. Nếu nhà tuyển dụng gửi lại quá 2 vòng, hệ thống yêu cầu lý do.</AuthNotice>
        </section>
      </div>
    </>
  );
}

export function EmployerTeamPage() {
  const members = ["Tran Hoang Lan - Chủ sở hữu", "Nguyen My Anh - Recruiter", "Le Quang Huy - Hiring Manager", "Pham Linh - Tài chính"];
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Thành viên đội ngũ, vai trò tuyển dụng và workflow phê duyệt"
        description="Phân quyền recruiter, hiring manager, tài chính; kiểm soát ai được xem CV, gửi offer, mua gói và khóa tin tuyển dụng."
        actions={<button className="primary-button"><UserCog size={15} /> Mời thành viên</button>}
      />
      <div className="team-grid">
        <section className="panel">
          <PanelHeader icon={<UsersRound size={17} />} title="Thành viên" action="Quản lý thành viên" />
          {members.map((member, index) => (
            <div className="mini-row" key={member}>
              <Avatar name={member} index={index} />
              <div><strong>{member}</strong><span>{index === 0 ? "Toàn quyền" : index === 3 ? "Chỉ thanh toán" : "Workspace tuyển dụng"}</span></div>
              <span className="status-pill green">Đang hoạt động</span>
            </div>
          ))}
        </section>
        <section className="panel">
          <PanelHeader icon={<ShieldCheck size={17} />} title="Bộ quyền" action="Sửa" />
          {["Xem CV", "Chuyển Pipeline", "Đặt lịch phỏng vấn", "Gửi Offer", "Quản lý thanh toán", "Xác thực công ty"].map((permission, index) => (
            <div className="permission-row" key={permission}><span>{permission}</span><b>{index < 3 ? "Recruiter" : index === 4 ? "Tài chính" : "Chủ sở hữu"}</b></div>
          ))}
        </section>
      </div>
    </>
  );
}

export function EmployerAnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nhà tuyển dụng"
        title="Phân tích tuyển dụng, chất lượng funnel và ROI nguồn ứng viên"
        description="Đo hiệu quả từng nguồn ứng viên, conversion theo stage, SLA xử lý, cost per hire và chất lượng match."
        actions={<><button className="secondary-button">Xuất CSV</button><button className="primary-button"><SlidersHorizontal size={15} /> Tạo báo cáo</button></>}
      />
      <div className="admin-kpi-grid">
        <InsightCard title="Ứng tuyển -> shortlist" value="36%" icon={UsersRound} color="#3b82f6" note="+8% so với tháng trước" />
        <InsightCard title="Qua phỏng vấn" value="42%" icon={CalendarClock} color="#574bf5" note="Nguồn tốt nhất: referral" />
        <InsightCard title="Thời gian tuyển" value="18 ngày" icon={Clock3} color="#f59e0b" note="Mục tiêu 21 ngày" />
        <InsightCard title="Chi phí mỗi tuyển dụng" value="$418" icon={BriefcaseBusiness} color="#10a778" note="Ads + AI credits" />
      </div>
      <div className="dashboard-grid">
        <ApplicationsPanel />
        <section className="panel">
          <PanelHeader icon={<Building2 size={17} />} title="Hiệu quả nguồn ứng viên" action="Chi tiết" />
          {["UpNext AI match - 46 tuyển dụng", "Import LinkedIn - 12 tuyển dụng", "Referral - 8 tuyển dụng", "Career site - 6 tuyển dụng"].map((source, index) => (
            <div className="mini-row" key={source}><Avatar name={source} index={index} /><div><strong>{source}</strong><span>Điểm chất lượng {92 - index * 7}</span></div></div>
          ))}
        </section>
        <AiOperationsPanel />
      </div>
    </>
  );
}

function RankingPanel({ selectedName, onSelect }: { selectedName: string; onSelect: (candidate: Candidate) => void }) {
  return (
    <section className="panel ranking-panel">
      <PanelHeader icon={<Star size={17} />} title="Bảng xếp hạng Match Score" action="Đổi trạng thái hàng loạt" />
      <div className="ranking-table">
        <div className="ranking-head"><span>Ứng viên</span><span>Việc đã ứng tuyển</span><span>Kỹ năng</span><span>Điểm</span><span>Trạng thái</span></div>
        {candidates.map((candidate, index) => (
          <button className={selectedName === candidate.name ? "ranking-row selected" : "ranking-row"} key={candidate.name} onClick={() => onSelect(candidate)}>
            <div className="person-cell"><Avatar name={candidate.name} index={index} /><div><strong>{candidate.name}</strong><span>{candidate.role} • {candidate.exp}</span></div></div>
            <span>{candidate.job}</span>
            <div className="skill-list">{candidate.skills.slice(0, 2).map((skill) => <i key={skill}>{skill}</i>)}</div>
            <div className="score-bar"><b>{candidate.match}</b><span><i style={{ width: `${candidate.match}%` }} /></span></div>
            <span className="status-pill">{candidate.stage}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ApplicationsPanel() {
  return (
    <section className="panel chart-panel">
      <PanelHeader icon={<TrendingUpIcon />} title="Ứng tuyển & Shortlist" action="Chi tiết" />
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={applicantTrend} margin={{ left: -16, right: 10, top: 10 }}>
          <CartesianGrid vertical={false} stroke="#ececf2" strokeDasharray="5 5" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#858897", fontSize: 11 }} />
          <YAxis hide domain={[0, 90]} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="applied" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="shortlist" stroke="#10a778" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

function TrustPanel({ wide = false }: { wide?: boolean }) {
  return (
    <section className={wide ? "panel trust-panel wide" : "panel trust-panel"}>
      <PanelHeader icon={<ShieldCheck size={17} />} title="Điểm uy tín nhà tuyển dụng" action="Cải thiện" />
      <div className="trust-score"><strong>86</strong><span>Doanh nghiệp tin cậy</span></div>
      <div className="trust-meter"><span style={{ width: "86%" }} /></div>
      <div className="trust-list"><p>Giấy phép kinh doanh đã xác thực (+12)</p><p>Review ứng viên tích cực (+8)</p><p>SLA phản hồi cần cải thiện (-4)</p></div>
    </section>
  );
}

function AiOperationsPanel() {
  return (
    <section className="panel ai-panel">
      <PanelHeader icon={<WandSparkles size={17} />} title="Vận hành AI" action="Cấu hình" />
      {["AI viết tin tuyển dụng", "Match Score Ranking", "Chatbot hỗ trợ"].map((title) => <div className="ai-action" key={title}><Sparkles size={16} /><div><strong>{title}</strong><span>Đã cấu hình cho workflow tuyển dụng IT.</span></div></div>)}
    </section>
  );
}

function ScheduleModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Đặt lịch phỏng vấn" onClose={onClose}>
      <div className="form-grid"><Field label="Ứng viên" value="Nguyen Minh Khoa" /><Field label="Vòng" value="Phỏng vấn kỹ thuật - Vòng 1/2" /><Field label="Ngày" value="24/05/2026" /><Field label="Giờ" value="09:00 - 10:00" /></div>
      <AuthNotice>Nếu ứng viên từ chối và đề xuất lịch khác, hệ thống chỉ cho phép tối đa 2 vòng gửi lại để tránh spam.</AuthNotice>
      <div className="modal-actions"><button className="secondary-button">Lưu nháp</button><button className="primary-button">Gửi lịch + email</button></div>
    </Modal>
  );
}

function TrendingUpIcon() {
  return <Sparkles size={17} />;
}
