import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-primitives";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { appointments, doctors } from "@/lib/mock-data";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/_app/appointments")({
  head: () => ({ meta: [{ title: "Appointments · NHIMS" }] }),
  component: Appointments,
});

function Appointments() {
  const [list, setList] = useState(appointments);
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState(doctors[0].name);
  const [date, setDate] = useState("2026-07-25");
  const [time, setTime] = useState("10:00");

  function book() {
    const doc = doctors.find((d) => d.name === doctor)!;
    setList([
      { id: `A-${500 + list.length + 1}`, patient: "Rahim Uddin", patientId: "P-10001", doctor: doc.name, specialty: doc.specialty, date, time, status: "Confirmed", hospital: doc.hospital },
      ...list,
    ]);
    toast.success("Appointment booked");
    setOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Appointments"
        description="View, book, and manage appointments across facilities."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-brand text-white"><Plus className="mr-1 h-4 w-4" />Book</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Book new appointment</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Doctor</Label>
                  <Select value={doctor} onValueChange={setDoctor}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {doctors.map((d) => (
                        <SelectItem key={d.id} value={d.name}>{d.name} — {d.specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Date</Label><Input type="date" className="mt-1.5" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
                  <div><Label>Time</Label><Input type="time" className="mt-1.5" value={time} onChange={(e)=>setTime(e.target.value)} /></div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                <Button onClick={book} className="gradient-brand text-white">Confirm booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Hospital</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                  <td className="px-4 py-3 font-medium">{a.patient}</td>
                  <td className="px-4 py-3">{a.doctor}<div className="text-xs text-muted-foreground">{a.specialty}</div></td>
                  <td className="px-4 py-3">{a.hospital}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />{a.date} · {a.time}</div></td>
                  <td className="px-4 py-3"><Badge variant={a.status === "Completed" ? "secondary" : a.status === "Pending" ? "outline" : "default"}>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
