import { StyleSheet, View, Text, Button, Linking, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { loadingComponent, messageErrorComponent, urlBase } from '../constants/Consts'
import { myStyles } from '../styles/myStyles'
import { Link, useParams, useNavigate } from 'react-router-native'
import { MyButton, MyCard } from '../components/components'

const Pokedex = ({ navigation }) => {

  let param = 0;
  const limit = 12;
  //useParams().offset ? param = useParams().offset : param = 0;

  const [isLoading, setIsLoading] = useState(true);
  const [noPokemonsFound, setNoPokemonsFound] = useState(false);
  const [data, setData] = useState();
  const [nextOffset, setNextOffset] = useState(null);
  const [prevOffset, setPrevOffset] = useState(null);
  //const nativete = useNavigate();

  const back = () => {
    setIsLoading(true);
    navigation.navigate(`/pokemon/${prevOffset}`);
  }

  const next = () => {
    setIsLoading(true);
    navigation.navigate(`/pokemon/${nextOffset}`);
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
                  <View key={index}>
                    <MyCard pokemon={pokemon} />
                  </View>
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