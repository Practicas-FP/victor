import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { loadingComponent, messageErrorComponent, urlBase } from '../constants/Consts'
import { styles } from '../styles/pokemon'
import MyButton from '../components/Button'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const Pokemon = ({ route, navigation }) => {
  const id = route.params.id || 1;

  const [isLoading, setIsLoading] = useState(true);
  const [noPokemonFound, setNoPokemonFound] = useState(false);
  const [data, setData] = useState();
  const [isFavorite, setFavorite] = useState(false);

  const back = () => {
    setIsLoading(true);
    navigation.navigate('Pokemon', {
      id: (data.id - 1)
    });
  }

  const next = () => {
    setIsLoading(true);
    navigation.navigate('Pokemon', {
      id: (data.id + 1)
    });
  }

  useEffect(() => {
    fetch(`${urlBase}/pokemon/${id}`)
      .then((res) => res.json())
      .then((response) => {
        const moves = new Array();
        response.moves.forEach(move => moves.push(move.move.name));

        const types = new Array();
        response.types.forEach(type => types.push(type.type.name));

        const statsColors = ['bg-success', 'bg-danger', 'bg-warning', 'bg-danger', 'bg-warning', 'bg-info'];
        const stats = new Array();
        response.stats.forEach((stat, index) => stats.push(
          { name: stat.stat.name, baseStat: stat.base_stat, color: statsColors[index] },
        ));

        const sprites = new Array();
        if (response.sprites.front_default) sprites.push({ name: 'front_default', sprite: response.sprites.front_default });
        if (response.sprites.back_default) sprites.push({ name: 'back_default', sprite: response.sprites.back_default });
        if (response.sprites.front_female) sprites.push({ name: 'front_female', sprite: response.sprites.front_female });
        if (response.sprites.back_female) sprites.push({ name: 'back_female', sprite: response.sprites.back_female });
        if (response.sprites.front_shiny) sprites.push({ name: 'front_shiny', sprite: response.sprites.front_shiny });
        if (response.sprites.back_shiny) sprites.push({ name: 'back_shiny', sprite: response.sprites.back_shiny });
        if (response.sprites.front_shiny_female) sprites.push({ name: 'front_shiny_female', sprite: response.sprites.front_shiny_female });
        if (response.sprites.back_shiny_female) sprites.push({ name: 'back_shiny_female', sprite: response.sprites.back_shiny_female });

        setData({
          'id': response.id,
          'name': response.name,
          'height': response.height,
          'weight': response.weight,
          'baseExperience': response.base_experience,
          'moves': moves,
          'types': types,
          'stats': stats,
          'sprites': sprites,
          'color': Colors(types[0])
        });

        //if (user) getFav(user.uid, response.id, setFavorite);

        setIsLoading(false);
      })
      .catch((error) => {
        setNoPokemonFound(true);
        console.error(error);
      });
  }, [id, isFavorite]);

  return (
    <View>
      {!isLoading && console.log(data)}

      {isLoading && !noPokemonFound && loadingComponent}

      {noPokemonFound && messageErrorComponent(`No pokemon found: ${id}`)}

      {!isLoading && (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
              <Ionicons name="ios-arrow-back" size={24} color="#52575D" onPress={() => navigation.goBack()}></Ionicons>

              <MyButton text='back' onPress={back} disabled={data.id - 1 ? true : false} />
              <MyButton text='next' onPress={next} disabled={true} />

              <AntDesign name="heart" size={32} color={isFavorite ? '#dc3545' : '#0d6efd'} />
            </View>

            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image source={{ uri: data.sprites[0].sprite }} style={styles.image} resizeMode="center"></Image>
              </View>
              {/* <View style={styles.dm}>
                <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
              </View> */}
              <View style={[styles.active, { backgroundColor: data.color }]}></View>
              {/* <View style={[styles.add, { backgroundColor: isFavorite ? '#dc3545' : '#0d6efd' }]}>
                <MaterialIcons name="favorite-outline" size={32} color="#DFD8C8" />
              </View> */}
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 36, textTransform: 'capitalize' }]}>{data.name}</Text>
              {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>#{data.id}</Text> */}
            </View>

            <View style={styles.statsContainer}>
              {data.types && (
                data.types.map((type, index) => {
                  return (
                    <View style={styles.statsBox} key={index}>
                      <Text style={[styles.type, styles.text, { backgroundColor: Colors(type), color: '#FFF' }]}>{type}</Text>
                    </View>
                  )
                })
              )}
            </View>

            <View style={styles.statsContainer}>
              {data.stats && (
                data.stats.map((stat, index) => {
                  return (
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]} key={index}>
                      <Text style={[styles.text, { fontSize: 24 }]}>{stat.baseStat}</Text>
                      <Text style={[styles.text, styles.subText]}>{stat.name}</Text>
                    </View>
                  )
                })
              )}
            </View>

            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.sprites && (
                  data.sprites.map((sprite, index) => {
                    return (
                      <View style={styles.mediaImageContainer} key={index}>
                        <Image source={{ uri: sprite.sprite }} style={styles.image} resizeMode="cover"></Image>
                      </View>
                    )
                  })
                )}
              </ScrollView>
            </View>

            <Text style={[styles.subText, styles.recent]}>More data</Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                  <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                    Height: <Text style={{ fontWeight: 'bold' }}>{data.height}</Text> | Weight: <Text style={{ fontWeight: 'bold' }}>{data.weight}</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.recentItem}>
                <View style={styles.activityIndicator}></View>
                <View style={{ width: 250 }}>
                  <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                    Base experience: <Text style={{ fontWeight: 'bold' }}>{data.baseExperience}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  )
}

export default Pokemon