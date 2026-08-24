import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Marquee from "@/components/ui/Marquee";
import { skillRows } from "@/content/data";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-[14vh]">
      <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-12">
        <SectionHeading index="04" title="Stack" />
      </div>

      <div className="flex flex-col gap-7">
        <FadeIn>
          <Marquee items={skillRows[0]} />
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="-rotate-[1.3deg] scale-x-[1.02]">
            <Marquee items={skillRows[1]} reverse />
          </div>
        </FadeIn>
        <FadeIn delay={0.16}>
          <Marquee items={skillRows[2]} />
        </FadeIn>
      </div>
    </section>
  );
}
