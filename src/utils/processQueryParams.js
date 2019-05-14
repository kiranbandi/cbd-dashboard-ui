export default function() {
    let query = window.location.search;
    if (query.indexOf('ticket') == -1) {
        return {};
    } else {
        window.history.pushState({}, document.title, "/");
        return (/^[?#]/.test(query) ? query.slice(1) : query)
            .split('&')
            .reduce((params, param) => {
                let [key, value] = param.split('=');
                params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                return params;
            }, {});
    }
};