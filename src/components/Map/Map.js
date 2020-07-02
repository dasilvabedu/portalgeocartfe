/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

export default class Map extends React.Component {
    componentDidMount() {
        const { metadado } = this.props;
        //console.log(`metadado= ${JSON.stringify(metadado)}`);
        const pontoCentral =
            metadado && metadado['Q - Centro para Zoom (mtt_centro)']
                ? metadado['Q - Centro para Zoom (mtt_centro)']
                : null;
        const lat = pontoCentral
            ? pontoCentral.replace('[', '').replace(/\s+/g, '').split(',')[0]
            : -14.235004;
        const long = pontoCentral
            ? pontoCentral.replace(']', '').replace(/\s+/g, '').split(',')[1]
            : -14.235004;
        const zoom =
            metadado && metadado['M - Nível de Zoom (mtt_nivelzoom)']
                ? metadado['M - Nível de Zoom (mtt_nivelzoom)']
                : 3;
        const layer =
            metadado && metadado['B - Nome da Tabela (mtt_tabela)']
                ? metadado['B - Nome da Tabela (mtt_tabela)']
                : '';

        //console.log(`lat= ${lat} long= ${long} zoom= ${zoom} layer= ${layer}`);

        this.map = L.map('map', {
            center: [lat, long],
            zoom,
            zoomControl: false,
        });

        const basemap = L.tileLayer(
            'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            {}
        );
        basemap.addTo(this.map);

        L.tileLayer('https://portal.geocart.xyz/geoserver/portalseg/wms', {
            layers: layer,
            format: 'image/png',
            transparent: true,
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
        }).addTo(this.map);
    }

    render() {
        return <Wrapper width="100%" height="463px" id="map" />;
    }
}
