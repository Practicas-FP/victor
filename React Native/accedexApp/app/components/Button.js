import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default function MyButton({ text, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={!disabled}>
            <View style={[styles.button, !disabled ? styles.buttonDisabled : styles.buttonEnabled]}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        marginStart: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    },
    buttonDisabled: {
        backgroundColor: 'grey'
    },
    buttonEnabled: {
        backgroundColor: '#0d6efd'
    }
});