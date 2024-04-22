import { map } from "lodash";
import { Season, StatusTypes } from "./constants";
import { formStatusLabels } from "./texts";

export const getSeasonOptions = () => map(Season, (type) => type);

export const getFormStatusTypes = () =>
  map(StatusTypes, (Status) => ({
    id: Status,
    label: formStatusLabels[Status]
  }));
