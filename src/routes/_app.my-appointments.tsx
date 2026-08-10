import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarDays, Clock, MapPin, Stethoscope, Search, CalendarX } from "lucide-react";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  listBookings, addBooking, updateBookingStatus, removeBooking,
  type Booking, type BookingStatus,
} from "@/lib/booking-store";
import { appointments } from "@/lib/mock-data";
import { CancelAppointmentDialog, RescheduleAppointmentDialog } from "@/components/appointment-actions";

export const Route = createFileRoute("/_app/my-appointments")({
  head: () => ({
    meta: [
      { title: "My Appointments · NHIMS Bangladesh" },
      { name: "description", content: "Track your upcoming and past doctor appointments and update their status." },
      { property: "og:title", content: "My Appointments · NHIMS Bangladesh" },
      { property: "og:description", content: "Track your upcoming and past doctor appointments and update their status." },
    ],
  }),
  component: MyAppointments,
});

const MY_PATIENT_ID = "P-10001";
const SEEDED_KEY = "nhims:bookings-seeded";

const statusVariant: Record<BookingStatus, "default" | "secondary" | "outline" | "destructive"> = {
  Confirmed: "default",
  Pending: "outline",
  Completed: "secondary",
  Cancelled: "destructive",
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function MyAppointments() {
  const hydrated = useHydrated();
  const [items, setItems] = useState<Booking[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!localStorage.getItem(SEEDED_KEY)) {
      appointments
        .filter((a) => a.patientId === MY_PATIENT_ID)
        .forEach((a) =>
          addBooking({
            id: a.id,
            doctor: a.doctor,
            specialty: a.specialty,
            hospital: a.hospital,
            date: a.date,
            time: a.time,
            status: a.status as BookingStatus,
          }),
        );
      localStorage.setItem(SEEDED_KEY, "1");
    }
    const sync = () => setItems(listBookings());
    sync();
    window.addEventListener("nhims-bookings", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("nhims-bookings", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((b) =>
      [b.id, b.doctor, b.specialty, b.hospital].join(" ").toLowerCase().includes(q),
    );
  }, [items, query]);

  const today = todayISO();
  const upcoming = filtered.filter(
    (b) => b.date >= today && b.status !== "Completed" && b.status !== "Cancelled",
  );
  const past = filtered.filter(
    (b) => b.date < today || b.status === "Completed" || b.status === "Cancelled",
  );

  function setStatus(b: Booking, status: BookingStatus) {
    updateBookingStatus(b.id, status);
    toast.success(`${b.id} marked ${status.toLowerCase()}`);
  }

  return (
    <div>
      <PageHeader
        title="My appointments"
        description="All your bookings across facilities — upcoming visits and full history with live status."
        actions={
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctor, hospital or ID"
              className="pl-9"
            />
          </div>
        }
      />

      {!hydrated ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Loading appointments…</Card>
      ) : (
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4 space-y-3">
            {upcoming.length === 0 ? (
              <EmptyState label="No upcoming appointments." />
            ) : (
              upcoming.map((b) => (
                <BookingRow key={b.id} b={b} onStatus={setStatus} onRemove={removeBooking} />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-4 space-y-3">
            {past.length === 0 ? (
              <EmptyState label="No past appointments yet." />
            ) : (
              past.map((b) => (
                <BookingRow key={b.id} b={b} onStatus={setStatus} onRemove={removeBooking} />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <Card className="flex flex-col items-center gap-2 p-10 text-center">
      <CalendarX className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}

function BookingRow({
  b,
  onStatus,
  onRemove,
}: {
  b: Booking;
  onStatus: (b: Booking, s: BookingStatus) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
            <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
          </div>
          <div className="mt-1 text-lg font-semibold">{b.doctor}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Stethoscope className="h-3.5 w-3.5" />{b.specialty}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{b.hospital}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{b.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{b.time}</span>
          </div>
          {b.previousSlot ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Rescheduled from {b.previousSlot.date} at {b.previousSlot.time}
            </p>
          ) : null}
          {b.status === "Cancelled" && b.cancelReason ? (
            <p className="mt-2 text-xs text-destructive">Cancelled — {b.cancelReason}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {b.status !== "Cancelled" && b.status !== "Completed" ? (
            <>
              <RescheduleAppointmentDialog booking={b} />
              <CancelAppointmentDialog booking={b} />
            </>
          ) : null}
          <Select value={b.status} onValueChange={(v) => onStatus(b, v as BookingStatus)}>
            <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={() => onRemove(b.id)}>Remove</Button>
        </div>
      </div>
    </Card>
  );
}
