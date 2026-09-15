<!DOCTYPE html>
<html>

<head>
    <title>Login</title>

    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #eef2f7, #dfe7f3);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background: #fff;
            padding: 40px;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
            width: 340px;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .login-container h2 {
            text-align: center;
            margin-bottom: 25px;
            font-size: 22px;
            color: #222;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 6px;
            font-size: 13px;
            color: #555;
        }

        input {
            width: 92%;
            padding: 11px;
            border: 1px solid #d0d7de;
            border-radius: 8px;
            font-size: 14px;
            background: #fafafa;
            outline: none;
            transition: 0.2s ease;
        }

        input:focus {
            border-color: #4a90e2;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.15);
        }

        button {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            background: #4a90e2;
            border: none;
            color: white;
            font-size: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.2s ease;
        }

        button:hover {
            background: #357bd8;
            transform: translateY(-1px);
        }

        .footer-text {
            text-align: center;
            margin-top: 15px;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>

<body>

    <div class="login-container">
        <h2>Welcome Back</h2>

        <?php

        if (isset($_GET['error'])) {
            echo '<div style="color:#b00020; background:#ffe8e8; padding:10px; border-radius:8px; margin-bottom:15px; text-align:center;">'
                . htmlspecialchars($_GET['error']) .
                '</div>';
        }

        ?>

        <form action="authenticate.php" method="POST">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter username" required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter password" required>
            </div>

            <button type="submit">Login</button>
        </form>

    </div>

</body>

</html>