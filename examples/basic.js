// Basic usage examples
const { convert, format, revert } = require('redenominasi-idr');

console.log('=== Basic Conversion ===');
console.log('15000 →', convert(15000)); // 15
console.log('500 →', convert(500));     // 0.5
console.log('50 →', convert(50));       // 0.05

console.log('\n=== Formatting ===');
console.log('15000 →', format(15000));  // "Rp 15"
console.log('500 →', format(500));      // "Rp 0,5"
console.log('1500 →', format(1500));    // "Rp 1,5"

console.log('\n=== Revert ===');
console.log('15 →', revert(15));        // 15000
console.log('0.5 →', revert(0.5));      // 500

console.log('\n=== Custom Configuration ===');
console.log('With floor rounding:', convert(1555, { roundingMode: 'floor' })); // 1.55
console.log('With ceil rounding:', convert(1555, { roundingMode: 'ceil' }));   // 1.56
console.log('Custom symbol:', format(15000, { currencySymbol: 'IDR' }));       // "IDR 15"

console.log('\n=== Bulk Operations ===');
const { convertBulk, formatBulk } = require('redenominasi-idr');
const prices = [15000, 500, 1000, 2500];
console.log('Bulk convert:', convertBulk(prices));
console.log('Bulk format:', formatBulk(prices));
