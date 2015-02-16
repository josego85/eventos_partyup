// Variables y Objetos globales.
var v_mapa = null;
var v_layer_mapquest = null;
var v_layer_eventos  = null;
var v_latitude = null;
var v_longitude = null;
var v_zoom_min_mapa = null;
var v_zoom_max_mapa = null;
var v_zoom_mapa = null;

function loadMapa(){
    // Asunci\u00E1n - Paraguay.
    v_latitude = -25.30655;
    v_longitude = -57.60051;

    // Zoom del mapa.
    v_zoom_min_mapa = 2;
    v_zoom_max_mapa = 17;
    v_zoom_mapa = 8;

    var v_centrar_mapa = ol.proj.transform([v_longitude, v_latitude], 'EPSG:4326', 'EPSG:3857');

    // MapQuest Layer.
    v_layer_mapquest = new ol.layer.Tile({
        style: 'Road',
        source: new ol.source.MapQuest({
            layer: 'osm'
        })
    });

    // Layer eventos.
    v_layer_eventos = new ol.layer.Vector({
        source: new ol.source.GeoJSON({
            projection: 'EPSG:3857',
            url: 'http://eventos_partyup/eventos/listarEventos'
        }),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: 'blue'
                })
            })
       })
    });

    // Mapa.
    v_mapa = new ol.Map({
        controls: ol.control.defaults({
        }).extend([
            new ol.control.ScaleLine(),
            new ol.control.FullScreen()
        ]),
        target: 'mapa',
        renderer: 'canvas',
        layers: [
            v_layer_mapquest,
            v_layer_eventos
        ],
        view: new ol.View({
            center: v_centrar_mapa,
            minZoom: v_zoom_min_mapa,
            maxZoom: v_zoom_max_mapa,
            zoom: v_zoom_mapa
        })
    });

    // -- Display information on singleclick --
    // Create a popup overlay which will be used to display feature info
    var v_popup = new ol.Overlay.Popup();
    v_mapa.addOverlay(v_popup);

    // Add an event handler for the map "singleclick" event.
    v_mapa.on('singleclick', function(evt) {
        // Hide existing popup and reset it's offset
        v_popup.hide();
        v_popup.setOffset([0, 0]);

        // Attempt to find a feature in one of the visible vector layers
        var feature = v_mapa.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            return feature;
        });

        if (feature) {
            var v_coordenadas = feature.getGeometry().getCoordinates();
            var v_propiedades = feature.getProperties();
            var v_info = '<div class="popup">';

            for(var k in v_propiedades) {
                var v = v_propiedades[k];

                // Como viene de la base de datos el campo todo en min\u00FAscula,
                // queremos tener la primera letra en may\u00FAscula.
                var v_etiqueta = k.charAt(0).toUpperCase() + k.slice(1)

                if(v_etiqueta == 'Link'){
                    if(v == null || v == ""){
                        v_info += '<b>' + "Sin Informaci\u00F3n" + '</b><br />';
                    }else{
                          v_info += '<b>' + "Informaci\u00F3n" + '</b>: <a href="' + v + '" target="_blank">' + "sitio" + '</a><br />';
                    }
                }else if (v_etiqueta == 'Geometry'){
                       v_info += '';
                }else{
                     v_info += '<b>' + v_etiqueta + '</b>: ' + v + '<br />';
                }
            } // Fin del if.
            // Offset the popup so it points at the middle of the marker not the tip
            v_popup.setOffset([0, -22]);
            v_popup.show(v_coordenadas, v_info);
        }
    });
}