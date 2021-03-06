//inicialização
google.charts.load('current', {
    'packages': ['corechart', 'controls']
});
google.charts.setOnLoadCallback(drawDashboard);

//Função principal
function drawDashboard() {
    //carrega dados json
    var jsonData = $.ajax({
        url: "core/getData/gd_dsh01.php",
        dataType: "json",
        async: false
    }).responseText;



    //Parametrizações
    let indexStartAgrupamento = 4;
    let indexColunasAgrupamento = [2, 3];
    let indexCamposATotalizar = 4


    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);

    //add nova coluna com totalizador
    data.addColumn('number', 'TOTAL');

    //pega quantidade de colunas
    var qtdcolumns = data.getNumberOfColumns();
    //subtrai 1 por que a coluna que sera utilizada é a ultima
    positioColumTot = qtdcolumns - 1;

    //passando por todas as linhas começando pela primeira
    for (var y = 0; y < data.getNumberOfRows(); y++) {
        //zera variavel parcial antes de entrar no for
        var totLinhaParcial = 0;
        //passando pelas colunas começando da coluna 8 (zero é a primeira) só nao pega a coluna do totalizador
        for (var k = indexCamposATotalizar; k < positioColumTot; k++) {
            //guarda totalizador para utilizar depois
            totLinhaParcial = totLinhaParcial + data.getValue(y, k);
        }
        //insere totalizador na ultima coluna
        data.setCell(y, positioColumTot, totLinhaParcial);
    }

    //inicia dashboard
    var dashboard = new google.visualization.Dashboard();


    //grafico table
    var tableChart_geral = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'Detalhado_chart_div_oculto',
        'options': {
            'height': '',
            'frozenColumns': 2,
            'allowHtml': true
        }
    });

    //cria formato paara valor R$
    var formatter = new google.visualization.NumberFormat({
        prefix: 'R$ ',
        fractionDigits: 2,
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: '',
        negativeParens: false
    });



    /**
     * @author Thiago Godoy
     * @summary Usa um factory para contruir os filtros de acordo com o dashboard
     * @param {string} dashboard identificado do dashboard
     * @param {string} containerId identificaador onde vai ser renderizado os filtros 
     */
    let filter = filterFactory.build('dashboard01');

    //executa o draw nos filtros e graficos declarados
    dashboard.bind(filter.filters, tableChart_geral);
    dashboard.draw(data);

    //INICIA TRATATIVAS DE AGRUPAMENTO
    //grafico table
    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'Detalhado_chart_div',
        'options': {
            'height': '',
            'frozenColumns': 2,
            'allowHtml': true
        }
    });

    //utiliza a tabela "tableChart_geral" como tabela mãe e cria tabela de agrupamento 
    google.visualization.events.addListener(tableChart_geral, 'ready', function() {
        var dt = tableChart_geral.getDataTable();

        //zera vetor antes de entrar no laço
        aggColumns = [];

        //cria todas as colunas começando da 2 até a penultima, pois a ultima é totalizador
        for (var k = indexStartAgrupamento; k < positioColumTot; k++) {
            //insere os dados no vetor
            aggColumns.push({
                column: k,
                type: 'number',
                label: data.getColumnLabel(k),
                aggregation: google.visualization.data.sum
            });
        }

        //insere a coluna do totalizador, pois será a primeira após o cabecalho
        //insere os dados no vetor
        aggColumns.push({
            column: positioColumTot,
            type: 'number',
            label: data.getColumnLabel(positioColumTot),
            aggregation: google.visualization.data.sum
        });



        //define que para coluna zero "[0]", trazer as colunas 2 e 3 somadas
        var catGroup = google.visualization.data.group(dt, indexColunasAgrupamento, aggColumns);

        //seta para a coluna total, a class bold-font
        catGroup.setColumnProperty(indexColunasAgrupamento.length + (aggColumns.length - 1), 'className', 'bold-font');

        //seta para a coluna Evento, a class width-300px
        //catGroup.setColumnProperty(1, 'className', 'width-300px');


        //aplica formato criado anteriormente para totadas colunas number ((data.getNumberOfColumns())-2) por conta do agrupamento
        let max = indexColunasAgrupamento.length + aggColumns.length;
        for (var k = indexColunasAgrupamento.length; k < max; k++) {
            formatter.format(catGroup, k);
        }

        //seta tabela a ser utilizada pelo tableChart e executa draw
        tableChart.setDataTable(catGroup);
        tableChart.draw();
    });


    //utiliza a tabela "tableChart" como tabela mãe e cria tabela de agrupamento 
    google.visualization.events.addListener(tableChart, 'ready', function() {
        var dt = tableChart.getDataTable();

        //zera variavel
        var vlProventos = 0;
        var vlDescontos = 0;

        //passando por todas as linhas começando pela primeira
        for (var y = 0; y < dt.getNumberOfRows(); y++) {
            //passando pelas colunas começando da coluna 4 ate a ultima coluna
            for (var k = 3; k < dt.getNumberOfColumns(); k++) {
                //pega conteudo da primeira coluna para fazer verificação
                var tipoEventoLoop = dt.getValue(y, 0);
                if (tipoEventoLoop == 'Provento') {
                    vlProventos = vlProventos + dt.getValue(y, k);
                }
                if (tipoEventoLoop == 'Desconto') {
                    vlDescontos = vlDescontos + dt.getValue(y, k);
                }
            }
        }

        //calcula o liquido
        var vlLiquido = vlProventos - vlDescontos;

        //da valor aos campos
        document.getElementById('vlProventos_div').innerHTML = '<b>' + numberToReal(vlProventos) + '</b>';
        document.getElementById('vlDescontos_div').innerHTML = '<b>' + numberToReal(vlDescontos) + '</b>';
        document.getElementById('vlLiquido_div').innerHTML = '<b>' + numberToReal(vlLiquido) + '</b>';

    });

    //chama função geral
    GeralAposDraw();

}