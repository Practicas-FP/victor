import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import pokeballbackground from '../../assets/myImages/pokeballbackground.png'

export default function MyCard(pokemon) {
    return (
        <View style={styles.mainCardView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.subCardView}>
                    <Image
                        source={pokeballbackground}
                        resizeMode="contain"
                        style={{ height: 50, width: 50 }}
                    />
                </View>
                <View style={{ marginLeft: 12 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'black',
                            fontWeight: 'bold',
                            //fontFamily: 'nunitoBold',
                            textTransform: 'capitalize',
                        }}>
                        {pokemon.pokemon.name}
                    </Text>
                    <View
                        style={{
                            marginTop: 4,
                            borderWidth: 0,
                            width: '85%',
                        }}>
                        <Text
                            style={{
                                color: 'gray',
                                fontSize: 12,
                            }}>
                            {`#${pokemon.pokemon.url.split('/')[6]}`}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <Image
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.url.split('/')[6]}.png` }}
                    style={{ width: '100px', height: '100px' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainCardView: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'shadow',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        //backgroundColor: Colors.history_back,
        //borderColor: Colors.color_eeeeee,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
});