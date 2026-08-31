import { matchEnquirySchema } from "@/lib/validation";
import { handleSubmission } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: matchEnquirySchema,
    kind: "enquiry",
    limit: 5,
  });
}
