console.log('Cargando.....');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messege1 = document.querySelector('#msg1')
const messege2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const lugar = search.value
    messege1.textContent = 'Cargando...'
    messege2.textContent = ''
    fetch('/weather?search='+ lugar).then((response)=>{
        response.json().then((data) => {
            if(data.error) {
                messege1.textContent = data.error
            }
            else {
                console.log(data)
                messege1.textContent = data.lugar
                messege2.textContent = data.forecast.summary + data.forecast.temperature
            }
        })
    })

})