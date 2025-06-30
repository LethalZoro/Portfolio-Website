

import { PageInfo } from "../typings";
import { pageInfo } from "../data/personalData";

export const fetchPageInfo = (): PageInfo => {
    return pageInfo;
};