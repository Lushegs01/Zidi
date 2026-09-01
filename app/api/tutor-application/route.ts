import { tutorApplicationSchema } from "@/lib/validation";
import { handleSubmission } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: tutorApplicationSchema,
    kind: "tutor-application",
    limit: 3,
  });
}
