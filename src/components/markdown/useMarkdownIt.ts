import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

export default function (mdFile: any, categoryName: string) {
  const md = new MarkdownIt({
    highlight: function (str: any, lang: any) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
          )
        } catch (__) {
          console.log(__)
        }
      }
      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      )
    }
  })
  const str = md
    .render(mdFile)
    .replace(/&lt;img/g, '<img')
    .replace(/img&gt;/g, 'img>')
    .replace(/&quot;/g, '"')
    .replace(/<p></g, '<')
    .replace(/><\/p>/g, '>')
    .replace(/<p>(.)*]\(/g, '<img src="')
    .replace(/png\)/g, 'png"/>')
    .replace(
      /src="/g,
      `data-src="${process.env.VUE_APP_BASE_URL}images/${categoryName}/`
    )
  const menu = [...str.matchAll(/<h.*>.*<\/h.>/g)]
  return { str, menu }
}
