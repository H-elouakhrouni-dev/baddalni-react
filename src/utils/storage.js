import { generateFakeItems } from '../data/generator';

// Storage keys
const ITEMS_KEY = 'baddalni_items_v2'
const USER_KEY = 'baddalni_user';
const FAVORITES_KEY = "baddalni_favorites";
const MESSAGES_KEY = 'baddalni_messages';
const GENERATED_OWNERS = new Set(['Amine', 'Youssef', 'Fatima', 'Sara', 'Khadija', 'Mehdi', 'Hassan', 'Nadia', 'Ayoub', 'Hajar']);

const inferGeneratedItem = (item) => {
  if (typeof item?.isGenerated === 'boolean') {
    return item;
  }

  const usesDemoImage = typeof item?.image === 'string' && item.image.includes('loremflickr.com/400/300/');
  const hasDemoOwner = GENERATED_OWNERS.has(item?.owner);

  return {
    ...item,
    isGenerated: usesDemoImage && hasDemoOwner,
  };
};

// ========================
// Items Functions
// ========================

// Retrieves the list of all items from local storage
export const getItems = () => {
  let items = localStorage.getItem(ITEMS_KEY);
  if (!items) {
    // Generate initial items if none exist and save them to local storage
    items = generateFakeItems();
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    return items;
  }
  // Parse the stored JSON string back to an array
  const parsedItems = JSON.parse(items).map(inferGeneratedItem);
  localStorage.setItem(ITEMS_KEY, JSON.stringify(parsedItems));
  return parsedItems;
};

// Adds a new item to our local storage
export const addItem = (newItem) => {
  const items = getItems();
  
  // Attach current logged-in user if available to mark ownership
  const user = getUser();
  if (user) {
    newItem.owner = user.username;
  } else {
    newItem.owner = "Anonymous";
  }

  // Generate a random id
  newItem.id = Date.now(); 
  newItem.isGenerated = false;
  
  // Add to the beginning of the array so it shows up first
  const updatedItems = [newItem, ...items];
  
  // Save updated list back to localStorage
  localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};

// Removes an item from storage (only if username matches owner, or for simplicity just removes it)
export const removeItem = (itemId) => {
  const items = getItems();
  const updatedItems = items.filter(i => i.id !== itemId);
  localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};

export const addComment = (itemId, commentObj) => {
  const items = getItems();
  const updatedItems = items.map(i => {
    if (i.id === itemId) {
      return { ...i, comments: [...(i.comments || []), commentObj] };
    }
    return i;
  });
  localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};


// ========================
// User Functions
// ========================

// Fake login: simply stores a username
export const loginUser = (username) => {
  const user = { username: username, avatar: '', phone: '', bio: '' };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const updateUser = (userData) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const deleteAccount = (username) => {
  const allItems = getItems();
  const remainingItems = allItems.filter(item => item.owner !== username);
  localStorage.setItem(ITEMS_KEY, JSON.stringify(remainingItems));
  logoutUser();
};

// Get the current logged in user
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};


// ========================
// Favorites Functions
// ========================

// Get list of favorite item IDs
export const getFavorites = () => {
  const favsStr = localStorage.getItem(FAVORITES_KEY);
  return favsStr ? JSON.parse(favsStr) : [];
};

// Add or remove an item from favorites
export const toggleFavorite = (itemId) => {
  const favs = getFavorites();
  const index = favs.indexOf(itemId);
  
  if (index === -1) {
    // If not in array, add it
    favs.push(itemId);
  } else {
    // If in array, remove it
    favs.splice(index, 1); 
  }
  
  // Save back to local storage
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
};

// Check if a specific item is in the favorites list
export const isFavorite = (itemId) => {
  const favs = getFavorites();
  return favs.includes(itemId);
};

// ========================
// Messages Functions
// ========================

export const getMessages = (username) => {
  const messagesStr = localStorage.getItem(MESSAGES_KEY);
  const messages = messagesStr ? JSON.parse(messagesStr) : [];

  if (!username) {
    return messages;
  }

  return messages.filter((message) => message.to === username);
};

export const sendMessage = (to, from, text, itemTitle = '') => {
  const messages = getMessages();
  const newMessage = {
    id: Date.now(),
    to,
    from,
    text,
    itemTitle,
    date: new Date().toLocaleString(),
  };

  const updatedMessages = [newMessage, ...messages];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updatedMessages));
  return newMessage;
};
