export class Question {
    static create(question){
        return fetch('https://js-app-question.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(responce => responce.json())
            .then(responce => {
                question.id = responce.name
                return question
        })
        .then(addToLocalStorage)
        .then(Question.renderList)   
    }
    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">You do not have a token</p>')
        }
        return fetch(`https://js-app-question.firebaseio.com/question.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                 if(response && response.error){
                     return `<p class="error">${response.error}</p>`
                 }

                 return response ? Object.keys(response).map(key => ({
                     ...response[key],
                     id: key
                })) : []
            })
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage()
        const html = questions.length
            ? questions.map(toCart).join('')
            : `<div class="mui--text-headline">Add your questions</div>`
        const list = document.getElementById('list')
        
        list.innerHTML = html
    }

    static listToHTML (questions) {
   
        return questions.length
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
        : '<p>Emty questions</p>'
    }
    
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
    
}

function toCart(question) {
    return `
        <div class="accordion"> 
        <div class="tab">
         <input type="checkbox" id="tab${question.id}" name="tab-group">
         <label for="tab${question.id}" class="tab-title">
            ${question.text} /
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
         </label>
         <section class="tab-content">
         ${question.answer}
         </section> 
        </div> 
       </div>
   `
}