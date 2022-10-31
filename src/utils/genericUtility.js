var utility = {};

utility.customFilter = function(filter, rows) {
    rows[filter.id] = rows[filter.id] || '';
    filter.value = filter.value || '';
    return String(rows[filter.id]).toLowerCase().indexOf(String(filter.value).toLowerCase()) > -1;
}

module.exports = utility;