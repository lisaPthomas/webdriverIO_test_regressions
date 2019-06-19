export default class Page {
    open (path) {
      browser.url(path)
    }

    //any universal methods should live here...accessible by all pages
  }