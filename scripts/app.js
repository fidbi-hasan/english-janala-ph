// login functionality (no db)
const login = () => {
  const navBar = document.getElementById('navbar');
  const mainSection = document.getElementById('main-section');
  const heroSection = document.getElementById('hero-section');
  const usersName = document.getElementById('user-name').value;
  const userPass = document.getElementById('user-password').value;

  if(usersName === '') {
    // alert('Please enter your name');
    Swal.fire({
      title: "Login Error!",
      text: "Please enter your name to login.",
      icon: "error"
    });
    return;
  }

  if(userPass === '' || userPass !== '123456') {
    // alert('Invalid password!');
    Swal.fire({
      title: "Login Error!",
      text: "Please recheck your password.",
      icon: "error"
    });
    return;
  }

  Swal.fire({
    title: "Login Success!",
    text: "You have been successfully logged in.",
    icon: "success"
  });

  document.getElementById('body').classList.add('pt-40');

  heroSection.classList.add('hidden');
  navBar.classList.remove('hidden');
  mainSection.classList.remove('hidden');

  document.getElementById('user-name').value = '';
  document.getElementById('user-password').value = '';
}

// logout functionality
const logout = () => {
  Swal.fire({
    title: "You have been logged out!",
    icon: "success"
  });
  const navBar = document.getElementById('navbar');
  const mainSection = document.getElementById('main-section');
  const heroSection = document.getElementById('hero-section');

  heroSection.classList.remove('hidden');
  navBar.classList.add('hidden');
  mainSection.classList.add('hidden');
}

// show loading spinner
const showLoadingSpinner = () => {
  document.getElementById('loading-spinner').classList.remove('hidden');
  document.getElementById('single-lesson-container').classList.add('hidden');
}

// hide loading spinner
const hideLoadingSpinner = () => {
  document.getElementById('loading-spinner').classList.add('hidden');
  document.getElementById('single-lesson-container').classList.remove('hidden');
}

// show no lesson selected text
const showNoLessonSelectedText = () => {
  removeActiveClass();
  
  const singleLessonContainer = document.getElementById('single-lesson-container');

  singleLessonContainer.innerHTML = `
    <div id="no-lesson-selected" class="text-center mx-auto col-span-4">
      <p class="sm:text-sm text-xs text-gray-500">
        আপনি এখনো কোন Lesson Select করেন নি।
      </p>
      <p class="py-6 sm:text-3xl text-xl font-bold">
        একটি Lesson Select করুন!
      </p>
    </div>
  `;
}

// remove active class
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName('active');

  for(const activeButton of activeButtons) {
    activeButton.classList.remove('active');
  }
}

// fetch all lessons
const fetchAllLessons = async () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  const res = await fetch(url);
  const data = await res.json();

  showAllLessons(data);
}

// fetch lesson by level
const fetchLessonByLevel = async (level) => {
  showLoadingSpinner();
  
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  const res = await fetch(url);
  const data = await res.json();

  removeActiveClass();
  document.getElementById(`lesson-${level}`).classList.add('active');
  showLessonBylevel(data);
}

// fetch lesson details
const fetchLessonDetails = async (lessonId) => {
  const url = `https://openapi.programming-hero.com/api/word/${lessonId}`;
  const res = await fetch(url);
  const data = await res.json(); 

  showLessonDetails(data.data);
}

// pronounce word
 const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
  }

// show lesson details
const showLessonDetails = (lessonDetailsObj) => {  
  document.getElementById('lesson_details').showModal();

  const lessonDetailsContainer = document.getElementById('lesson-details-container');

  function showSynonyms(synonymsArr) {

    let synonymsContainer = '';

    for (const synonym of synonymsArr) {
      const capSynonym = synonym.charAt(0).toUpperCase() + synonym.slice(1); // from freeCodeCamp

      synonymsContainer += `<span class="py-[2px] px-2 bg-[#EDF7FF] border border-[#D7E4EF] rounded-sm text-sm font-thin">${capSynonym}</span>`;
    }

    return `<div class="flex justify-start gap-2">${synonymsContainer}<div>`
  }
    
  lessonDetailsContainer.innerHTML = `
    <div class="card card-dash">
      <h5 class="text-2xl font-semibold mb-2">
        ${lessonDetailsObj.word} (<i class="fa-solid fa-microphone-lines"></i> ${lessonDetailsObj.pronunciation})
      </h5>
      <p class="text-xs font-bold">Meaning</p>
      <p class="text-gray-500 mb-2">${lessonDetailsObj.meaning === null ? 'no data found' : lessonDetailsObj.meaning}</p>
      <p class="text-xs font-bold">Example</p>
      <p class="text-gray-500 mb-2">${lessonDetailsObj.sentence}</p>
      <p class="text-xs font-bold">সমার্থক শব্দ গুলো</p>
      <p class="text-gray-500 mb-2">${lessonDetailsObj.synonyms.length === 0 ? 'no data found' : showSynonyms(lessonDetailsObj.synonyms)}</p>
    </div>
  `;

  hideLoadingSpinner();
}

// show lesson by level
const showLessonBylevel = (lessonByLevelObj) => {
  const singleLessonContainer = document.getElementById('single-lesson-container');
  singleLessonContainer.innerHTML = '';
  const lessonByLevelArr = lessonByLevelObj.data;

  if(lessonByLevelArr.length === 0) {
    singleLessonContainer.innerHTML = `
      <div id="no-lesson-selected" class="text-center mx-auto col-span-4">
        <p class="sm:text-sm text-xs text-red-500">
          <i class="fa-solid fa-triangle-exclamation"></i> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <p class="py-6 sm:text-3xl text-lg font-bold">
          নেক্সট Lesson এ যান 
        </p>
      </div>
    `;
  }

  for(const SinglelessonByLevelObj of lessonByLevelArr) {
    console.log(SinglelessonByLevelObj);
    const singleLessonCard = document.createElement('div');
    singleLessonCard.innerHTML = `
      <div class="sm:p-5 bg-white rounded-lg text-center shadow-sm p-3">
        <h5 class="text-center sm:text-2xl text-xl font-bold">
          ${SinglelessonByLevelObj.word} 
          <span class="text-gray-500 sm:text-base text-xs font-normal">(${SinglelessonByLevelObj.pronunciation})</span>
        </h5>
        <p class="text-[#422AD5] sm:text-lg text-base">Meaning: ${SinglelessonByLevelObj.meaning === null ? 'no data found' : SinglelessonByLevelObj.meaning}</p>
        <div class="flex justify-between mt-5">
          <i onclick="fetchLessonDetails(${SinglelessonByLevelObj.id})" class="fa-solid fa-circle-info text-gray-500 sm:bg-[#1A91FF10] w-10 p-3 rounded-sm cursor-pointer hover:shadow-inner transition-shadow"></i>
          <i onclick="pronounceWord('${SinglelessonByLevelObj.word}')" class="fa-solid fa-volume-high text-gray-500 sm:bg-[#1A91FF10] w-10 p-3 rounded-sm cursor-pointer hover:shadow-inner transition-shadow"></i>
        </div>
      </div>
    `;

    singleLessonContainer.append(singleLessonCard);
  }
  hideLoadingSpinner();
}

// show all lessons
const showAllLessons = (lessonsObj) => {
  const lessonButtonsContainer = document.getElementById('lesson-button-container');
  const lessonsArr = lessonsObj.data;

  for(const lesson of lessonsArr) {
    const lessonBtnDiv = document.createElement('div');

    lessonBtnDiv.innerHTML = `
      <button id="lesson-${lesson.level_no}" onclick="fetchLessonByLevel('${lesson.level_no}')" class="btn btn-sm text-[#422AD5] bg-[#ffffff00] border border-[#422AD5] hover:bg-[#422AD5] hover:text-white">
          <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;

    lessonButtonsContainer.append(lessonBtnDiv);
  }

  const resetBtnDiv = document.createElement('div');
  resetBtnDiv.innerHTML = `
    <button onclick="showNoLessonSelectedText()" class="btn btn-sm text-[#422AD5] bg-[#ffffff00] border border-[#422AD5] hover:bg-[#422AD5] hover:text-white">
      <i class="fa-solid fa-rotate-left"></i> Reset to default
    </button>
  `;
  lessonButtonsContainer.append(resetBtnDiv);
}

fetchAllLessons();
showNoLessonSelectedText();