

    let data = JSON.parse(localStorage.getItem('catWeights')) || [];
    let chart;

    // Initialisation au chargement
    window.onload = () => {
        document.getElementById('dateInput').valueAsDate = new Date();
        updateUI();
    };

    function addData() {
        const date = document.getElementById('dateInput').value;
        const weight = document.getElementById('weightInput').value;

        if(!date || !weight) return alert("Remplis tout !");

        data.push({ date, weight: parseFloat(weight) });
        data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Trie par date
        
        saveAndUpdate();
        document.getElementById('weightInput').value = "";
    }

    function deleteRow(index) {
        data.splice(index, 1);
        saveAndUpdate();
    }

    function saveAndUpdate() {
        localStorage.setItem('catWeights', JSON.stringify(data));
        updateUI();
    }

    function updateUI() {
        // Mise à jour du tableau
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = data.map((item, index) => `
            <tr>
                <td>${item.date}</td>
                <td>${item.weight} kg</td>
                <td><button onclick="deleteRow(${index})" style="padding:5px; background:grey;">X</button></td>
            </tr>
        `).join('');

        // Mise à jour du graphique
        const ctx = document.getElementById('weightChart').getContext('2d');
        if (chart) chart.destroy();
        
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date),
                datasets: [{
                    label: 'Poids (kg)',
                    data: data.map(d => d.weight),
                    borderColor: '#ff7f50',
                    backgroundColor: 'rgba(255, 127, 80, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    function clearData() { if(confirm("Tout supprimer ?")) { data = []; saveAndUpdate(); } }
