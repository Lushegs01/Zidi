import { z } from "zod";
import { handleSubmission } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please add an email address.")
    .max(160)
    .pipe(z.email("That email address doesn't look right — check for a typo.")),
  company: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: newsletterSchema,
    kind: "newsletter",
    limit: 4,
  });
}
