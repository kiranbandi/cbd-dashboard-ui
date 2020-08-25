import { default as EM } from './programs/EM';
import { default as ANESTHESIA } from './programs/ANESTHESIA';
import { default as OBGYN } from './programs/OBGYN';
import { default as PATH } from './programs/PATH';
import { default as IM } from './programs/IM';
import { default as GIM } from './programs/GIM';
import { default as SURGFND } from './programs/SURGFND';
import { default as NEURO } from './programs/NEURO';
import { default as NEUROG } from './programs/NEUROG';
import { default as PMR } from './programs/PMR';
import { default as PSYCH } from './programs/PSYCH';
import { default as ORTHOSURG } from './programs/ORTHOSURG';
import { default as UNDERGRADUATE } from './programs/UNDERGRADUATE';

// populate program info with multiple department information and export it
const PROGRAM_INFO = {
    EM,
    ANESTHESIA,
    OBGYN,
    PATH,
    GIM,
    IM,
    NEURO,
    NEUROG,
    SURGFND,
    PMR,
    PSYCH,
    ORTHOSURG,
    UNDERGRADUATE
};

export { PROGRAM_INFO };
export { default as ROTATION_SCHEDULE_MAP }
from './ROTATION_SCHEDULE_MAP';
export { default as UG_ROTATION_MAP }
from './UG_ROTATION_MAP';
export { default as CARDS_LIST }
from './CARDS_LIST';
export { default as PHASES_LIST }
from './PHASES_LIST';
export { default as PROGRAM_LIST }
from './PROGRAM_LIST';