import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { loadingComponent, messageErrorComponent, urlBase } from '../constants/Consts'
import { myStyles } from '../styles/myStyles'
import { MyButton, MyCard } from '../components/components'

const Pokedex = ({ route, navigation }) => {
  const param = route.params.offset || 0;
  const limit = 12;

  const [isLoading, setIsLoading] = useState(true);
  const [noPokemonsFound, setNoPokemonsFound] = useState(false);
  const [data, setData] = useState();
  const [nextOffset, setNextOffset] = useState(null);
  const [prevOffset, setPrevOffset] = useState(null);

  const back = () => {
    setIsLoading(true);
    navigation.navigate('Pokedex', {
      offset: prevOffset
    });
  }

  const next = () => {
    setIsLoading(true);
    navigation.navigate('Pokedex', {
      offset: nextOffset
    });
  }

  useEffect(() => {
    fetch(`${urlBase}/pokemon?offset=${param}&limit=${limit}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
        response.next ? setNextOffset(parseInt(response.next.substring(response.next.search('=') + 1, response.next.search('&')))) : setNextOffset(null);
        response.previous ? setPrevOffset(parseInt(response.previous.substring(response.previous.search('=') + 1, response.previous.search('&')))) : setPrevOffset(null);
      })
      .catch(() => setNoPokemonsFound(true));
  }, [param, limit]);

  return (
    <ScrollView>
      {isLoading && !noPokemonsFound && loadingComponent}

      {noPokemonsFound && messageErrorComponent(`No pokemons found`)}

      {!isLoading && (
        <View>
          <View style={[{ marginHorizontal: '32px', marginVertical: '16px' }, myStyles.container, myStyles.row]}>
            <h1 style={{ marginRight: '24px' }}>Accedex</h1>

            <MyButton text='back' onPress={back} />
            <MyButton text='next' onPress={next} />
          </View>

          <View >
            {
              data.map((pokemon, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('Pokemon', { id: pokemon.url.split('/')[6] })}>
                    <MyCard pokemon={pokemon} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default Pokedex