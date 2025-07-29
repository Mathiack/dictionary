// script.js
function pesquisar() {
    const palavra = document.getElementById("palavra").value.trim();
    const resultadoDiv = document.getElementById("resultado");

    if (!palavra) {
        resultadoDiv.innerHTML = "<p>Digite uma palavra para pesquisar.</p>";
        return;
    }

    resultadoDiv.innerHTML = "<p>Pesquisando...</p>";

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/pt/${palavra}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Palavra não encontrada.");
            }
            return response.json();
        })
        .then(data => {
            const significados = data[0].meanings.map(meaning => `
        <div>
          <h3>${meaning.partOfSpeech}</h3>
          <ul>
            ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join("")}
          </ul>
        </div>
      `).join("");
            resultadoDiv.innerHTML = `<h2>${data[0].word}</h2>${significados}`;
        })
        .catch(err => {
            resultadoDiv.innerHTML = `<p>${err.message}</p>`;
        });
}
