/**
 * NodeJS Files downloader
 * Author: Mohamed Abbas
 */

/*jslint es6 */
/*global require*/
const fs = require('fs');
const http = require('http');
const https = require('https');

const
    urls = [],
    files_names = urls.map((src) => src.split('/')[src.split('/').length - 1]);
let i;
for (i = 0; i < urls.length; i += 1) {
    (function (x) {
        "use strict";
        let file = fs.createWriteStream("dist/" + files_names[x]),
            request = null;
        if (urls[x].startsWith("https")) { // https   
            request = https.get(urls[x], function (response) {
                response.pipe(file);
            });
        } else { // http
            request = http.get(urls[x], function (response) {
                response.pipe(file);
            });
        }

        if (x === urls.length - 1) {
            console.log("Done : All " + urls.length + " Files!");
        }
    })(i);
}
