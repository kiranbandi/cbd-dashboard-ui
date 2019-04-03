var utility = {};

utility.customFilter = function(filter, rows) {
    rows[filter.id] = rows[filter.id] || '';
    filter.value = filter.value || '';
    return rows[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
}

module.exports = utility;