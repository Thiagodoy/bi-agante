//inicialização
google.charts.load('current', {
    'packages': ['corechart', 'controls']
});
google.charts.setOnLoadCallback(drawDashboard);

//Função principal
function drawDashboard() {
    //carrega dados json
    var jsonData = $.ajax({
        url: "core/getData/gd_dsh03.php",
        dataType: "json",
        async: false
    }).responseText;

    debugger;
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);

    //inicia dashboard
    var dashboard = new google.visualization.Dashboard();

    //grafico table
    var tableChart_geral = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'tableChartComparativo_div_oculto',
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

    //cria formato paara % com casas decimais
    var formatterPorcentDecimal = new google.visualization.NumberFormat({
        prefix: '',
        suffix: '%',
        fractionDigits: 2,
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: '',
        negativeParens: false
    });

    //cria frormato Arrow
    var formatterArrow = new google.visualization.ArrowFormat();

    window.formatterFactory = new FormatterFactory();



    /**
     * @author Thiago Godoy
     * @summary Usa um factory para contruir os filtros de acordo com o dashboard
     * @param {string} dashboard identificado do dashboard
     * @param {string} containerId identificaador onde vai ser renderizado os filtros 
     */
    let filter = filterFactory.build('dashboard03', '#filters-container');


    //executa o draw nos filtros e graficos declarados
    dashboard.bind(filter.filters, tableChart_geral);
    dashboard.draw(data);

    //INICIA TRATATIVAS DE AGRUPAMENTO
    //grafico table
    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'tableChartComparativo_div',
        'options': {
            'height': '',
            'frozenColumns': 2,
            'allowHtml': true
        }
    });


    // || COLUNAS SEM FILTRO || COLUNAS COM FILTRO || COLUNAS AGRUPAMENTO ||


    //utiliza a tabela "tableChart_geral" como tabela mãe e cria tabela de agrupamento 
    google.visualization.events.addListener(tableChart_geral, 'ready', function() {
        var dt = tableChart_geral.getDataTable();

        //zera vetor antes de entrar no laço
        aggColumns = [];

        //cria todas as colunas começando da 2 até a ultima
        for (var k = 4; k < data.getNumberOfColumns(); k++) {
            //insere os dados no vetor
            aggColumns.push({
                column: k,
                type: 'number',
                label: data.getColumnLabel(k),
                aggregation: google.visualization.data.sum
            });
        }

        //define que para coluna zero "[0]", trazer as colunas 2 e 3 somadas
        var catGroup = google.visualization.data.group(dt, [2, 3], aggColumns);

        //add novas colunas calculadas
        catGroup.addColumn('number', 'Variação');
        catGroup.addColumn('number', 'Variação %');

        //passa for linha a linha
        for (var y = 0; y < catGroup.getNumberOfRows(); y++) {
            //catGroup.setCell(y, 4, 1);
            //catGroup.setCell(y, 5, 1);

            //define variação simples
            var vlVariacao = catGroup.getValue(y, 3) - catGroup.getValue(y, 2);

            //realiza tratativas para pegar variação em porcentagem
            if (catGroup.getValue(y, 2) == 0 && catGroup.getValue(y, 3) > 0) {
                var vlVariacaoPorcentagem = 100;
            } else if (catGroup.getValue(y, 3) == 0 && catGroup.getValue(y, 2) > 0) {
                var vlVariacaoPorcentagem = -100;
            } else if (catGroup.getValue(y, 2) != 0 && catGroup.getValue(y, 2) != 0) {
                var vlVariacaoPorcentagem = ((catGroup.getValue(y, 3) - catGroup.getValue(y, 2)) / catGroup.getValue(y, 2)) * 100;
            } else {
                var vlVariacaoPorcentagem = 0;
            }

            //insere dados calculados nas colunas correspondentes
            catGroup.setCell(y, 4, vlVariacao);
            catGroup.setCell(y, 5, vlVariacaoPorcentagem);
        }


        //aplica formato criado anteriormente para totadas exeto a ultima pois é %
        for (var k = 2; k < ((data.getNumberOfColumns()) - 1); k++) {
            formatter.format(catGroup, k);
        }

        //aplica dois formatos para a ultima coluna que é %
        formatterPorcentDecimal.format(catGroup, 5); //porcentagem
        formatterArrow.format(catGroup, 5); //flecha vermelha ou verde

        //seta para a coluna Evento, a class width-300px
        catGroup.setColumnProperty(1, 'className', 'width-300px');

        //seta tabela a ser utilizada pelo tableChart e executa draw
        tableChart.setDataTable(catGroup);
        tableChart.draw();
    });


    //utiliza a tabela "tableChart" como tabela mãe e cria tabela de agrupamento para definir Proventos, Descontos e Líquidp
    google.visualization.events.addListener(tableChart, 'ready', function() {
        var dt = tableChart.getDataTable();

        //zera variavel
        var vlProventos = 0;
        var vlDescontos = 0;
        var vlProventos_col01 = 0;
        var vlProventos_col02 = 0;
        var vlDescontos_col01 = 0;
        var vlDescontos_col02 = 0;

        //passando por todas as linhas começando pela primeira
        for (var y = 0; y < dt.getNumberOfRows(); y++) {
            //pega conteudo da primeira coluna para fazer verificação
            var tipoEventoLoop = dt.getValue(y, 0);

            if (tipoEventoLoop == 'Provento') {
                //pega os valores das duas colunas
                vlProventos_col01 = vlProventos_col01 + dt.getValue(y, 2);
                vlProventos_col02 = vlProventos_col02 + dt.getValue(y, 3);

            }
            if (tipoEventoLoop == 'Desconto') {
                //pega os valores das duas colunas
                vlDescontos_col01 = vlDescontos_col01 + dt.getValue(y, 2);
                vlDescontos_col02 = vlDescontos_col02 + dt.getValue(y, 3);
            }
        }

        //pegando os dois liquidos
        var Liquido_col01 = vlProventos_col01 - vlDescontos_col01;
        var Liquido_col02 = vlProventos_col02 - vlDescontos_col02;

        //realiza tratativas para pegar variação em porcentagem PROVENTOS
        if (vlProventos_col01 == 0 && vlProventos_col02 > 0) {
            var vlVariacaoPorcentagem_proventos = 100;
        } else if (vlProventos_col02 == 0 && vlProventos_col01 > 0) {
            var vlVariacaoPorcentagem_proventos = -100;
        } else if (vlProventos_col01 != 0 && vlProventos_col01 != 0) {
            var vlVariacaoPorcentagem_proventos = ((vlProventos_col02 - vlProventos_col01) / vlProventos_col01) * 100;
        } else {
            var vlVariacaoPorcentagem_proventos = 0;
        }

        //realiza tratativas para pegar variação em porcentagem DESCONTOS
        if (vlDescontos_col01 == 0 && vlDescontos_col02 > 0) {
            var vlVariacaoPorcentagem_descontos = 100;
        } else if (vlDescontos_col02 == 0 && vlDescontos_col01 > 0) {
            var vlVariacaoPorcentagem_descontos = -100;
        } else if (vlDescontos_col01 != 0 && vlDescontos_col01 != 0) {
            var vlVariacaoPorcentagem_descontos = ((vlDescontos_col02 - vlDescontos_col01) / vlDescontos_col01) * 100;
        } else {
            var vlVariacaoPorcentagem_descontos = 0;
        }

        //realiza tratativas para pegar variação em porcentagem LIQUIDO
        if (Liquido_col01 == 0 && Liquido_col02 > 0) {
            var vlVariacaoPorcentagem_liquido = 100;
        } else if (Liquido_col02 == 0 && Liquido_col01 > 0) {
            var vlVariacaoPorcentagem_liquido = -100;
        } else if (Liquido_col01 != 0 && Liquido_col01 != 0) {
            var vlVariacaoPorcentagem_liquido = ((Liquido_col02 - Liquido_col01) / Liquido_col01) * 100;
        } else {
            var vlVariacaoPorcentagem_liquido = 0;
        }


        //da valor aos campos
        document.getElementById('vlProventos_div').innerHTML = '<b>' + numberToReal(vlVariacaoPorcentagem_proventos) + '%</b>';
        document.getElementById('vlDescontos_div').innerHTML = '<b>' + numberToReal(vlVariacaoPorcentagem_descontos) + '%</b>';
        document.getElementById('vlLiquido_div').innerHTML = '<b>' + numberToReal(vlVariacaoPorcentagem_liquido) + '%</b>';

    });

    //cria objeto ColumnChart que receberá os dados calculados 
    var ColumnChart = new google.visualization.ChartWrapper({
        'chartType': 'ColumnChart',
        'containerId': 'ColumnChart_div',
        'options': {
            'height': 300,
            'legend': {
                'position': 'bottom'
            },
            vAxis: {
                minValue: 0,
                format: '#.###' //nao esta funcionando corretamente
            }
        }
    });

    //utiliza a tabela "tableChart" como tabela mãe e cria tabela de agrupamento 
    google.visualization.events.addListener(tableChart, 'ready', function() {
        var dt = tableChart.getDataTable();

        //define que para coluna zero "[0]", trazer as colunas 2 e 3 somadas
        var catGroup = google.visualization.data.group(dt, [0], [{
            column: 2,
            type: 'number',
            label: data.getColumnLabel(2),
            aggregation: google.visualization.data.sum
        }, {
            column: 3,
            type: 'number',
            label: data.getColumnLabel(3),
            aggregation: google.visualization.data.sum
        }]);


        //aplica formato criado anteriormente para as duas colunas
        formatter.format(catGroup, 1);
        formatter.format(catGroup, 2);

        //seta tabela a ser utilizada pelo ColumnChart e executa draw
        ColumnChart.setDataTable(catGroup);
        //ColumnChart.draw();
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
                    var evento_filtrado = tableChart.getDataTable().getFormattedValue(item.row, 1);

                }
            }

            //se foi filtrado algum evento, executa grafico detalhado
            if (evento_filtrado != '') {
                //verifica se foi filtrado algo em categoryPicker_Empresa
                var state_FilterEmpresa = categoryPicker_Empresa.getState();
                state_FilterEmpresa = state_FilterEmpresa.selectedValues;

                //verifica se foi filtrado algo em categoryPicker_Estabelecimento
                var state_FilterEstabelecimento = categoryPicker_Estabelecimento.getState();
                state_FilterEstabelecimento = state_FilterEstabelecimento.selectedValues;

                //executa função de grafico detalhado
                enviaFormGraficoDetalhado(evento_filtrado, state_FilterEmpresa, state_FilterEstabelecimento);
            }
        });
    });

    //função que envia form paara criar json para dados detalhados
    function enviaFormGraficoDetalhado(evento_filtrado, state_FilterEmpresa, state_FilterEstabelecimento) {
        //esconde a div do grafico que será exibida quando o loader dele for completo
        $('#DetalhadoColaborador_chart_div').hide();

        //antes de realizar as tratativas, esconde info e exibe imagem de carregamento
        $('.info_detalhado').hide();
        $('.carregando_detalhado').show();

        //monta os valores a serem enviados              
        var dadosForm = 'evento_filtrado=' + evento_filtrado + '&state_FilterEmpresa=' + state_FilterEmpresa + '&state_FilterEstabelecimento=' + state_FilterEstabelecimento;

        $.ajax({
            type: "POST",
            url: "core/filters/cad_filter_dhs03_detalhado.php", //caminho iniciando da pagina que incluir esse js
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