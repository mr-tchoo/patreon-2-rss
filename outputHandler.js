const fs = require('fs');

function outputFeed(creator, feed, type = 'xml') {
    if (type === 'xml') {

        // Write the XML to a file
        fs.writeFile(`${creator}.xml`, feed, err => {
            if (err) {
            console.error('Error writing RSS feed:', err);
            } else {
            console.log('RSS feed written successfully!');
            }
        });
    }

    else if (type == 'stdout') {
        console.log(feed);
    }

    else {
        console.error('Unknown output type');
    }
}

module.exports = outputFeed;