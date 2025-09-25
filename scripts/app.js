// show no lesson selected text
const showNoLessonSelectedText = () => {
  removeActiveClass();
  const noLessonSelectedText = document.getElementById('no-lesson-selected');

  if(noLessonSelectedText) noLessonSelectedText.classList.remove('hidden');

  noLessonSelectedText.innerHTML = `
    <p class="sm:text-sm text-xs text-gray-500">
      আপনি এখনো কোন Lesson Select করেন নি।
    </p>
    <p class="py-6 sm:text-3xl text-xl font-bold">
      একটি Lesson Select করুন!
    </p>
  `;
}

// hide no lesson selected text
const hideNoLessonSelectedText = () => {
  const noLessonSelectedText = document.getElementById('no-lesson-selected');

  noLessonSelectedText.classList.add('hidden');
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
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  const res = await fetch(url);
  const data = await res.json();

  removeActiveClass();
  document.getElementById(`lesson-${level}`).classList.add('active');
  showLessonBylevel(data);
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
    const singleLessonCard = document.createElement('div');
    singleLessonCard.innerHTML = `
      <div class="sm:p-5 bg-white rounded-lg text-center shadow-sm sm:h-[156px] p-3">
        <h5 class="text-center sm:text-2xl text-xl font-bold">
          ${SinglelessonByLevelObj.word} 
          <span class="text-gray-500 sm:text-base text-xs font-normal">(${SinglelessonByLevelObj.pronunciation})</span>
        </h5>
        <p class="text-[#422AD5] sm:text-lg text-base">Meaning: ${SinglelessonByLevelObj.meaning}</p>
        <div class="flex justify-between mt-5">
          <i class="fa-solid fa-circle-info text-gray-500 sm:bg-[#1A91FF10] w-10 p-3 rounded-sm"></i>
          <i class="fa-solid fa-volume-high text-gray-500 sm:bg-[#1A91FF10] w-10 p-3 rounded-sm"></i>
        </div>
      </div>
    `;

    singleLessonContainer.append(singleLessonCard);
  }
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