// src/App.tsx
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "./services/firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./services/firebase/auth";
import WorkOrderCard from "./components/workOrders/WorkOrderCard";
import "./styles.css";

type WorkOrder = {
  id: string;
  title?: string;
  customerName?: string;
  status?: string;
  priority?: string;
};

export default function App() {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      await signInAnonymously(auth);
      try {
        setLoading(true);
        setError(null);

        // Fetch up to 10 work orders (no ordering yet → avoids missing-field issues)
        const q = query(collection(db, "workOrders"), limit(10));
        const snap = await getDocs(q);

        const data: WorkOrder[] = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<WorkOrder, "id">),
        }));

        setOrders(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load work orders");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Work Orders</h1>

      {loading && <p>Loading…</p>}

      {!loading && error && (
        <div style={{ padding: 12, borderRadius: 8, background: "#fee2e2" }}>
          <strong>Error:</strong> {error}
          <div style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>
            Common causes: Firestore rules deny reads, wrong project config, or
            no internet.
          </div>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <p>
          No work orders found. Add a few docs in Firestore under the{" "}
          <code>workOrders</code> collection.
        </p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div style={{ display: "grid", gap: 12 }}>
          {orders.map((o) => (
            <WorkOrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}
