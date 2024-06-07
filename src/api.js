async function fetchDictionaryData(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        if (result && result.length > 0) {
            const wordData = result[0];

            const wordDiv = document.createElement('div');
            wordDiv.classList.add('flex', 'justify-between', 'items-center');

            const wordDetailsDiv = document.createElement('div');

            const wordTitle = document.createElement('h2');
            wordTitle.classList.add('text-3xl', 'font-bold', 'mb-3', 'text-green-800', 'dark:text-green-400');
            wordTitle.textContent = wordData.word;
            wordDetailsDiv.appendChild(wordTitle);

            const pronunciation = document.createElement('p');
            pronunciation.classList.add('text-sm', 'dark:text-gray-400');
            pronunciation.textContent = wordData.phonetic || '';
            wordDetailsDiv.appendChild(pronunciation);

            wordDiv.appendChild(wordDetailsDiv);

            const ttsButton = document.createElement('button');
            ttsButton.classList.add('bg-green-500', 'rounded-full', 'flex', 'align-center', 'justify-center', 'text-center', 'w-auto', 'p-2');

            ttsButton.innerHTML = `<svg class="w-6 h-6 text-white p-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd" /></svg>`;


            ttsButton.onclick = () => {
                const utterance = new SpeechSynthesisUtterance(wordData.word);
                ttsButton.innerHTML = `<svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clip-rule="evenodd"/>
                    </svg>
                `;
                speechSynthesis.speak(utterance);
                utterance.onend = () => {
                    ttsButton.innerHTML = `<svg class="w-6 h-6 text-white p-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd" /></svg>
                    `;
                };
            };
            wordDiv.appendChild(ttsButton);

            resultDiv.appendChild(wordDiv);

            // Meanings
            wordData.meanings.forEach(meaning => {
                // Word type
                const speechDiv = document.createElement('div');
                speechDiv.classList.add('mt-5', 'mb-5', 'flex', 'justify-start', 'items-center', 'gap-3');

                const speech = document.createElement('p');
                speech.classList.add('font-bold', 'dark:text-gray-400');
                speech.textContent = meaning.partOfSpeech || 'Unknown';
                speechDiv.appendChild(speech);

                const lineDiv = document.createElement('div');
                lineDiv.classList.add('line');
                speechDiv.appendChild(lineDiv);

                resultDiv.appendChild(speechDiv);

                // Definitions
                const definitionHeader = document.createElement('h2');
                definitionHeader.classList.add('mb-2', 'text-lg', 'font-semibold', 'text-gray-400', 'dark:text-white');
                definitionHeader.textContent = 'Definition';
                resultDiv.appendChild(definitionHeader);

                const definitionList = document.createElement('ul');
                definitionList.classList.add('max-w-md', 'space-y-1', 'text-gray-500', 'list-disc', 'list-inside', 'dark:text-gray-400');

                meaning.definitions.forEach(def => {
                    const listItem = document.createElement('li');
                    listItem.textContent = def.definition;
                    definitionList.appendChild(listItem);
                });

                resultDiv.appendChild(definitionList);
            });
        } else {
            resultDiv.textContent = 'No word found';
        }

        resultDiv.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching dictionary data:', error);
    }
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchWord = document.getElementById('searchWord').value;
    fetchDictionaryData(searchWord);
});






