//inicialização
google.charts.load('current', {
    'packages': ['corechart', 'controls']
});
google.charts.setOnLoadCallback(drawDashboard);

//Função principal
function drawDashboard() {
    //carrega dados json
    var jsonData = $.ajax({
        url: "core/getData/gd_dsh06.php",
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

    //cria formato paara valor horas
    var formatterHours = new google.visualization.NumberFormat({
        prefix: '',
        fractionDigits: 3,
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
    let filter = filterFactory.build('dashboard06');

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

        //insere a coluna do totalizador, pois será a primeira após o cabecalho
        //insere os dados no vetor
        aggColumns.push({
            column: positioColumTot,
            type: 'number',
            label: data.getColumnLabel(positioColumTot),
            aggregation: google.visualization.data.sum
        });

        //cria todas as colunas começando da 2 até a penultima, pois a ultima é totalizador
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
        var catGroup = google.visualization.data.group(dt, [0, 1], aggColumns);

        //tratativas para definir linha de TOTALIZADOR        
        //add uma linha a tabela criada a pouco
        catGroup.addRows(1);

        //pega quantidade de colunas
        var qtdcolumns_catGroup = catGroup.getNumberOfColumns();

        //passando todas as linhas 1 linha abaixo deixando assim a PRIMEIRA LINHA para o totalizador
        for (var k = 0; k < qtdcolumns_catGroup; k++) {
            //passando por todas as linhas começando pela primeira
            for (var y = (catGroup.getNumberOfRows() - 2); y >= 0; y--) {
                //insere os dados na nova posição
                catGroup.setCell((y + 1), k, catGroup.getValue(y, k));
            }
        }

        //antes de calcular o total, insere a primeira linha como 0 para todas as colunas
        for (var k = 2; k < qtdcolumns_catGroup; k++) {
            catGroup.setCell(0, k, 0);
        }

        //seta na primeira coluna a descrição de Total
        catGroup.setCell(0, 0, "TOTAL");
        catGroup.setCell(0, 1, "");
        catGroup.setCell(0, 2, "");
        catGroup.setCell(0, 3, "");

        //passando pelas colunas começando da coluna 5 (zero é a primeira)
        for (var k = 2; k < qtdcolumns_catGroup; k++) {
            //zera variavel parcial antes de entrar no for
            var totColunaParcial = 0;
            //passando por todas as linhas começando pela primeira
            for (var y = 0; y < catGroup.getNumberOfRows(); y++) {
                totColunaParcial = totColunaParcial + catGroup.getValue(y, k);
            }
            //insere totalizador na ultima linha
            catGroup.setCell(0, k, totColunaParcial);
        }

        //seta para a linha total, a class bold-font
        catGroup.setRowProperty(0, 'className', 'bold-font');


        //seta para a coluna total, a class bold-font
        catGroup.setColumnProperty(2, 'className', 'bold-font');

        //aplica formato criado anteriormente para totadas colunas number ((data.getNumberOfColumns())-2) por conta do agrupamento
        for (var k = 2; k < ((data.getNumberOfColumns()) - 2); k++) {
            formatterHours.format(catGroup, k);
        }

        //seta tabela a ser utilizada pelo tableChart e executa draw
        tableChart.setDataTable(catGroup);
        tableChart.draw();
    });


    /*===========================================================================================
                                Tratativas para grafico detalhado
    ===========================================================================================*/

    //verifica se algo foi selecionado na tabela para filtrar e trazer tabela de detalhes IMPORTANTE: primeiro função ready e depois select
    google.visualization.events.addListener(tableChart, 'ready', function() {
        //esconde a div do grafico que será exibida quando o loader dele for completo
        $('#DetalhadoColaborador_chart_div').hide();
        //mostra div de info e oculta carregamento
        $('.info_detalhado').show();
        $('.carregando_detalhado').hide();

        google.visualization.events.addListener(tableChart, 'select', function() {
            //pega a seleção IMPORTANTE: tableChart.getChart().getSelection(); - pega o grafico e depois a seleção
            var selection = tableChart.getChart().getSelection();

            for (var i = 0; i < selection.length; i++) {
                //verifica o que foi selecionado
                var item = selection[i];

                //se a linha não for nula, executa tratativas
                if (item.row != null) {
                    //pega o evento selecionado
                    var empresa_filtrado = tableChart.getDataTable().getFormattedValue(item.row, 0);
                    var estab_filtrado = tableChart.getDataTable().getFormattedValue(item.row, 1);
                }
            }

            //se foi filtrado algum evento, executa grafico detalhado
            if (empresa_filtrado != '' && estab_filtrado != '') {
                //verifica se foi filtrado algo em categoryPicker_Empresa

                var state_FilterEmpresa = filter.filters.find(f => f.gv == 'categoryPicker_Empresa_div').getState();
                state_FilterEmpresa = state_FilterEmpresa.selectedValues;

                //verifica se foi filtrado algo em categoryPicker_Estabelecimento
                var state_FilterEstabelecimento = filter.filters.find(f => f.gv == 'categoryPicker_Estabelecimento_div').getState();
                state_FilterEstabelecimento = state_FilterEstabelecimento.selectedValues;

                //verifica se foi filtrado algo em categoryPicker que é Evento
                var state_FilterEvento = filter.filters.find(f => f.gv == 'categoryPicker_div').getState();
                state_FilterEvento = state_FilterEvento.selectedValues;

                //executa função de grafico detalhado
                enviaFormGraficoDetalhado(empresa_filtrado, estab_filtrado, state_FilterEmpresa, state_FilterEstabelecimento, state_FilterEvento);
            }
        });
    });

    //função que envia form paara criar json para dados detalhados
    function enviaFormGraficoDetalhado(empresa_filtrado, estab_filtrado, state_FilterEmpresa, state_FilterEstabelecimento, state_FilterEvento) {
        //esconde a div do grafico que será exibida quando o loader dele for completo
        $('#DetalhadoColaborador_chart_div').hide();

        //antes de realizar as tratativas, esconde info e exibe imagem de carregamento
        $('.info_detalhado').hide();
        $('.carregando_detalhado').show();

        //monta os valores a serem enviados              
        var dadosForm = 'empresa_filtrado=' + empresa_filtrado + '&estab_filtrado=' + estab_filtrado + '&state_FilterEmpresa=' + state_FilterEmpresa + '&state_FilterEstabelecimento=' + state_FilterEstabelecimento + '&state_FilterEvento=' + state_FilterEvento;

        $.ajax({
            type: "POST",
            url: "core/filters/cad_filter_dhs06_detalhado.php", //caminho iniciando da pagina que incluir esse js
            data: dadosForm,
            success: function() {
                //executa o draw do grafico filtrado
                LimpaChart(drawDashboard_detalhado);
            }
        });
    }


    //chama função geral
    GeralAposDraw();

}