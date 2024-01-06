/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

const toBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
            // Enlever le préfixe "data:image/png;base64,".
            resolve(reader.result.slice(reader.result.indexOf(",") + 1));
        });
        reader.addEventListener("error", reject);
        reader.readAsDataURL(blob);
    });
};

const createCell = async (cell) => {
    const parts = ["<table:table-cell>"];

    if (cell instanceof URL) {
        parts.push(
            `<draw:frame svg:width="20px" svg:height="20px">
              <draw:image draw:mime-type="image/svg">
               <office:binary-data>${await toBase64(cell)}</office:binary-data>
              </draw:image>
             </draw:frame>`,
        );
    } else if ("number" === typeof cell) {
        parts.push(`<text:p>${cell.toString().replace(".", ",")}</text:p>`);
    } else if (undefined !== cell) {
        parts.push(`<text:p>${cell}</text:p>`);
    }

    parts.push("</table:table-cell>");
    return parts;
};

export const createODS = async (table) => {
    const parts = [
        `<?xml version="1.0" encoding="UTF-8"?>
         <office:document
           xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
           xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
           xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
           xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
           xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
           office:version="1.3"
           office:mimetype="application/vnd.oasis.opendocument.spreadsheet">
          <office:body>
           <office:spreadsheet>
            <table:table>`,
    ];
    for (const row of table) {
        parts.push("<table:table-row>");
        for (const cell of row) {
            parts.push(...(await createCell(cell)));
        }
        parts.push("</table:table-row>");
    }
    parts.push(
        `   </table:table>
           </office:spreadsheet>
          </office:body>
         </office:document>`,
    );

    return new Blob(parts, {
        type: "application/vnd.oasis.opendocument.spreadsheet",
    });
};
