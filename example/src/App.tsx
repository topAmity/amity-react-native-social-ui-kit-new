import * as React from 'react';


import { AmityUiKitProvider, AmityUiKitSocial } from '@amityco/react-native-social-ui-kit';

export default function App() {

  return (
    <AmityUiKitProvider
      apiKey="YOUR_API_KEY" // Put your apiKey
      apiRegion="API_REGION" // Put your apiRegion
      userId="USER_ID" // Put your UserId
      displayName="DISPLAYNAME" // Put your displayName
      apiEndpoint="API_ENDPOINT" //"https://api.{apiRegion}.amity.co" e.g "https://api.eu.amity.co"
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
