
<script type="text/javascript" src="http://www.google.com/jsapi?.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="core/loader/loader_dsh01.js"></script>

<div class="col-md-12">
    <table border="0" style="font-size: 13px;">
            <tr style="vertical-align: top;">
                <td>
                    <div id="categoryPicker_Empresa_div" onclick="AddCss_charts_menu_vertical();"></div>
                </td>
                <td>
                    <div id="categoryPicker_Estabelecimento_div" onclick="AddCss_charts_menu_vertical();"></div>
                </td>
                <td>
                    <div id="categoryPicker_div" onclick="AddCss_charts_menu_vertical();"></div>
                </td>
                <td>
                    <div id="categoryPicker_Unidade_negocio_div" onclick="AddCss_charts_menu_vertical();"></div>
                </td>
                <td>
                    <div id="categoryPicker_Tipo_mob_div" onclick="AddCss_charts_menu_vertical();"></div>
                </td>
                <td>
                    <div id="categoryPicker_Centrodecusto_div" onclick="AddCss_charts_menu_vertical();"></div>
                </td>
            </tr>
        </table>
</div>
<div class="col-md-8" style="padding: 0;">
    <div class="col-md-6 col-xs-8">
        <form id='form' name='form' method='POST' action='#' onSubmit="return enviardados();">
            <div class="form-group col-md-4 col-xs-4" style="padding: 3px;">
                <label for="titulo">De:</label>
                <select class="form-control verif" name="dtini" id="dtini">
                    <script>
                        //escreve options
                        for (i = 0; i < count_vetor; i++) {
                            if(dtini_selected == vetor_valueoption[i]){
                                document.write("<option value='" + vetor_valueoption[i] + "'' selected='selected'>" + vetor_textoption[i] + "</option>");
                            }
                            else{
                                document.write("<option value='" + vetor_valueoption[i] + "''>" + vetor_textoption[i] + "</option>");
                            }
                        }
                    </script>
                </select>
            </div>
            <div class="form-group col-md-4 col-xs-4" style="padding: 3px;">
                <label for="titulo">Até:</label>
                <select class="form-control verif" name="dtfim" id="dtfim">
                    <script>
                        //escreve options
                        for (i = 0; i < count_vetor; i++) {
                            if(dtfim_selected == vetor_valueoption[i]){
                                document.write("<option value='" + vetor_valueoption[i] + "'' selected='selected'>" + vetor_textoption[i] + "</option>");
                            }
                            else{
                                document.write("<option value='" + vetor_valueoption[i] + "''>" + vetor_textoption[i] + "</option>");
                            }
                        }
                    </script>
                </select>
            </div>
            <div class="form-group col-md-4 col-xs-2" style="padding-top: 28px; padding-left: 3px;">
                <button type="submit" class="btn btpadrao" id="btfiltrodata" name="btfiltrodata" onclick="ChangeBtAguarde('aguarde_filtrar', 'filtrar');">
                    <img src='img/aguarde_bt.gif' height="20" id="aguarde_filtrar" style="display: none;">
                    <div id="filtrar">
                        <span class="glyphicon glyphicon-filter" aria-hidden="true"></span>&nbsp;Filtrar
                    </div>
                </button>
            </div>
        </form>
    </div>
    <div class="col-md-2 col-xs-4">
        <div class="form-group  col-md-4  col-xs-2" style="padding-left: 0px; padding-top:3px">
            <label for="titulo">&nbsp;</label>
                <button type="button" class="btn btpadrao" onclick="ChangeBtAguarde('aguarde_limparimg', 'limparimg');LimpaChart(drawDashboard);">
                    <img src='img/aguarde_bt.gif' height="20" id="aguarde_limparimg" style="display: none;">
                    <div id="limparimg">
                        <span class="glyphicon glyphicon-erase"></span>&nbsp;Limpar
                    </div>
                </button>
        </div>
    </div>    
</div>
<div class="col-md-4" >
    <div class="col-md-4 col-xs-4" style="padding: 0;">
        <button type="button" class="btn btsalvar" name="btsalvar" id="btsalvar" style="width: 95%;">Proventos:<br>
            <div id='vlProventos_div'></div>
        </button>
    </div>
    <div class="col-md-4 col-xs-4" style="padding: 0;">
        <button type="button" class="btn btcancelar" name="btsalvar" id="btsalvar" style="width: 95%;">Descontos:<br>
            <div id='vlDescontos_div'></div>
        </button>
    </div>
    <div class="col-md-4 col-xs-4" style="padding: 0;">
        <button type="button" class="btn btpadrao" name="btsalvar" id="btsalvar" style="width: 95%;">Líquido:<br>
            <div id='vlLiquido_div'></div>
        </button>
    </div>
</div>

<div class="col-md-12">
    <div style="height: 65%">
        <div id="Detalhado_chart_div" style="padding-right: 10px;display: block;width: 100%;">
            <p align='center'>
                <img src='img/gif.gif' width='105' height='115'><br>carregando gráfico...
            </p>
        </div>
    </div>
</div>
<div class="col-md-12" style="display: none;">
    <div style="height: 65%">
        <div id="Detalhado_chart_div_oculto" style="padding-right: 10px;display: block;width: 100%;">
            <p align='center'>
                <img src='img/gif.gif' width='105' height='115'><br>carregando gráfico...
            </p>
        </div>
    </div>
</div>