import { useEffect, useState } from 'react'
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import { THEME } from '../../themes';

export function Game({}) {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const [gameAds, setGameAds] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    await 
    fetch(`http://192.168.0.109:3333/ads/${adsId}/discord`).then(response => response.json()).then(data => setDiscordDuoSelected(data.discord))

  }

  useEffect(() => {
    fetch(`http://192.168.0.109:3333/games/${game.id}/ads`).then(response => response.json()).then(data => setGameAds(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />

        </View>

        <Image 
        source={{uri: game.bannerUrl}}
        style={styles.cover}
        resizeMode="cover"
        />

        <Heading title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList 
          data={gameAds}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          style={styles.containerList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[gameAds.length > 0 ? styles.contentList : styles.emptyListContent]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

      <DuoMatch 
        visible={discordDuoSelected.length > 0}
        discord={discordDuoSelected}
        onClose={() => setDiscordDuoSelected('')}
      />
      </SafeAreaView>
    </Background>
  );
}
