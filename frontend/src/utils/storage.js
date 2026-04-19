import { generateFakeItems } from '../data/generator';

const ITEMS_KEY = 'baddalni_items_v5'
const USER_KEY = 'baddalni_user';
const FAVORITES_KEY = "baddalni_favorites";
const MESSAGES_KEY = 'baddalni_messages';
const GENERATED_OWNERS = new Set(['Amine', 'Youssef', 'Fatima', 'Sara', 'Khadija', 'Mehdi', 'Hassan', 'Nadia', 'Ayoub', 'Hajar']);

const inferGeneratedItem = (item) => {
  if (typeof item?.isGenerated === 'boolean') {
    return item;
  }

  const usesDemoImage = typeof item?.image === 'string' && (item.image.includes('loremflickr.com') || item.image.includes('picsum.photos'));
  const hasDemoOwner = GENERATED_OWNERS.has(item?.owner);

  return {
    ...item,
    isGenerated: usesDemoImage && hasDemoOwner,
  };
};

export const getItems = () => {
  let items = localStorage.getItem(ITEMS_KEY);
  if (!items) {
    items = generateFakeItems();
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    return items;
  }
  const parsedItems = JSON.parse(items).map(inferGeneratedItem);
  localStorage.setItem(ITEMS_KEY, JSON.stringify(parsedItems));
  return parsedItems;
};

export const addItem = (newItem) => {
  const items = getItems();
  
  const user = getUser();
  if (user) {
    newItem.owner = user.username;
  } else {
    newItem.owner = "Anonymous";
  }

  newItem.id = Date.now(); 
  newItem.isGenerated = false;
  
  const updatedItems = [newItem, ...items];
  
  localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};

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

export const loginUser = (userObj, token) => {
  const user = { username: userObj.name, avatar: userObj.avatar, email: userObj.email, bio: '', token: token };
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

export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getFavorites = () => {
  const favsStr = localStorage.getItem(FAVORITES_KEY);
  return favsStr ? JSON.parse(favsStr) : [];
};

export const toggleFavorite = (itemId) => {
  const favs = getFavorites();
  const index = favs.indexOf(itemId);
  
  if (index === -1) {
    favs.push(itemId);
  } else {
    favs.splice(index, 1); 
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
};

export const isFavorite = (itemId) => {
  const favs = getFavorites();
  return favs.includes(itemId);
};

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
