import { View, Text } from 'react-native'
import React from 'react'

const Pokemon = ({ route, navigation }) => {
  const id = route.params.id || 0;

  return (
    <View>
      <Text>{`Pokemon ${id}`}</Text>
    </View>
  )
}

export default Pokemon