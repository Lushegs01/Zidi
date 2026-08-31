import Image from "next/image";
import Link from "next/link";
import familiesImg from "@/assets/images/families.jpg";
import adultsImg from "@/assets/images/adults.jpg";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { CtaArrow } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";

const paths = [
  {
    href: "/families",
    image: familiesImg,
    alt: "A mother and her two children playing a board game together in their living room",
    eyebrow: "For families",
    title: "Give them more than a language.",
    body: "Lessons pitched to a child's age and attention, with a tutor who knows how to hold it. You're welcome to sit in — many parents do, for the first few minutes at least.",
    points: [
      "Children from age 5, teens, and siblings together",
      "DBS-checked tutors, video-only sessions",
      "Same slot each week, in your timezone",
    ],
    cta: "How it works for families",
  },
  {
    href: "/adults",
    image: adultsImg,
    alt: "A woman wearing headphones concentrating on a live lesson on her laptop",
    eyebrow: "For adult learners",
    title: "It's never too late to reconnect.",
    body: "Whether you're starting from nothing or picking up a language you half-remember, nobody here will make you feel behind. Most of our adult learners are doing exactly the same thing.",
    points: [
      "Complete beginners and rusty heritage speakers",
      "Conversation-led, at whatever pace suits you",
      "Evenings and weekends across eight timezones",
    ],
    cta: "How it works for adults",
  },
];

export function Pathways() {
  return (
    <Section size="lg" aria-labelledby="pathways-heading">
      <Container>
        <Reveal className="max-w-3xl">
          <IndexLabel index="05">Who it&rsquo;s for</IndexLabel>
          <h2 id="pathways-heading" className="mt-6 font-display text-d2">
            Two ways in. Same care either way.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-2 lg:gap-8">
          {paths.map((path, i) => (
            <Reveal key={path.href} delay={i * 90}>
              <Link
                href={path.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-shell shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-sand">
                  <Image
                    src={path.image}
                    alt={path.alt}
                    sizes="(max-width: 1023px) 92vw, 46vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04] motion-reduce:transform-none"
                    placeholder="blur"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-clay">
                    {path.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-d3">{path.title}</h3>
                  <p className="mt-4 text-ink-70">{path.body}</p>

                  <ul className="mt-6 space-y-2.5">
                    {path.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[0.9375rem] text-ink-70"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="group/btn mt-7 inline-flex items-center gap-2 pt-1 text-[0.9375rem] font-medium text-ink">
                    <span className="relative">
                      {path.cta}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-300 ease-out-soft group-hover:scale-x-100"
                      />
                    </span>
                    <CtaArrow className="h-4 w-4 text-clay" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
