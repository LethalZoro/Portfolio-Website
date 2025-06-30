

import { Project } from "../typings";
import { projects } from "../data/personalData";

export const fetchProjects = (): Project[] => {
    return projects;
};