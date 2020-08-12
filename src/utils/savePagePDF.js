import _ from 'lodash';
import html2canvas from 'html2canvas';
import computedStyleToInlineStyle from "computed-style-to-inline-style";
import jsPDF from 'jspdf';

export default function(fileName = 'download.pdf', isCondensed = false, isUG = false, dashboard = 'fac') {

    return new Promise(async(resolve, reject) => {
        try {
            switch (dashboard) {
                case 'fac':
                    processForFacultyDashboard(isUG, isCondensed, fileName, resolve);
                    break;
                default:
                    process(isUG, fileName, resolve);
                    break;
            }

        } catch (e) {
            reject(e);
        };
    })
}


function processForFacultyDashboard(isUG, isCondensed, fileName, resolve) {
    // The content needs to fit the pdf 
    // so we set the pdf page size based on the its content everytime 
    // we add a new page
    // first we get the info box content and add it to the page (.print-info)
    // this has a constant width of 1080px and a height of 425bx
    // because I like those numbers :-)
    // then we add each of the graphs (.faculty-graph-box) there are four of them
    // finally we add in the record table at the bottom

    // For undergraduate faculty dashboard we skip the expiry rate graph
    //  for condensed exports we skip the table-box 
    // to make it easy to understand lets just skip brevity here !!!
    if (isUG) {
        getElementAsCanvas('.print-info', {}, 1)
            .then((pdf) => getElementAsCanvas('.printable-graph-1', pdf, 2))
            .then((pdf) => getElementAsCanvas('.printable-graph-3', pdf, 3))
            .then((pdf) => getElementAsCanvas('.printable-graph-4', pdf, 4))
            .then((pdf) => {
                if (isCondensed) {
                    pdf.save(fileName);
                    resolve();
                } else {
                    return getElementAsCanvas('.table-box', pdf, 5);
                }
            })
            .then((pdf) => {
                if (pdf) {
                    pdf.save(fileName);
                    resolve();
                }
            });
    } else {
        getElementAsCanvas('.print-info', {}, 1)
            .then((pdf) => getElementAsCanvas('.printable-graph-1', pdf, 2))
            .then((pdf) => getElementAsCanvas('.printable-graph-2', pdf, 3))
            .then((pdf) => getElementAsCanvas('.printable-graph-3', pdf, 4))
            .then((pdf) => getElementAsCanvas('.printable-graph-4', pdf, 5))
            .then((pdf) => {
                if (isCondensed) {
                    pdf.save(fileName);
                    resolve();
                } else {
                    return getElementAsCanvas('.table-box', pdf, 6);
                }
            })
            .then((pdf) => {
                if (pdf) {
                    pdf.save(fileName);
                    resolve();
                }
            });
    }
}

async function process(isUG, fileName, resolve) {
    const pdf = await getPDF('.printable-content');
    if (pdf) {
        pdf.save(fileName);
        resolve();
    }
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

async function getPDF(selector) {
    let pdf = {};

    // get the element
    const elements = document.querySelectorAll(selector);
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

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        // call the canvas generating function
        await html2canvas(element, options).then(canvas => {
            // every page size is different in the pdf generated to ensure we dont
            // have weird aspect ratio stretching in the generated file
            // so set the page height based on the generated canvas
            let width = canvas.width;
            let height = canvas.height;
            // for the first content use pdf as is and for every other content
            // add a new page based on the content dimensions
            if (i <= 0) {
                // For the first page we hardcode the page size 
                pdf = new jsPDF('l', 'px', [width, height]);
            } else {
                pdf.addPage([width, height]);
            }
            //then we get the dimensions from the 'pdf' file itself
            width = pdf.internal.pageSize.getWidth();
            height = pdf.internal.pageSize.getHeight();
            // add the canvas as an image onto the pdf
            pdf.addImage(canvas, 'PNG', 0, 0, width, height);
        });
    }

    return pdf;

}