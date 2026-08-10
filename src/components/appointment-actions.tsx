import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, CalendarClock, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cancelBooking, rescheduleBooking, type Booking } from "@/lib/booking-store";

const SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];

export function RescheduleAppointmentDialog({ booking }: { booking: Booking }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    if (open) {
      setDate(undefined);
      setTime("");
    }
  }, [open]);

  const sameSlot =
    !!date && format(date, "yyyy-MM-dd") === booking.date && time === booking.time;

  function confirm() {
    if (!date || !time) return;
    rescheduleBooking(booking.id, format(date, "yyyy-MM-dd"), time);
    setOpen(false);
    toast.success(`${booking.id} rescheduled`, {
      description: `New slot: ${format(date, "PPP")} at ${time} — awaiting confirmation.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CalendarClock className="h-4 w-4" />
          Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule appointment</DialogTitle>
          <DialogDescription>
            {booking.doctor} · currently {booking.date} at {booking.time}. Pick a new date and
            time — the booking returns to “Pending” until the facility confirms.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>New date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>New time slot</Label>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((s) => (
                <Button
                  key={s}
                  type="button"
                  size="sm"
                  variant={time === s ? "default" : "outline"}
                  onClick={() => setTime(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {sameSlot ? (
            <p className="text-xs text-destructive">
              This is the current slot. Choose a different date or time.
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Keep current slot</Button>
          <Button onClick={confirm} disabled={!date || !time || sameSlot}>
            Confirm reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const REASONS = [
  "Feeling better / no longer needed",
  "Schedule conflict",
  "Travelling out of the city",
  "Booked with another doctor",
];

export function CancelAppointmentDialog({ booking }: { booking: Booking }) {
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (open) setReason("");
  }, [open]);

  const valid = reason.trim().length >= 5;

  function confirm() {
    if (!valid) return;
    cancelBooking(booking.id, reason.trim());
    setOpen(false);
    toast.success(`${booking.id} cancelled`, {
      description: "The facility has been notified and the slot is released.",
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          <XCircle className="h-4 w-4" />
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
          <AlertDialogDescription>
            {booking.doctor} · {booking.date} at {booking.time}. Tell us briefly why — the reason is
            stored with the booking record.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {REASONS.map((r) => (
              <Button key={r} type="button" size="sm" variant="secondary" onClick={() => setReason(r)}>
                {r}
              </Button>
            ))}
          </div>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for cancellation (at least 5 characters)"
            rows={3}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Keep appointment</AlertDialogCancel>
          <AlertDialogAction
            disabled={!valid}
            onClick={(e) => {
              e.preventDefault();
              confirm();
            }}
          >
            Cancel appointment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
