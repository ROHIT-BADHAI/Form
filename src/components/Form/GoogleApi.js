import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const useGoogleApi = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '115691413172992216664', 
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
};

export default useGoogleApi;
