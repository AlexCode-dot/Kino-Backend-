import fs from 'fs/promises'
import { marked } from 'marked';

async function getMenu() {
  const json = await fs.readFile('./static/json/FrontPage-content.json', 'utf-8')
  const frontPageContent = JSON.parse(json)
  const menuData = frontPageContent.header.menu

  const menu = menuData.map((item) => ({
    label: item,
    link: item.toLowerCase() === 'filmer' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`,
    id: item.toLowerCase().replace(/\s+/g, ''),
  }))

  return menu
}

export default async function renderPage(response, page, additionalData = {}) {
  const menu = await getMenu()

  if (additionalData.movie && additionalData.movie.intro) {
    additionalData.movie.intro = marked(additionalData.movie.intro);
  }  

  response.render(page, {
    menuItems: menu.map((item) => {
      return {
        label: item.label,
        link: item.link,
        active: item.id == page,
      }
    }),
    ...additionalData
  })
}
