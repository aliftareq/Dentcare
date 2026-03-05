import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BrainIcon, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

async function DentalHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  return (
    <Card className="lg:col-span-2 w-full max-w-full overflow-hidden">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
          <BrainIcon className="size-5 text-primary" />
          <span>Your Dental Health</span>
        </CardTitle>
        <CardDescription>
          Keep track of your dental care journey
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 bg-muted/30 rounded-xl min-w-0">
            <div className="text-2xl font-bold text-primary mb-1 truncate">
              {appointmentStats.completedAppointments}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              Completed Visits
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl min-w-0">
            <div className="text-2xl font-bold text-primary mb-1 truncate">
              {appointmentStats.totalAppointments}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              Total Appointments
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl min-w-0">
            <div className="text-2xl font-bold text-primary mb-1 truncate">
              {format(new Date(user?.createdAt!), "MMM yyyy")}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              Member Since
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-linear-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center text-center sm:text-left gap-3 min-w-0">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquareIcon className="size-5 text-primary" />
            </div>

            <div className="min-w-0 w-full flex flex-col items-center sm:items-start">
              <h4 className="font-semibold text-primary mb-1">
                Ready to get started?
              </h4>

              <p className="text-sm text-muted-foreground mb-3 wrap-break-word max-w-md">
                Book your first appointment or try our AI voice assistant for
                instant dental advice.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-center sm:justify-start">
                <Link href="/voice" className="w-full sm:w-auto">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                  >
                    Try AI Assistant
                  </Button>
                </Link>

                <Link href="/appointments" className="w-full sm:w-auto">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;
