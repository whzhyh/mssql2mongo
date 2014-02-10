exports.config = {
    mongodb: "mongodb://localhost/newtest",
    mssqlconfig: {
        userName: 'sa',
        password: 'rgywhzh',
        server: '10.211.55.8'
    },
    rules: [
        {
            "sql_table": "GroupData10.dbo.Group901",
            "count": 2, // This value will be translated to "TOP 2". If not specified, it will query all rows;
            "mongodb_table": "group",
            "columns": ["QQNum", "Nick", "QunNum"] // If not specified, it will use '*' by default.
        },
        {
            "sql_table": "GroupData10.dbo.Group902",
            "count": 11,
            "mongodb_table": "group",
            "columns": ["QQNum", "Nick", "QunNum"]
        },
        {
            "sql_table": "QunInfo1.dbo.QunList1",
            "count": 11,
            "mongodb_table": "qun"
        }
    ]
};

