$(function(){

    const $modal = $("#modalImportar"), $fileExcel = $("#file_excel"), $btnImportarMasivo = $("#btnImportarExcel");
    $btnImportarMasivo.on("click", function(){
        const formData = new FormData();
        formData.append('_token', $("meta[name=csrf-token]").attr("content"));
        formData.append('file_excel', document.getElementById("file_excel").files[0]);
        confirmAjax(`/auth/jugador/importarExcel`, formData, "POST", null, null, function(){
            $modal.attr("data-reload", "true"); $modal.modal("hide");
        }, function(data){
            if(data.Errors != null && data.Errors.length > 0){
                var html = "<ul style='padding:0;text-align:left;overflow-y: scroll;height: 270px;display: grid;align-items: center;'>";
                    $.each(data.Errors, function (i, v){
                        html += "<li style='margin-top:10px'> Error en la fila "+ v.key + ": " + v.Message + "<ul style='text-align:left;margin-top:10px'>";
                            $.each(v.error, function (i2, v2){
                                html +=  "<li class='mtb-5'>" + v2.error + "</li>";
                            });
                        html += "</ul></li>";
                    });
                html += "</ul>";

                Swal.fire({title: data.Registers == 0 ? 'Error al importar' : 'Se importarón '+ data.Registers +' jugadores, excepto ',icon:  data.Registers == 0 ? 'error' : 'warning',html: html, confirmButtonColor: '#3085d6'});
            }else{
                Toast.fire({icon: 'error', title: data.Message ? data.Message : 'Algo salió mal importar el archivo.'});
            }

        });
    });
});