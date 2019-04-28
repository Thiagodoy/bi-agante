function FormatterFactory() {


    //cria formato paara valor R$
    const formatter = new google.visualization.NumberFormat({
        prefix: 'R$ ',
        fractionDigits: 2,
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: '',
        negativeParens: false
    });

    //cria formato paara % com casas decimais
    const formatterPorcentDecimal = new google.visualization.NumberFormat({
        prefix: '',
        suffix: '%',
        fractionDigits: 2,
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: '',
        negativeParens: false
    });

    //cria frormato Arrow
    const formatterArrow = new google.visualization.ArrowFormat();


    this.formatValue = function(value, column) {
        formatter.format(value, column);
    };

    this.formatPercentual = function(value, column) {
        formatterPorcentDecimal.format(value, column);
    };

    this.formatArrow = function(value, column) {
        formatterArrow.format(value, column);
    };
}