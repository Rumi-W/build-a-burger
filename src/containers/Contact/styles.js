export const createContactStyles = theme => ({
  contents: {
    width: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 3px #ccc',
    border: '1px solid #eee',
    padding: theme.spacing(4),
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      width: '100vh'
    }
  },
  formControl: {
    margin: '2px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
