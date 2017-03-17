// Code to debug
import {getNWeeks} from '../src/week';

const TEST_DATE = '03.01.2017';
const MONTH = 4;

const week = getNWeeks({date: TEST_DATE, numOfWeeks: MONTH});
console.log(week);