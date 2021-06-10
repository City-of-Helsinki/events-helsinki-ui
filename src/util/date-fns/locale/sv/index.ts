import { sv } from 'date-fns/locale';

import buildLocalizeFn from '../buildLocalizeFn';

const dayValues = {
  abbreviated: ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'],
  narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  short: ['sö', 'må', 'ti', 'ons', 'to', 'fre', 'lö'],
  wide: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'],
};

if (sv.localize?.day) {
  sv.localize.day = buildLocalizeFn({
    defaultWidth: 'wide',
    values: dayValues,
  });
}

export default sv;
