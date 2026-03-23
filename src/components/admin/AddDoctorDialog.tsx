import { useCreateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import ImageUpload from "../ImageUpload";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const createDoctorMutation = useCreateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleSave = () => {
    if (!uploadedImageUrl) return;

    createDoctorMutation.mutate(
      {
        ...newDoctor,
        imageUrl: uploadedImageUrl,
      },
      { onSuccess: handleClose },
    );
  };

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
    });
    setImageFile(null);
    setUploadedImageUrl("");
    setImageLoadingState(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-140">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Add a new doctor to your practice.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageLoadingState={imageLoadingState}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                placeholder="Dr. John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor.speciality}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, speciality: e.target.value })
                }
                placeholder="General Dentistry"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email">Email *</Label>
            <Input
              id="new-email"
              type="email"
              value={newDoctor.email}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, email: e.target.value })
              }
              placeholder="doctor@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              value={newDoctor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="017XXXXXXXX"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newDoctor.gender}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, gender: value as Gender })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.speciality ||
              !imageFile ||
              !uploadedImageUrl ||
              imageLoadingState ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDoctorDialog;
