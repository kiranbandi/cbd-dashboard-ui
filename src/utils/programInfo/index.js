import { default as EM } from './programs/EM';
import { default as ANESTHESIA } from './programs/ANESTHESIA';
import { default as OBGYN } from './programs/OBGYN';
import { default as PATH } from './programs/PATH';

// populate program info with multiple department information and export its
const PROGRAM_INFO = { EM, ANESTHESIA, OBGYN, PATH };

export { PROGRAM_INFO };
export { default as ROTATION_SCHEDULE_MAP }
from './ROTATION_SCHEDULE_MAP';
export { default as CARDS_LIST }
from './CARDS_LIST';
export { default as PHASES_LIST }
from './PHASES_LIST';