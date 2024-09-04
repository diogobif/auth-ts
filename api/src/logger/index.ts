import logger from "pino";
import { pid } from "process";

const log = logger({
  base: {
    pid: false,
  },
});

export default log;
