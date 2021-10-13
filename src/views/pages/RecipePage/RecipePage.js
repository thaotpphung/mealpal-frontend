import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Button, TextField, IconButton } from '@material-ui/core';
import useStyles from './styles';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@material-ui/icons/Add';

import routes from '../../../constants/routes';
import {
  createRecipe,
  getAllRecipes,
} from '../../../redux/actions/recipeActions';

const RecipePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState('');
  const [isShowNewRecipeForm, setIsShowNewRecipeForm] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  // dialog
  const [open, toggleOpen] = useState(false);

  const initialState = {
    recipeName: '',
    recipeDescription: '',
    servings: '',
    calories: '',
    cookTime: '',
    prepTime: '',
  };
  const handleClose = () => {
    setDialogValue(initialState);
    toggleOpen(false);
  };
  const [dialogValue, setDialogValue] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRecipe({ ...dialogValue, userId: currentUser._id }));
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDialogValue({ ...dialogValue, [name]: value });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => toggleOpen(true)}
        style={{ float: 'right' }}
      >
        + Recipe
      </Button>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {Object.values(recipes).map((recipe) => (
          <Grid key={recipe._id} item xs={12} sm={3} md={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>

      <Dialog className={classes.dialog} open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new recipe</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.recipeName}
                onChange={handleChange}
                name="recipeName"
                type="text"
                label="Recipe Name *"
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.recipeDescription}
                onChange={handleChange}
                name="recipeDescription"
                type="text"
                label="Recipe Description"
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.calories}
                onChange={handleChange}
                name="calories"
                type="text"
                label="Calories"
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.servings}
                onChange={handleChange}
                name="servings"
                type="text"
                label="Servings"
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.prepTime}
                onChange={handleChange}
                name="prepTime"
                type="text"
                label="Prep Time"
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.cookTime}
                onChange={handleChange}
                name="cookTime"
                type="text"
                label="Cook Time"
                variant="standard"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default RecipePage;
