import * as React from 'react';


import { AmityUiKitProvider, AmityUiKitSocial } from '@amityco/react-native-social-ui-kit';
import { Text } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [primaryColor, setPrimaryColor] = useState<string>()
  const [userId, setUserId] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')
  console.log('userId: ', userId);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const darkMode = urlParams.get('darkMode');
    const userId = urlParams.get('userId');
    const apiKey = urlParams.get('apiKey');
    const primary = urlParams.get('primary');


    if (darkMode === 'true') {
      setDarkMode(true)
    }
    if (primary) {
      setPrimaryColor(`#${primary}`)
    }
    if (userId) setUserId(userId)
    if (apiKey) setApiKey(apiKey)
  }, [userId])

  // const apiKey = "b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f"


  return (

    (userId && apiKey) &&
    <AmityUiKitProvider
      apiKey={apiKey}
      apiRegion="sg"
      userId={userId as string}
      displayName={userId as string}
      apiEndpoint="https://api.sg.amity.co"
      darkMode={darkMode}

    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>

  );
}
