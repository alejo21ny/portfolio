import CaseStudyPage, { caseStudyMetadata, caseStudyParams } from "@/app/components/CaseStudyPage";

export const dynamicParams = false;
export const generateStaticParams = caseStudyParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return caseStudyMetadata("en", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CaseStudyPage locale="en" slug={(await params).slug} />;
}
