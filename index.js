const HID = require('node-hid');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDevices () {
    return HID.devices()
        .filter(device => device.manufacturer === 'OBINLB')
        .map(({ path }) => {
            try {
                const device = new HID.HID(path);

                device.readTimeout(100);
                device.on('data', _ => device.close() | process.kill(process.pid));
                device.on('error', _ => null);

                return device;
            } catch (e) {
                return null;
            }
        })
        .filter(i => i);
}

! async function () {
    const devices = await getDevices();

    for (let device of devices) {
        if (device) {
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
        }
    }
} ()
