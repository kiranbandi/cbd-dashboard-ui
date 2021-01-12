export default (epa) => {
    let epaParts = epa.split('.');
    return ((epaParts[0] == 'D' ? '1' :
        epaParts[0] == 'F' ? '2' :
            epaParts[0] == 'C' ? '3' : 'P') + '.' + epaParts[1]);
}; 