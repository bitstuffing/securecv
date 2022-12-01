# SecureCV 3.0
## Publishing your Curriculum Vitae in a secure way

This is the unfinished 3.0 development version, a port of SecureCV 2.0 to deploy modern frontend applications based on frameworks like ReactJS.

## Why?
Some people are being forced to use new technologies and show his skills to all world, and this situation forces people to not have privacy.

SecureCV is a little project with a partial solution about this issue without big technological implications.

Before in 2.x and previews revisions, SecureCV was designed to publish online your CV thinking on share a web safely, and demostrate my skills. The real intention is avoid crawlers or unauthorized access to the information. Today this kind of information will NOT be automatically ingested to online databases without your known because all is encrypted.

## Advantages

There are some advantages about use SecureCV in his 2.0 rev, but also in 3.0:

- No server is needed
- Responsive, portable and with modern design.
- Author is able to modify and revoke access, it will not be a problem.
- Easy to share, you're able to use a simple QR code or write the url and password, is simple.
- Client-based logic instead traditional servers logic, forget about vulnerabilities and other issues.
- Easy to change, data is detached from view.

## Features

- Full compatible with github pages.
- Simple editor is attached (since 1.0 version).
- Mobile native application

## How it works?

All sensitive information is stored in one simple file and this file is encrypted by secure AES algorithm.

You could use the editor to see his guts and how it's working, but basically, content is encrypted and needs to be unencrypted. Modern browsers are able to do this task in milliseconds.

This solution was designed in the past by the author @bitstuffing to get an anticrawler site, and this view-based-solution algorithm was implemented on SecureCV.

## License
SecureCV in all versions is coded by @bitstuffing and licensed under [Creative Commons 4.0](https://creativecommons.org/licenses/by/4.0/). The same situation happens with the information (also encrypted one), so in a summary you're not authorized to use that information and the application in commercial environments without explicit authorization of the author.

##### Powered by [![N|CryptoJS](https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2Fcryptojs.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-LVOh1OI8lhWfR_994H2%252Favatar.png%3Fgeneration%3D1546620224707409%26alt%3Dmedia)](https://cryptojs.gitbook.io/docs/)

## Dev notes

I will try to dev a tree.js effect to demostrate some skills.

## Matrix effect

I will give thanks to [Janko Sokolović](https://itnext.io/matrix-code-animation-in-react-96daeee65d3e) for this explanation to implement the Matrix code simulation effect.

##### some dev libraries involved in the process

npm install --save @types/jquery

npm install jquery --save

npm install crypto-js --save

npm install buffer

npm install gh-pages

npm install todash

##### (WIP)

npm install three --save

npm install @types/three --save
