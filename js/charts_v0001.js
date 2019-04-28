/**
 * @author Jefferson Stançani
 * @summary Função criada para ser executada sempre após o draw dos graficos
 * @param functionenviada, nome da função que será executada
 */
function GeralAposDraw() {
    //animação do botao limpar
    if (document.getElementById('aguarde_limparimg').style.display == 'block') {
        ChangeDisplay('limparimg');
        ChangeDisplay('aguarde_limparimg');
    }
}

/**
 * @author Jefferson Stançani
 * @summary Função que add class para meu vertical criando barra de rolagem
 */
function AddCss_charts_menu_vertical() {
    $(".charts-menu-vertical").addClass("google-menu-vertical");
    $(".goog-menu").addClass("google-menu-vertical"); //goog-menu goog-menu-vertical

}

/**
 * @author Jefferson Stançani
 * @summary Função que mostra e oculta os ids enviados
 * @param idmostra (id a ser exibido); idoculta(id a ser oculto)
 */
function ChangeBtAguarde(idmostra, idoculta) {
    ChangeDisplay(idmostra);
    ChangeDisplay(idoculta);
}

/**
 * @author Jefferson Stançani
 * @summary Função criada para botão limpar dos graficos
 * @param functionenviada, nome da função que será executada
 */
function LimpaChart(functionenviada) {
    setTimeout(functionenviada, 500);

    //Limpa todos oas filtros adicinados dinamicamente
    $('.control').remove();
    controls = [];

    $('#btn-show-hide-filter')
        .find('span')
        .addClass('glyphicon-eye-close')
        .removeClass('glyphicon-eye-open')
        .attr('title', 'Ocultar Filtros');

    $('#btn-show-hide-filter').removeClass('disabled');
}

/**
 * @author Thiago Godoy
 * @summary Função que renderiza os containers dos filtros e define o id e suas funcoes
 * @param {string} element Identificador do container do filtro aplicado
 * @param {Object} filter Filtro do dashboard
 */
var controls = [];


function generateFilter(element, filter) {
    $(element).append(`<div id="${filter.containerId}" class="control" onclick="${filter.functionCallback}"></div>`);
    controls.push(new google.visualization.ControlWrapper(filter));

    // mountObserver(filter.containerId);
}

/**
 * @author Thiago Godoy
 * @summary Cria um observer nos container dos filtros para detectar seleção e habilitar show/hide dos filtros selecionados.
 * @param {string} id identificador do container dos filtros.
 */
function mountObserver(id) {
    let target = document.querySelector(id);
    var observer = new MutationObserver(function(mutations) {
        let count = $('.google-visualization-controls-categoryfilter-selected li').length;
        if (count > 0) {
            $('#btn-show-hide-filter').removeClass('disabled');
        } else if (count == 0) {
            $('#btn-show-hide-filter').addClass('disabled');
        }
    });

    let config = {
        subtree: true,
        childList: true
    };
    observer.observe(target, config);
}

/**
 * @author Thiago Godoy
 * @summary Enable/disable o botão de exportar de acordo com a quantidade de registros presente na tabela
 * @param {Object} dataTable Wrapper google.visualization.ChartWrapper 
 */
function enableDisableExportXLSX(dataTable) {
    let rows = dataTable.getDataTable().getNumberOfRows();
    if (rows == 0) {
        $('#btn-exportar')
            .addClass('disabled')
            .prop('disabled', true);
    }
    if (rows > 0) {
        $('#btn-exportar')
            .removeClass('disabled')
            .prop('disabled', false);

    }
}

/**
 * @author Thiago Godoy
 * @param {*} element Elemento instanciado do Jquery  
 */
function showHideFilter(element) {
    let data = element.data();
    let count = $('.google-visualization-controls-categoryfilter-selected li').length;

    if (count == 0) return;

    if (data.action == 'hide') {
        $('.google-visualization-controls-categoryfilter-selected').hide();
        element
            .find('span')
            .removeClass('glyphicon-eye-close')
            .addClass('glyphicon-eye-open')
            .attr('title', 'Mostrar Filtros');
        element.data('action', 'show')
    } else {
        $('.google-visualization-controls-categoryfilter-selected').show();
        element
            .find('span')
            .addClass('glyphicon-eye-close')
            .removeClass('glyphicon-eye-open')
            .attr('title', 'Ocultar Filtros');
        element.data('action', 'hide')
    }
}


/**
 * @author Thiago Godoy
 * @summary Função com finalidade de gerar arquivo xls 
 * @param {string} container identificador do container da table 
 */
function exportReport(container) {

    style = {
        row: [{ index: 2, style: 'font-weight: bold' }]
    }

    exportXLS(container, style);
}

/**
 * @author Thiago Godoy
 * @summary Função com finalidade de gerar arquivo xls com os valores formatados de google.visualization.DataTable
 * @param {string} container identificador do container da table
 * @param {Object} style Especifica os styles que serão aplicados
 * @example 
    style = {
            row: [{ index: 2, style: 'font-weight: bold' }]
        }
 */
function exportXLS(container, style) {


    /**
     * @author Thiago Godoy
     * @summary Verifica se um style definido para uma coluna em especifico
     * @param {*} index indentificado da coluna que será aplicado o style
     * @param {*} value  falor a ser a renderizado
     */
    function getStyleRow(index, value) {
        let element = 'td';
        let st = style.row.find(s => s.index == index);
        return st ? `<${element} style="${st.style}">${value}</${element}>` : `<${element}>${value}</${element}>`;
    };

    /**
     * @author Thiago Godoy
     * @summary Por default esta aplicando bold em todas as colunas do header
     * @param {*} index indentificado da coluna que será aplicado o style 
     * @param {*} value  falor a ser a renderizado 
     */
    function getStyleHeader(index, value) {
        let element = 'th';
        let st = 'font-weight: bold';
        return st ? `<${element} style="${st}">${value}</${element}>` : `<${element}>${value}</${element}>`;
    };

    let matriz = new Array();
    let row = new Array();
    $(`#${container} table > thead > tr > th`).each((a, b) => {
        let value = $(b).text();
        let th = getStyleHeader(a, value);
        row.push(th);
    });

    matriz.push(`<tr>${row}</tr>`);

    let matrizRow = new Array();
    $(`#${container} table > tbody > tr`).each((a, b) => {
        row = new Array();
        $(b).find('td').each((c, d) => {

            let value = $(d).text();
            let td = getStyleRow(c, value);
            row.push(td);
        })
        matrizRow.push(`<tr>${row}</tr>`);
    });

    $('#table-export').remove();

    let tableExport = [
        '<table id="table-export">',
        '<thead id="header">',
        matriz.join(''),
        '</thead>',
        '<tbody id = "body">',
        matrizRow.join(),
        '</tbody>',
        '</table>'
    ].join('');

    $('#container-export').append($(tableExport));

}