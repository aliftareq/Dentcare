import { NextResponse } from "next/server";
import { imageUploadUtil } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("my_file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const b64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${b64}`;

    const result = await imageUploadUtil(dataURI);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
      },
      { status: 500 }
    );
  }
}