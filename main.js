const exportBtn = document.getElementById("export-btn");

// Import biblioteki do generowania liczb losowych
const random = Math.random;

// Stała dyfuzji
const D = 0.1;

// Krok czasowy
const deltaT = 0.1;

// Funkcja generująca położenie cząstki na podstawie równania ruchu Browna
function brownianMotion(initialPosition) {
    return initialPosition + Math.sqrt(2 * D * deltaT) * random();
}

// Symulacja ruchów Browna: generowanie 10 serii danych po 1000 prób
const series = [];
for (let j = 0; j < 10; j++) {
    const table = document.createElement("table");
    table.classList.add("results-table");
    const header = table.createTHead();
    const row = header.insertRow();
    const iterationCell = row.insertCell();
    iterationCell.innerHTML = "Iteration";
    const positionCell = row.insertCell();
    positionCell.innerHTML = "Position";
    document.body.appendChild(table);

    let previousPosition = 0;
    let position = 0;

    const positions = [];
    for (let i = 0; i < 1000; i++) {
        previousPosition = position;
        position =
            previousPosition + Math.sqrt(2 * D * deltaT) * (random() - 0.5);

        const row = table.insertRow();
        const iterationCell = row.insertCell();
        const positionCell = row.insertCell();
        iterationCell.innerHTML = i;
        positionCell.innerHTML = position;

        positions.push(position);
    }
    series.push(positions);
}

const datasets = [];
for (let i = 0; i < 10; i++) {
    const backgroundColor = `rgba(${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, 0.2)`;

    const borderColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 1)`;

    datasets.push({
        label: `Series ${i + 1}`,
        data: series[i],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
    });
}

// Wyświetlenie wyników w przeglądarce za pomocą biblioteki Chart.js
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: Array.from({ length: 1000 }, (_, i) => i),
        datasets: datasets,
    },
    options: {
        animation: {
            duration: 2000,
            easing: "easeInOutQuart",
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

exportBtn.addEventListener("click", () => {
    const wb = XLSX.utils.book_new();

    for (let i = 0; i < series.length; i++) {
        let serie = series[i];
        let data = [];
        data.push(["Iteration", "Position"]);
        for (let j = 0; j < serie.length; j++) {
            data.push([j, serie[j]]);
        }
        let ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, `Serie ${i + 1}`);
    }

    const fileName = "results.xlsx";
    XLSX.writeFile(wb, fileName);
});
