import _ from 'lodash';
import html2canvas from 'html2canvas';
import computedStyleToInlineStyle from "computed-style-to-inline-style";
import jsPDF from 'jspdf';

export default function(fileName = 'download.pdf', isUG = false) {

    return new Promise(async(resolve, reject) => {
        try {

            // The content needs to fit the pdf 
            // so we set the pdf page size based on the its content everytime 
            // we add a new page
            // first we get the info box content and add it to the page (.print-info)
            // this has a constant width of 905px and a height of 425bx
            // because I like those numbers :-)
            // then we add each of the graphs (.faculty-graph-box) there are four of them
            // finally we add in the record table at the bottom


            // For undergraduate faculty dashboard we skip the expiry rate graph
            if (isUG) {
                getElementAsCanvas('.print-info', {}, 1)
                    .then((pdf) => getElementAsCanvas('.printable-graph-1', pdf, 2))
                    .then((pdf) => getElementAsCanvas('.printable-graph-3', pdf, 3))
                    .then((pdf) => getElementAsCanvas('.printable-graph-4', pdf, 4))
                    .then((pdf) => getElementAsCanvas('.table-box', pdf, 5))
                    .then((pdf) => {
                        pdf.save(fileName);
                        resolve();
                    })
            } else {
                getElementAsCanvas('.print-info', {}, 1)
                    .then((pdf) => getElementAsCanvas('.printable-graph-1', pdf, 2))
                    .then((pdf) => getElementAsCanvas('.printable-graph-2', pdf, 3))
                    .then((pdf) => getElementAsCanvas('.printable-graph-3', pdf, 4))
                    .then((pdf) => getElementAsCanvas('.printable-graph-4', pdf, 5))
                    .then((pdf) => getElementAsCanvas('.table-box', pdf, 6))
                    .then((pdf) => {
                        pdf.save(fileName);
                        resolve();
                    })
            }

        } catch (e) {
            reject(e);
        };
    })
}


function getElementAsCanvas(selector, pdfInstance, pageCount) {

    let pdfLocalCopy = _.clone(pdfInstance);

    return new Promise(async(resolve, reject) => {

        // get the element
        const element = document.querySelector(selector);
        // set the options to generate the canvas
        // apply the computed inline styling to the cloned dom
        const options = {
            backgroundColor: '#ffffff',
            scale: 1.5,
            scrollX: 0,
            scrollY: -window.scrollY,
            onclone: (clonedDoc) => {
                // After we clone the document, inline svg fill
                const container = clonedDoc.body.querySelector(selector);
                computedStyleToInlineStyle(container, {
                    recursive: true,
                    properties: ["fill"],
                });
            },
        }

        // call the canvas generating function
        html2canvas(element, options).then(canvas => {
            // every page size is different in the pdf generated to ensure we dont
            // have weird aspect ratio stretching in the generated file
            // so set the page height based on the generated canvas
            let width = canvas.width;
            let height = canvas.height;
            // for the first content use pdf as is and for every other content
            // add a new page based on the content dimensions
            if (pageCount == 1) {
                pdfLocalCopy = new jsPDF('l', 'px', [width, height]);

            } else {
                // For the first page we hardcode the page size 
                pdfLocalCopy.addPage([width, height]);
            }
            //then we get the dimensions from the 'pdf' file itself
            width = pdfLocalCopy.internal.pageSize.getWidth();
            height = pdfLocalCopy.internal.pageSize.getHeight();
            // add the canvas as an image onto the pdf
            pdfLocalCopy.addImage(canvas, 'PNG', 0, 0, width, height);
            // resolve the promise with pdf instance
            resolve(pdfLocalCopy);
        });

    });

}