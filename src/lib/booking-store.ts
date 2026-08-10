const KEY = "nhims:bookings";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  id: string;
  doctor: string;
  specialty: string;
  hospital: string;
  /** ISO date (yyyy-MM-dd) */
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: string;
  note?: string;
  cancelReason?: string;
  cancelledAt?: string;
  rescheduledAt?: string;
  previousSlot?: { date: string; time: string };
};

function read(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

function write(list: Booking[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("nhims-bookings"));
  } catch {
    /* ignore */
  }
}

export function listBookings(): Booking[] {
  return read().sort((a, b) => (`${a.date}${a.time}` < `${b.date}${b.time}` ? 1 : -1));
}

export function addBooking(b: Omit<Booking, "createdAt">) {
  const list = read();
  list.push({ ...b, createdAt: new Date().toISOString() });
  write(list);
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  write(read().map((b) => (b.id === id ? { ...b, status } : b)));
}

export function rescheduleBooking(id: string, date: string, time: string) {
  write(
    read().map((b) =>
      b.id === id
        ? {
            ...b,
            previousSlot: { date: b.date, time: b.time },
            date,
            time,
            status: "Pending" as BookingStatus,
            rescheduledAt: new Date().toISOString(),
            cancelReason: undefined,
            cancelledAt: undefined,
          }
        : b,
    ),
  );
}

export function cancelBooking(id: string, reason: string) {
  write(
    read().map((b) =>
      b.id === id
        ? {
            ...b,
            status: "Cancelled" as BookingStatus,
            cancelReason: reason,
            cancelledAt: new Date().toISOString(),
          }
        : b,
    ),
  );
}

export function removeBooking(id: string) {
  write(read().filter((b) => b.id !== id));
}
