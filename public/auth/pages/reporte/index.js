$(function(){
    const $filter_jugador = $("#filter_jugador"); 
    const $filter_anio = $("#filter_anio"), $filter_torneo = $("#filter_torneo");
    const $partialView = $("#partialView"), $btnBuscar = $("#btnBuscar");

    $filter_jugador.select2({             
        placeholder: "Buscar a un jugador",
        allowClear: true, 
    });

    $btnBuscar.on("click", function(){
        invocarVista(`/auth/reporte/jugadorPartialView?filter_jugador=${$filter_jugador.val()}&filter_anio=${$filter_anio.val()}&filter_torneo=${$filter_torneo.val()}`, function (data){
            $partialView.html("").append(data);
        });       
    });

    $(document).on("click", "table tbody tr[data-id]", function(){
        const $this = $(this);
        invocarModal(`/auth/reporte/jugadorPartidosPartialView?filter_torneo=${$this.attr('data-id')}&filter_category=${$this.attr('data-category')}&filter_jugador=${$this.attr('data-player')}`);
    });
  
});