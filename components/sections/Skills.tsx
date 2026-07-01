import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Chip } from "@/components/ui/Chip";

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl px-5 py-[clamp(5rem,12vh,9rem)] sm:px-8"
    >
      <SectionHeading index="04" title="Skills" />

      <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
        {skillGroups.map((group) => (
          <Stagger key={group.label}>
            <StaggerItem>
              <h3 className="font-display-sub mb-4 text-lg text-text">
                {group.label}
              </h3>
            </StaggerItem>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <StaggerItem key={skill}>
                  <Chip>{skill}</Chip>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        ))}
      </div>
    </section>
  );
}
