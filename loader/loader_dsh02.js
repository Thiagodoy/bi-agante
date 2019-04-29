//inicialização
google.charts.load('current', {
    'packages': ['corechart', 'controls']
});
google.charts.setOnLoadCallback(drawDashboard);

//Função principal
function drawDashboard() {
    //carrega dados json
    var jsonData = $.ajax({
        url: "core/getData/gd_dsh02.php",
        dataType: "json",
        async: false
    }).responseText;

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
        //passando pelas colunas começando da coluna 5 (zero é a primeira) só nao pega a coluna do totalizador
        for (var k = 4; k < positioColumTot; k++) {
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
    let filter = filterFactory.build('dashboard02');

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

        //cria todas as colunas começando da 3 até a penultima, pois a ultima é totalizador
        for (var k = 4; k < positioColumTot; k++) {
            //insere os dados no vetor
            aggColumns.push({
                column: k,
                type: 'number',
                label: data.getColumnLabel(k),
                aggregation: google.visualization.data.sum
            });
        }

        //define que para coluna zero "[0]", trazer as colunas 2 e 3 somadas
        var catGroup = google.visualization.data.group(dt, [3], aggColumns);


        //seta tabela a ser utilizada pelo tableChart e executa draw
        tableChart.setDataTable(catGroup);
        tableChart.draw();
    });


    //ColumnChart
    var ColumnChart = new google.visualization.ChartWrapper({
        chartType: 'ColumnChart',
        containerId: 'ColumnChart_div',
        dataTable: data,
        options: {
            title: 'Evolução Eventos',
            curveType: 'function',
            legend: { position: 'right' },
            pointSize: 3,
            height: 400,
            isStacked: true,
            hAxis: {
                slantedText: true, //true deita a legenda do eixo x
                //slantedTextAngle: 90, 
                format: 'MM/yyyy',
                ticks: data.getDistinctValues(0),
                interval: 4,
                textStyle: {
                    color: '#01579b',
                    fontSize: 10,
                    fontName: 'Arial',
                    bold: true,
                    italic: true,
                    logScale: false
                }
            },
        },
    });

    //LineChart
    var LineChart = new google.visualization.ChartWrapper({
        chartType: 'LineChart',
        containerId: 'LineChart_div',
        dataTable: data,
        options: {
            title: 'Evolução Eventos',
            curveType: 'function',
            legend: { position: 'right' },
            pointSize: 3,
            height: 400,
            isStacked: true,
            hAxis: {
                slantedText: true, //true deita a legenda do eixo x
                //slantedTextAngle: 90,          
                textStyle: {
                    color: '#01579b',
                    fontSize: 10,
                    fontName: 'Arial',
                    bold: true,
                    italic: true,
                    logScale: false
                }
            }
        },
    });



    //utiliza a tabela "tableChart" como tabela mãe e cria tabela de agrupamento 
    google.visualization.events.addListener(tableChart, 'ready', function() {
        //recebe os dados gerados anteriormente
        var dt = tableChart.getDataTable();

        var qtdlinhas_dt = dt.getNumberOfRows();

        //se existem dados, imprime graficos
        if (qtdlinhas_dt > 0) {
            //se ocultou em algum momento, exibe novamente
            MostraDiv('div_graficos');

            //apaga mensagem de erro se existir
            document.getElementById('aguarde_ColumnChart_div').innerHTML = '';

            //cria nova tabela para inverter coluna e linha (transpor)
            var dt02 = new google.visualization.DataTable();

            //cria a primeiralinha da tabela
            dt02.addColumn('string', 'MesAno');

            //cria as colunas para a nova tabela
            for (var k = 0; k < dt.getNumberOfRows(); k++) {
                //add como coluna todas as linhas da primeira coluna
                dt02.addColumn('number', dt.getValue(k, 0));
            }

            //adiciona linhas com a qtd de colunas da tabela dt pois os dados vão ser transpostos
            dt02.addRows((dt.getNumberOfColumns() - 1));

            //adicionando a primeira coluna
            for (var y = 1; y < dt.getNumberOfColumns(); y++) {
                //inverte linha e coluna para transpor tabela
                dt02.setCell((y - 1), 0, dt.getColumnLabel(y, 0)); //dt.getValue(0, y)); //comando: setCell(linha, coluna, valor). (y-1) por que o cab já foi add
            }

            //passando por coluna (iniiando da 2 pois a primeira é o cab) primeiro e depois por linha adicionando valores
            for (var y = 1; y < dt.getNumberOfColumns(); y++) {
                for (var k = 0; k < dt.getNumberOfRows(); k++) {
                    //inverte linha e coluna para transpor tabela
                    dt02.setCell((y - 1), (k + 1), dt.getValue(k, y)); //comando: setCell(linha, coluna, valor). (y-1) por que o cab já foi add
                }
            }

            //aplica formato criado anteriormente para totadas colunas number
            for (var k = 1; k < dt02.getNumberOfColumns(); k++) {
                formatter.format(dt02, k);
            }

            //seta tabela a ser utilizada
            ColumnChart.setDataTable(dt02);
            LineChart.setDataTable(dt02);

            //executando draw
            ColumnChart.draw();
            LineChart.draw();
        }

        //caso não existam dados, exibe mensagem
        else {
            //mensagem de erro
            var msgerro = "<p align='center' style='padding-top: 100px;'><b>Não existem dados para os filtros aplicados.</b></p>";
            //insere a mensagem de erro nas divs
            document.getElementById('aguarde_ColumnChart_div').innerHTML = msgerro;
            //oculta div dos graficos
            Oculta('div_graficos');
        }
    });




    //chama função geral
    GeralAposDraw();

}