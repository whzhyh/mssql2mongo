exports.config = {
    connection: "mongodb://localhost/newtest",
    sqlconfig: {
        userName: 'sa',
        password: 'rgywhzh',
        server: '10.211.55.8',

    },
    transform: [
        {
            "sql_table": "GroupData10.dbo.Group901",
            "count": 2,
            "mongo_table": "group"
        },
        {
            "sql_table": "GroupData10.dbo.Group902",
            "count": 11,
            "mongo_table": "group"
        }
    ]
};

