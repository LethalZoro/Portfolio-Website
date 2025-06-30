import { Social } from "../typings";
import { socials } from "../data/personalData";

export const fetchSocials = (): Social[] => {
    return socials;
};;
