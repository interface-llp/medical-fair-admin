$.ajax({
    url: "./api/surveys_api.php",
    type: "GET",
    dataType: "json",
    success: function (result) {

        console.log(result);

        window.surveyData = result.data || [];

        makePie("findOut", "cometoknow", 7);
        makeBar("chartInformationSource");

        $("#totalSurveys").text(result.count);

        let html = "";


        if (result.data && result.data.length > 0) {

            $.each(result.data, function (index, item) {

                html += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.urn}</td>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.mobile}</td>
                        <td>${item.company}</td>
                        <td>${item.howsatisfied}</td>
                        <td>${item.forattending}</td>
                        <td>${item.influence}</td>
                        <td>${item.recommend}</td>
                        <td>${item.opinion}</td>
                        <td>${item.plantovisit}</td>
	                    <td>${item.cometoknow}</td>
                        <td>${item.numofexhi}</td>	
                        <td>${item.layouofvenue}</td>
                        <td>${item.easeofregis}</td>	
                        <td>${item.similarevent}</td>	
                        <td>${item.chnlnewspaper}</td>	
                        <td>${item.chnlemail}</td>	
                        <td>${item.chnlsms}</td>	
                        <td>${item.chnltelephone}</td>	
                        <td>${item.chnlwhatsapp}</td>	
                        <td>${item.chnloutdooradvertising}</td>	
                        <td>${item.chnlinsmag}</td>	
                        <td>${item.chnlscm}</td>	
                        <td>${item.onetrade}</td>	
                        <td>${item.twotrade}</td>	
                        <td>${item.threetrade}</td>	
                        <td>${item.fourtrade}</td>	
                        <td>${item.testimonial}</td>	
                        <td>${item.date}</td>	
                        <td>${item.time}</td>	
                        </tr>
                `;

            });

        } else {

            html = `
                <tr>
                    <td colspan="9" class="text-center">
                        No surveys found.
                    </td>
                </tr>
            `;
        }

        $("#surveysBody").html(html);


        window.dispatchEvent(new Event("demographicsLoaded"));

    },
    error: function (xhr, status, error) {

        console.error(error);

        $("#surveysBody").html(`
            <tr>
                <td colspan="9" class="text-danger text-center">
                    Failed to load surveys.
                </td>
            </tr>
        `);
    }
});


function makeBar(canvasId) {

    const data = Array.isArray(window.surveyData)
        ? window.surveyData
        : [];

    const fields = {
        chnlnewspaper: "Newspaper",
        chnlemail: "Email",
        chnlsms: "SMS",
        chnltelephone: "Telephone",
        chnlwhatsapp: "WhatsApp",
        chnloutdooradvertising: "Outdoor Advertising",
        chnlinsmag: "In-S Magazine",
        chnlscm: "SCM"
    };

    const totals = {};

    // Initialize totals
    Object.keys(fields).forEach(function (key) {
        totals[key] = 0;
    });


    // --------------------------------
    // Add values from every API record
    // --------------------------------

    data.forEach(function (item) {

        Object.keys(fields).forEach(function (key) {

            totals[key] += Number(item[key]) || 0;

        });

    });


    // --------------------------------
    // Prepare chart data
    // --------------------------------

    const labels = [];
    const values = [];

    Object.keys(fields).forEach(function (key) {

        labels.push(fields[key]);
        values.push(totals[key]);

    });


    // --------------------------------
    // Calculate total
    // --------------------------------

    const total = values.reduce(function (sum, value) {

        return sum + value;

    }, 0);


    // --------------------------------
    // Canvas
    // --------------------------------

    const canvas = document.getElementById(canvasId);

    if (!canvas) {
        console.error("Canvas not found:", canvasId);
        return;
    }


    // Destroy previous chart if exists
    const existingChart = Chart.getChart(canvas);

    if (existingChart) {
        existingChart.destroy();
    }


    // --------------------------------
    // Create Chart
    // --------------------------------

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{
                label: "Responses",
                data: values
            }]

        },

        options: {

            indexAxis: "y",

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    callbacks: {

                        label: function (context) {

                            const value = context.raw;

                            const percentage =
                                total > 0
                                    ? ((value / total) * 100).toFixed(1)
                                    : 0;

                            return value +
                                " Responses (" +
                                percentage +
                                "%)";

                        }

                    }

                }

            },

            scales: {

                x: {

                    beginAtZero: true,

                    ticks: {
                        precision: 0
                    }

                }

            }

        },

        plugins: [{

            id: "percentageLabels",

            afterDatasetsDraw: function (chart) {

                const ctx = chart.ctx;

                const meta =
                    chart.getDatasetMeta(0);

                chart.data.datasets[0].data.forEach(
                    function (value, index) {

                        const bar =
                            meta.data[index];

                        const percentage =
                            total > 0
                                ? ((value / total) * 100).toFixed(1)
                                : 0;

                        ctx.save();

                        ctx.font =
                            "bold 12px Arial";

                        ctx.textAlign = "left";

                        ctx.textBaseline =
                            "middle";

                        ctx.fillText(

                            value +
                            " (" +
                            percentage +
                            "%)",

                            bar.x + 8,

                            bar.y

                        );

                        ctx.restore();

                    }
                );

            }

        }]

    });

}


// function openLoginModal() {

//     document.getElementById("adminPassword").value = "";
//     document.getElementById("loginError").style.display = "none";

//     const modal = new bootstrap.Modal(document.getElementById("loginModal"));
//     modal.show();
// }


// async function verifyAdmin() {

//     const password = document.getElementById("adminPassword").value;

//     const formData = new FormData();
//     formData.append("password", password);

//     try {

//         const res = await fetch("./verifyAdmin.php", {
//             method: "POST",
//             body: formData
//         });

//         const data = await res.json();

//         if (data.success) {

//             const modalEl = document.getElementById("loginModal");
//             const modal = bootstrap.Modal.getInstance(modalEl);

//             if (modal) {
//                 modal.hide();
//             }

//             downloadRegistrations();

//         } else {

//             document.getElementById("loginError").style.display = "block";

//         }

//     } catch (error) {

//         console.error(error);

//         document.getElementById("loginError").textContent =
//             "Unable to verify password.";

//         document.getElementById("loginError").style.display = "block";
//     }
// }


// function downloadRegistrations() {

//     const data = window.registrationData || [];

//     if (!data.length) {
//         alert("No registration data available.");
//         return;
//     }

//     const headers = [
//         "ID",
//         "URN",
//         "Title",
//         "Name",
//         "Company",
//         "Designation",
//         "Country Code",
//         "Mobile",
//         "Email",
//         "Country",
//         "State",
//         "City",
//         "Type of Business",
//         "Products Interested",
//     ];

//     const rows = [];

//     // CSV HEADER
//     rows.push(
//         headers.map(csvEscape).join(",")
//     );

//     // DATA
//     data.forEach(item => {

//         const row = [

//             item.id,

//             item.urn,

//             item.title,

//             item.name,

//             item.company,

//             item.designation,

//             item.country_code,

//             item.mobile,

//             item.email,

//             item.country,

//             item.state,

//             item.city,

//             item.type_of_business,

//             item.products_interested,

//         ];

//         rows.push(
//             row.map(csvEscape).join(",")
//         );

//     });

//     // UTF-8 BOM for Excel
//     const csvContent = "\uFEFF" + rows.join("\r\n");

//     const blob = new Blob(
//         [csvContent],
//         {
//             type: "text/csv;charset=utf-8;"
//         }
//     );

//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");

//     link.href = url;

//     link.download =
//         "Kids_India_Registrations_" +
//         getCurrentDate() +
//         ".csv";

//     document.body.appendChild(link);

//     link.click();

//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);
// }

// function csvEscape(value) {

//     if (value === null || value === undefined) {
//         return '""';
//     }

//     return '"' +
//         String(value)
//             .replace(/"/g, '""')
//             .replace(/\r?\n/g, " ") +
//         '"';
// }


function getCurrentDate() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}