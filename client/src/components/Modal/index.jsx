import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

  const handleClose = () => {
    props.onClose();
  };

  return(
    <Modal
      open={props.error ? true : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='error-modal'>
        <Alert severity='error' sx={{width: '100%'}} className="error-modal__message" >
          {props.error}
        </Alert>
      </Box>
    </Modal>
  )
}

