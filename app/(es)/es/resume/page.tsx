import ResumePage, { resumeMetadata } from "@/app/components/ResumePage";

export const metadata = resumeMetadata("es", "designed");

export default function Page() {
  return <ResumePage locale="es" variant="designed" />;
}
