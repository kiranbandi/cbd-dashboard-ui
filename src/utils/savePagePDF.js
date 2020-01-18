import _ from 'lodash';
import html2canvas from 'html2canvas';
import computedStyleToInlineStyle from "computed-style-to-inline-style";
import jsPDF from 'jspdf';

export default function() {

    return new Promise(async(resolve, reject) => {
        try {

            const element = document.querySelector('.faculty-graph-box');

            const options = {
                backgroundColor: '#252830',
                scrollX: 0,
                scrollY: -window.scrollY,
                width: 900,
                height: 500,
                onclone: (clonedDoc) => {
                    // After we clone the document, inline svg fill
                    const container = clonedDoc.body.querySelector('.faculty-graph-box');
                    computedStyleToInlineStyle(container, {
                        recursive: true,
                        properties: ["fill"],
                    });
                },
            }

            // For testing
            html2canvas(element, options).then(canvas => {

                let width = canvas.width;
                let height = canvas.height;

                let pdf;

                //set the orientation
                if (width > height) {
                    pdf = new jsPDF('l', 'px', [width, height]);
                } else {
                    pdf = new jsPDF('p', 'px', [height, width]);
                }
                //then we get the dimensions from the 'pdf' file itself
                width = pdf.internal.pageSize.getWidth();
                height = pdf.internal.pageSize.getHeight();
                pdf.addImage(canvas, 'PNG', 0, 0, width, height);
                pdf.save("download.pdf");

            });

        } catch (e) {
            reject();
        };
    })
}