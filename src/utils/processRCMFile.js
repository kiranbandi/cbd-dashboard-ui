import { read, utils } from 'xlsx';
import _ from 'lodash';
import moment from 'moment';


export default function (rawData) {
    return new Promise((resolve, reject) => {
        try {
            var workbook = read((new Uint8Array(rawData)), {
                type: 'array'
            }),
                epa_codes = utils.sheet_to_json(workbook.Sheets['EPA_CODES']),
                epa_assessments = utils.sheet_to_json(workbook.Sheets['EPA_ASSESSMENTS']);
            resolve({
                epa_codes,
                epa_assessments
            });
        } catch (e) { reject() };
    })
}
