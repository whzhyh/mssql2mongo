exports.build_sql_query = function (table_name, count, columns) {
    var query_string = [];
    query_string.push("SELECT TOP " + count + " *");
    query_string.push("FROM");
    query_string.push(table_name);
    return query_string.join(" ");
}