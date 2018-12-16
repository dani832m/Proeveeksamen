/*
  Inkluderes i 'layout.hbs'
*/

// Sætter en cookie, der viser antal af besøg på siden.
var setCookie = Number(document.cookie);
    
if (!setCookie) {document.cookie = 1;} {
  setCookie = setCookie + 1;
  document.cookie = setCookie;
}