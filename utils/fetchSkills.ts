

import { Skill } from "../typings";
import { skills } from "../data/personalData";

export const fetchSkills = (): Skill[] => {
    return skills;
};