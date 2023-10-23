import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';

import {
    Dimensions    
  } from 'react-native';
import commonStyles from './Common/commonStyles';

const HeaderTexts = () => {
    return (
        <View>
            <LinearGradient
              colors={['#33bbff', '#33bbff', '#33bbff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                height: Dimensions.get('window').height * 0.2,
                width: '100%',
                alignItems: 'center',
                paddingTop: 40,
              }}
            >
              <Text style={commonStyles.headerText1}>Kairos</Text>
              <Text style={commonStyles.headerText2}>MI Diario</Text>
            </LinearGradient>
    
        </View>
    );
}

export default HeaderTexts;