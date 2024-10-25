const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
(async () => {
  db = await open({
    filename: './BD4_A1/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Get All Restaurants
async function fetchAllRestaurants() {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants', async (req, res) => {
  try {
    let result = await fetchAllRestaurants();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Restaurant by ID
async function fetchRestaurantById(id) {
  let query = 'SELECT * FROM restaurants WHERE id=?';
  let response = await db.all(query, [id]);
  return { restaurants: response };
}
app.get('/restaurants/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await fetchRestaurantById(id);
    if (result.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants is found by id ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Restaurants by Cuisine
async function fetchRestaurantBycuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine =?';
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let result = await fetchRestaurantBycuisine(cuisine);
    if (result.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants is found by cuisine  ' + cuisine });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Restaurants by Filter
async function fetchRestaurantByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg=? AND hasOutdoorSeating =? AND isLuxury = ?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}
app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let result = await fetchRestaurantByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Restaurants Sorted by Rating
async function fetchRestaurantSortByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchRestaurantSortByRating();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get All Dishes
async function fetchAllDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get('/dishes', async (req, res) => {
  try {
    let result = await fetchAllDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Dish by ID
async function fetchDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id=?';
  let response = await db.all(query, [id]);
  return { dishes: response };
}
app.get('/dishes/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let result = await fetchDishesById(id);
    if (result.dishes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No dishes is found by id ' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Dishes by Filter
async function fetchDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg=?';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}
app.get('/dishes/filter', async (req, res) => {
  const isVeg = req.query.isVeg;

  try {
    let result = await fetchDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Get Dishes Sorted by Price
async function fetchDishesSortByPrice() {
  let query = 'SELECT * FROM dishes ORDER BY price DESC';
  let response = await db.all(query, []);
  return { dishes: response };
}
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await fetchDishesSortByPrice();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
