const input = document.querySelector('.form-control')
const search = document.getElementById('search')
const container = document.querySelector('.container')
const footer = document.querySelector('footer')
const modal = document.getElementById('modal')
const modalbtn = document.querySelector('#exampleModal .modal-body')


search.addEventListener('click', async () => {
  container.innerHTML = ''
  //footer.style.display = 'none'
  const response = await fetch(`https://www.omdbapi.com/?apikey=e8b41138&s=${input.value}`)
  input.value = ''
  const data = await response.json()
  const result = data.Search
  if (data.Response === 'True') {
    for (let i=0; i<=8; i++) {
      const div1 = document.createElement('div')
      const image = document.createElement('img')
      const div = document.createElement('div')
      const h5 = document.createElement('h5')
      const p = document.createElement('p')
      const a = document.createElement('a')
      div1.setAttribute('class', 'card')
      div1.style.margin = '10px'
      div1.style.width = '18rem'
      image.classList.add('card-img-top')
      image.setAttribute('src', result[i].Poster)
      image.style.width = '100%'
      image.style.height = '400px'
      div.setAttribute('class', 'card-body')
      h5.setAttribute('class', 'card-title')
      h5.innerHTML = result[i].Title
      p.setAttribute('class', 'card-text')
      p.innerHTML = `Year: ${result[i].Year}`
      a.setAttribute('class', 'btn btn-info mt-2')
      a.setAttribute('data-bs-toggle', "modal")
      a.setAttribute('data-bs-target', "#exampleModal")
      
      a.innerHTML = 'Get Details'
      container.appendChild(div1)
      div1.appendChild(image)
      div1.appendChild(div)
      div.appendChild(h5)
      div.appendChild(p)
      div.appendChild(a)
      a.addEventListener('click', async () => {
        const response1 = await fetch(`https://www.omdbapi.com/?apikey=e8b41138&i=${result[i].imdbID}`)
        const data1 = await response1.json()
        const poster = document.createElement('img')
        modalbtn.appendChild(poster)
        poster.classList.add('img-fluid')
        poster.setAttribute('src', data1.Poster)
        
      })
    }
  } else {
    container.innerHTML = data.Error
  }
  //footer.style.display = 'block'
})
