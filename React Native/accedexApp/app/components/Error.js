import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function MyError({ message, setErr, goBack }) {
    return (
        <View>
            {goBack && (
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D" onPress={() => goBack()}></Ionicons>
                </View>
            )}

            <View style={styles.container}>
                <div className="alert alert-danger w-100" role="alert">
                    {`${message}   `}
                    {setErr && (
                        <button onClick={() => setErr(false)} type="button" className="btn btn-outline-danger" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    )}
                </div>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 75,
        marginRight: 25,
        marginLeft: 25
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
})