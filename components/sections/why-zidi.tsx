import Image from "next/image";
import heritage from "@/assets/images/heritage.jpg";
import { Container, IndexLabel, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

const carries = [
  { word: "Family", line: "The call home that doesn't need translating." },
  { word: "Identity", line: "Knowing where a name comes from, and what it means." },
  { word: "Stories", line: "Proverbs and jokes that only work in the original." },
  { word: "Confidence", line: "Speaking up at the party instead of smiling through it." },
];

export function WhyZidi() {
  return (
    <Section tone="kola" size="lg" aria-labelledby="why-zidi-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <IndexLabel index="01" onDark>
                Why Zidi
              </IndexLabel>
              <h2
                id="why-zidi-heading"
                className="mt-6 font-display text-d2 text-bone"
              >
                More than a lesson.
                <br />
                Something you can{" "}
                <em className="not-italic text-amber">carry with you</em>.
              </h2>
              <div className="mt-7 max-w-[48ch] space-y-5 text-lead text-bone/70">
                <p>
                  A language is rarely just vocabulary. It is the reason a grandmother&rsquo;s
                  voice on the phone feels close instead of far. It is the difference
                  between hearing your family and understanding them.
                </p>
                <p>
                  Most people who come to us are not trying to pass an exam. They are
                  trying to close a distance — one that opened up quietly, over a
                  generation or two, and matters more than they expected.
                </p>
              </div>
              <ButtonLink
                href="/about"
                variant="on-dark-outline"
                size="lg"
                withArrow
                className="mt-9"
              >
                Why we built Zidi
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7">
            <Reveal delay={80}>
              {/*
                The arch utility is applied here for the first time on the homepage.
                A portrait photograph inside an archway is a powerful cultural metaphor
                — a door frame, a threshold, the Zidi logo mark made large.
              */}
              <div className="relative overflow-hidden arch bg-kola-800 shadow-lift">
                <Image
                  src={heritage}
                  alt="A father reading with his baby daughter at the kitchen table while her grandmother looks on"
                  sizes="(max-width: 1023px) 92vw, 46vw"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {carries.map((item) => (
                  <div key={item.word} className="border-t border-amber/20 pt-4">
                    {/* Italic display serif for each concept word — maximum editorial impact */}
                    <dt className="font-display text-[1.75rem] italic leading-none text-amber">
                      {item.word}
                    </dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-bone/65">
                      {item.line}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
