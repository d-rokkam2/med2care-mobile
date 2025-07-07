import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DrawerLayout() {
  const handleLogout = () => {
    router.replace('/screens/login');
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#666',
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      drawerContent={(drawerProps) => (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...drawerProps}>
            <DrawerItemList {...drawerProps} />
          </DrawerContentScrollView>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#ff3b30" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <Drawer.Screen
        name="page1"
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="page2"
        options={{
          title: 'About Us',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="page3"
        options={{
          title: 'What we do',
          drawerIcon: ({ color, size }) => <Ionicons name="construct-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="page4"
        options={{
          title: 'Services',
          drawerIcon: ({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 16,
  },
  logoutText: {
    color: '#ff3b30',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 12,
  },
}); 