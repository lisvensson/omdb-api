# OMDb Search App

This project was created as part of a school assignment focused on learning how to fetch data from public APIs using **HTML**, **CSS**, and **JavaScript**.  
The application allows users to search for **movies**, **series**, and **games** using the [OMDb API](https://www.omdbapi.com/).

---

## Getting Started

To run the project locally, you will need to get your own API key from OMDb and configure the project as follows:

### Step 1: Get Your API Key

1. Go to the [OMDb API Key Request Page](https://www.omdbapi.com/apikey.aspx)  
2. Sign up for a free API key

### Step 2: Create `config.js`

Inside the `/js` folder, create a file named `config.js` and paste in the following:

```javascript
const API_KEY = 'YOUR_OMDB_API_KEY';
```