import React, {useEffect, useState} from 'react';
import {
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {COLORS, icons} from '../../constants';

type Props = {
  socialMedia:
    | 'instagram'
    | 'facebook'
    | 'twitter'
    | 'whatsapp'
    | 'telegram'
    | 'linkedin';
  userName?: string;
};

const CustomSocialIcons = ({socialMedia, userName}: Props) => {
  const [iconName, setIconName] = useState<ImageSourcePropType | null>(null);
  const [href, setHref] = useState('');

  useEffect(() => {
    switch (socialMedia) {
      case 'instagram':
        setIconName(icons.instagram);
        setHref(`https://www.instagram.com/${userName}`);
        break;
      case 'facebook':
        setIconName(icons.facebook);
        setHref(`https://www.facebook.com/${userName}`);
        break;
      case 'twitter':
        setIconName(icons.twitter);
        setHref(`https://twitter.com/${userName}`);
        break;
      case 'whatsapp':
        setIconName(icons.whatsapp);
        setHref(`https://wa.me/${userName}`);
        break;
      case 'telegram':
        setIconName(icons.telegram);
        setHref(`https://t.me/${userName}`);
        break;
      case 'linkedin':
        setIconName(icons.linkedin);
        setHref(`https://www.linkedin.com/in/${userName}`);
        break;
      default:
        setIconName(null);
        setHref('');
    }
  }, [socialMedia, userName]);

  const openLink = () => {
    // if (href) {
    //   Linking.openURL(href).catch(err =>
    //     console.error('An error occurred', err),
    //   );
    // }
    console.log({iconName});
  };

  return (
    <View>
      {iconName ? (
        <TouchableOpacity onPress={openLink} style={styles.socialIcon}>
          <Image source={iconName} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  socialIcon: {
    margin: 8,
    borderWidth: 1,
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.light.primaryColor,
  },
});

export default CustomSocialIcons;
