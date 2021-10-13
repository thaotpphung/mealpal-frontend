import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Button } from '@material-ui/core/';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import FileInputComponent from 'react-file-input-previews-base64';
import Input from '../../common/Input/Input';
import { updateRecipe } from '../../../redux/actions/recipeActions';

import useStyles from './styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [recipeForm, setRecipeForm] = useState(recipe);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleToggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  const handleSelectFile = (file) => {
    setRecipeForm({ ...recipeForm, recipeImage: file.base64 });
  };

  const handleChange = (e) => {
    setRecipeForm({ ...recipeForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRecipe(recipe._id, recipeForm));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <>
            <IconButton
              aria-label="settings"
              onClick={() => handleDeleteRecipe(recipe._id)}
            >
              <DeleteIcon />
            </IconButton>
            {isInEditMode ? (
              <IconButton onClick={handleToggleEditMode}>
                <DoneIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleToggleEditMode}>
                <EditIcon />
              </IconButton>
            )}
          </>
        }
        title={
          <Link to={{ pathname: `/recipes/${recipe._id}` }}>
            {recipe.recipeName}
          </Link>
        }
      />

      <CardMedia
        component="img"
        height="194"
        image={
          recipeForm?.recipeImage
            ? recipeForm?.recipeImage
            : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        alt={recipe.recipeName}
      />
      <CardContent>
        {!isInEditMode && (
          <div variant="body2" color="text.secondary">
            Description: {recipe?.recipeDescription}
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div>Calories: {recipe?.calories}</div>
                <div>Servings: {recipe?.servings}</div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div>Prep Time: {recipe?.prepTime}</div>
                <div>Cook Time: {recipe?.cookTime}</div>
              </Grid>
            </Grid>
          </div>
        )}
        {isInEditMode && (
          <form className={classes.form} onSubmit={handleSubmit}>
            <FileInputComponent
              labelText=""
              labelStyle={{ display: 'none' }}
              multiple={false}
              callbackFunction={(file) => {
                handleSelectFile(file);
              }}
              imagePreview={false}
              buttonComponent={
                <Button variant="outlined" color="primary">
                  Upload
                </Button>
              }
              accept="image/*"
              parentStyle={{ textAlign: 'center', margin: '10px' }}
            />
            <Grid container spacing={2}>
              <Input
                name="recipeDescription"
                label="Description"
                value={recipeForm?.recipeDescription}
                handleChange={handleChange}
              />
              <Input
                name="calories"
                label="Calories"
                value={recipeForm?.calories}
                handleChange={handleChange}
              />
              <Input
                name="servings"
                label="Servings"
                value={recipeForm?.servings}
                handleChange={handleChange}
              />
              <Input
                name="prepTime"
                label="Prep Time"
                value={recipeForm?.prepTime}
                handleChange={handleChange}
              />
              <Input
                name="cookTime"
                label="Cook Time"
                value={recipeForm?.cookTime}
                handleChange={handleChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        Comment section
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
