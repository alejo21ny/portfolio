import ResumePage, { resumeMetadata } from "@/app/components/ResumePage";

export const metadata = resumeMetadata("en", "ats");

export default function Page() {
  return <ResumePage locale="en" variant="ats" />;
}
