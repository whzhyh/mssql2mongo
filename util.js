exports.build_sql_query = function (rule) {
    var query_string = [];
    query_string.push("SELECT");
    if (rule.count) {
        query_string.push("TOP " + rule.count);
    }
    if (rule.columns) {
        query_string.push(rule.columns.join(", "));
    }
    else {
        query_string.push("*")
    }
    query_string.push("FROM");
    query_string.push(rule.sql_table);
    return query_string.join(" ");
}