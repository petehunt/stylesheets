function processHref(href) {
  if (process.env.NODE_ENV === 'production') {
    return process.env.STATIC_ROOT + '_all.css';
  }
  return href;
}

module.exports = processHref;