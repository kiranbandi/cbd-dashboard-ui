/*global $ */
export default (file, nonArrayType = false) => {
    return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        }
        reader.onerror = () => {
            reject();
        }
        if (file) {
            if (nonArrayType) {
                reader.readAsText(file);
            } else {
                reader.readAsArrayBuffer(file);
            }

        } else {
            reject();
        }
    });
}