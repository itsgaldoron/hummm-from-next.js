import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { BackgroundMusicElements } from '../components/BackgroundMusicElements';
import { useResponsiveSize } from '../hooks/useResponsiveSize';
import { Home, Zap, Award, User } from 'react-native-feather'; // Using feather icons
import { Card } from '../components/ui/Card';
import { IconBubble } from '../components/ui/IconBubble';

export default function MenuScreen({ navigation }) {
  const { theme } = useTheme();
  const { size, fontSize } = useResponsiveSize();

  const menuItems = [
    { name: 'Home', icon: Home, screen: 'Home' },
    { name: 'Play', icon: Zap, screen: 'Play' }, // Using Zap for 'Play'
    { name: 'Leaderboard', icon: Award, screen: 'Leaderboard' },
    { name: 'Profile', icon: User, screen: 'Profile' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      padding: size(24),
    },
    title: {
      fontFamily: 'Fredoka-Regular',
      fontSize: fontSize(36), // Reduced size
      fontWeight: '700',
      color: theme.foreground,
      textAlign: 'center',
      marginBottom: size(40),
    },
    menuContainer: {
      gap: size(20),
    },
    cardTouchable: {},
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: size(16),
    },
    iconBubble: {
      marginRight: size(16),
    },
    itemText: {
      fontFamily: 'Fredoka-Regular',
      fontSize: fontSize(16), // Reduced to match button text size
      fontWeight: '700',
      color: theme.primaryForeground, // Text color for primary card variant
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <BackgroundShapes />
      <BackgroundMusicElements />
      <Text style={styles.title}>Hummm</Text>
      <View style={styles.menuContainer}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={item.name}
              variant="primary" 
              style={{ marginBottom: 0 }}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.cardContent}>
                <IconBubble variant="white" size="small" style={styles.iconBubble}>
                  <IconComponent width={size(20)} height={size(20)} color="#000000" />
                </IconBubble>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            </Card>
          );
        })}
      </View>
    </SafeAreaView>
  );
} 