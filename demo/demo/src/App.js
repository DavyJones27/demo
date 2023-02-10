import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import { SnackbarCloseButton } from './components';
import { store } from './redux';
import { Router } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          preventDuplicate={true}
          action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router/> 
          </LocalizationProvider>
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
