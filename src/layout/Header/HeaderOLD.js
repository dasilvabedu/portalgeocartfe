/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable semi */
import React from 'react';
import { NavLink } from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';
import logo from './logo.png';

const Wrapper = styled.header`
    position: relative;
    z-index: 2000;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 16px;
    background-color: white;
`;

const LogoImage = styled.img`
    display: block;
    max-width: 132px;
    height: auto;
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
`;

const AutocompleteOptionTitle = styled.span`
    display: block;
    font-weight: 700;
`;

const AutocompleteOptionSubtitle = styled.span`
    font-weight: 777;
`;

export default function Header() {
    return (
        <Wrapper>
            <NavLink to="/">
                <LogoImage src={logo} />
            </NavLink>
            <Actions>
                <Autocomplete
                    id="combo-box-demo"
                    options={[
                        {
                            title: 'São Paulo, State of São Paulo, Brazil',
                            value: 1,
                        },
                    ]}
                    noOptionsText="Nenhuma opção disponível"
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={null}
                            variant="outlined"
                            placeholder="Pesquise uma localização..."
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            style={{
                                                fontSize: 20,
                                                fill: '#808080',
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    renderOption={() => {
                        return (
                            <Grid container alignItems="center">
                                <Grid item>
                                    <LocationOnIcon
                                        style={{
                                            color: '#808080',
                                            marginRight: '12px',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <AutocompleteOptionTitle>
                                        São Paulo
                                    </AutocompleteOptionTitle>
                                    <AutocompleteOptionSubtitle>
                                        State of São Paulo, Brazil
                                    </AutocompleteOptionSubtitle>
                                </Grid>
                            </Grid>
                        );
                    }}
                />
            </Actions>
        </Wrapper>
    );
}
