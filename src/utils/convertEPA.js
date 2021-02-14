export function EPATextToNumber(epa='  ') {
    let epaParts = epa.split('');
    return ((epaParts[0] == 'D' ? '1' :
        epaParts[0] == 'F' ? '2' :
            epaParts[0] == 'C' ? '3' : '4') + '.' + epaParts.slice(1).join(''));
};

export function NumberToEPAText(epa='.') {
    let epaParts = epa.split('.');
    return ((epaParts[0] == '1' ? 'D' :
        epaParts[0] == '2' ? 'F' :
            epaParts[0] == '3' ? 'C' : 'P') + epaParts[1]);
}; 
