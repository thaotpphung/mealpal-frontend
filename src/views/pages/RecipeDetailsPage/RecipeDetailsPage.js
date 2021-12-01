import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { useParams, useLocation } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import RecipeDetails from '../../containers/RecipeDetails/RecipeDetails';
import { getRecipe } from '../../../redux/actions/recipeActions';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';

const RecipeDetailsPage = () => {
  const classes = useStyles();
  const { recipeId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { recipe, loading, error } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (!location.isRedirect) {
      dispatch(getRecipe(recipeId));
    }
  }, []);

  if (!loading && error) return <EmptyMessage />;
  if (!loading && Object.keys(recipe).length > 0)
    return (
      <div className={classes.root}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={7}
        >
          <Grid item xs={12} md={5} lg={4}>
            <RecipeCard recipe={recipe} />
          </Grid>
          <Grid item xs={12} md={7} lg={8} className={classes.rightColumn}>
            <RecipeDetails recipe={recipe} />
          </Grid>
        </Grid>
      </div>
    );
  return <Spinner />;
};

export default RecipeDetailsPage;
