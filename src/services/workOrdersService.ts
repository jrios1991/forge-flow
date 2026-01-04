import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase/firestore";
import type { WorkOrder } from "../domain/workOrders/types";

type ListParams = {
  uid: string;
  role: "admin" | "worker";
};

export async function listWorkOrders({
  uid,
  role,
}: ListParams): Promise<WorkOrder[]> {
  const ref = collection(db, "workOrders");

  const q =
    role === "worker"
      ? query(
          ref,
          where("assignedTo", "==", uid),
          orderBy("updatedAt", "desc"),
          limit(25)
        )
      : query(ref, orderBy("updatedAt", "desc"), limit(25));

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<WorkOrder, "id">),
  }));
}
