import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

export default async function WelcomeSection() {
  const user = await currentUser();

  return (
    <div
      className="relative z-10 
      flex flex-col md:flex-row 
      items-center justify-center md:justify-between 
      text-center md:text-left
      bg-linear-to-br from-primary/10 via-primary/5 to-background 
      rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden"
    >
      <div className="space-y-4">
        {/* Status Badge */}
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="size-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              Online & Ready
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
                ? "afternoon"
                : "evening"}
            , {user?.firstName}!
          </h1>

          <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
            Your personal AI dental assistant is ready to help you maintain
            perfect oral health.
          </p>
        </div>
      </div>

      {/* Logo (unchanged behavior) */}
      <div className="hidden lg:flex items-center justify-center size-32 bg-linear-to-br from-primary/20 to-primary/10 rounded-full mt-6 md:mt-0">
        <Image
          src="/logo.png"
          alt="Dentcare"
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </div>
    </div>
  );
}
