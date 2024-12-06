import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFileIdRedux } from '../features/file/fileSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { createProject } from '../api/projet';
import { createFile } from '../api/file';
import { createCampaign } from '../api/compaign';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFilesInFolder } from '../api/folder';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {
  const [displayItems, setDisplayItems] = useState(false);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [verify, setVerify] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectFolder, setSelectFolder] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null); // ID du folder à supprimer
  const [selectedFolderName, setSelectedFolderName] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);



  const handleClickOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { project: name, file } = formJson;


    try {
      const projectData = await createProject({ name });
      const fileData = await createFile({ name: file, folderId: projectData.data._id });
      console.log(projectData)
      await createCampaign({ name: "compagne1", fileId: fileData.data._id });

      setVerify(Date.now()); // Forcer une nouvelle récupération des dossiers

      toast.success("Nouveau projet créé avec succès", { theme: "colored" });
    } catch (error) {
      toast.warn("Une erreur s'est produite !!", { theme: "colored" });
    }
    handleCloseCreateDialog();
  };

  const handleClickOpenDeleteDialog = (folderId, folderName) => {
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {

    try {
     
      
      // Effectue la suppression ici, par exemple :
      await axios.delete(`http://localhost:8080/api/folders/${selectedFolderId}`);
      setVerify(Date.now()); // Forcer une nouvelle récupération des dossiers
      toast.success(`Dossier '${selectedFolderName}' supprimé avec succès`, { theme: "colored" });
    } catch (error) {
      toast.warn("Erreur lors de la suppression", { theme: "colored" });
    }
    handleCloseDeleteDialog();
  };

  const handleClick = async (folderId) => {
    setSelectFolder(folderId === selectFolder ? null : folderId);
    setDisplayItems(folderId !== selectFolder);

    if (folderId !== selectFolder) {
      try {
     
      const {data} = await getFilesInFolder(folderId)
        setFiles(data);
        console.log(data)
    
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    } else {
      setFiles([]);
    }
  };

  const handleFile = (fileId) => {
    dispatch(setFileIdRedux(fileId));
  };

  return (
    <div className="sidebar" style={{ marginTop: "10px" }}>
      <Button variant="outlined" onClick={handleClickOpenCreateDialog}>
        Open form dialog
      </Button>

      
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleCreateProject,
        }}
      >
        <DialogTitle>Créer un projet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remplissez les informations pour créer un nouveau projet.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="project"
            name="project"
            label="Nom du projet"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="file"
            name="file"
            label="Nom du fichier"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Retour</Button>
          <Button type="submit">Créer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour confirmer la suppression */}
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Êtes-vous sûr de vouloir supprimer ce dossier ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Cette action est irréversible et supprimera également tous les fichiers et campagnes associés.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuler</Button>
          <Button onClick={handleDelete }>Supprimer</Button>
        </DialogActions>
      </Dialog>

      <ul className="nav">
        {folders.map(folder => (
          <li key={folder._id}>
           
            <a href="#project-management"  onClick={() => handleClick(folder._id)} className="dropdown-btn">
              <div >
              <i className="fa-regular fa-folder">
                </i> <span>{folder.name}</span>
              </div>
              <div className='delAndEdit' onClick={(e) => {
               
                e.stopPropagation();
                handleClickOpenDeleteDialog(folder._id, folder.name);
              }}>
               
                <DeleteIcon />
              <EditIcon />
              </div>
            </a>
            {folder._id === selectFolder && (
              <ul className={`dropdown-container ${displayItems ? 'show' : 'non'}`}>
                {files.length > 0 ? (
                  files.map(file => (
                    <li key={file._id}>
                      <a href="#" onClick={() => handleFile(file._id)}><i className="fa-regular fa-file"></i>{file.name}</a>
                    </li>
                  ))
                ) : (
                  <li>Dossier vide</li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Sidebar;