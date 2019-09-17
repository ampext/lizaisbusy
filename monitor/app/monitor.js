const { Gpio } = require('pigpio');
const sqlite3 = require('sqlite3').verbose();

const eventTypeEnum = {
  SENSOR_OPEN: 0,
  SENSOR_CLOSE: 1,
  MONITOR_START: 2,
};

const db = new sqlite3.Database('./events.db', sqlite3.OPEN_READWRITE, () => {
  insertEvent(eventTypeEnum.MONITOR_START);
});

const sensor = new Gpio(4, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  alert: true,
});

sensor.glitchFilter(10000);
sensor.on('alert', insertValue);

function insertValue(value) {
  const eventType = value > 0 ? eventTypeEnum.SENSOR_CLOSE : eventTypeEnum.SENSOR_OPEN;
  insertEvent(eventType);
}

function insertEvent(eventType) {
  db.run('INSERT INTO events (type) VALUES ($type)', { $type: eventType });
}
