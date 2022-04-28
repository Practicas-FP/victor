import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import pokeballbackground from '../../assets/myImages/pokeballbackground.png'

export default function MyCard(pokemon) {
    return (
        <View style={styles.card}>
            <View>
                <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[6]}.png` }} style={{ width: '100px', height: '100px' }} />

                <Text style={styles.cardInfoH2}>{`#${pokemon.pokemon.url.split('/')[6]} ${pokemon.pokemon.name}`}</Text>
                <Image source={pokeballbackground} style={styles.cardBg} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        backgroundColor: '#FFF',
        height: '125px',
        overflow: 'hidden',

        borderRadius: '25px',
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 16,
        marginVertical: 6
    },
    cardImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: '3rem',
        paddingTop: '15px',
        paddingBottom: '15px',
        zIndex: 10
    },
    cardBg: {
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        color: 'white',
        height: '130px',
        zIndex: 1,
        height: '50px',
        width: '50px'
    },
    cardInfoH2: {
        fontWeight: 'bold',
        marginBottom: '16px',
        textTransform: 'uppercase',
    }
});