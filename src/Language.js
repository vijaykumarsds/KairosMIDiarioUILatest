import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from './i18';
const LanguageScreen = () => {
  const { t } = useTranslation();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  useEffect(() => {
    // You can also set the initial language here
    // Example: i18n.changeLanguage('en');
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('en')}
      >
        <Text style={styles.buttonText}>{t('switchToEnglish')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeLanguage('es')}
      >
        <Text style={styles.buttonText}>{t('switchToSpanish')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '#33bbff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginLeft:20,
    marginRight:20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LanguageScreen;