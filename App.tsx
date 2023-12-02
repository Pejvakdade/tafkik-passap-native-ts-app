import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './app/Navigation/MainNavigator';
import './react-native.config';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LoginDataContext} from './app/contexts';
function App(): JSX.Element {
  const [loginData, setLoginData] = useState();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Disable automatic refetching on window focus
        retry: 1, // Number of retries before marking a query as failed
        // staleTime: 300000, // Time in milliseconds before query is considered stale (5 minutes in this example)
      },
      mutations: {
        onError: (error: unknown) => {
          console.error('Mutation error:', error);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        <LoginDataContext.Provider value={{loginData, setLoginData}}>
          <SafeAreaView style={styles.appSafeArea}>
            <Navigation />
          </SafeAreaView>
        </LoginDataContext.Provider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  appSafeArea: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
