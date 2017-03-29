import {getMonth, getNestedMonth} from '../src/month';

const TEST_DATE = '03/01/2017';

const month = getMonth({startDate: TEST_DATE});

console.log(month);