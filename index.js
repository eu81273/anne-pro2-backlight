const HID = require('node-hid');

const { path } = HID.devices().filter(device => device.manufacturer === 'OBINLB').shift();
const device = new HID.HID(path);

// uploadKbdLayer
device.write([ 123, 16, 49, 16, 3, 1, 2, 125, 16, 2, 0 ]);
// previewLightEffect
device.write([ 123,
    16,
    65,
    16,
    40,
    1,
    2,
    125,
    32,
    3,
    0,
    6,
    255,
    0,
    0,
    255,
    128,
    0,
    255,
    255,
    0,
    128,
    255,
    0,
    0,
    255,
    0,
    0,
    255,
    128, 
    0,
    255,
    255,
    0,
    128,
    255,
    0,
    0,
    255,
    128,
    0,
    255,
    255,
    0,
    255,
    255,
    0,
    128 ]);

setTimeout(device.close.bind(device), 1000);
