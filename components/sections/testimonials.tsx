import Image from "next/image";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

const ROLE_LABEL: Record<Testimonial["role"], string> = {
  parent: "Parent",
  "adult-learner": "Adult learner",
  tutor: "Tutor",
};

/**
 * Renders nothing until `data/testimonials.ts` holds real, permissioned quotes —
 * an empty grid is worse than no section, and invented quotes are worse than both.
 */
export function Testimonials({
  items = testimonials,
  index = "06",
  heading = "In their words.",
}: {
  items?: Testimonial[];
  index?: string;
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section size="lg" aria-labelledby="testimonials-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <IndexLabel index={index}>What learners say</IndexLabel>
          <h2 id="testimonials-heading" className="mt-6 font-display text-d2">
            {heading}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item.id}>
              <Reveal delay={i * 70}>
                <figure className="flex h-full flex-col rounded-lg border border-line bg-shell p-7 shadow-soft">
                  <blockquote className="flex-1 font-display text-[1.375rem] leading-[1.35] tracking-[-0.01em] text-ink">
                    <p>&ldquo;{item.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                    {item.photo ? (
                      <Image
                        src={item.photo}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand font-display text-[1.25rem] text-clay"
                      >
                        {item.name.charAt(0)}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block font-medium">{item.name}</span>
                      <span className="block text-[0.875rem] text-ink-50">
                        {ROLE_LABEL[item.role]} · {item.location}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
