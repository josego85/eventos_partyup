<html>
<head>
    <title>Eventos Partyup</title>

    <!-- Cabecera -->
    <?php $this->load->view('comunes/cabecera')?>
</head>
<body onLoad="loadMapa()">
    <div class="container cabecera">
        <h1>Eventos Partyup</h1>
    </div>
    <div class="container">
        <!-- Menu -->
        <?php $this->load->view('comunes/menu')?>
    </div>
    <div class="container">
        <!-- Mensaje descatacado -->
        <div class="jumbotron">
            <div class="container">
                <!-- Menu -->
                <?php $this->load->view('utiles/mensaje_destacado')?>
            </div>
        </div>
    </div>
    <div id="mapa">
    </div>


    <!-- Pie de pagina -->
    <?php $this->load->view('comunes/pie_pagina')?>
</body>
</html>