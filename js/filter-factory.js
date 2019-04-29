function FilterFactory() {


    this.build = (dashboard) => {

        switch (dashboard) {
            case 'dashboard01':
                return this.dashboard01();
            case 'dashboard02':
                return this.dashboard02();
            case 'dashboard03':
                return this.dashboard03();
            case 'dashboard04':
                return this.dashboard04();
            case 'dashboard05':
                return this.dashboard05();
            case 'dashboard06':
                return this.dashboard06();
            case 'dashboard07':
                return this.dashboard07();
            case 'dashboard08':
                return this.dashboard08();
        }

    }


    this.getLastFilterByIndex = (filters) => {

        filters.sort((a, b) => {
            return a.options.filterColumnIndex > b.options.filterColumnIndex ? 1 : -1;
        });

        return filters.pop().options.filterColumnIndex;
    }

    this.buildContainerHtml = function(filters) {
        let control = new Array();

        filters.forEach(filter => {
            $('#filters-container').append(`<div id="${filter.containerId}" class="control item-filter"  onclick="${filter.functionCallback}"></div>`);
            control.push(new google.visualization.ControlWrapper(filter));
        });

        return control;
    }

    this.dashboard01 = () => {
        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Unidade_negocio_div', 'options': { 'filterColumnIndex': 2, 'ui': { 'label': '', 'caption': 'Uni. Negócio', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Tipo_mob_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Tipo Mão de Obra', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Centrodecusto_div', 'options': { 'filterColumnIndex': 4, 'ui': { 'label': '', 'caption': 'Centro de Custo', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 6, 'ui': { 'label': '', 'caption': 'Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];

        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }

    this.dashboard02 = () => {

        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];

        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }

    this.dashboard03 = () => {
        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': 'AddCss_charts_menu_vertical()', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 2, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];

        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }

    this.dashboard04 = () => {

    }

    this.dashboard05 = () => {
        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }

    this.dashboard06 = () => {
        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }

    this.dashboard07 = () => {
        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }

    this.dashboard08 = () => {
        let fi = [
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_div', 'options': { 'filterColumnIndex': 3, 'ui': { 'label': '', 'caption': 'Filtro Evento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Empresa_div', 'options': { 'filterColumnIndex': 0, 'ui': { 'label': '', 'caption': 'Filtro Empresa', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } },
            { 'controlType': 'CategoryFilter', 'functionCallback': '', 'containerId': 'categoryPicker_Estabelecimento_div', 'options': { 'filterColumnIndex': 1, 'ui': { 'label': '', 'caption': 'Filtro Estabelecimento', 'allowTyping': false, 'allowMultiple': true, 'selectedValuesLayout': 'below' } } }
        ];
        let filters = this.buildContainerHtml(fi);
        let lastIndexFilter = this.getLastFilterByIndex(fi);
        return { filters, lastIndexFilter };
    }
};

window.filterFactory = new FilterFactory();