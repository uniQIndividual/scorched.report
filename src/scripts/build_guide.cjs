// This is AI generated code


const axios = require('axios');
const cheerio = require('cheerio');
const { log } = require('console');
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { URL } = require('url');
const base_path = path.join(__dirname, "../../");


async function fetchGoogleDoc(docId) {
    const url = `https://docs.google.com/document/d/${docId}/export?format=html`;
    console.log(`Fetching document from: ${url}`);

    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const resourcesDir = path.join(__dirname, '../../public/images/guide');
    await fs.ensureDir(resourcesDir); // Ensure the resources directory exists

    const resources = [];

    // Process images
    $('img').each(async (i, elem) => {
        const imgSrc = $(elem).attr('src');
        if (imgSrc) {
            const imgFileName = `image-${i}.webp`; // Store as WebP
            const imgPath = path.join(resourcesDir, imgFileName);
            resources.push(imgPath);

            $(elem).attr('src', '/images/guide/' + imgFileName); // Update the src to the new file name
            $(elem).attr('loading', 'lazy'); // Add lazy loading

            console.log(`Processing image: ${imgSrc}`);
            try {
                const imageResponse = await axios({
                    method: 'get',
                    url: imgSrc,
                    responseType: 'arraybuffer',
                });

                // Convert to WebP or animated WebP if it's a GIF
                await sharp(imageResponse.data, { pages: -1, animated: true })
                    .toFormat('webp', { quality: 80, pages: -1, animated: true, loop: 0 })
                    .toFile(imgPath);


            } catch (error) {
                console.error(`Error processing image ${imgSrc}:`, error.message);
            }
        }
    });

    setTimeout(() => { // yes, you should use promises instead

        $('img').each(async (i, elem) => {
            console.log($(elem).attr('src'));

        });
        // Process CSS links
        $('style').each(function () {
            // Get the current content of the <style> tag
            let styleContent = $(this).html();

            // Replace matching imports with the import of local.css
            const updatedContent = styleContent.replace(/@import\s+url\([\w:\/\.\?\=\-]+\)/g, '@import "../../styles/guide.css"');

            // Update the <style> tag with the new content
            $(this).html(updatedContent);
        });

        // Alter links to external sites
        $('a').each((i, elem) => {
            const href = $(elem).attr('href');
            if (href && href.startsWith('https://www.google.com/url')) {
                //const newHref = href.match(/https:\/\/(?!www.google.com)[\w:\/\.\?\=\-\#]+/); // Adjust the link to the final destination
                console.log(href);
                
                let newHref = href.substring(href.indexOf('url?q=') + 6, href.length - 1);
                console.log(newHref);
                
                newHref = newHref.substring(0, newHref.indexOf('&sa'));
                console.log(newHref);
                $(elem).attr('href', newHref);
            }
        });

        setTimeout(() => {
            let modifiedHtml = $.html();
            modifiedHtml = modifiedHtml.replaceAll(/"https:\/\/[\w\d-]+\.googleusercontent\.com[\w\d\/\-=\?]+"/g,'""');
            const discordLink = modifiedHtml.match(/<a class="\w{0,10}\" href="https:\/\/discord\.gg\/jxteYXBtjF">Discord<\/a>/g);
            const discordClass = discordLink[0].match(/class="\w{0,10}"/);
            modifiedHtml = modifiedHtml.replaceAll(/<a class="\w{0,10}\" href="https:\/\/discord\.gg\/jxteYXBtjF">Discord<\/a>/g, `<span id="discord_url"><script>document.getElementById("discord_url").outerHTML ='<a ` + discordClass + ` href="' + atob("aHR0cHM6Ly9kaXNjb3JkLmdnL2p4dGVZWEJ0akY") + '">Discord</a>'</script></span>`)
            fs.writeFileSync(path.join(base_path, 'src', 'content', 'pages', 'guide.html'), modifiedHtml);
        }, 5000);
    }, 5000);
}

fetchGoogleDoc('1064ABA7NWypUyMI50-fxj2dT97gUU-Lvvdj5cwIrP0Q');