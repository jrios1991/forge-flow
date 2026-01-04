type WorkOrder = {
  id: string;
  title?: string;
  customerName?: string;
  status?: string;
  priority?: string;
};

const WorkOrderCard = ({ order }: { order: WorkOrder }) => {
  const priorityClass = `priority priority-${(
    order.priority ?? ""
  ).toLowerCase()}`;

  return (
    <div
      style={{
        border: "1px solid #505358ff",
        borderRadius: 12,
        padding: 16,
        background: "#e1e7f3",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
      >
        <div style={{ fontWeight: 700 }}>
          {order.title ?? "Untitled Work Order"}
        </div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{order.id}</div>
      </div>

      <div style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>
        Customer: {order.customerName ?? "—"}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="priority">
          <label>Status:</label> {order.status ?? "—"}
        </span>
        <span className="priority">
          <label>Priority:</label>
          <span className={priorityClass}>{order.priority ?? "—"}</span>
        </span>
      </div>
    </div>
  );
};

export default WorkOrderCard;
