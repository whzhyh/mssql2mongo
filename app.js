var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var mongoose = require('mongoose');

var util = require('./util.js');
var config = require('./config.js').config;
var type_mapping = require('./type_mapping.js');

var Schema = mongoose.Schema;
var pool = new ConnectionPool({}, config.mssqlconfig);
var counter = 1;

mongoose.connect(config.mongodb);

config.rules.forEach(function (rule) {
    pool.requestConnection(function (err, connection) {
        if (!err) {
            var query = util.build_sql_query(rule);
            var m_schema, schema = {}, Model;
            
            request = new Request(query, function (err, rowCount) {
                connection.close();
                if (err) {
                    console.log(err);
                } else {
                    console.log(rowCount + ' rows');
                }
            });

            request.on("columnMetadata", function (columns) {
                columns.forEach(function (item) {
                    schema[item.colName] = type_mapping[item.type.name];
                });

                m_schema = new Schema(schema);

                if (mongoose.modelNames().indexOf(rule.mongodb_table) === -1) {
                    Model = mongoose.model(rule.mongodb_table, m_schema);
                } else {
                    Model = mongoose.model(rule.mongodb_table);
                }

            });

            request.on('row', function (columns) {
                var model = new Model();

                columns.forEach(function (column) {
                    if (schema.hasOwnProperty(column.metadata.colName)) {
                        model[column.metadata.colName] = column.value;
                    }
                });

                model.save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(counter++);
                    }
                });
            });

            connection.on('connect', function (err) {
                connection.execSql(request);
            })
        }
    });
});