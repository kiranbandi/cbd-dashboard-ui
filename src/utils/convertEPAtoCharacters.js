export default (epa) => {
    let epaParts = epa.split('.');
    return ((epaParts[0] == '1' ? 'TD' :
        epaParts[0] == '2' ? 'F' :
            epaParts[0] == '3' ? 'C' : 'TP') + epaParts[1]);
}; 