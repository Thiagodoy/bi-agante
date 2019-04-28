//inicialização
google.charts.load('current', {
    'packages': ['corechart', 'controls']
});
//google.charts.setOnLoadCallback(drawDashboard_detalhado);

//Função principal
function drawDashboard_detalhado() {
    //carrega dados json
    var jsonData = $.ajax({
        url: "core/getData/gd_dsh06_detalhado.php",
        dataType: "json",
        async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);
        
    //inicia dashboard
    var dashboard = new google.visualization.Dashboard();

    //filtro evento
    var categoryPicker = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'categoryPicker_div',
        'options': {
        'filterColumnIndex': 3,
            'ui': {
                'label': '',
                'caption' : 'Filtro Evento',
                'allowTyping': false,
                'allowMultiple': true,
                'selectedValuesLayout': 'below'
            }
        }      
    });
    
    //filtro empresa
    var categoryPicker_Empresa = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'categoryPicker_Empresa_div',
        'options': {
        'filterColumnIndex': 0,
            'ui': {
                'label': '',
                'caption' : 'Filtro Empresa',
                'allowTyping': false,
                'allowMultiple': true,
                'selectedValuesLayout': 'below'
            }
        }      
    });
    
     //filtro estabelecimento
    var categoryPicker_Estabelecimento = new google.visualization.ControlWrapper({
        'controlType': 'CategoryFilter',
        'containerId': 'categoryPicker_Estabelecimento_div_oculto',
        'options': {
        'filterColumnIndex': 1,
            'ui': {
                'label': '',
                'caption' : 'Filtro Estabelecimento',
                'allowTyping': false,
                'allowMultiple': true,
                'selectedValuesLayout': 'below'
            }
        }      
    });    
    
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
    var formatterHours = new google.visualization.NumberFormat({
        prefix: '',
        fractionDigits: 3,
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
    
    //executa o draw nos filtros e graficos declarados
    dashboard.bind(categoryPicker_Estabelecimento, tableChart_geral);
    dashboard.draw(data);  
    
    //INICIA TRATATIVAS DE AGRUPAMENTO
   //grafico table
    var tableChart = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'DetalhadoColaborador_chart_div',
        'options': {
            'height': '',
            'frozenColumns': 2,
            'allowHtml': true
        }
    });
    
    //utiliza a tabela "tableChart_geral" como tabela mãe e cria tabela de agrupamento 
    google.visualization.events.addListener(tableChart_geral, 'ready', function () {
        var dt = tableChart_geral.getDataTable();
        
        //zera vetor antes de entrar no laço
        aggColumns = [];
        
        //cria todas as colunas começando da 2 até a ultima
        for(var k=3; k<data.getNumberOfColumns(); k++){
            //insere os dados no vetor
            aggColumns.push({
                column: k,
                type: 'number',
                label: data.getColumnLabel(k),
                aggregation: google.visualization.data.sum
            });
        }

        //define que para coluna zero "[0]", trazer as colunas 2 e 3 somadas
        var catGroup = google.visualization.data.group(dt, [0, 1, 2], aggColumns);        
       
        //aplica formato criado anteriormente para totadas exeto a ultima pois é %
        for(var k=3; k<(catGroup.getNumberOfColumns()); k++){
            formatterHours.format(catGroup, k);
        }

        //seta tabela a ser utilizada pelo tableChart e executa draw
        tableChart.setDataTable(catGroup);
        tableChart.draw();
    });        
    
    //Tratativas referentes a exibição de divs
    $('.carregando_detalhado').hide();
    //$('.info_detalhado').show();
    $('#DetalhadoColaborador_chart_div').show();
}