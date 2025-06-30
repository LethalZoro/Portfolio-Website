
import { Experience } from "../typings";
import { experiences } from "../data/personalData";

export const fetchExperiences = (): Experience[] => {
    return experiences;
};