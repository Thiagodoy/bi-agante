function FormatterFactory() {


    //cria formato paara valor R$
    this.formatter = new google.visualization.NumberFormat({
        prefix: 'R$ ',
        fractionDigits: 2,
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: '',
        negativeParens: false
    });

    //cria formato paara % com casas decimais
    this.formatterPorcentDecimal = new google.visualization.NumberFormat({
        prefix: '',
        suffix: '%',
        fractionDigits: 2,
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: '',
        negativeParens: false
    });

    //cria frormato Arrow
    this.formatterArrow = new google.visualization.ArrowFormat();


    this.getformatValue = () => {
        return this.formatter;
    };

    this.getformatPercentual = () => {
        return this.formatterPorcentDecimal;
    };

    this.getformatArrow = () => {
        return this.formatterArrow;
    };
}

window.formatter = new FormatterFactory();