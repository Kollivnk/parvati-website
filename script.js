document.addEventListener('DOMContentLoaded', function() {
  // Initialize Particles.js
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('Particles.js loaded');
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Create floating hearts
  function createHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 10 + 10;
      
      // Random animation delay
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      heart.style.left = `${posX}%`;
      heart.style.top = `${posY}%`;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.animationDelay = `${delay}s`;
      heart.style.animationDuration = `${duration}s`;
      
      heartsContainer.appendChild(heart);
    }
  }

  createHearts();

  // Quote generator
  const quotes = [
    {
      text: "She was a wildflower in a field of roses, unique but just as beautiful.",
      author: "Atticus Poetry"
    },
    {
      text: "I am no bird; and no net ensnares me; I am a free human being with an independent will.",
      author: "Charlotte Brontë, Jane Eyre"
    },
    {
      text: "Watch with glittering eyes the whole world around you because the greatest secrets are always hidden in the most unlikely places.",
      author: "Roald Dahl"
    },
    {
      text: "We accept the love we think we deserve.",
      author: "Stephen Chbosky, The Perks of Being a Wallflower"
    },
    {
      text: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
      author: "Brian Tracy"
    },
    {
      text: "She remembered who she was and the game changed.",
      author: "Lalah Delia"
    }
  ];

  const quoteBtn = document.getElementById('new-quote');
  const quoteText = document.querySelector('.quote-box blockquote p');
  const quoteAuthor = document.querySelector('.quote-box blockquote footer');

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  function displayQuote() {
    const quote = getRandomQuote();
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `- ${quote.author}`;
    
    // Add animation
    quoteText.classList.add('animate__animated', 'animate__fadeIn');
    quoteAuthor.classList.add('animate__animated', 'animate__fadeIn');
    
    setTimeout(() => {
      quoteText.classList.remove('animate__animated', 'animate__fadeIn');
      quoteAuthor.classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000);
  }

  quoteBtn.addEventListener('click', displayQuote);
  
  // Display initial quote
  displayQuote();

  // Book and movie carousel navigation
  const bookCarousel = document.querySelector('.reading-carousel');
  const movieCarousel = document.querySelector('.movie-carousel');
  
  function createCarouselNav(carousel, className) {
    const nav = document.createElement('div');
    nav.className = `carousel-nav ${className}-nav`;
    
    const itemCount = carousel.children.length;
    for (let i = 0; i < itemCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      if (i === 0) dot.classList.add('active');
      dot.dataset.index = i;
      nav.appendChild(dot);
    }
    
    carousel.parentNode.insertBefore(nav, carousel.nextSibling);
    
    // Add click event to dots
    const dots = nav.querySelectorAll('.nav-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        const itemWidth = carousel.children[0].offsetWidth;
        const scrollPos = index * (itemWidth + 32); // 32 is gap
        
        carousel.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Update active dot on scroll
    carousel.addEventListener('scroll', function() {
      const scrollPos = carousel.scrollLeft;
      const itemWidth = carousel.children[0].offsetWidth;
      const activeIndex = Math.round(scrollPos / (itemWidth + 32));
      
      dots.forEach((dot, i) => {
        if (i === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });
  }
  
  createCarouselNav(bookCarousel, 'books');
  createCarouselNav(movieCarousel, 'movies');

  // Add hover effect to social icons
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.classList.add('animate__animated', 'animate__rubberBand');
    });
    
    icon.addEventListener('animationend', function() {
      this.classList.remove('animate__animated', 'animate__rubberBand');
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.hero-btn, .quote-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // Add scroll reveal animation
  const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: true
  });

  scrollReveal.reveal('.hero-box', { delay: 300 });
  scrollReveal.reveal('.quick-facts', { interval: 100 });
  scrollReveal.reveal('.obsessions');
  scrollReveal.reveal('.quote-box');
});

document.addEventListener('DOMContentLoaded', function() {
  // To-Do List Functionality
  const todoInput = document.getElementById('todo-input');
  const addTodoBtn = document.getElementById('add-todo');
  const todoList = document.getElementById('todo-list');
  const todoProgress = document.getElementById('todo-progress');
  const progressText = document.getElementById('progress-text');
  
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
  function renderTodos() {
    todoList.innerHTML = '';
    const totalTodos = todos.length;
    let completedTodos = 0;
    
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      if (todo.completed) {
        li.classList.add('completed');
        completedTodos++;
      }
      
      li.innerHTML = `
        <span>${todo.text}</span>
        <div class="task-actions">
          <button class="complete-btn"><i class="fas fa-check"></i></button>
          <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
      `;
      
      li.querySelector('.complete-btn').addEventListener('click', () => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      });
      
      li.querySelector('.delete-btn').addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });
      
      todoList.appendChild(li);
    });
    
    // Update progress
    const progressPercent = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
    todoProgress.style.width = `${progressPercent}%`;
    progressText.textContent = `${progressPercent}% Complete`;
  }
  
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  addTodoBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
      todoInput.value = '';
    }
  });
  
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodoBtn.click();
    }
  });
  
  renderTodos();
  
  // Wellness Tracker
  const counters = {
    water: 0,
    exercise: 0,
    meditation: 0
  };
  
  // Load saved counters
  Object.keys(counters).forEach(key => {
    const savedValue = localStorage.getItem(`wellness_${key}`);
    if (savedValue) {
      counters[key] = parseInt(savedValue);
      document.getElementById(`${key}-count`).textContent = counters[key];
    }
  });
  
  document.querySelectorAll('.counter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.target;
      const isPlus = this.classList.contains('plus');
      
      if (isPlus) {
        counters[target]++;
      } else if (counters[target] > 0) {
        counters[target]--;
      }
      
      document.getElementById(`${target}-count`).textContent = counters[target];
      localStorage.setItem(`wellness_${target}`, counters[target]);
    });
  });
  
  // Entertainment Tracker
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      // Update active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show corresponding content
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Movies List
  let movies = JSON.parse(localStorage.getItem('movies')) || [];
  const movieInput = document.getElementById('movie-input');
  const addMovieBtn = document.getElementById('add-movie');
  const moviesList = document.getElementById('movies-list');
  
  function renderMovies() {
    moviesList.innerHTML = '';
    movies.forEach((movie, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${movie}
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;
      
      li.querySelector('.delete-btn').addEventListener('click', () => {
        movies.splice(index, 1);
        saveMovies();
        renderMovies();
      });
      
      moviesList.appendChild(li);
    });
  }
  
  function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
  }
  
  addMovieBtn.addEventListener('click', () => {
    const movie = movieInput.value.trim();
    if (movie) {
      movies.push(movie);
      saveMovies();
      renderMovies();
      movieInput.value = '';
    }
  });
  
  movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addMovieBtn.click();
    }
  });
  
  renderMovies();
  
  // Series List
  let series = JSON.parse(localStorage.getItem('series')) || [];
  const seriesInput = document.getElementById('series-input');
  const addSeriesBtn = document.getElementById('add-series');
  const seriesList = document.getElementById('series-list');
  
  function renderSeries() {
    seriesList.innerHTML = '';
    series.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item}
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;
      
      li.querySelector('.delete-btn').addEventListener('click', () => {
        series.splice(index, 1);
        saveSeries();
        renderSeries();
      });
      
      seriesList.appendChild(li);
    });
  }
  
  function saveSeries() {
    localStorage.setItem('series', JSON.stringify(series));
  }
  
  addSeriesBtn.addEventListener('click', () => {
    const item = seriesInput.value.trim();
    if (item) {
      series.push(item);
      saveSeries();
      renderSeries();
      seriesInput.value = '';
    }
  });
  
  seriesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addSeriesBtn.click();
    }
  });
  
  renderSeries();
  
  // Reels List
  let reels = JSON.parse(localStorage.getItem('reels')) || [];
  const reelInput = document.getElementById('reel-input');
  const addReelBtn = document.getElementById('add-reel');
  const reelsContainer = document.getElementById('reels-container');
  
  function renderReels() {
    reelsContainer.innerHTML = '';
    reels.forEach((reel, index) => {
      const reelItem = document.createElement('div');
      reelItem.className = 'reel-item';
      reelItem.innerHTML = `
        <img src="https://via.placeholder.com/150x267" alt="Reel thumbnail">
        <div class="reel-actions">
          <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        </div>
      `;
      
      reelItem.querySelector('.delete-btn').addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        reels.splice(index, 1);
        saveReels();
        renderReels();
      });
      
      reelsContainer.appendChild(reelItem);
    });
  }
  
  function saveReels() {
    localStorage.setItem('reels', JSON.stringify(reels));
  }
  
  addReelBtn.addEventListener('click', () => {
    const reelUrl = reelInput.value.trim();
    if (reelUrl) {
      reels.push(reelUrl);
      saveReels();
      renderReels();
      reelInput.value = '';
    }
  });
  
  reelInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addReelBtn.click();
    }
  });
  
  renderReels();
  
  // Inspiration Board
  const addInspirationBtn = document.getElementById('add-inspiration-btn');
  const inspirationForm = document.querySelector('.inspiration-form');
  
  addInspirationBtn.addEventListener('click', () => {
    inspirationForm.classList.toggle('hidden');
  });
  
  // Initialize particles
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('Particles.js loaded');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Password Protection System
  const passwordModal = document.querySelector('.password-modal');
  const setPasswordModal = document.querySelector('.set-password-modal');
  const galleryContent = document.getElementById('gallery-content');
  const unlockBtn = document.getElementById('unlock-gallery');
  const setPasswordBtn = document.getElementById('set-password-btn');
  const savePasswordBtn = document.getElementById('save-password');
  const cancelPasswordBtn = document.getElementById('cancel-password');
  const passwordInput = document.getElementById('gallery-password');
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const passwordError = document.getElementById('password-error');
  const setPasswordError = document.getElementById('set-password-error');
  const changePasswordBtn = document.getElementById('change-password-btn');

  // Check if password is set
  const galleryPassword = localStorage.getItem('galleryPassword');
  
  if (!galleryPassword) {
    // First time user - show set password modal
    passwordModal.style.display = 'none';
    setPasswordModal.classList.remove('hidden');
  }

  // Unlock gallery
  unlockBtn.addEventListener('click', function() {
    const enteredPassword = passwordInput.value.trim();
    
    if (!enteredPassword) {
      passwordError.textContent = 'Please enter your password';
      return;
    }
    
    const savedPassword = localStorage.getItem('galleryPassword');
    
    if (enteredPassword === savedPassword) {
      passwordModal.style.display = 'none';
      galleryContent.classList.remove('hidden');
      passwordInput.value = '';
      passwordError.textContent = '';
    } else {
      passwordError.textContent = 'Incorrect password. Try again.';
    }
  });

  // Set new password
  setPasswordBtn.addEventListener('click', function() {
    passwordModal.style.display = 'none';
    setPasswordModal.classList.remove('hidden');
  });

  // Save new password
  savePasswordBtn.addEventListener('click', function() {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    if (!newPassword || !confirmPassword) {
      setPasswordError.textContent = 'Please fill in both fields';
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError.textContent = 'Passwords do not match';
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError.textContent = 'Password must be at least 6 characters';
      return;
    }
    
    localStorage.setItem('galleryPassword', newPassword);
    setPasswordModal.classList.add('hidden');
    galleryContent.classList.remove('hidden');
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
    setPasswordError.textContent = '';
  });

  // Cancel password setting
  cancelPasswordBtn.addEventListener('click', function() {
    if (localStorage.getItem('galleryPassword')) {
      setPasswordModal.classList.add('hidden');
      passwordModal.style.display = 'flex';
    } else {
      // Can't cancel if no password is set
      setPasswordError.textContent = 'You must set a password to continue';
    }
  });

  // Change password
  changePasswordBtn.addEventListener('click', function() {
    setPasswordModal.classList.remove('hidden');
    galleryContent.classList.add('hidden');
  });

  // Allow pressing Enter in password fields
  passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      unlockBtn.click();
    }
  });

  newPasswordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      savePasswordBtn.click();
    }
  });

  confirmPasswordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      savePasswordBtn.click();
    }
  });

  // Photo Gallery Functionality
  const addPhotosBtn = document.getElementById('add-photos-btn');
  const addPhotosModal = document.querySelector('.add-photos-modal');
  const cancelUploadBtn = document.getElementById('cancel-upload');
  const confirmUploadBtn = document.getElementById('confirm-upload');
  const photoUploadInput = document.getElementById('photo-upload');
  const albumSelect = document.getElementById('album-select');
  const newAlbumNameInput = document.getElementById('new-album-name');
  const uploadStatus = document.getElementById('upload-status');
  const viewAlbumBtns = document.querySelectorAll('.view-album');
  const albumViewModal = document.querySelector('.album-view-modal');
  const closeAlbumViewBtn = document.getElementById('close-album-view');
  const albumViewTitle = document.getElementById('album-view-title');
  const albumPhotosContainer = document.getElementById('lightgallery');

  // Sample photo data (in a real app, this would come from a database)
  const photoAlbums = {
    family: [
      { id: 1, url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80', caption: 'Family reunion 2022' },
      { id: 2, url: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Diwali celebration' },
      { id: 3, url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80', caption: 'Summer vacation' }
    ],
    childhood: [
      { id: 4, url: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'First day of school' },
      { id: 5, url: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: '5th birthday' },
      { id: 6, url: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'School play' }
    ],
    fashion: [
      { id: 7, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Wedding outfit' },
      { id: 8, url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Casual look' },
      { id: 9, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Festival dress' }
    ],
    travel: [
      { id: 10, url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1685&q=80', caption: 'Goa beaches' },
      { id: 11, url: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Himalayan trek' },
      { id: 12, url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1685&q=80', caption: 'Paris vacation' }
    ],
    friends: [
      { id: 13, url: 'https://images.unsplash.com/photo-1544168195-11d2dd4d40e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'College friends' },
      { id: 14, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1736&q=80', caption: 'Birthday party' },
      { id: 15, url: 'https://images.unsplash.com/photo-1544168195-11d2dd4d40e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Weekend getaway' }
    ],
    selfies: [
      { id: 16, url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Makeup look' },
      { id: 17, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'New haircut' },
      { id: 18, url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Golden hour' }
    ],
    screenshots: [
      { id: 19, url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80', caption: 'Funny meme' },
      { id: 20, url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', caption: 'Important note' },
      { id: 21, url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80', caption: 'Recipe to try' }
    ]
  };

  // Show/hide add photos modal
  addPhotosBtn.addEventListener('click', function() {
    addPhotosModal.classList.remove('hidden');
  });

  cancelUploadBtn.addEventListener('click', function() {
    addPhotosModal.classList.add('hidden');
    uploadStatus.textContent = '';
  });

  // Handle album selection
  albumSelect.addEventListener('change', function() {
    if (this.value === 'new') {
      newAlbumNameInput.classList.remove('hidden');
    } else {
      newAlbumNameInput.classList.add('hidden');
    }
  });

  // Simulate photo upload (in a real app, this would upload to a server)
  confirmUploadBtn.addEventListener('click', function() {
    const files = photoUploadInput.files;
    
    if (files.length === 0) {
      uploadStatus.textContent = 'Please select at least one photo';
      uploadStatus.style.color = '#ff6b6b';
      return;
    }
    
    let albumName = albumSelect.value;
    
    if (albumName === 'new') {
      albumName = newAlbumNameInput.value.trim().toLowerCase();
      
      if (!albumName) {
        uploadStatus.textContent = 'Please enter a name for the new album';
        uploadStatus.style.color = '#ff6b6b';
        return;
      }
      
      // Create new album if it doesn't exist
      if (!photoAlbums[albumName]) {
        photoAlbums[albumName] = [];
      }
    }
    
    // Simulate upload process
    uploadStatus.textContent = `Uploading ${files.length} photos to ${albumName} album...`;
    uploadStatus.style.color = 'white';
    
    setTimeout(() => {
      uploadStatus.textContent = `Successfully uploaded ${files.length} photos to ${albumName} album!`;
      uploadStatus.style.color = '#4CAF50';
      
      // Reset form
      photoUploadInput.value = '';
      albumSelect.value = 'family';
      newAlbumNameInput.value = '';
      newAlbumNameInput.classList.add('hidden');
      
      // In a real app, you would add the photos to the album and update the UI
    }, 2000);
  });

  // View album
  viewAlbumBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const albumName = this.dataset.album;
      const album = photoAlbums[albumName];
      
      albumViewTitle.textContent = `${albumName.charAt(0).toUpperCase() + albumName.slice(1)} Album`;
      albumPhotosContainer.innerHTML = '';
      
      album.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.style.backgroundImage = `url(${photo.url})`;
        photoItem.dataset.src = photo.url;
        photoItem.dataset.subHtml = `<h4>${photo.caption}</h4>`;
        
        albumPhotosContainer.appendChild(photoItem);
      });
      
      albumViewModal.classList.remove('hidden');
      
      // Initialize lightGallery
      lightGallery(albumPhotosContainer, {
        selector: '.photo-item',
        download: false,
        counter: false,
        getCaptionFromTitleOrAlt: false
      });
    });
  });

  // Close album view
  closeAlbumViewBtn.addEventListener('click', function() {
    albumViewModal.classList.add('hidden');
  });

  // Initialize particles
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('Particles.js loaded');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('Particles.js loaded');
  });

  // Message in a Bottle Animation
  const sendBottleBtn = document.getElementById('send-bottle');
  const messageText = document.getElementById('message-text');
  
  sendBottleBtn.addEventListener('click', function() {
    if (messageText.value.trim() === '') {
      alert('Please write a message before sending!');
      return;
    }
    
    // Animate bottle sending
    const bottle = document.querySelector('.bottle');
    bottle.style.animation = 'sendBottle 2s forwards';
    
    // Show confirmation
    setTimeout(() => {
      alert('Your message has been sent across the digital ocean! 🌊');
      messageText.value = '';
      bottle.style.animation = '';
    }, 2000);
  });

  // Mood Selector Interaction
  const moodOptions = document.querySelectorAll('.mood-option');
  const moodResponse = document.getElementById('mood-response');
  
  const moodResponses = {
    happy: "Yay! I'm happy you're happy! Let's spread more joy together!",
    excited: "Woo! Excited moods are contagious! What's got you so pumped?",
    love: "Aww, love is in the air! Sending you extra love today!",
    silly: "Haha, silly moods are the best! Let's be goofballs together!",
    chill: "Chill vibes only. Perfect for a relaxing chat!"
  };
  
  moodOptions.forEach(option => {
    option.addEventListener('click', function() {
      const mood = this.dataset.mood;
      moodResponse.querySelector('p').textContent = moodResponses[mood];
      moodResponse.classList.remove('hidden');
      
      // Add mood-specific effect
      document.body.classList.remove('happy-bg', 'excited-bg', 'love-bg', 'silly-bg', 'chill-bg');
      document.body.classList.add(`${mood}-bg`);
    });
  });

  // Bollywood Quiz
  const quizOptions = document.querySelectorAll('.quiz-option');
  const quizResult = document.getElementById('quiz-result');
  const resultContent = quizResult.querySelector('.result-content');
  
  const quizResults = {
    naina: {
      title: "You're in Naina (YJHD) mode today!",
      desc: "Thoughtful, introspective, and ready for adventure when the right moment comes.",
      img: "https://im.idiva.com/content/2025/Jan/2_6777bfba41918.jpg?w=900&h=675&cc=1"
    },
    rani: {
      title: "You're channeling Rani (Queen) energy today!",
      desc: "Independent, discovering yourself, and embracing new experiences with courage.",
      img: "https://i.pinimg.com/564x/c8/17/4d/c8174d6b155241612f1616063c5d4d07.jpg"
    },
    geet: {
      title: "You're totally Geet (Jab We Met) today!",
      desc: "Full of life, talkative, and spreading joy wherever you go!",
      img: "https://i.pinimg.com/736x/92/09/2d/92092deec5ffb5cbe29b42c10751b2e4.jpg"
    }
  };
  
  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      const character = this.dataset.character;
      const result = quizResults[character];
      
      resultContent.innerHTML = `
        <h4>${result.title}</h4>
        <img src="${result.img}" alt="${character}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid white; margin: 1rem 0;">
        <p>${result.desc}</p>
      `;
      
      quizResult.classList.remove('hidden');
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    });
  });
  
  // Try Again button
  document.getElementById('try-again').addEventListener('click', function() {
    quizResult.classList.add('hidden');
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      // Show success message
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      
      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
        submitBtn.disabled = false;
        
        // Show thank you message
        alert(`Thank you, ${name}! Your message about "${subject}" has been sent. I'll get back to you soon!`);
      }, 1500);
    }, 2000);
  });

  // Typing indicator for textarea
  const messageTextarea = document.getElementById('message');
  const typingIndicator = document.querySelector('.typing-indicator');
  
  let typingTimer;
  messageTextarea.addEventListener('input', function() {
    typingIndicator.style.opacity = '1';
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      typingIndicator.style.opacity = '0';
    }, 1000);
  });

  // Add CSS classes for mood backgrounds
  const style = document.createElement('style');
  style.textContent = `
    .happy-bg { background: linear-gradient(135deg, #FFD166, #06D6A0, #118AB2); }
    .excited-bg { background: linear-gradient(135deg, #EF476F, #FFD166, #06D6A0); }
    .love-bg { background: linear-gradient(135deg, #FF6B6B, #FF8E8E, #FFB3B3); }
    .silly-bg { background: linear-gradient(135deg, #A663CC, #B298DC, #D1B3E6); }
    .chill-bg { background: linear-gradient(135deg, #4CC9F0, #4895EF, #4361EE); }
    
    @keyframes sendBottle {
      0% { transform: translateY(0) rotate(0); opacity: 1; }
      50% { transform: translateY(-100px) rotate(20deg); opacity: 0.8; }
      100% { transform: translateY(-500px) rotate(50deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});



// Alarm Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Alarm Variables
  let alarms = [];
  let nextAlarm = null;
  
  // DOM Elements
  const alarmTimeInput = document.getElementById('alarm-time');
  const setAlarmBtn = document.getElementById('set-alarm');
  const alarmsList = document.getElementById('alarms-list');
  const alarmsCount = document.getElementById('alarms-count');
  const nextAlarmDisplay = document.getElementById('next-alarm');
  const alarmSound = document.getElementById('alarm-sound');
  
  // Sleep Tracker Elements
  const startSleepBtn = document.getElementById('start-sleep');
  const wakeUpBtn = document.getElementById('wake-up');
  const sleepTimeDisplay = document.getElementById('sleep-time');
  const wakeTimeDisplay = document.getElementById('wake-time');
  const sleepDurationDisplay = document.getElementById('sleep-duration');
  const qualityStars = document.querySelectorAll('.quality-stars i');
  
  // Watchlist Elements
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  const addToQueueBtn = document.getElementById('add-to-queue');
  
  // Set Alarm Functionality
  setAlarmBtn.addEventListener('click', function() {
    const alarmTime = alarmTimeInput.value;
    if (!alarmTime) return;
    
    const [hours, minutes] = alarmTime.split(':');
    const now = new Date();
    const alarmDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
    
    // If alarm time is in the past, set it for tomorrow
    if (alarmDate < now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }
    
    const alarm = {
      time: alarmDate,
      id: Date.now(),
      sound: document.getElementById('alarm-sound').value,
      active: true
    };
    
    alarms.push(alarm);
    updateAlarmsList();
    updateNextAlarm();
    
    // Reset input
    alarmTimeInput.value = '07:00';
  });
  
  // Update Alarms List
  function updateAlarmsList() {
    alarmsList.innerHTML = '';
    alarms.forEach(alarm => {
      const li = document.createElement('li');
      
      const timeStr = alarm.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      li.innerHTML = `
        <span>${timeStr}</span>
        <div>
          <button class="toggle-alarm" data-id="${alarm.id}">
            <i class="fas fa-${alarm.active ? 'bell' : 'bell-slash'}"></i>
          </button>
          <button class="delete-alarm" data-id="${alarm.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      
      alarmsList.appendChild(li);
    });
    
    alarmsCount.textContent = alarms.length;
    
    // Add event listeners to new buttons
    document.querySelectorAll('.toggle-alarm').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        toggleAlarm(id);
      });
    });
    
    document.querySelectorAll('.delete-alarm').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        deleteAlarm(id);
      });
    });
  }
  
  // Toggle Alarm Active State
  function toggleAlarm(id) {
    const alarm = alarms.find(a => a.id === id);
    if (alarm) {
      alarm.active = !alarm.active;
      updateAlarmsList();
      updateNextAlarm();
    }
  }
  
  // Delete Alarm
  function deleteAlarm(id) {
    alarms = alarms.filter(a => a.id !== id);
    updateAlarmsList();
    updateNextAlarm();
  }
  
  // Update Next Alarm Display
  function updateNextAlarm() {
    const activeAlarms = alarms.filter(a => a.active);
    if (activeAlarms.length === 0) {
      nextAlarmDisplay.textContent = '--:--';
      nextAlarm = null;
      return;
    }
    
    // Find the earliest alarm
    nextAlarm = activeAlarms.reduce((earliest, current) => {
      return current.time < earliest.time ? current : earliest;
    }, activeAlarms[0]);
    
    nextAlarmDisplay.textContent = nextAlarm.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Check for Alarms
  function checkAlarms() {
    const now = new Date();
    
    if (nextAlarm && nextAlarm.active && now >= nextAlarm.time) {
      // Trigger alarm
      alarmSound.play();
      
      // Show notification
      if (Notification.permission === 'granted') {
        new Notification('Alarm!', {
          body: 'Your alarm is going off!',
          icon: 'assets/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Alarm!', {
              body: 'Your alarm is going off!',
              icon: 'assets/favicon.ico'
            });
          }
        });
      }
      
      // Snooze or dismiss
      const shouldSnooze = confirm('Alarm! Click OK to snooze for 5 minutes or Cancel to dismiss.');
      alarmSound.pause();
      alarmSound.currentTime = 0;
      
      if (shouldSnooze) {
        nextAlarm.time = new Date(now.getTime() + 5 * 60000);
        updateNextAlarm();
      } else {
        // Remove or deactivate alarm based on repeat setting
        const repeatDaily = document.querySelector('.alarm-options input[type="checkbox"]').checked;
        if (!repeatDaily) {
          deleteAlarm(nextAlarm.id);
        } else {
          // Set for same time tomorrow
          nextAlarm.time.setDate(nextAlarm.time.getDate() + 1);
          updateNextAlarm();
        }
      }
    }
  }
  
  // Check alarms every second
  setInterval(checkAlarms, 1000);
  
  // Sleep Tracker Functionality
  let sleepStartTime = null;
  let sleepEndTime = null;
  
  startSleepBtn.addEventListener('click', function() {
    sleepStartTime = new Date();
    sleepTimeDisplay.textContent = sleepStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    wakeTimeDisplay.textContent = '--:--';
    sleepDurationDisplay.textContent = '0h 0m';
    
    // Disable start button, enable wake up button
    startSleepBtn.disabled = true;
    wakeUpBtn.disabled = false;
  });
  
  wakeUpBtn.addEventListener('click', function() {
    if (!sleepStartTime) return;
    
    sleepEndTime = new Date();
    wakeTimeDisplay.textContent = sleepEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Calculate duration
    const durationMs = sleepEndTime - sleepStartTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    sleepDurationDisplay.textContent = `${hours}h ${minutes}m`;
    
    // Reset buttons
    startSleepBtn.disabled = false;
    wakeUpBtn.disabled = true;
  });
  
  // Sleep Quality Rating
  qualityStars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      
      // Update stars
      qualityStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
      
      // In a real app, you would save this rating along with the sleep data
    });
  });
  
  // Watchlist Carousel
  let currentPosition = 0;
  const itemWidth = 180 + 24; // width + gap
  
  prevBtn.addEventListener('click', function() {
    if (currentPosition < 0) {
      currentPosition += itemWidth;
      carouselTrack.style.transform = `translateX(${currentPosition}px)`;
    }
  });
  
  nextBtn.addEventListener('click', function() {
    const maxPosition = -((carouselTrack.children.length - 4) * itemWidth);
    if (currentPosition > maxPosition) {
      currentPosition -= itemWidth;
      carouselTrack.style.transform = `translateX(${currentPosition}px)`;
    }
  });
  
  // Add to Queue
  addToQueueBtn.addEventListener('click', function() {
    const title = prompt('Enter the title you want to add to your queue:');
    if (title) {
      // In a real app, you would add this to your queue array and update the display
      alert(`"${title}" has been added to your queue!`);
    }
  });
  
  // Request notification permission on page load
  if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
});

// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle video buttons
  const videoButtons = document.querySelectorAll('.action-btn.videos');
  
  videoButtons.forEach(button => {
    button.addEventListener('click', function() {
      const seriesId = this.getAttribute('data-series') + '-videos';
      const videoGallery = document.getElementById(seriesId);
      
      // Toggle display
      if (videoGallery.style.display === 'none') {
        videoGallery.style.display = 'block';
        this.innerHTML = '<i class="fas fa-video"></i> Hide Videos';
      } else {
        videoGallery.style.display = 'none';
        this.innerHTML = '<i class="fas fa-video"></i> Videos';
      }
      
      // Close other open galleries
      document.querySelectorAll('.video-gallery').forEach(gallery => {
        if (gallery.id !== seriesId && gallery.style.display === 'block') {
          gallery.style.display = 'none';
          const correspondingBtn = document.querySelector(`.action-btn.videos[data-series="${gallery.id.split('-')[0]}"]`);
          if (correspondingBtn) {
            correspondingBtn.innerHTML = '<i class="fas fa-video"></i> Videos';
          }
        }
      });
    });
  });
  
  // Handle play trailer buttons
  const playButtons = document.querySelectorAll('.play-trailer');
  
  playButtons.forEach(button => {
    button.addEventListener('click', function() {
      const series = this.getAttribute('data-series');
      let videoSrc = '';
      let posterSrc = '';
      
      // Set different trailers for different series
      if (series === 'friends') {
        videoSrc = 'assets/friends_trailer.mp4';
        posterSrc = 'assets/friends_trailer_poster.jpg';
      } else if (series === 'himym') {
        videoSrc = 'assets/himym_trailer.mp4';
        posterSrc = 'assets/himym_trailer_poster.jpg';
      }
      
      // Create modal for trailer
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="modal-video-wrapper">
          <span class="close-modal">&times;</span>
          <div class="modal-video-container">
            <video controls autoplay poster="${posterSrc}">
              <source src="${videoSrc}" type="video/mp4">
            </video>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close modal
      const closeBtn = modal.querySelector('.close-modal');
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      // Close when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });
  
  // Handle video clicks for fullscreen
  document.querySelectorAll('.video-container video').forEach(video => {
    video.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="modal-video-wrapper">
          <span class="close-modal">&times;</span>
          <div class="modal-video-container">
            <video controls autoplay>
              <source src="${this.querySelector('source').src}" type="video/mp4">
            </video>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close modal
      const closeBtn = modal.querySelector('.close-modal');
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      // Close when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });
});
