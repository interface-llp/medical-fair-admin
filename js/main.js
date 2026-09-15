/* =========================================================
   AVATAR COLORS
========================================================= */

const avatarPalette = [
    "#0E3B3B",
    "#B9791A",
    "#1A5FB9",
    "#8E44AD",
    "#178F6B",
    "#C0392B"
];

function avatarColor(name = "") {

    let sum = 0;

    for (const c of name) {
        sum += c.charCodeAt(0);
    }

    return avatarPalette[sum % avatarPalette.length];
}


function initials(name = "") {

    return name
        .trim()
        .split(/\s+/)
        .map(p => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}



/* =========================================================
   DASHBOARD COUNT ANIMATION
========================================================= */

function animateCount(el, target, duration = 900) {

    if (!el) return;

    const start = 0;
    const startTime = performance.now();

    function tick(now) {

        const progress = Math.min(
            (now - startTime) / duration,
            1
        );

        const eased =
            1 - Math.pow(1 - progress, 3);

        el.textContent =
            Math.round(
                start + (target - start) * eased
            ).toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(tick);

        }

    }

    requestAnimationFrame(tick);
}





/* =========================================================
   DEMOGRAPHICS CHARTS
========================================================= */

const chartPalette = [
    "#0E3B3B",
    "#E8A33D",
    "#4FD1C5",
    "#8E44AD",
    "#1A5FB9",
    "#C0392B",
    "#178F6B",
    "#B9791A"
];


function groupBy(key, topN) {

    const counts = {};

    const data =
        Array.isArray(window.surveyData)
            ? window.surveyData
            : [];


    data.forEach(r => {

        let value = r[key];

        if (
            value === null ||
            value === undefined ||
            String(value).trim() === ""
        ) {
            value = "Unknown";
        }

        value = String(value).trim();

        counts[value] =
            (counts[value] || 0) + 1;

    });


    let entries =
        Object.entries(counts)
            .sort((a, b) => b[1] - a[1]);


    if (topN && entries.length > topN) {

        const top =
            entries.slice(0, topN - 1);

        const otherSum =
            entries
                .slice(topN - 1)
                .reduce(
                    (sum, entry) => sum + entry[1],
                    0
                );

        top.push([
            "Other",
            otherSum
        ]);

        entries = top;
    }


    return entries;
}



/* =========================================================
   CREATE PIE / DOUGHNUT CHART
========================================================= */


function makePie(canvasId, key, topN) {

    const canvas =
        document.getElementById(canvasId);

    /*
        Canvas doesn't exist on Dashboard
        or Survey page.
    */

    if (!canvas) {
        return;
    }


    const existingChart =
        Chart.getChart(canvas);

    if (existingChart) {
        existingChart.destroy();
    }


    const entries =
        groupBy(key, topN);


    new Chart(canvas, {

        type: "doughnut",

        data: {

            labels:
                entries.map(e => e[0]),

            datasets: [{

                data:
                    entries.map(e => e[1]),

                backgroundColor:
                    chartPalette,

                borderColor:
                    "#fff",

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        boxWidth: 10,

                        font: {

                            family: "Inter",

                            size: 11

                        }

                    }

                }

            }

        }

    });

}



/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const sidebar =
    document.getElementById("sidebar");

const sidebarToggle =
    document.getElementById("sidebarToggle");

const sidebarClose =
    document.getElementById("sidebarClose");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");



/* Open sidebar */


if (sidebarToggle) {

    sidebarToggle.addEventListener(
        "click",
        () => {

            if (sidebar) {
                sidebar.classList.add("show");
            }

            if (sidebarOverlay) {
                sidebarOverlay.classList.add("show");
            }

        }
    );

}



/* Close sidebar */

function closeSidebar() {

    if (sidebar) {
        sidebar.classList.remove("show");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("show");
    }

}


if (sidebarClose) {

    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}



