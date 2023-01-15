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
    let previousPosition = 0;
    let position = 0;

    const positions = [];
    for (let i = 0; i < 1000; i++) {
        previousPosition = position;
        position =
            previousPosition + Math.sqrt(2 * D * deltaT) * (random() - 0.5);
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

// TODO: zapisywanie i odczyt danych z plików
// import { writeFileSync, readFileSync } from "fs";

// // Zapis danych do pliku
// writeFileSync("positions.txt", positions.join("\n"));

// // Odczyt danych z pliku
// const data = readFileSync("positions.txt").toString();
// const positions = data.split("\n").map(Number);
