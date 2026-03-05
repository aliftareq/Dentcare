import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

function NoNextAppointments() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-center py-3 pb-1">
        <CardTitle className="flex flex-col md:flex-row items-center justify-center gap-1 text-center">
          <CalendarIcon className="size-5 text-primary" />
          <span>Next Appointment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-4">
        <div className="text-center text-muted-foreground space-y-3">
          <div className="w-12 h-12 bg-muted/30 rounded-xl flex items-center justify-center mx-auto">
            <CalendarIcon className="size-6 opacity-50" />
          </div>
          <p className="text-sm">No upcoming appointments</p>
          <Link href="/appointments" className="block">
            <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
              Schedule Your Next Visit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoNextAppointments;