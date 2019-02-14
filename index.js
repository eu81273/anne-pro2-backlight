const HID = require('node-hid');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDevices () {
    return HID.devices()
        .filter(device => device.manufacturer === 'OBINLB')
        .map(device => device.path)
        .map(path => {
            try {
                const device = new HID.HID(path);

                device.readTimeout(100);
                device.on('data', _ => device.close() | process.kill(process.pid));
                // device.on('data', d => console.log(d.map(i => i.toString()).join(' ')));
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
            // [123, 16, o, 16, a.length, 1, 2, 125];
            // o : (e, t) => (t << 4) + e
            // a : additional data
            device.write([ 123, 16, 49, 16, 3, 1, 2, 125, 32, 5, 0 ]); // F9
            // device.write([ 123, 16, 49, 16, 3, 1, 2, 125, 32, 1, 0 ]); // F10
            setTimeout(device.close.bind(device), 500);
        }
    }
} ()
