import { addBooking } from "@/lib/booking-store";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Languages,
  BadgeCheck,
  Calendar as CalendarIcon,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  rating: number;
  experience: string;
  bmdc: string;
  fee: string;
  languages: string[];
  phone: string;
  email: string;
  chamber: string;
  hours: { day: string; time: string }[];
  bio: string;
  initials: string;
  color: string;
};

const DOCTORS: Doctor[] = [
  {
    id: "D-2145",
    name: "Dr. Ayesha Karim",
    specialty: "Cardiology",
    hospital: "Dhaka Medical College Hospital",
    city: "Dhaka",
    rating: 4.9,
    experience: "14 years",
    bmdc: "BMDC-A-45218",
    fee: "৳1,200",
    languages: ["Bangla", "English"],
    phone: "+880 1711 223 344",
    email: "ayesha.karim@nhims.bd",
    chamber: "Popular Diagnostic, Dhanmondi, Dhaka",
    hours: [
      { day: "Sat – Wed", time: "5:00 PM – 9:00 PM" },
      { day: "Thursday", time: "10:00 AM – 1:00 PM" },
      { day: "Friday", time: "Closed" },
    ],
    bio: "Senior consultant cardiologist specialising in interventional cardiology, hypertension management and preventive heart care.",
    initials: "AK",
    color: "from-rose-500 to-red-500",
  },
  {
    id: "D-2146",
    name: "Dr. Tanvir Hasan",
    specialty: "General Medicine",
    hospital: "Square Hospital",
    city: "Dhaka",
    rating: 4.7,
    experience: "10 years",
    bmdc: "BMDC-A-51890",
    fee: "৳900",
    languages: ["Bangla", "English", "Hindi"],
    phone: "+880 1811 556 677",
    email: "tanvir.hasan@nhims.bd",
    chamber: "Square Hospital OPD, Panthapath, Dhaka",
    hours: [
      { day: "Sun – Thu", time: "9:00 AM – 2:00 PM" },
      { day: "Sat", time: "3:00 PM – 6:00 PM" },
      { day: "Friday", time: "Closed" },
    ],
    bio: "General physician with focus on chronic disease management, seasonal illness and family medicine.",
    initials: "TH",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "D-2147",
    name: "Dr. Shirin Akter",
    specialty: "Endocrinology",
    hospital: "United Hospital",
    city: "Dhaka",
    rating: 4.8,
    experience: "12 years",
    bmdc: "BMDC-A-48012",
    fee: "৳1,500",
    languages: ["Bangla", "English"],
    phone: "+880 1912 334 455",
    email: "shirin.akter@nhims.bd",
    chamber: "United Hospital, Gulshan-2, Dhaka",
    hours: [
      { day: "Sat, Mon, Wed", time: "6:00 PM – 9:00 PM" },
      { day: "Sun, Tue", time: "By appointment" },
      { day: "Friday", time: "Closed" },
    ],
    bio: "Endocrinologist and diabetes specialist. Manages thyroid disorders, PCOS and long-term diabetes care.",
    initials: "SA",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "D-2148",
    name: "Dr. Mahmud Rahman",
    specialty: "Pediatrics",
    hospital: "Apollo Hospitals Dhaka",
    city: "Dhaka",
    rating: 4.6,
    experience: "9 years",
    bmdc: "BMDC-A-55341",
    fee: "৳1,000",
    languages: ["Bangla", "English"],
    phone: "+880 1611 445 566",
    email: "mahmud.rahman@nhims.bd",
    chamber: "Apollo Hospitals, Bashundhara, Dhaka",
    hours: [
      { day: "Sat – Thu", time: "4:00 PM – 8:00 PM" },
      { day: "Friday", time: "10:00 AM – 12:00 PM" },
    ],
    bio: "Pediatric consultant caring for newborns, infants and adolescents. Special interest in vaccination and growth monitoring.",
    initials: "MR",
    color: "from-amber-500 to-orange-500",
  },
];

export function DoctorDirectory() {
  const [active, setActive] = useState<Doctor | null>(null);
  const [booking, setBooking] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState<string | undefined>();
  const [confirmed, setConfirmed] = useState<
    { doctor: string; date: string; time: string; ref: string } | null
  >(null);

  function openBooking(d: Doctor) {
    setActive(null);
    setBookingDate(undefined);
    setBookingTime(undefined);
    setConfirmed(null);
    setBooking(d);
  }

  function closeBooking() {
    setBooking(null);
    setBookingDate(undefined);
    setBookingTime(undefined);
    setConfirmed(null);
  }

  function confirmBooking() {
    if (!booking || !bookingDate || !bookingTime) return;
    const ref = `APT-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = format(bookingDate, "PPP");
    addBooking({
      id: ref,
      doctor: booking.name,
      specialty: booking.specialty,
      hospital: booking.chamber,
      date: format(bookingDate, "yyyy-MM-dd"),
      time: bookingTime,
      status: "Pending",
    });
    setConfirmed({ doctor: booking.name, date, time: bookingTime, ref });
    toast.success("Appointment requested", {
      description: `${booking.name} · ${date} at ${bookingTime}`,
    });
  }


  return (
    <section className="border-t bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">
            Featured physicians
          </div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Browse doctor profiles
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tap any doctor to see specialty, chamber hours and contact information.
            Every profile is verified against the BMDC registry.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d) => (
            <Card
              key={d.id}
              className="group flex flex-col overflow-hidden border-border/60 p-0 transition hover:border-primary/40 hover:shadow-lg"
            >
              <div className={`relative h-28 bg-gradient-to-br ${d.color}`}>
                <div className="absolute -bottom-8 left-5 grid h-16 w-16 place-items-center rounded-full border-4 border-background bg-background text-xl font-bold text-foreground shadow">
                  {d.initials}
                </div>
                <Badge className="absolute right-3 top-3 gap-1 bg-white/95 text-foreground hover:bg-white">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  {d.rating}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5 pt-10">
                <div className="text-base font-semibold">{d.name}</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-primary">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {d.specialty}
                </div>
                <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span className="line-clamp-2">{d.hospital}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() => setActive(d)}
                >
                  View profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <div className={`-mx-6 -mt-6 mb-2 h-24 bg-gradient-to-br ${active.color}`} />
              <div className="-mt-16 mb-2 flex items-end gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-background bg-background text-2xl font-bold shadow">
                  {active.initials}
                </div>
                <div className="pb-1">
                  <Badge variant="secondary" className="gap-1">
                    <BadgeCheck className="h-3 w-3 text-primary" />
                    BMDC verified
                  </Badge>
                </div>
              </div>

              <DialogHeader className="text-left">
                <DialogTitle className="text-xl">{active.name}</DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <Stethoscope className="h-3.5 w-3.5" />
                    {active.specialty}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{active.experience} experience</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {active.rating}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm text-muted-foreground">{active.bio}</p>

              <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="font-medium">{active.hospital}</div>
                    <div className="text-xs text-muted-foreground">{active.chamber}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Languages className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="text-xs text-muted-foreground">
                    Speaks {active.languages.join(", ")}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="text-xs text-muted-foreground">
                    License: <span className="font-medium text-foreground">{active.bmdc}</span>
                    <span className="mx-2">·</span>
                    Fee: <span className="font-medium text-foreground">{active.fee}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Clock className="h-4 w-4 text-primary" /> Working hours
                </div>
                <div className="divide-y overflow-hidden rounded-lg border">
                  {active.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between px-3 py-2 text-sm"
                    >
                      <span className="font-medium">{h.day}</span>
                      <span className="text-muted-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold">Contact</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <a
                    href={`tel:${active.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 rounded-lg border p-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="truncate">{active.phone}</span>
                  </a>
                  <a
                    href={`mailto:${active.email}`}
                    className="flex items-center gap-2 rounded-lg border p-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="truncate">{active.email}</span>
                  </a>
                </div>
              </div>

              <Button
                className="gradient-brand mt-2 w-full text-white"
                onClick={() => openBooking(active)}
              >
                <CalendarIcon className="mr-1 h-4 w-4" /> Book appointment
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking dialog */}
      <Dialog open={!!booking} onOpenChange={(o) => !o && closeBooking()}>
        <DialogContent className="max-w-md">
          {booking && !confirmed && (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Book appointment
                </DialogTitle>
                <DialogDescription>
                  With <span className="font-medium text-foreground">{booking.name}</span> ·{" "}
                  {booking.specialty} · Fee {booking.fee}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <div className="mb-1.5 text-sm font-medium">Select date</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !bookingDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDate ? format(bookingDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={bookingDate}
                        onSelect={setBookingDate}
                        disabled={(d) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return d < today;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <div className="mb-1.5 text-sm font-medium">Select time</div>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <Button
                        key={t}
                        type="button"
                        size="sm"
                        variant={bookingTime === t ? "default" : "outline"}
                        onClick={() => setBookingTime(t)}
                        className={cn(
                          "h-9",
                          bookingTime === t && "gradient-brand text-white",
                        )}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{booking.chamber}</span>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="ghost" onClick={closeBooking}>
                  Cancel
                </Button>
                <Button
                  className="gradient-brand text-white"
                  disabled={!bookingDate || !bookingTime}
                  onClick={confirmBooking}
                >
                  Confirm request
                </Button>
              </DialogFooter>
            </>
          )}

          {booking && confirmed && (
            <>
              <div className="flex flex-col items-center gap-3 py-2 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Appointment requested
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    We'll notify you once {booking.name} confirms your slot.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="grid gap-2 rounded-lg border bg-muted/30 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono font-medium">{confirmed.ref}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-medium">{confirmed.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{confirmed.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{confirmed.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-medium">{booking.fee}</span>
                </div>
              </div>

              <DialogFooter className="gap-2 sm:gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setConfirmed(null);
                    setBookingDate(undefined);
                    setBookingTime(undefined);
                  }}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Book another
                </Button>
                <Button className="gradient-brand text-white" onClick={closeBooking}>
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
