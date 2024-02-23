import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../providers/amity-ui-kit-provider';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;
  console.log(Dimensions.get('window').height)
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: Dimensions.get('window').height-320,
      left: Dimensions.get('window').width-80
    },

    otherFeedContainer: {
      position: 'absolute',
      bottom: 35,
      right: 10,
    },
    button: {
      width: 64,
      height: 64,
      borderRadius: 35,
      backgroundColor: '#1054DE',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
    },
  });
  return styles
}

