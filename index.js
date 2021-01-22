const express = require('express');
const app = new express();

const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const port = 8000;

app.get("/", (req, res) => {
	fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then(response => response.json())
  .then(data =>{
  	  res.write(`	 
			    <h1>Lista dei post</h1>
                    `)
        data.forEach(i =>res.write(`
								<div>
								  <div>
								    <h1>Id : ${i.id}</h1>
								  </div>
								  <div>
								    <strong>User : </strong>
                    <p>${i.userId}</p>
								  </div>
								  <div>
								    <strong>Titolo : </strong>
                    <p>${i.title}</p>
								  </div>
								  <div>
								    <strong>Contenuto : </strong>
                    <p>${i.body}</p>
								  </div>
								</div>
                                `))
        res.end()
    })
  });

app.get("/posts/:id", (req, res) => {
  fetch(`https://jsonplaceholder.typicode.com/post/${req.params.id}/comments`)
  .then(response => response.json())
  .then(data => {
        res.write(`  
          <h1>Post all'ID: ${req.params.id}</h1>
        `)
          data.forEach(n =>res.write(`
                  <div>
                    <div>
                      <h1>Id commento ${n.id}</h1>
                    </div>
                    <div>
                      <strong>Nome utente : </strong>
                      <p>${n.name}</p>
                    </div>
                    <div>
                      <strong>Email utente : </strong>
                      <p>${n.email}</p>
                    </div>
                    <div>
                      <strong>Id post : </strong>
                      <p>${n.postId}</p>
                    </div>
                    <div>
                      <strong>Testo : </strong>
                      <p>${n.body}<p>
                    </div>
                  </div>
                    `))
          res.end()
    })
});

app.use(bodyParser.json());

app.listen(port, () => console.log(`App listening to port ${port}`));