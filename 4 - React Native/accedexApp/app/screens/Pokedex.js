import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { urlBase } from '../constants/Consts'
import { myStyles } from '../styles/myStyles'
import { MyButton, MyCard, MySearchBar, MyLoading } from '../components/components'

const Pokedex = ({ route, navigation }) => {
  const param = route.params.offset || 0;
  const limit = 12;

  const [isLoading, setIsLoading] = useState(true);
  const [noPokemonsFound, setNoPokemonsFound] = useState(false);
  const [data, setData] = useState();
  const [nextOffset, setNextOffset] = useState(null);
  const [prevOffset, setPrevOffset] = useState(null);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

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

  const search = () => {
    setClicked(false);
    setSearchPhrase('');
    navigation.navigate('Pokemon', {
      id: searchPhrase.toLowerCase()
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
      {isLoading && !noPokemonsFound && <MyLoading />}

      {noPokemonsFound && <MyError message={`No pokemons found: ${id}`} setErr={false} goBack={false} />}

      {!isLoading && (
        <View>
          <View style={[{ marginHorizontal: '32px', marginVertical: '16px' }, myStyles.container, myStyles.row]}>
            <h1 style={{ marginRight: '24px' }}>Accedex</h1>

            <MyButton text='back' onPress={back} disabled={prevOffset || prevOffset === 0 ? true : false} />
            <MyButton text='next' onPress={next} disabled={nextOffset ? true : false} />
          </View>

          <View>

            <MySearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
              search={search}
            />

            {
              data.map((pokemon, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('Pokemon', { id: pokemon.url.split('/')[6] })}
                  >
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