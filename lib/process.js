// Load modules

var Hoek = require('hoek');
var Utils = require('./utils');


// Declare internals

var internals = {};


module.exports.Monitor = internals.ProcessMonitor = function () {

    Utils.inheritAsync(internals.ProcessMonitor, process, ['uptime', 'memoryUsage']);
};


internals.ProcessMonitor.prototype.memory = function (callback) {

    return callback(null, process.memoryUsage());
};


internals.ProcessMonitor.prototype.delay = function (callback) {

    var bench = new Hoek.Bench();
    setImmediate(function () {

        return callback(null, bench.elapsed());
    });
};

/**
 * Return process leaks
 *
 * @param {Function} callback function to process result
 * @api public
 */
internals.ProcessMonitor.prototype.leaks = function (callback) {

    var loggedLeaks = Hoek.clone(this._leaks);
    this._leaks = [];

    callback(null, loggedLeaks);
};


internals.ProcessMonitor.prototype.gcCount = function (callback) {

    callback(null, this._gcCount);
    this._gcCount = 0;
};
