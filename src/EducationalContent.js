import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

const ArticleList = () => {
  const { t } = useTranslation(); 

  const Data = [
    {
      key: '1',
      title: 'Public Knowledge and awareness of diabetics',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9810624/',
    },
    {
      key: '2',
      title: 'T1d Awareness campaign',
      url: 'https://www.cdc.gov/diabetes/campaigns/index.html',
    },
    {
      key: '3',
      title: 'Cultural adoption of nutritions',
      url: 'https://equityhealthj.biomedcentral.com/articles/10.1186/s12939-2021-01462-x',
    },
    {
      key: '4',
      title: 'Knowledge and awareness of diabetes in urban and rural areas',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4056139/',
    },
  ];

  const openArticleInBrowser = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openArticleInBrowser(item.url)}>
      <View style={styles.articleItem}>
        <Text style={styles.title}>{t(item.title)}</Text>
        <ArrowIcon />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
    />
  );
};

const ArrowIcon = () => {

  return (
    
    <Image source={require('../assets/icons/arrow.png')} style={{ width: 25, height: 20 }} />
  );
};

const styles = {
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
};

export default ArticleList;
