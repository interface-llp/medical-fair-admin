<?php

session_start();

if (!isset($_SESSION['logged_in'])) {
    header("Location: login.php");
    exit();
}


/* =========================
   Determine Current Page
========================= */

$page = $_GET['page'] ?? 'dashboard';


/* =========================
   Allowed Pages
========================= */

$allowedPages = [
    'dashboard',
    'surveys',
    'demographics'
];

if (!in_array($page, $allowedPages, true)) {
    $page = 'dashboard';
}


/* =========================
   Page Titles
========================= */

$pageTitles = [

    'dashboard' => [
        'eyebrow' => 'Overview',
        'title'   => 'Dashboard'
    ],

    'surveys' => [
        'eyebrow' => 'Manage',
        'title'   => 'Surveys'
    ],

    'demographics' => [
        'eyebrow' => 'Insights',
        'title'   => 'Demographics'
    ]

];

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>
        Medical Fair 2026 -
        <?= htmlspecialchars($pageTitles[$page]['title']) ?>
    </title>


    <!-- Bootstrap 5.3 -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">


    <!-- Bootstrap Icons -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">


    <!-- Fonts -->
    <link rel="preconnect"
        href="https://fonts.googleapis.com">

    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet">


    <!-- Chart.js -->
    <script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js">
    </script>


    <!-- Custom CSS -->
    <link rel="stylesheet"
        href="css/style.css?v=1.0.5">

</head>


<body>


    <!-- =========================================
         SIDEBAR
    ========================================== -->

    <aside class="sidebar"
        id="sidebar">


        <!-- Brand -->

        <div class="brand d-flex justify-content-between align-items-center">

            <div>

                <div class="brand-name">
                    Medical Fair 2026
                </div>

            </div>


            <!-- Mobile Close -->

            <button
                id="sidebarClose"
                class="btn btn-link text-white p-0 d-lg-none"
                type="button">

                <i class="bi bi-x-lg fs-4"></i>

            </button>

        </div>


        <!-- Navigation -->

        <nav class="nav flex-column">


            <!-- Dashboard -->

            <a
                href="index.php?page=dashboard"
                class="nav-link <?= $page === 'dashboard' ? 'active' : '' ?>">

                <i class="bi bi-speedometer2"></i>

                Dashboard

            </a>


            <!-- Surveys -->

            <a
                href="index.php?page=surveys"
                class="nav-link <?= $page === 'surveys' ? 'active' : '' ?>">

                <i class="bi bi-person-plus-fill"></i>

                Surveys

            </a>


            <!-- Demographics -->

            <a
                href="index.php?page=demographics"
                class="nav-link <?= $page === 'demographics' ? 'active' : '' ?>">

                <i class="bi bi-bar-chart-fill"></i>

                Demographics

            </a>


            <!-- Logout -->

            <a
                href="logout.php"
                class="logout-btn mt-3 btn"
                onclick="return confirm('Are you sure you want to logout?');">

                <i class="bi bi-box-arrow-right"></i>

                Logout

            </a>

        </nav>

    </aside>


    <!-- Sidebar Overlay -->

    <div
        class="sidebar-overlay"
        id="sidebarOverlay">
    </div>



    <!-- =========================================
         MAIN WRAPPER
    ========================================== -->

    <div class="main-wrap">


        <!-- =====================================
             TOPBAR
        ====================================== -->

        <div class="topbar">


            <div class="d-flex align-items-center gap-3">


                <!-- Mobile Sidebar Button -->

                <button
                    id="sidebarToggle"
                    class="btn btn-sm btn-outline-secondary d-lg-none">

                    <i class="bi bi-list"></i>

                </button>


                <!-- Page Title -->

                <div>

                    <div
                        class="eyebrow"
                        id="topbarEyebrow">

                        <?= htmlspecialchars($pageTitles[$page]['eyebrow']) ?>

                    </div>


                    <h5 id="topbarTitle">

                        <?= htmlspecialchars($pageTitles[$page]['title']) ?>

                    </h5>

                </div>

            </div>


        </div>



        <!-- =====================================
             PAGE CONTENT
        ====================================== -->

        <div class="content">


            <?php

            switch ($page) {


                /* =========================
                   Dashboard
                ========================= */

                case 'dashboard':

                    require "pages/dashboard.php";

                    break;


                /* =========================
                   Surveys
                ========================= */

                case 'surveys':

                    require "pages/surveys.php";

                    break;


                /* =========================
                   Demographics
                ========================= */

                case 'demographics':

                    require "pages/demographics.php";

                    break;


                /* =========================
                   Default
                ========================= */

                default:

                    require "pages/dashboard.php";

                    break;

            }

            ?>

        </div>

    </div>



    <!-- =========================================
         ADMIN ACCESS MODAL - CSV
    ========================================== -->

    <div
        class="modal fade"
        id="loginModal"
        tabindex="-1">

        <div
            class="modal-dialog modal-dialog-centered">

            <div class="modal-content">


                <div class="modal-header">

                    <h5 class="modal-title">
                        Admin Access
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>


                <div class="modal-body">


                    <input
                        type="password"
                        id="adminPassword"
                        class="form-control"
                        placeholder="Enter password">


                    <div
                        class="text-danger mt-2"
                        id="loginError"
                        style="display:none;">

                        Incorrect password

                    </div>

                </div>


                <div class="modal-footer">


                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                        Cancel

                    </button>


                    <button
                        class="btn btn-primary"
                        onclick="verifyAdmin()">

                        Continue

                    </button>

                </div>

            </div>

        </div>

    </div>



    <!-- =========================================
         SECOND ADMIN ACCESS MODAL
    ========================================== -->

    <div
        class="modal fade"
        id="loginModal2"
        tabindex="-1">

        <div
            class="modal-dialog modal-dialog-centered">

            <div class="modal-content">


                <div class="modal-header">

                    <h5 class="modal-title">
                        Admin Access
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                    </button>

                </div>


                <div class="modal-body">


                    <input
                        type="password"
                        id="adminPassword2"
                        class="form-control"
                        placeholder="Enter password">


                    <div
                        class="text-danger mt-2"
                        id="loginError2"
                        style="display:none;">

                        Incorrect password

                    </div>

                </div>


                <div class="modal-footer">


                    <button
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                        Cancel

                    </button>


                    <button
                        class="btn btn-primary"
                        onclick="verifyAdmin2()">

                        Continue

                    </button>

                </div>

            </div>

        </div>

    </div>



    <!-- =========================================
         JAVASCRIPT
    ========================================== -->


    <!-- Bootstrap JS -->

    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script>


    <!-- jQuery -->

    <script
        src="https://code.jquery.com/jquery-3.7.1.min.js">
    </script>


    <!-- Surveys API -->

    <script
        src="js/fetchSurveysAPI.js?v=1.0.5">
    </script>


    <!-- Main JS -->

    <script
        src="js/main.js?v=1.0.5">
    </script>


</body>

</html>