import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@prisma/client";

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Card className="mb-12">
        {/* Header: stack on mobile, row on md+ */}
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2">
              <StethoscopeIcon className="size-5 text-primary" />
              Doctors Management
            </CardTitle>
            <CardDescription>
              Manage and oversee all doctors in your practice
            </CardDescription>
          </div>

          {/* Button full-width on mobile, normal on md+ */}
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full md:w-auto bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
          >
            <PlusIcon className="mr-2 size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col gap-4 p-4 bg-muted/30 rounded-xl border border-border/50 sm:flex-row sm:items-start sm:justify-between"
              >
                {/* Left section */}
                <div className="flex min-w-0 items-start gap-4">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover ring-2 ring-background"
                  />

                  <div className="min-w-0">
                    <div className="font-semibold truncate">{doctor.name}</div>

                    {/* speciality + gender: wrap nicely */}
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">{doctor.speciality}</span>
                      <span className="px-2 py-0.5 bg-muted rounded text-xs shrink-0">
                        {doctor.gender === "MALE" ? "Male" : "Female"}
                      </span>
                    </div>

                    {/* email + phone: stack on mobile, row on md+ */}
                    <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                      <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                        <MailIcon className="h-3 w-3 shrink-0" />
                        <span className="min-w-0 truncate">{doctor.email}</span>
                      </div>

                      <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="h-3 w-3 shrink-0" />
                        <span className="min-w-0 truncate">{doctor.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right section: wrap and align for mobile/tablet */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
                  {/* Appointments column */}
                  <div className="flex flex-col items-center text-center">
                    <div className="font-semibold text-primary">
                      {doctor.appointmentCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Appointments
                    </div>
                  </div>

                  {/* Status column */}
                  <div className="flex justify-center">
                    {doctor.isActive ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>

                  {/* Action column */}
                  <div className="flex justify-center sm:justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 w-full sm:w-auto px-3"
                      onClick={() => handleEditDoctor(doctor)}
                    >
                      <EditIcon className="size-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id} // advanced react rule
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}

export default DoctorsManagement;
