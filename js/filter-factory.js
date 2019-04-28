function FilterFactory() {


    this.build = (dashboard, container) => {

        switch (dashboard) {
            case 'dashboard01':
                return this.dashboard01(container);
            case 'dashboard02':
                return this.dashboard02(container);
            case 'dashboard03':
                return this.dashboard03(container);
            case 'dashboard04':
                return this.dashboard04(container);
            case 'dashboard05':
                return this.dashboard05(container);
            case 'dashboard06':
                return this.dashboard06(container);
            case 'dashboard07':
                return this.dashboard07(container);
            case 'dashboard08':
                return this.dashboard08(container);
        }

    }


    this.buildContainerHtml = function(filters, container) {
        let control = new Array();

        filters.forEach(filter => {
            $(container).append(`<div id="${filter.containerId}" class="control" onclick="${filter.functionCallback}"></div>`);
            control.push(new google.visualization.ControlWrapper(filter));
        });

        return control;
    }

    this.dashboard01 = (container) => {
        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Unidade_negocio_div', 'options': { 'filterColumnIndex': 2, 'ui': { 'label': '', 'caption': 'Uni. Negócio', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Tipo_mob_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Tipo Mão de Obra', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Centrodecusto_div', 'options': { 'filterColumnIndex': 4, 'ui': { 'label': '', 'caption': 'Centro de Custo', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 6, 'ui': { 'label': '', 'caption': 'Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        return this.buildContainerHtml(filters, container);
    }

    this.dashboard02 = (container) => {

        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];

        return this.buildContainerHtml(filters, container);
    }

    this.dashboard03 = (container) => {
        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 2, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];

        return this.buildContainerHtml(filters, container);
    }

    this.dashboard04 = (container) => {

    }

    this.dashboard05 = (container) => {
        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        return this.buildContainerHtml(filters, container);
    }

    this.dashboard06 = (container) => {
        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        return this.buildContainerHtml(filters, container);
    }

    this.dashboard07 = (container) => {
        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        return this.buildContainerHtml(filters, container);
    }

    this.dashboard08 = (container) => {
        let filters = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        return this.buildContainerHtml(filters, container);
    }
};

window.filterFactory = new FilterFactory();