var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;

var mongoose = require('mongoose');
var util = require('./util.js');
var config = require('./config.js').config;

require('./models.js');
var Group = mongoose.model('Group');
var counter = 1;


var pool = new ConnectionPool({}, config.sqlconfig);
config.transform.forEach(function (item) {
    pool.requestConnection(function (err, connection) {
        if (!err) {

            var query = util.build_sql_query(item.sql_table, item.count);
            request = new Request(query, function (err, rowCount) {
                connection.close();
                if (err) {
                    console.log(err);
                } else {
                    console.log(rowCount + ' rows');
                }
            });
            request.on('row', function (columns) {
                var group = new Group();

                columns.forEach(function (column) {
                    if (column.metadata.colName === 'QQNum') {
                        group.QQNum = column.value;
                    } else if (column.metadata.colName === 'Nick') {
                        group.Nick = column.value;
                    } else if (column.metadata.colName === 'QunNum') {
                        group.QunNum = column.value;
                    }
                });

                group.save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(counter++);
                    }
                })
            });

            connection.on('connect', function (err) {
                connection.execSql(request);
            })
        }
    });
});